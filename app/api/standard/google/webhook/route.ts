import { NextResponse } from 'next/server';

// Google Webhook - GET request (Verification ke liye)
// Jab aap Google Cloud Console mein webhook URL register karenge, toh Google ek GET request bhejega.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  // Apne .env se verify token check karein
  if (mode === 'subscribe' && token === process.env.GOOGLE_WEBHOOK_VERIFY_TOKEN) {
    console.log('Google Webhook verified successfully!');
    return new Response(challenge as string, { status: 200 });
  } else {
    return new Response('Verification failed', { status: 403 });
  }
}

// Google Webhook - POST request (Jab naya review aaye)
export async function POST(request: Request) {
  try {
    // Google se aaya hua data (naya review)
    const body = await request.json();
    console.log('Google Webhook Received:', body);

    // -------------------------------
    // DATA SAVE LOGIC (Database mein save karna)
    // -------------------------------
    // Example: 
    // const newReview = {
    //   author: body.authorName,
    //   rating: body.rating,
    //   text: body.comment,
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
