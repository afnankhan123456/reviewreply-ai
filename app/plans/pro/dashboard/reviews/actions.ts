'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { getAllPossibleTags } from '@/lib/autoTag';

async function getCycleStart(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { monthlyResetDate: true, createdAt: true },
  });
  return user?.monthlyResetDate || user?.createdAt || new Date(0);
}

// ✅ Tags & Categories summary — Reviews page ke andar hi dikhane ke liye
export async function getTagSummary() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const cycleStart = await getCycleStart(ownerId);

    const reviews = await prisma.review.findMany({
      where: { userId: ownerId, createdAt: { gte: cycleStart } },
      select: { tags: true },
    });

    const allTags = getAllPossibleTags();
    const tagCountMap: Record<string, number> = {};
    let untaggedCount = 0;

    for (const r of reviews) {
      if (r.tags.length === 0) {
        untaggedCount++;
      }
      for (const t of r.tags) {
        tagCountMap[t] = (tagCountMap[t] || 0) + 1;
      }
    }

    const summary = allTags
      .map((tag) => ({ tag, count: tagCountMap[tag] || 0 }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count);

    return { success: true, summary, totalCount: reviews.length, untaggedCount };
  } catch (error) {
    console.error('Error fetching tag summary:', error);
    return { error: 'Failed to fetch tag summary' };
  }
}
