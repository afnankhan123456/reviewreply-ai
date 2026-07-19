'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { getAllPossibleTags } from '@/lib/autoTag';

const PAGE_SIZE = 20;

async function getCycleStart(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { monthlyResetDate: true, createdAt: true },
  });
  return user?.monthlyResetDate || user?.createdAt || new Date(0);
}

export async function getTagSummary() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const cycleStart = await getCycleStart(ownerId);
    const allTags = getAllPossibleTags();
    const summary: { tag: string; count: number }[] = [];

    for (const tag of allTags) {
      const count = await prisma.review.count({
        where: { userId: ownerId, tags: { has: tag }, createdAt: { gte: cycleStart } },
      });
      if (count > 0) {
        summary.push({ tag, count });
      }
    }

    const totalCount = await prisma.review.count({
      where: { userId: ownerId, createdAt: { gte: cycleStart } },
    });
    const untaggedCount = await prisma.review.count({
      where: { userId: ownerId, tags: { equals: [] }, createdAt: { gte: cycleStart } },
    });

    return { success: true, summary, totalCount, untaggedCount, cycleStart };
  } catch (error) {
    console.error('Error fetching tag summary:', error);
    return { error: 'Failed to fetch tag summary' };
  }
}

export async function getReviewsByTag(tag: string | null, page: number = 1) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const cycleStart = await getCycleStart(ownerId);
    const where: any = { userId: ownerId, createdAt: { gte: cycleStart } };
    if (tag === '__untagged__') {
      where.tags = { equals: [] };
    } else if (tag) {
      where.tags = { has: tag };
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { id: true, reviewerName: true, comment: true, rating: true, tags: true, createdAt: true },
    });

    const totalCount = await prisma.review.count({ where });

    return { success: true, reviews, hasMore: page * PAGE_SIZE < totalCount, totalCount };
  } catch (error) {
    console.error('Error fetching reviews by tag:', error);
    return { error: 'Failed to fetch reviews' };
  }
}

export async function addTag(reviewId: string, tag: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // View Only member ko tag add karne nahi denge (ye data-modifying action hai)
    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot add tags.' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== ownerId) return { error: 'Forbidden' };

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
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // View Only member ko tag remove karne nahi denge (ye data-modifying action hai)
    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot remove tags.' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== ownerId) return { error: 'Forbidden' };

    const newTags = review.tags.filter((t) => t !== tag);
    const updated = await prisma.review.update({ where: { id: reviewId }, data: { tags: newTags } });

    return { success: true, tags: updated.tags };
  } catch (error) {
    console.error('Error removing tag:', error);
    return { error: 'Failed to remove tag' };
  }
}

export async function getCycleHistory() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const cycles = await prisma.tagCycle.findMany({
      where: { userId: ownerId },
      orderBy: { cycleStart: 'desc' },
    });

    return { success: true, cycles };
  } catch (error) {
    console.error('Error fetching cycle history:', error);
    return { error: 'Failed to fetch history' };
  }
}
