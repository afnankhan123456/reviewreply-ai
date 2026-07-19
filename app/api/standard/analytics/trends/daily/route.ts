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
        const dailyData = [];

        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);

          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);

          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);

          const count = await prisma.review.count({
            where: {
              userId,
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          });

          dailyData.push(count);
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
