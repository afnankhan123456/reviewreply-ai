import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAIReply } from '@/lib/aiReply';
import { postReplyToGoogle } from '@/lib/googlePostReply';
import { Redis } from '@upstash/redis';

// ---- Rate limiter (shared across all serverless instances via Upstash Redis) ----
// Pehle ye limit ek in-memory Map mein tha, jo Vercel jaisi serverless hosting
// mein multiple instances ke case mein reliable nahi tha (har instance ka apna
// alag counter ban jata tha, to real limit "20 x instances" ho sakta tha).
// Ab counter Redis (shared/external storage) mein rakha ja raha hai, taaki
// sab instances ek hi counter share karein aur "20/minute" ka limit globally
// sahi se enforce ho.
const RATE_LIMIT_WINDOW_SECONDS = 60; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // max POSTs per key per window

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

// Fallback: agar env vars kisi wajah se missing hon (e.g. local dev bina
// .env ke), to purane in-memory tareeke pe fallback karo taaki app kabhi
// crash na ho — bas ye fallback multi-instance safe nahi hai.
const fallbackRequestLog = new Map<string, number[]>();

function isRateLimitedInMemory(key: string): boolean {
  const now = Date.now();
  const timestamps = (fallbackRequestLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_SECONDS * 1000
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    fallbackRequestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  fallbackRequestLog.set(key, timestamps);
  return false;
}

async function isRateLimited(key: string): Promise<boolean> {
  if (!redis) {
    console.warn('KV_REST_API_URL/TOKEN missing — falling back to per-instance in-memory rate limit');
    return isRateLimitedInMemory(key);
  }

  const redisKey = `webhook-rate-limit:${key}`;

  // INCR is atomic — safe even if multiple instances hit it at the same time
  const count = await redis.incr(redisKey);

  // Pehli request pe expiry set karo taaki window reset ho jaye
  if (count === 1) {
    await redis.expire(redisKey, RATE_LIMIT_WINDOW_SECONDS);
  }

  return count > RATE_LIMIT_MAX_REQUESTS;
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
    const incomingToken = request.headers.get('x-webhook-token');

    if (!incomingToken || incomingToken !== process.env.GOOGLE_WEBHOOK_VERIFY_TOKEN) {
      console.warn('Rejected webhook POST: invalid or missing verify token');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 0b. Global rate limit — key by the token itself. First line of defense
    // (stops raw request-flooding), NOT the per-user AI-cost limit.
    if (await isRateLimited(incomingToken)) {
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
    const googleReviewId = body.reviewId; // must be sent by Google/your relay — needed to post the reply back to the correct review

    // 3. Map the incoming location to the real business + real owner.
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
        googleReviewId,
        reviewerName,
        rating,
        comment,
        text: comment,
        source,
        reviewDate,
        replied: false,
        aiReplied: false,
      },
    });

    console.log(`✅ New review saved: ${newReview.id}`);

    // 5. Generate AI reply — ✅ FIX: ab seedha OpenRouter call karne ki jagah
    // shared generateAIReply() use ho raha hai, jisme per-user monthly (500)
    // aur hourly (20) limit already built-in hai. Agar us user ka limit
    // khatam ho chuka hai, to yahan AI call hi nahi hogi — review phir bhi
    // save rahega, bas auto-reply skip ho jayegi.
    const aiResult = await generateAIReply(businessLocation.userId, {
      reviewText: comment,
      reviewerName,
      rating,
    });

    if (!aiResult.success) {
      console.warn(`Auto-reply skipped for review ${newReview.id}:`, aiResult.error);
      return NextResponse.json(
        { success: true, message: 'Review saved, auto-reply skipped', reason: aiResult.error },
        { status: 200 }
      );
    }

    // 6. Actually post the AI reply to Google (postReplyToGoogle itself updates
    // reviewReply/replied/replyStatus/repliedAt in the DB once the reply is
    // confirmed posted — we no longer mark it "replied" ourselves beforehand).
    const postResult = await postReplyToGoogle(newReview.id, aiResult.reply!);

    // Regardless of Google post success, mark that this was an AI-generated reply.
    await prisma.review.update({
      where: { id: newReview.id },
      data: { aiReplied: true },
    });

    if (!postResult.success) {
      console.warn(`Reply generated but failed to post to Google for review ${newReview.id}:`, postResult.error);
      return NextResponse.json(
        { success: true, message: 'Review saved, AI reply generated but failed to post to Google', reason: postResult.error },
        { status: 200 }
      );
    }

    console.log(`✅ Auto-reply posted to Google for review: ${newReview.id}`);

    return NextResponse.json({ success: true, message: 'Review saved and auto-replied on Google!' }, { status: 200 });

  } catch (error) {
    console.error('Google Webhook Error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
