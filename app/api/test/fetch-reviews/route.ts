import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/cache'; // ✅ Cache import

export async function GET() {
  try {
    // ✅ 1. Check cache first
    const cached = cache.get('all-reviews');
    if (cached) {
      console.log('✅ Returning cached reviews');
      return NextResponse.json(cached);
    }

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Prepare response
    const responseData = { success: true, reviews };

    // Save to cache (60 seconds)
    cache.set('all-reviews', responseData, 60);

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
