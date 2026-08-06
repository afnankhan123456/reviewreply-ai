import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ---- Simple in-memory rate limiter ----
// NOTE: this resets whenever the server/serverless instance restarts and is
// per-instance only (not shared across multiple instances). Good enough as a
// first line of defense; swap for Upstash/Redis if you run multiple instances.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // max POSTs per key per window
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

// ---- Basic payload validation ----
function validatePayload(body: any): { valid: boolean; error?: string } {
  if (typeof body.locationId !== 'string' || body.locationId.trim() === '') {
    return { valid: false, error: 'locationId must be a non-empty string' };
  }

  if (
    body.rating !== undefined &&
    (typeof body.rating !== 'number' || body.rating < 1 || body.rating > 5)
  ) {
    return { valid: false, error: 'rating must be a number between 1 and 5' };
  }

  if (body.comment !== undefined) {
    if (typeof body.comment !== 'string') {
      return { valid: false, error: 'comment must be a string' };
    }
    if (body.comment.length > 5000) {
      return { valid: false, error: 'comment is too long' };
    }
  }

  if (
    body.authorName !== undefined &&
    (typeof body.authorName !== 'string' || body.authorName.length > 200)
  ) {
    return { valid: false, error: 'authorName must be a string under 200 chars' };
  }

  return { valid: true };
}

// GET request for Webhook Verification
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.GOOGLE_WEBHOOK_VERIFY_TOKEN) {
    console.log('Google Webhook verified successfully!');
    return new Response(challenge as string, { status: 200 });
  } else {
    return new Response('Verification failed', { status: 403 });
  }
}

// POST request for receiving new reviews and auto-replying
export async function POST(request: Request) {
  try {
    // 0. SECURITY CHECK — verify this request actually came from Google.
    // Same shared secret used in GET, sent this time as a header instead of
    // a query param (Google/your relay must send this on every push).
    const incomingToken = request.headers.get('x-webhook-token');

    if (!incomingToken || incomingToken !== process.env.GOOGLE_WEBHOOK_VERIFY_TOKEN) {
      console.warn('Rejected webhook POST: invalid or missing verify token');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 0b. Rate limit — key by the token itself since that's the only
    // "identity" we have for the caller. Stops a leaked token from being
    // used to spam fake reviews / burn OpenRouter credits.
    if (isRateLimited(incomingToken)) {
      console.warn('Rejected webhook POST: rate limit exceeded');
      return NextResponse.json(
        { success: false, message: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log('Google Webhook Received:', body);

    // 1. Validate the incoming payload shape/values before trusting any of it
    const validation = validatePayload(body);
    if (!validation.valid) {
      console.warn('Rejected webhook POST: invalid payload —', validation.error);
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    // 2. Extract review data
    const reviewerName = body.authorName || 'Anonymous';
    const rating = body.rating || 0;
    const comment = body.comment || '';
    const source = 'google';
    const reviewDate = new Date();
    const googleLocationId = body.locationId; // must be sent by Google/your relay

    // 3. Map the incoming location to the real business + real owner.
    // No more hardcoded userId — it now comes from the DB record that
    // actually owns this Google location.
    const businessLocation = await prisma.businessLocation.findUnique({
      where: { googleLocationId },
    });

    if (!businessLocation) {
      console.warn(`Rejected webhook POST: unknown locationId ${googleLocationId}`);
      return NextResponse.json(
        { success: false, message: 'Unknown business location' },
        { status: 404 }
      );
    }

    // 4. Save the new review to database (comment field used)
    const newReview = await prisma.review.create({
      data: {
        userId: businessLocation.userId,
        businessLocationId: businessLocation.id,
        reviewerName,
        rating,
        comment,
        text: comment, // ✅ Also save to text field (future compatibility)
        source,
        reviewDate,
        replied: false,
        aiReplied: false,
      },
    });

    console.log(`✅ New review saved: ${newReview.id}`);

    // 5. Generate AI reply using OpenRouter
    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that writes professional, empathetic replies for customer reviews.',
          },
          {
            role: 'user',
            content: `Write a professional reply for this review: "${comment}"`,
          },
        ],
      }),
    });

    const data = await aiResponse.json();
    const replyText = data.choices?.[0]?.message?.content || 'Thank you for your feedback!';

    // 6. Update the review with AI reply
    await prisma.review.update({
      where: { id: newReview.id },
      data: {
        reviewReply: replyText,
        replied: true,
        aiReplied: true,
      },
    });

    console.log(`✅ Auto-reply sent to review: ${newReview.id}`);

    return NextResponse.json({ success: true, message: 'Review saved and auto-replied!' }, { status: 200 });

  } catch (error) {
    // ✅ FIX (Bug 10): sirf error message log karo
    console.error('Google Webhook Error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
