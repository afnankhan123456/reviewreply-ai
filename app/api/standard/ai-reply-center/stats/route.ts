import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache'; // ✅ Import path fixed
import { getCachedOrFetch } from '@/app/lib/cache'; // ✅ New import

export async function GET() {
  try {
    // ✅ 1. Check cache first
    const cached = cache.get('stats');
    if (cached) {
      console.log('✅ Returning cached stats');
      return NextResponse.json(cached);
    }

    // ✅ 2. Use getCachedOrFetch to fetch fresh data
    const responseData = await getCachedOrFetch(
      'stats',
      async () => {
        // 2. Current month start & end
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        // 3. Previous month start & end
        const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 4. Total reviews count
        const totalReviews = await prisma.review.count();
        
        // 5. Replied reviews count (Manual + AI)
        const repliedReviews = await prisma.review.count({ where: { replied: true } });
        
        // 6. Response Rate calculate
        let responseRate = 0;
        if (totalReviews > 0) {
          responseRate = Math.round((Number(repliedReviews) / Number(totalReviews)) * 100);
        }

        // 7. Positive (rating >= 4) aur Negative (rating <= 2)
        const positive = await prisma.review.count({ where: { rating: { gte: 4 } } });
        const negative = await prisma.review.count({ where: { rating: { lte: 2 } } });
        
        const totalRated = await prisma.review.count();

        // 8. Positive aur Negative percentage
        let positivePercent = 0;
        let negativePercent = 0;
        if (totalRated > 0) {
          positivePercent = Math.round((Number(positive) / Number(totalRated)) * 100);
          negativePercent = Math.round((Number(negative) / Number(totalRated)) * 100);
        }

        // 9. AI usage limit (5 for testing)
        const aiRepliedCount = await prisma.review.count({ 
          where: { 
            replied: true,
            aiReplied: true 
          } 
        });
        const aiUsed = aiRepliedCount > 5 ? 5 : aiRepliedCount;
        const limit = 5;

        // 10. REAL GROWTH % CALCULATION
        const currentMonthReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfCurrentMonth,
              lt: startOfNextMonth,
            },
          },
        });

        const prevMonthReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfPrevMonth,
              lt: endOfPrevMonth,
            },
          },
        });

        const totalGrowth = prevMonthReviews > 0
          ? Math.round(((currentMonthReviews - prevMonthReviews) / prevMonthReviews) * 100)
          : 0;

        // Response rate growth
        const currentMonthReplied = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfCurrentMonth,
              lt: startOfNextMonth,
            },
          },
        });

        const prevMonthReplied = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfPrevMonth,
              lt: endOfPrevMonth,
            },
          },
        });

        const responseGrowth = prevMonthReplied > 0
          ? Math.round(((currentMonthReplied - prevMonthReplied) / prevMonthReplied) * 100)
          : 0;

        // ✅ 11. Prepare response
        return {
          success: true,
          data: {
            totalReviews,
            used: aiUsed,
            limit: limit,
            responseRate,
            positive: positivePercent,
            negative: negativePercent,
            growth: {
              total: totalGrowth,
              response: responseGrowth,
            },
          },
        };
      },
      60 // Cache duration in seconds
    );

    // ✅ 12. Save to cache (60 seconds)
    cache.set('stats', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
