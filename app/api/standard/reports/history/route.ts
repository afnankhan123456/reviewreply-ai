import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET() {
  try {
    const responseData = await getCachedOrFetch(
      'history-report',
      async () => {
        const now = new Date();
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);

        // Total records in last 6 months
        const totalRecords = await prisma.review.count({
          where: {
            createdAt: {
              gte: sixMonthsAgo,
              lte: now,
            },
          },
        });

        // Monthly breakdown
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

          const count = await prisma.review.count({
            where: {
              createdAt: {
                gte: monthStart,
                lt: monthEnd,
              },
            },
          });

          const avgRating = await prisma.review.aggregate({
            where: {
              createdAt: {
                gte: monthStart,
                lt: monthEnd,
              },
            },
            _avg: {
              rating: true,
            },
          });

          monthlyData.push({
            month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
            count,
            avgRating: avgRating._avg.rating || 0,
          });
        }

        return {
          success: true,
          data: {
            dateRange: {
              start: sixMonthsAgo.toISOString(),
              end: now.toISOString(),
            },
            totalRecords,
            monthlyData,
            generatedAt: now.toISOString(),
          },
        };
      },
      3600 // 1 hour cache
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('History Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
