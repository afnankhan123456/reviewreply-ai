import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Current month start & end
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // 2. Previous month start & end
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 3. Total reviews count
    const totalReviews = await prisma.review.count();
    
    // 4. Replied reviews count (Manual + AI)
    const repliedReviews = await prisma.review.count({ where: { replied: true } });
    
    // 5. Response Rate calculate
    let responseRate = 0;
    if (totalReviews > 0) {
      responseRate = Math.round((Number(repliedReviews) / Number(totalReviews)) * 100);
    }

    // 6. Positive (rating >= 4) aur Negative (rating <= 2)
    const positive = await prisma.review.count({ where: { rating: { gte: 4 } } });
    const negative = await prisma.review.count({ where: { rating: { lte: 2 } } });
    
    const totalRated = await prisma.review.count();

    // 7. Positive aur Negative percentage
    let positivePercent = 0;
    let negativePercent = 0;
    if (totalRated > 0) {
      positivePercent = Math.round((Number(positive) / Number(totalRated)) * 100);
      negativePercent = Math.round((Number(negative) / Number(totalRated)) * 100);
    }

    // 8. AI usage limit (5 for testing)
    const aiRepliedCount = await prisma.review.count({ 
      where: { 
        replied: true,
        aiReplied: true 
      } 
    });
    const aiUsed = aiRepliedCount > 5 ? 5 : aiRepliedCount;
    const limit = 5;

    // ==========================================
    // ✅ REAL GROWTH % CALCULATION (ADDED)
    // ==========================================
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

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
