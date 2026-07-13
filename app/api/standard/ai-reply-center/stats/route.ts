import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalReviews = await prisma.review.count();
    const repliedReviews = await prisma.review.count({ where: { replied: true } });
    const responseRate = totalReviews > 0 ? Math.round((repliedReviews / totalReviews) * 100) : 0;

    const positive = await prisma.review.count({ where: { rating: { gte: 4 } } });
    const negative = await prisma.review.count({ where: { rating: { lte: 2 } } });
    const totalRated = await prisma.review.count({ where: { rating: { not: null } } });
    const positivePercent = totalRated > 0 ? Math.round((positive / totalRated) * 100) : 0;
    const negativePercent = totalRated > 0 ? Math.round((negative / totalRated) * 100) : 0;

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
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
