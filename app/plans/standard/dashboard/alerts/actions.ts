'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getRatingStats() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const reviews = await prisma.review.findMany({
      where: { userId: session.user.id },
      select: { rating: true },
    });

    const total = reviews.length;

    if (total === 0) {
      return {
        success: true,
        stats: {
          total: 0,
          average: 0,
          distribution: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, percent: 0 })),
        },
      };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / total;

    const distribution = [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((r) => r.rating === stars).length;
      const percent = Math.round((count / total) * 100);
      return { stars, count, percent };
    });

    return {
      success: true,
      stats: { total, average, distribution },
    };
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    return { success: false, error: 'Failed to fetch rating stats' };
  }
}

export async function getLowRatingAlerts() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: session.user.id,
        rating: { lte: 2 },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
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
      reviewerName: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
      source: r.source,
      reviewDate: r.createdAt,
    }));

    return { success: true, alerts };
  } catch (error) {
    console.error('Error fetching low rating alerts:', error);
    return { success: false, error: 'Failed to fetch low rating alerts' };
  }
}
