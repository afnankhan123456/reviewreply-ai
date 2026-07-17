'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// ✅ 1. Low Rating Alerts fetch karo (1-2 star reviews)
export async function getLowRatingAlerts() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const alerts = await prisma.review.findMany({
      where: {
        userId: session.user.id,
        rating: { in: [1, 2] },
      },
      orderBy: { reviewDate: 'desc' },
      take: 10,
      select: {
        id: true,
        reviewerName: true,
        rating: true,
        comment: true,
        source: true,
        reviewDate: true,
      },
    });

    return { success: true, alerts };
  } catch (error) {
    console.error('Error fetching low rating alerts:', error);
    return { error: 'Failed to fetch low rating alerts' };
  }
}

// ✅ 2. Rating Overview fetch karo (Average, Total, Distribution)
export async function getRatingStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // Total reviews count
    const totalReviews = await prisma.review.count({
      where: { userId: session.user.id },
    });

    // Average rating
    const avgRating = await prisma.review.aggregate({
      where: { userId: session.user.id },
      _avg: { rating: true },
    });

    // Rating distribution (5, 4, 3, 2, 1 stars count)
    const distribution = await prisma.review.groupBy({
      by: ['rating'],
      where: { userId: session.user.id },
      _count: { rating: true },
    });

    // Format distribution into 1-5 array with percentage
    const stars = [5, 4, 3, 2, 1];
    const distMap = distribution.reduce((acc, item) => {
      acc[item.rating] = item._count.rating;
      return acc;
    }, {} as Record<number, number>);

    const formattedDistribution = stars.map((star) => {
      const count = distMap[star] || 0;
      const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      return { stars: star, count, percent };
    });

    return {
      success: true,
      stats: {
        average: avgRating._avg.rating ?? 0,
        total: totalReviews,
        distribution: formattedDistribution,
      },
    };
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    return { error: 'Failed to fetch rating stats' };
  }
}
