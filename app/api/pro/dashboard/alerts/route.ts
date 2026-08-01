import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const reviews = await prisma.review.findMany({
      where: {
        userId: ownerId,
        rating: { lte: 2 },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        reviewerName: true,
        rating: true,
        comment: true,
        source: true,
        createdAt: true,
      },
    });

    const alerts = reviews.map((r) => ({
      id: r.id,
      reviewerName: r.reviewerName || 'Anonymous',
      rating: r.rating,
      comment: r.comment,
      source: r.source,
      reviewDate: r.createdAt,
    }));

    return NextResponse.json({ success: true, alerts });
  } catch (error) {
    console.error('Pro dashboard alerts error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch low rating alerts' }, { status: 500 });
  }
}
