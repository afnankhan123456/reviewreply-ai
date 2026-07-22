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
    const cacheKey = `weekly-trends-${userId}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached weekly trends');
      return NextResponse.json(cached);
    }

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const today = new Date();

        // Sabse purani week ka start pata karo (7 weeks pehle)
        const earliestWeekStart = new Date(today);
        earliestWeekStart.setDate(earliestWeekStart.getDate() - (6 * 7));
        earliestWeekStart.setHours(0, 0, 0, 0);

        // ✅ Ek hi query se saari zaroori reviews le lo
        const reviews = await prisma.review.findMany({
          where: { userId, createdAt: { gte: earliestWeekStart } },
          select: { createdAt: true },
        });

        const weeklyData = [];
        for (let i = 6; i >= 0; i--) {
          const weekStart = new Date(today);
          weekStart.setDate(weekStart.getDate() - (i * 7));
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          weekEnd.setHours(23, 59, 59, 999);

          const count = reviews.filter(
            (r) => r.createdAt >= weekStart && r.createdAt <= weekEnd
          ).length;

          weeklyData.push(count);
        }

        return {
          success: true,
          data: weeklyData,
        };
      },
      60
    );

    cache.set(cacheKey, responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Trends Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
