import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';
import { getCachedOrFetch } from '@/app/lib/cache'; // ✅ New import

export async function GET() {
  try {
    // ✅ 1. Check cache first (Manually)
    const cached = cache.get('weekly-trends');
    if (cached) {
      console.log('✅ Returning cached weekly trends');
      return NextResponse.json(cached);
    }

    // ✅ 2. Fetch fresh data using getCachedOrFetch (but will skip cache since already checked)
    const responseData = await getCachedOrFetch(
      'weekly-trends',
      async () => {
        const today = new Date();
        const weeklyData = [];

        // Last 7 weeks ka data fetch karo
        for (let i = 6; i >= 0; i--) {
          const weekStart = new Date(today);
          weekStart.setDate(weekStart.getDate() - (i * 7));
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          weekEnd.setHours(23, 59, 59, 999);

          const count = await prisma.review.count({
            where: {
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
      60 // Cache duration
    );

    // ✅ 3. Save to cache manually (Extra redundancy)
    cache.set('weekly-trends', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Trends Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
