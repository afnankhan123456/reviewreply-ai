'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getAllTags() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const tags = await prisma.tag.findMany({
      where: { userId: session.user.id },
      include: {
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
    });

    const tagsWithStats = tags.map((tag) => {
      const avgRating = tag.reviews.length > 0
        ? tag.reviews.reduce((sum, r) => sum + r.rating, 0) / tag.reviews.length
        : 0;
      return {
        ...tag,
        avgRating,
      };
    });

    return { success: true, tags: tagsWithStats };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return { error: 'Failed to fetch tags' };
  }
}
