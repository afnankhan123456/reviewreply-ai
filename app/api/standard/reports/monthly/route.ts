import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf'; // pdf or excel

    const responseData = await getCachedOrFetch(
      'monthly-report',
      async () => {
        const now = new Date();
        // ✅ START: 1st of current month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        // ✅ END: Today (current date)
        const endOfMonth = new Date(now);
        endOfMonth.setHours(23, 59, 59, 999);

        // Total reviews this month (start to today)
        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
            },
          },
        });

        // Average rating this month (start to today)
        const avgRating = await prisma.review.aggregate({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
            },
          },
          _avg: {
            rating: true,
          },
        });

        // Positive reviews (rating >= 4) - start to today
        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
            },
          },
        });

        // Negative reviews (rating <= 2) - start to today
        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
            },
          },
        });

        // Response rate - start to today
        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
            },
          },
        });

        const responseRate = totalReviews > 0 
          ? Math.round((repliedReviews / totalReviews) * 100) 
          : 0;

        // Fetch all reviews for export - start to today
        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,  // ✅ Today tak
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

      // Return JSON for client-side Excel generation
      return NextResponse.json({
        success: true,
        data: rows,
        format: 'excel',
        filename: `monthly-report-${data.month.replace(/ /g, '-')}.xlsx`,
      });
    }

    // Default: PDF format (returns JSON for client-side PDF generation)
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Monthly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
