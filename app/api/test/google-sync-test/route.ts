import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🚀 Google API Test Started...');

  try {
    // Fake Google API call for test
    const response = await fetch(
      'https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID/reviews',
      {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
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
