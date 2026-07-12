import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // Apni database file import karein

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

// POST request for receiving new reviews
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Google Webhook Received:', body);

    // -------------------------------
    // DATA SAVE LOGIC (Database mein save karna)
    // -------------------------------
    // EXAMPLE PRISMA CODE:
    // const newReview = {
    //   author: body.authorName || 'Anonymous',
    //   rating: body.rating || 0,
    //   text: body.comment || '',
    //   source: 'google',
    //   date: new Date().toISOString()
    // };
    // await prisma.review.create({ data: newReview });

    return NextResponse.json({ success: true, message: 'Review saved' }, { status: 200 });

  } catch (error) {
    console.error('Google Webhook Error:', error);
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
