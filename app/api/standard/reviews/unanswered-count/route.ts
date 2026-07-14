import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';
import { getCachedOrFetch } from '@/app/lib/cache'; // ✅ New import

export async function GET() {
  try {
    // ✅ 1. Check cache first (Manually)
    const cached = cache.get('unanswered-count');
    if (cached) {
      console.log('✅ Returning cached unanswered count');
      return NextResponse.json(cached);
    }

    // ✅ 2. Use getCachedOrFetch to fetch fresh data
    const responseData = await getCachedOrFetch(
      'unanswered-count',
      async () => {
        // Database mein unanswered reviews (replied: false) count karo
        const count = await prisma.review.count({
          where: {
            replied: false,
          },
        });

        // Prepare response
        return {
          success: true,
          count: count,
        };
      },
      60 // Cache duration in seconds
    );

    // ✅ 3. Save to cache manually (for redundancy)
    cache.set('unanswered-count', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching unanswered count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch count' },
      { status: 500 }
    );
  }
}
