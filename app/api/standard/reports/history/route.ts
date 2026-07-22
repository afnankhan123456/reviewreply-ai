import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { getAllPossibleTags } from '@/lib/autoTag';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const userId = ownerId;

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
        // ✅ Ek hi query mein user ka createdAt + monthlyResetDate dono le lo
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { createdAt: true, monthlyResetDate: true },
        });

        const pastCycles = await prisma.tagCycle.findMany({
          where: { userId },
          orderBy: { cycleStart: 'desc' },
          take: 5,
        });

        const now = new Date();
        const currentCycleStart = user?.monthlyResetDate || user?.createdAt || now;

        const allCycles = [
          { cycleStart: currentCycleStart, cycleEnd: now, label: 'Current Cycle' },
          ...pastCycles.map((c, i) => ({
            cycleStart: c.cycleStart,
            cycleEnd: c.cycleEnd,
            label: `Cycle ${pastCycles.length - i}`,
          })),
        ].slice(0, 6);

        // ✅ Saare cycles ka earliest-start pata karke, ek hi query se sab reviews le lo
        const earliestStart = allCycles.reduce(
          (min, c) => (c.cycleStart < min ? c.cycleStart : min),
          allCycles[0].cycleStart
        );

        const allReviews = await prisma.review.findMany({
          where: { userId, createdAt: { gte: earliestStart } },
          select: { rating: true, replied: true, tags: true, createdAt: true },
        });

        const allTags = getAllPossibleTags();
        const monthlyData = [];

        for (const cycle of allCycles) {
          const cycleReviews = allReviews.filter(
            (r) => r.createdAt >= cycle.cycleStart && r.createdAt < cycle.cycleEnd
          );

          const count = cycleReviews.length;
          if (count === 0) continue;

          const avgRating = cycleReviews.reduce((sum, r) => sum + r.rating, 0) / count;
          const repliedCount = cycleReviews.filter((r) => r.replied).length;

          const tagCountMap: Record<string, number> = {};
          for (const r of cycleReviews) {
            for (const t of r.tags) {
              tagCountMap[t] = (tagCountMap[t] || 0) + 1;
            }
          }
          const tagBreakdown = allTags
            .map((tag) => ({ tag, count: tagCountMap[tag] || 0 }))
            .filter((t) => t.count > 0);

          monthlyData.push({
            month: cycle.label,
            periodStart: cycle.cycleStart,
            periodEnd: cycle.cycleEnd,
            count,
            avgRating: Number(avgRating.toFixed(1)),
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
