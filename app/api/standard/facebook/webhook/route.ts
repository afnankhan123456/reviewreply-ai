import { NextResponse } from 'next/server';

// Facebook Webhook - GET request (Verification ke liye)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  // Apne .env se verify token check karein
  if (mode === 'subscribe' && token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
    console.log('Facebook Webhook verified successfully!');
    return new Response(challenge as string, { status: 200 });
  } else {
    return new Response('Verification failed', { status: 403 });
  }
}

// Facebook Webhook - POST request (Jab naya review aaye)
export async function POST(request: Request) {
  try {
    // Facebook se aaya hua data (naya review)
    const body = await request.json();
    console.log('Facebook Webhook Received:', body);

    // -------------------------------
    // DATA SAVE LOGIC (Database mein save karna)
    // -------------------------------
    // Facebook ka data structure alag ho sakta hai, usko parse karna hoga
    // Example:
    // const newReview = {
    //   author: body.entry[0].changes[0].value.from.name,
    //   rating: body.entry[0].changes[0].value.rating,
    //   text: body.entry[0].changes[0].value.review_text,
    //   source: 'facebook',
    //   date: new Date().toISOString()
    // };
    // await prisma.review.create({ data: newReview });

    return NextResponse.json({ success: true, message: 'Review saved' }, { status: 200 });

  } catch (error) {
    console.error('Facebook Webhook Error:', error);
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
