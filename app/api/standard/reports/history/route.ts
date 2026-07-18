import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getAllPossibleTags } from '@/lib/autoTag';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const userCheck = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionEnd: true },
    });
    if (userCheck?.subscriptionEnd && new Date(userCheck.subscriptionEnd) < new Date()) {
      return NextResponse.json({ success: false, error: 'Subscription expired. Please renew your plan.' }, { status: 403 });
    }

    const cacheKey = `history-report-${userId}`;

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { createdAt: true },
        });

        const pastCycles = await prisma.tagCycle.findMany({
          where: { userId },
          orderBy: { cycleStart: 'desc' },
          take: 5,
        });

        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
          select: { monthlyResetDate: true },
        });

        const now = new Date();
        const currentCycleStart = currentUser?.monthlyResetDate || user?.createdAt || now;

        const allCycles = [
          { cycleStart: currentCycleStart, cycleEnd: now, label: 'Current Cycle' },
          ...pastCycles.map((c, i) => ({
            cycleStart: c.cycleStart,
            cycleEnd: c.cycleEnd,
            label: `Cycle ${pastCycles.length - i}`,
          })),
        ].slice(0, 6);

        const allTags = getAllPossibleTags();
        const monthlyData = [];

        for (const cycle of allCycles) {
          const count = await prisma.review.count({
            where: { userId, createdAt: { gte: cycle.cycleStart, lt: cycle.cycleEnd } },
          });

          if (count === 0) continue;

          const avgRatingResult = await prisma.review.aggregate({
            where: { userId, createdAt: { gte: cycle.cycleStart, lt: cycle.cycleEnd } },
            _avg: { rating: true },
          });

          const repliedCount = await prisma.review.count({
            where: { userId, replied: true, createdAt: { gte: cycle.cycleStart, lt: cycle.cycleEnd } },
          });

          const tagBreakdown: { tag: string; count: number }[] = [];
          for (const tag of allTags) {
            const tagCount = await prisma.review.count({
              where: {
                userId,
                tags: { has: tag },
                createdAt: { gte: cycle.cycleStart, lt: cycle.cycleEnd },
              },
            });
            if (tagCount > 0) tagBreakdown.push({ tag, count: tagCount });
          }

          monthlyData.push({
            month: cycle.label,
            periodStart: cycle.cycleStart,
            periodEnd: cycle.cycleEnd,
            count,
            avgRating: Number((avgRatingResult._avg.rating || 0).toFixed(1)),
            responseRate: Math.round((repliedCount / count) * 100),
            tagBreakdown,
          });
        }

        return {
          success: true,
          data: {
            monthlyData,
            generatedAt: now.toISOString(),
          },
        };
      },
      300
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('History Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
