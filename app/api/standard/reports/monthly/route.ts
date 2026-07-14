import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET() {
  try {
    const responseData = await getCachedOrFetch(
      'monthly-report',
      async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        // Total reviews this month
        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
        });

        // Average rating this month
        const avgRating = await prisma.review.aggregate({
          where: {
            createdAt: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
          _avg: {
            rating: true,
          },
        });

        // Positive reviews (rating >= 4)
        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
        });

        // Negative reviews (rating <= 2)
        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
        });

        // Response rate
        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
        });

        const responseRate = totalReviews > 0 
          ? Math.round((repliedReviews / totalReviews) * 100) 
          : 0;

        return {
          success: true,
          data: {
            month: now.toLocaleString('default', { month: 'long', year: 'numeric' }),
            totalReviews,
            avgRating: avgRating._avg.rating || 0,
            positiveReviews,
            negativeReviews,
            responseRate,
            generatedAt: now.toISOString(),
          },
        };
      },
      3600 // 1 hour cache
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Monthly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
