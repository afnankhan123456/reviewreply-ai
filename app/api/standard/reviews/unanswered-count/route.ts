import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Database mein un answered reviews (replied: false) count karo
    const count = await prisma.review.count({
      where: {
        replied: false,
      },
    });

    return NextResponse.json({
      success: true,
      count: count,
    });
  } catch (error) {
    console.error('Error fetching unanswered count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch count' },
      { status: 500 }
    );
  }
}
