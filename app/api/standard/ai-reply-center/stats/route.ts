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

        // ✅ Ek hi query se saare zaroori reviews-fields le lo
        const reviews = await prisma.review.findMany({
          where: { userId },
          select: { rating: true, replied: true, aiReplied: true, createdAt: true },
        });

        const totalReviews = reviews.length;
        const repliedReviews = reviews.filter((r) => r.replied).length;

        let responseRate = 0;
        if (totalReviews > 0) {
          responseRate = Math.round((repliedReviews / totalReviews) * 100);
        }

        const positive = reviews.filter((r) => r.rating >= 4).length;
        const negative = reviews.filter((r) => r.rating <= 2).length;

        let positivePercent = 0;
        let negativePercent = 0;
        if (totalReviews > 0) {
          positivePercent = Math.round((positive / totalReviews) * 100);
          negativePercent = Math.round((negative / totalReviews) * 100);
        }

        const aiRepliedCount = reviews.filter((r) => r.replied && r.aiReplied).length;
        const aiUsed = aiRepliedCount > 5 ? 5 : aiRepliedCount;
        const limit = 5;

        const currentMonthReviews = reviews.filter(
          (r) => r.createdAt >= startOfCurrentMonth && r.createdAt < startOfNextMonth
        ).length;

        const prevMonthReviews = reviews.filter(
          (r) => r.createdAt >= startOfPrevMonth && r.createdAt < endOfPrevMonth
        ).length;

        const totalGrowth = prevMonthReviews > 0
          ? Math.round(((currentMonthReviews - prevMonthReviews) / prevMonthReviews) * 100)
          : 0;

        const currentMonthReplied = reviews.filter(
          (r) => r.replied && r.createdAt >= startOfCurrentMonth && r.createdAt < startOfNextMonth
        ).length;

        const prevMonthReplied = reviews.filter(
          (r) => r.replied && r.createdAt >= startOfPrevMonth && r.createdAt < endOfPrevMonth
        ).length;

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
