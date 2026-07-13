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
    const body = await request.json();
    console.log('Google Webhook Received:', body);

    // 1. Extract review data
    const reviewerName = body.authorName || 'Anonymous';
    const rating = body.rating || 0;
    const comment = body.comment || '';
    const source = 'google';
    const reviewDate = new Date();

    // 2. Save the new review to database (comment field used)
    const newReview = await prisma.review.create({
      data: {
        userId: "cmr1wiait0001jv04cbasfye3", // Replace with actual userId
        businessLocationId: null,
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

    // 3. Generate AI reply using OpenRouter
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

    // 4. Update the review with AI reply
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
