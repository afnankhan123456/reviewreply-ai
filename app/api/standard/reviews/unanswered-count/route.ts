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
    const cacheKey = `unanswered-count-${userId}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      console.log('✅ Returning cached unanswered count');
      return NextResponse.json(cached);
    }

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const count = await prisma.review.count({
          where: {
            userId,
            replied: false,
          },
        });

        return {
          success: true,
          count: count,
        };
      },
      60
    );

    cache.set(cacheKey, responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching unanswered count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch count' },
      { status: 500 }
    );
  }
}
