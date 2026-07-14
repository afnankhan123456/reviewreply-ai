import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    const responseData = await getCachedOrFetch(
      'monthly-report',
      async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now);
        endOfMonth.setHours(23, 59, 59, 999);

        // Total reviews (1st to today)
        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        // Average rating
        const avgRating = await prisma.review.aggregate({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          _avg: { rating: true },
        });

        // Positive reviews (rating >= 4)
        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        // Negative reviews (rating <= 2)
        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        // Response rate
        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        const responseRate = totalReviews > 0
          ? Math.round((repliedReviews / totalReviews) * 100)
          : 0;

        // All reviews (for export)
        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

        return {
          success: true,
          data: {
            month: monthName,
            totalReviews,
            avgRating: avgRating._avg.rating || 0,
            positiveReviews,
            negativeReviews,
            responseRate,
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

      // Convert to CSV string
      const headers = Object.keys(rows[0] || {});
      const csvRows = [
        headers.join(','),
        ...rows.map(row => headers.map(h => `"${row[h]}"`).join(','))
      ];
      const csvString = csvRows.join('\n');

      return new NextResponse(csvString, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="monthly-report-${data.month.replace(/ /g, '-')}.csv"`,
        },
      });
    }

    // ✅ PDF format (JSON response)
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Monthly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
