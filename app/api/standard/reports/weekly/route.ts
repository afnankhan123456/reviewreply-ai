import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    const responseData = await getCachedOrFetch(
      'weekly-report',
      async () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(now);
        endOfWeek.setHours(23, 59, 59, 999);

        // New reviews (Monday to today)
        const newReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        // Total reviews (Monday to today)
        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        // Replied reviews (Monday to today)
        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

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

        // Daily trend (7 days, but only up to today)
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

        // All reviews (for export)
        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
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
      3600
    );

    // ✅ CSV format
    if (format === 'csv') {
      const { data } = responseData;
      const rows = data.reviews.map((review: any) => ({
        'Review ID': review.id,
        'Rating': review.rating,
        'Comment': review.comment || '',
        'Replied': review.replied ? 'Yes' : 'No',
        'AI Replied': review.aiReplied ? 'Yes' : 'No',
        'Created At': new Date(review.createdAt).toLocaleDateString(),
      }));

      const headers = Object.keys(rows[0] || {});
      const csvRows = [
        headers.join(','),
        ...rows.map(row => headers.map(h => `"${row[h]}"`).join(','))
      ];
      const csvString = csvRows.join('\n');

      return new NextResponse(csvString, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="weekly-report-week-${data.week.replace(/ /g, '-')}-${data.year}.csv"`,
        },
      });
    }

    // ✅ PDF format (JSON response)
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
