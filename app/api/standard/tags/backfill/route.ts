import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { autoTagReview } from '@/lib/autoTag';

export async function POST() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const untaggedReviews = await prisma.review.findMany({
      where: { userId: session.user.id, tags: { equals: [] } },
      select: { id: true, comment: true },
    });

    let updatedCount = 0;

    for (const review of untaggedReviews) {
      const tags = autoTagReview(review.comment);
      if (tags.length > 0) {
        await prisma.review.update({
          where: { id: review.id },
          data: { tags },
        });
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      checked: untaggedReviews.length,
      tagged: updatedCount,
    });
  } catch (error) {
    console.error('Backfill error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
