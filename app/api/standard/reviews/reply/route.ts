import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, replyText } = body;

    if (!reviewId || !replyText) {
      return NextResponse.json(
        { success: false, message: 'reviewId and replyText are required' },
        { status: 400 }
      );
    }

    // 1. Database mein reply update karo
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        reviewReply: replyText,
        replied: true,
      },
    });

    // 2. Agar review Google ka hai, toh Google API par bhi bhejo
    if (updatedReview.source === 'google' && updatedReview.googleReviewId) {
      try {
        const googleResponse = await fetch(
          `https://mybusiness.googleapis.com/v4/accounts/YOUR_ACCOUNT_ID/locations/YOUR_LOCATION_ID/reviews/${updatedReview.googleReviewId}/reply`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: replyText }),
          }
        );

        if (!googleResponse.ok) {
          console.error('❌ Google API Error:', await googleResponse.text());
        } else {
          console.log('✅ Reply posted to Google successfully!');
        }
      } catch (googleError) {
        console.error('❌ Error posting to Google API:', googleError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Reply saved successfully (and posted to Google if applicable)',
      data: updatedReview,
    });
  } catch (error) {
    console.error('Error saving reply:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save reply' },
      { status: 500 }
    );
  }
}
