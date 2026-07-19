import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';
import { getCachedOrFetch } from '@/app/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const userId = ownerId;
    const cacheKey = `stats-${userId}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached stats');
      return NextResponse.json(cached);
    }

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const totalReviews = await prisma.review.count({ where: { userId } });

        const repliedReviews = await prisma.review.count({ where: { userId, replied: true } });

        let responseRate = 0;
        if (totalReviews > 0) {
          responseRate = Math.round((Number(repliedReviews) / Number(totalReviews)) * 100);
        }

        const positive = await prisma.review.count({ where: { userId, rating: { gte: 4 } } });
        const negative = await prisma.review.count({ where: { userId, rating: { lte: 2 } } });

        const totalRated = totalReviews;

        let positivePercent = 0;
        let negativePercent = 0;
        if (totalRated > 0) {
          positivePercent = Math.round((Number(positive) / Number(totalRated)) * 100);
          negativePercent = Math.round((Number(negative) / Number(totalRated)) * 100);
        }

        const aiRepliedCount = await prisma.review.count({
          where: { userId, replied: true, aiReplied: true },
        });
        const aiUsed = aiRepliedCount > 5 ? 5 : aiRepliedCount;
        const limit = 5;

        const currentMonthReviews = await prisma.review.count({
          where: { userId, createdAt: { gte: startOfCurrentMonth, lt: startOfNextMonth } },
        });

        const prevMonthReviews = await prisma.review.count({
          where: { userId, createdAt: { gte: startOfPrevMonth, lt: endOfPrevMonth } },
        });

        const totalGrowth = prevMonthReviews > 0
          ? Math.round(((currentMonthReviews - prevMonthReviews) / prevMonthReviews) * 100)
          : 0;

        const currentMonthReplied = await prisma.review.count({
          where: { userId, replied: true, createdAt: { gte: startOfCurrentMonth, lt: startOfNextMonth } },
        });

        const prevMonthReplied = await prisma.review.count({
          where: { userId, replied: true, createdAt: { gte: startOfPrevMonth, lt: endOfPrevMonth } },
        });

        const responseGrowth = prevMonthReplied > 0
          ? Math.round(((currentMonthReplied - prevMonthReplied) / prevMonthReplied) * 100)
          : 0;

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
      60
    );

    cache.set(cacheKey, responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
