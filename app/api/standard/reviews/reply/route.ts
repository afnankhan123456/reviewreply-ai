import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { postReplyToGoogle } from '@/lib/googlePostReply';

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

    // ✅ Real Google-post — fail hone par sach me fail bhi bolega
    const result = await postReplyToGoogle(reviewId, replyText);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || 'Failed to post reply to Google' },
        { status: 502 }
      );
    }

    const updatedReview = await prisma.review.findUnique({ where: { id: reviewId } });

    return NextResponse.json({
      success: true,
      message: 'Reply posted successfully',
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
