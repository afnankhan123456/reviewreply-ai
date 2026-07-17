'use server'

import { prisma } from '@/lib/prisma';
import { autoTagReview } from './autoTagReview';

export async function autoTagAllReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { comment: { not: null } },
      select: { id: true },
    });

    for (const review of reviews) {
      await autoTagReview(review.id);
    }

    return { success: true, count: reviews.length };
  } catch (error) {
    console.error('Error auto-tagging all reviews:', error);
    return { error: 'Failed to auto-tag all reviews' };
  }
}
