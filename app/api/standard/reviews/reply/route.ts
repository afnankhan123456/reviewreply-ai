import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Team member ho to Owner ka data check hoga; View Only member ko reply karne nahi denge
    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role === 'VIEW_ONLY') {
      return NextResponse.json(
        { success: false, message: 'You have view-only access and cannot reply to reviews.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { reviewId, replyText } = body;

    if (!reviewId || !replyText) {
      return NextResponse.json(
        { success: false, message: 'reviewId and replyText are required' },
        { status: 400 }
      );
    }

    // Pehle check karo ye review isi (Owner ke) business ka hai ya nahi
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    if (existingReview.userId !== ownerId) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        reviewReply: replyText,
        replied: true,
      },
    });

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
