import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
    const cacheKey = `daily-trends-${userId}`;

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        // ✅ Ek hi query se pichle 7 din ke saare reviews le lo
        const reviews = await prisma.review.findMany({
          where: { userId, createdAt: { gte: sevenDaysAgo } },
          select: { createdAt: true },
        });

        const dayBuckets: Record<string, number> = {};
        for (const r of reviews) {
          const key = new Date(r.createdAt).toDateString();
          dayBuckets[key] = (dayBuckets[key] || 0) + 1;
        }

        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const key = date.toDateString();
          dailyData.push(dayBuckets[key] || 0);
        }

        return {
          success: true,
          data: dailyData,
        };
      },
      60
    );

    console.log('✅ Returning daily trends' + (responseData ? ' (cached or fresh)' : ''));
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Daily Trends Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
