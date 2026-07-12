import { NextResponse } from 'next/server';

// 🔐 Google OAuth Config (Vercel Env se uthayega)
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

// 📦 Function to get a fresh Access Token using Refresh Token
async function getAccessToken(): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  
  if (!data.access_token) {
    throw new Error('❌ Failed to refresh access token: ' + JSON.stringify(data));
  }

  return data.access_token;
}

// ✅ GET: Google API Test (Real Reviews Fetch)
export async function GET() {
  console.log('🚀 Google API Test Started...');

  try {
    // 1. Get fresh access token
    const accessToken = await getAccessToken();

    // 2. Call real Google My Business API (Replace IDs with your real values)
    const response = await fetch(
      'https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID/reviews',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    console.log('✅ API Response:', JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// ✅ POST: Dummy Review Add (Auto Sync Test Ke Liye)
export async function POST() {
  console.log('🚀 Adding Dummy Review for Auto Sync Test...');

  const dummyReview = {
    author: "Test User",
    rating: 5,
    text: "This is a test review for auto-sync check.",
    source: "google",
    date: new Date().toISOString()
  };

  try {
    // 🔥 YAHAN APNA DATABASE SAVE LOGIC DAALO
    // await prisma.review.create({ data: dummyReview });

    console.log('✅ Dummy Review Added:', dummyReview);

    return NextResponse.json({ 
      success: true, 
      message: "Test review added successfully",
      review: dummyReview
    });
  } catch (error) {
    console.error('❌ Error adding dummy review:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
