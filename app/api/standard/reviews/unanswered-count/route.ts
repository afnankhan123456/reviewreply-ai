import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/cache'; // ✅ Cache import

export async function GET() {
  try {
    // ✅ 1. Check cache first
    const cached = cache.get('unanswered-count');
    if (cached) {
      console.log('✅ Returning cached unanswered count');
      return NextResponse.json(cached);
    }

    // 2. Database mein un answered reviews (replied: false) count karo
    const count = await prisma.review.count({
      where: {
        replied: false,
      },
    });

    // 3. Prepare response
    const responseData = {
      success: true,
      count: count,
    };

    // 4. Save to cache (60 seconds)
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
