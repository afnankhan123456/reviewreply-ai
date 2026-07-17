import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';
import { getCachedOrFetch } from '@/app/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;
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
        const weeklyData = [];

        for (let i = 6; i >= 0; i--) {
          const weekStart = new Date(today);
          weekStart.setDate(weekStart.getDate() - (i * 7));
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          weekEnd.setHours(23, 59, 59, 999);

          const count = await prisma.review.count({
            where: {
              userId,
              createdAt: {
                gte: weekStart,
                lte: weekEnd,
              },
            },
          });

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
