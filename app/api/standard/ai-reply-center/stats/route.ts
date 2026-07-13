import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Total reviews count
    const totalReviews = await prisma.review.count();
    
    // Replied reviews count
    const repliedReviews = await prisma.review.count({ where: { replied: true } });
    
    // ✅ FIXED: Response Rate calculate (Number() use kiya taaki decimal na kate)
    let responseRate = 0;
    if (totalReviews > 0) {
      responseRate = Math.round((Number(repliedReviews) / Number(totalReviews)) * 100);
    }

    // Positive (rating >= 4) aur Negative (rating <= 2) count
    const positive = await prisma.review.count({ where: { rating: { gte: 4 } } });
    const negative = await prisma.review.count({ where: { rating: { lte: 2 } } });
    const totalRated = await prisma.review.count({ where: { rating: { not: null } } });

    // ✅ FIXED: Positive aur Negative percentage (Number() use kiya)
    let positivePercent = 0;
    let negativePercent = 0;
    if (totalRated > 0) {
      positivePercent = Math.round((Number(positive) / Number(totalRated)) * 100);
      negativePercent = Math.round((Number(negative) / Number(totalRated)) * 100);
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
