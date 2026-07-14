import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET() {
  try {
    const responseData = await getCachedOrFetch(
      'weekly-report',
      async () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        // New reviews this week
        const newReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        // Total reviews
        const totalReviews = await prisma.review.count();

        // Replied reviews
        const repliedReviews = await prisma.review.count({
          where: { replied: true },
        });

        // Response rate
        const responseRate = totalReviews > 0 
          ? Math.round((repliedReviews / totalReviews) * 100) 
          : 0;

        // Positive reviews (rating >= 4)
        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        // Negative reviews (rating <= 2)
        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        // Daily trend
        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);

          const count = await prisma.review.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          });
          dailyData.push(count);
        }

        return {
          success: true,
          data: {
            week: `Week ${Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 1).getDay()) / 7)}`,
            year: now.getFullYear(),
            newReviews,
            totalReviews,
            responseRate,
            positiveReviews,
            negativeReviews,
            dailyTrend: dailyData,
            generatedAt: now.toISOString(),
          },
        };
      },
      3600 // 1 hour cache
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
