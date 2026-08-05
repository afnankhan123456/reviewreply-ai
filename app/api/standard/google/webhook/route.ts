import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const body = await request.json();
    console.log('Google Webhook Received:', body);

    // 1. Extract review data
    const reviewerName = body.authorName || 'Anonymous';
    const rating = body.rating || 0;
    const comment = body.comment || '';
    const source = 'google';
    const reviewDate = new Date();
    const googleLocationId = body.locationId; // must be sent by Google/your relay

    if (!googleLocationId) {
      console.warn('Rejected webhook POST: missing locationId in payload');
      return NextResponse.json(
        { success: false, message: 'Missing locationId' },
        { status: 400 }
      );
    }

    // 2. Map the incoming location to the real business + real owner.
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

    // 3. Save the new review to database (comment field used)
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

    // 4. Generate AI reply using OpenRouter
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

    // 5. Update the review with AI reply
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
    console.error('Google Webhook Error:', error);
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
