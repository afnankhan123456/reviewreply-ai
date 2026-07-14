import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf'; // pdf or excel

    const responseData = await getCachedOrFetch(
      'weekly-report',
      async () => {
        const now = new Date();
        // ✅ START: Monday of current week
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        // ✅ END: Today (current date)
        const endOfWeek = new Date(now);
        endOfWeek.setHours(23, 59, 59, 999);

        // New reviews this week (Monday to Today)
        const newReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
        });

        // Total reviews (Monday to Today)
        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
        });

        // Replied reviews (Monday to Today)
        const repliedReviews = await prisma.review.count({
          where: { 
            replied: true,
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
        });

        // Response rate
        const responseRate = totalReviews > 0 
          ? Math.round((repliedReviews / totalReviews) * 100) 
          : 0;

        // Positive reviews (rating >= 4) - Monday to Today
        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
        });

        // Negative reviews (rating <= 2) - Monday to Today
        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
        });

        // Daily trend (last 7 days, but data only up to today)
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

        // Fetch all reviews for export - Monday to Today
        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,  // ✅ Today tak
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        const weekNumber = Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 1).getDay()) / 7);

        return {
          success: true,
          data: {
            week: `Week ${weekNumber}`,
            year: now.getFullYear(),
            newReviews,
            totalReviews,
            responseRate,
            positiveReviews,
            negativeReviews,
            dailyTrend: dailyData,
            reviews,
            generatedAt: now.toISOString(),
          },
          format,
        };
      },
      3600 // 1 hour cache
    );

    // If Excel format requested
    if (format === 'excel') {
      const { data } = responseData;
      const rows = data.reviews.map((review: any) => ({
        'Review ID': review.id,
        'Rating': review.rating,
        'Comment': review.comment || '',
        'Replied': review.replied ? 'Yes' : 'No',
        'AI Replied': review.aiReplied ? 'Yes' : 'No',
        'Created At': new Date(review.createdAt).toLocaleDateString(),
      }));

      return NextResponse.json({
        success: true,
        data: rows,
        format: 'excel',
        filename: `weekly-report-week-${data.week.replace(/ /g, '-')}-${data.year}.xlsx`,
      });
    }

    // Default: PDF format
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
