import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';

export async function GET() {
  try {
    // ✅ 1. Check cache first
    const cached = cache.get('daily-trends');
    if (cached) {
      console.log('✅ Returning cached daily trends');
      return NextResponse.json(cached);
    }

    const today = new Date();
    const dailyData = [];

    // Last 7 days ka data fetch karo
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Start of day (midnight)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      // End of day (23:59:59)
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const count = await prisma.review.count({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      dailyData.push(count);
    }

    // Prepare response
    const responseData = {
      success: true,
      data: dailyData,
    };

    // Save to cache (60 seconds)
    cache.set('daily-trends', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Daily Trends Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
