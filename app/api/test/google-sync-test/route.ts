import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Real reviews from database
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ 
      success: true, 
      reviews 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
