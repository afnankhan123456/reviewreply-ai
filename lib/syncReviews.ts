import { prisma } from './prisma';
import { autoTagReview } from './autoTag';
import { sendFromCriticalPool } from './notificationEmails';
import { generateAIReply } from './aiReply';
import { postReplyToGoogle } from './googlePostReply';

const STAR_MAP: Record<string, number> = {
  STAR_RATING_UNSPECIFIED: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

function buildAlertEmail(alertType: string, reviewInfo: any) {
  return `
    <h2>${alertType}</h2>
    <p><strong>Reviewer:</strong> ${reviewInfo.reviewerName}</p>
    <p><strong>Rating:</strong> ${reviewInfo.rating} ⭐</p>
    <p><strong>Comment:</strong> ${reviewInfo.comment}</p>
    <p><strong>Date:</strong> ${reviewInfo.reviewDate}</p>
  `;
}

export async function syncUserReviews(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { businessLocations: true },
  });

  if (!user) return { synced: 0, error: 'User not found' };

  if (user.subscriptionEnd && new Date(user.subscriptionEnd) < new Date()) {
    return { synced: 0, error: 'Subscription expired. Please renew your plan.' };
  }

  if (!user.googleAccessToken) return { synced: 0, error: 'No Google access token' };
  if (!user.businessLocations.length) return { synced: 0, error: 'No business location connected' };

  if (user.monthlyResetDate) {
    const now = new Date();
    const daysSinceReset = Math.floor(
      (now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReset >= 30) {
      await prisma.tagCycle.create({
        data: {
          userId: user.id,
          cycleStart: user.monthlyResetDate,
          cycleEnd: now,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { reviewsUsed: 0, monthlyResetDate: now },
      });
      user.reviewsUsed = 0;
      user.monthlyResetDate = now;
    }
  } else {
    const now = new Date();
    await prisma.user.update({
      where: { id: user.id },
      data: { monthlyResetDate: now },
    });
    user.monthlyResetDate = now;
  }

  if (user.reviewsUsed >= user.reviewsLimit) {
    return { synced: 0, error: 'Monthly review sync limit reached' };
  }

  let syncedCount = 0;

  for (const location of user.businessLocations) {
    const response = await fetch(
      `https://mybusiness.googleapis.com/v4/${location.googleLocationId}/reviews`,
      { headers: { Authorization: `Bearer ${user.googleAccessToken}` } }
    );
    const data = await response.json();
    const reviews = data.reviews || [];

    for (const review of reviews) {
      if (user.reviewsUsed >= user.reviewsLimit) break;

      const existingReview = await prisma.review.findFirst({
        where: { googleReviewId: review.reviewId },
      });
      if (existingReview) continue;

      const rating = STAR_MAP[review.starRating] ?? 0;
      const comment = review.comment || '';
      const tags = autoTagReview(comment);

      const newReview = await prisma.review.create({
        data: {
          userId: user.id,
          businessLocationId: location.id,
          googleReviewId: review.reviewId,
          reviewerName: review.reviewer?.displayName || 'Anonymous',
          rating,
          comment,
          reviewReply: review.reviewReply?.comment || '',
          replied: !!review.reviewReply,
          reviewDate: new Date(review.createTime),
          syncedAt: new Date(),
          source: 'google',
          tags,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { reviewsUsed: { increment: 1 } },
      });
      user.reviewsUsed++;
      syncedCount++;

      // Low rating alert — shared 50/450-pool helper use karta hai
      if (newReview.rating <= 2 && user.gmailConnected) {
        await sendFromCriticalPool(
          user.id,
          '🔔 New Low Rating Review Alert',
          buildAlertEmail('Low Rating Alert', {
            reviewerName: newReview.reviewerName,
            rating: newReview.rating,
            comment: newReview.comment,
            reviewDate: newReview.reviewDate.toISOString(),
          })
        );
      }

      // ✅ Auto-Reply: Draft ya Auto mode ho to turant AI-reply generate karo
      if (!newReview.replied && user.autoReplyMode !== 'manual') {
        const aiResult = await generateAIReply(user.id, {
          reviewText: newReview.comment || '',
          reviewerName: newReview.reviewerName,
          rating: newReview.rating,
        });

        if (aiResult.success && aiResult.reply) {
          if (user.autoReplyMode === 'draft') {
            await prisma.review.update({
              where: { id: newReview.id },
              data: { reviewReply: aiResult.reply, replyStatus: 'pending_approval', aiReplied: true },
            });
          } else if (user.autoReplyMode === 'auto') {
            await prisma.review.update({
              where: { id: newReview.id },
              data: { aiReplied: true },
            });
            await postReplyToGoogle(newReview.id, aiResult.reply);
          }
        }
      }
    }
  }

  return { synced: syncedCount };
}
