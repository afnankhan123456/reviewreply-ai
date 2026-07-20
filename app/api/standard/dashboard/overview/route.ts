import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { getAllPossibleTags } from '@/lib/autoTag';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const userId = ownerId;

    const userCheck = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionEnd: true, monthlyResetDate: true, createdAt: true, name: true },
    });
    if (userCheck?.subscriptionEnd && new Date(userCheck.subscriptionEnd) < new Date()) {
      return NextResponse.json({ success: false, error: 'Subscription expired. Please renew your plan.' }, { status: 403 });
    }

    const cycleStart = userCheck?.monthlyResetDate || userCheck?.createdAt || new Date();

    const totalReviews = await prisma.review.count({ where: { userId } });

    const avgRatingResult = await prisma.review.aggregate({
      where: { userId },
      _avg: { rating: true },
    });

    const newReviews = await prisma.review.count({
      where: { userId, createdAt: { gte: cycleStart } },
    });

    const repliedReviews = await prisma.review.count({ where: { userId, replied: true } });
    const responseRate = totalReviews > 0 ? Math.round((repliedReviews / totalReviews) * 100) : 0;

    const lowRatingCount = await prisma.review.count({ where: { userId, rating: { lte: 2 } } });

    const starBreakdown = [];
    for (const stars of [5, 4, 3, 2, 1]) {
      const count = await prisma.review.count({ where: { userId, rating: stars } });
      const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      starBreakdown.push({ stars, count, percent });
    }

    const positiveCount = await prisma.review.count({ where: { userId, rating: { gte: 4 } } });
    const neutralCount = await prisma.review.count({ where: { userId, rating: 3 } });
    const negativeCount = lowRatingCount;
    const positivePercent = totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 0;
    const neutralPercent = totalReviews > 0 ? Math.round((neutralCount / totalReviews) * 100) : 0;
    const negativePercent = totalReviews > 0 ? Math.round((negativeCount / totalReviews) * 100) : 0;

    const sourceGroups = await prisma.review.groupBy({
      by: ['source'],
      where: { userId },
      _count: { source: true },
    });
    const sourceBreakdown = sourceGroups.map((g) => ({
      source: g.source || 'Other',
      count: g._count.source,
    }));

    const allTags = getAllPossibleTags();
    const tagCounts: { tag: string; count: number }[] = [];
    for (const tag of allTags) {
      const count = await prisma.review.count({ where: { userId, tags: { has: tag } } });
      if (count > 0) tagCounts.push({ tag, count });
    }
    tagCounts.sort((a, b) => b.count - a.count);
    const topTags = tagCounts.slice(0, 5);

    const latestReviews = await prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true,
        reviewerName: true,
        rating: true,
        comment: true,
        source: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        userName: userCheck?.name || 'there',
        totalReviews,
        avgRating: Number((avgRatingResult._avg.rating || 0).toFixed(1)),
        newReviews,
        responseRate,
        lowRatingCount,
        starBreakdown,
        sentiment: { positivePercent, neutralPercent, negativePercent },
        sourceBreakdown,
        topTags,
        latestReviews,
      },
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
