'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { postReplyToGoogle } from '@/lib/googlePostReply';

export async function getAutoReplyMode() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { autoReplyMode: true },
    });

    return { success: true, mode: user?.autoReplyMode || 'manual' };
  } catch (error) {
    console.error('Error fetching auto-reply mode:', error);
    return { error: 'Failed to fetch mode' };
  }
}

export async function setAutoReplyMode(mode: 'manual' | 'draft' | 'auto') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot change this setting.' };
    }

    if (!['manual', 'draft', 'auto'].includes(mode)) {
      return { error: 'Invalid mode' };
    }

    await prisma.user.update({ where: { id: ownerId }, data: { autoReplyMode: mode } });
    return { success: true, mode };
  } catch (error) {
    console.error('Error setting auto-reply mode:', error);
    return { error: 'Failed to update mode' };
  }
}

export async function getPendingReplies() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const reviews = await prisma.review.findMany({
      where: { userId: ownerId, replyStatus: 'pending_approval' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        reviewerName: true,
        rating: true,
        comment: true,
        reviewReply: true,
        source: true,
        createdAt: true,
      },
    });

    return { success: true, reviews };
  } catch (error) {
    console.error('Error fetching pending replies:', error);
    return { error: 'Failed to fetch pending replies' };
  }
}

export async function approvePendingReply(reviewId: string, finalText: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot approve replies.' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== ownerId) return { error: 'Forbidden' };

    const result = await postReplyToGoogle(reviewId, finalText);
    if (!result.success) {
      return { error: result.error || 'Failed to post reply' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error approving reply:', error);
    return { error: 'Failed to approve reply' };
  }
}

export async function rejectPendingReply(reviewId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot reject replies.' };
    }

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) return { error: 'Review not found' };
    if (review.userId !== ownerId) return { error: 'Forbidden' };

    await prisma.review.update({
      where: { id: reviewId },
      data: { replyStatus: 'rejected', reviewReply: null },
    });

    return { success: true };
  } catch (error) {
    console.error('Error rejecting reply:', error);
    return { error: 'Failed to reject reply' };
  }
}
