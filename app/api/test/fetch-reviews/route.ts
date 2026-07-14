import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/app/lib/cache';
import { getCachedOrFetch } from '@/app/lib/cache'; // ✅ New import

export async function GET() {
  try {
    // ✅ 1. Check cache first (Manually)
    const cached = cache.get('all-reviews');
    if (cached) {
      console.log('✅ Returning cached reviews');
      return NextResponse.json(cached);
    }

    // ✅ 2. Use getCachedOrFetch to fetch fresh data
    const responseData = await getCachedOrFetch(
      'all-reviews',
      async () => {
        const reviews = await prisma.review.findMany({
          orderBy: { createdAt: 'desc' },
        });

        // Prepare response
        return { success: true, reviews };
      },
      60 // Cache duration in seconds
    );

    // ✅ 3. Save to cache manually (for redundancy)
    cache.set('all-reviews', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
