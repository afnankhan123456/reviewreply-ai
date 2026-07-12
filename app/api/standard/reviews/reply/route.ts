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

    // Database mein reply update karo
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        reviewReply: replyText,
        replied: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Reply saved successfully',
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
