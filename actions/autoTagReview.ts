'use server'

import { prisma } from '@/lib/prisma';

// Pre-defined keywords mapping
const TAG_KEYWORDS: Record<string, string[]> = {
  'Service': ['service', 'staff', 'waiter', 'waitress', 'server', 'help', 'support'],
  'Food': ['food', 'taste', 'dish', 'meal', 'cuisine', 'flavor', 'delicious'],
  'Quality': ['quality', 'good', 'great', 'excellent', 'amazing', 'awesome', 'fantastic'],
  'Ambience': ['ambience', 'atmosphere', 'decor', 'interior', 'environment', 'vibe', 'décor'],
  'Price': ['price', 'cost', 'expensive', 'cheap', 'value', 'money'],
  'Location': ['location', 'place', 'spot', 'distance', 'convenient'],
};

export async function autoTagReview(reviewId: string) {
  try {
    // Fetch the review comment
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      select: { comment: true, userId: true },
    });

    if (!review || !review.comment) return { error: 'Review not found or comment empty' };

    const commentLower = review.comment.toLowerCase();
    const matchedTags: string[] = [];

    // Match keywords to tags
    for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
      for (const keyword of keywords) {
        if (commentLower.includes(keyword)) {
          matchedTags.push(tag);
          break; // Stop checking other keywords for this tag
        }
      }
    }

    // If no tag matched, assign 'General' by default
    if (matchedTags.length === 0) {
      matchedTags.push('General');
    }

    // Get or create the tags in database for this user
    const tagRecords = await Promise.all(
      matchedTags.map(async (tagName) => {
        let tag = await prisma.tag.findFirst({
          where: { userId: review.userId, name: tagName },
        });
        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              userId: review.userId,
              name: tagName,
              sentiment: 'neutral',
            },
          });
        }
        return tag;
      })
    );

    // Connect the tags to the review
    await prisma.review.update({
      where: { id: reviewId },
      data: {
        tags: {
          connect: tagRecords.map((t) => ({ id: t.id })),
        },
      },
    });

    return { success: true, tags: matchedTags };
  } catch (error) {
    console.error('Error auto-tagging review:', error);
    return { error: 'Failed to auto-tag review' };
  }
}
