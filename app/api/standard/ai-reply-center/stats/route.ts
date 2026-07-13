import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Total reviews count
    const totalReviews = await prisma.review.count();
    
    // Replied reviews count
    const repliedReviews = await prisma.review.count({ where: { replied: true } });
    
    // ✅ Improved: Response Rate calculate (0% nahi dikhega agar 0 reviews hain)
    let responseRate = 0;
    if (totalReviews > 0) {
      responseRate = Math.round((repliedReviews / totalReviews) * 100);
    }

    // Positive (rating >= 4) aur Negative (rating <= 2) count
    const positive = await prisma.review.count({ where: { rating: { gte: 4 } } });
    const negative = await prisma.review.count({ where: { rating: { lte: 2 } } });
    const totalRated = await prisma.review.count({ where: { rating: { not: null } } });

    // Positive aur Negative percentage
    let positivePercent = 0;
    let negativePercent = 0;
    if (totalRated > 0) {
      positivePercent = Math.round((positive / totalRated) * 100);
      negativePercent = Math.round((negative / totalRated) * 100);
    }

    // AI usage limit (500)
    const aiUsed = repliedReviews > 500 ? 500 : repliedReviews;

    return NextResponse.json({
      success: true,
      data: {
        used: aiUsed,
        limit: 500,
        responseRate,
        positive: positivePercent,
        negative: negativePercent,
      }
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
