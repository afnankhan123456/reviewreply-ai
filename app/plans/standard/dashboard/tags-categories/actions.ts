'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// ✅ 1. Get all tags (already exists)
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

// ✅ 2. Add a new tag (for testing)
export async function addTag(tagName: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // Check if tag already exists for this user
    const existingTag = await prisma.tag.findFirst({
      where: { userId: session.user.id, name: tagName },
    });

    if (existingTag) {
      return { error: 'Tag already exists' };
    }

    // Create new tag
    const tag = await prisma.tag.create({
      data: {
        userId: session.user.id,
        name: tagName,
        sentiment: 'neutral',
      },
    });

    return { success: true, tag };
  } catch (error) {
    console.error('Error adding tag:', error);
    return { error: 'Failed to add tag' };
  }
}

// ✅ 3. Delete a tag
export async function deleteTag(tagId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    await prisma.tag.delete({
      where: { id: tagId, userId: session.user.id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting tag:', error);
    return { error: 'Failed to delete tag' };
  }
}
