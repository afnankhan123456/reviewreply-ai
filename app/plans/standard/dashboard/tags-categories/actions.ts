'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getTaggedReviews() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const reviews = await prisma.review.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        reviewerName: true,
        comment: true,
        rating: true,
        tags: true,
        createdAt: true,
      },
    });

    return { success: true, reviews };
  } catch (error) {
    console.error('Error fetching tagged reviews:', error);
    return { error: 'Failed to fetch reviews' };
  }
}

export async function addTag(reviewId: string, tag: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== session.user.id) return { error: 'Forbidden' };

    const cleanTag = tag.trim();
    if (!cleanTag) return { error: 'Tag cannot be empty' };
    if (review.tags.includes(cleanTag)) return { success: true, tags: review.tags };

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { tags: { push: cleanTag } },
    });

    return { success: true, tags: updated.tags };
  } catch (error) {
    console.error('Error adding tag:', error);
    return { error: 'Failed to add tag' };
  }
}

export async function removeTag(reviewId: string, tag: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== session.user.id) return { error: 'Forbidden' };

    const newTags = review.tags.filter((t) => t !== tag);

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: { tags: newTags },
    });

    return { success: true, tags: updated.tags };
  } catch (error) {
    console.error('Error removing tag:', error);
    return { error: 'Failed to remove tag' };
  }
}
