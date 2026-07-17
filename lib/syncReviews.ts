import { prisma } from './prisma';
import nodemailer from 'nodemailer';

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
  if (!user.googleAccessToken) return { synced: 0, error: 'No Google access token' };
  if (!user.businessLocations.length) return { synced: 0, error: 'No business location connected' };

  // Monthly review-sync limit reset
  if (user.monthlyResetDate) {
    const now = new Date();
    const daysSinceReset = Math.floor(
      (now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReset >= 30) {
      await prisma.user.update({
        where: { id: user.id },
        data: { reviewsUsed: 0, monthlyResetDate: now },
      });
      user.reviewsUsed = 0;
      user.monthlyResetDate = now;
    }
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

      const newReview = await prisma.review.create({
        data: {
          userId: user.id,
          businessLocationId: location.id,
          googleReviewId: review.reviewId,
          reviewerName: review.reviewer?.displayName || 'Anonymous',
          rating,
          comment: review.comment || '',
          reviewReply: review.reviewReply?.comment || '',
          replied: !!review.reviewReply,
          reviewDate: new Date(review.createTime),
          syncedAt: new Date(),
          source: 'google',
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { reviewsUsed: { increment: 1 } },
      });
      user.reviewsUsed++;
      syncedCount++;

    // Low rating alert
      if (newReview.rating <= 2 && user.gmailConnected) {
        const isStandard = user.plan?.startsWith('standard');
        const now = new Date();

        // Monthly reset (dono counters ek sath reset hote hain)
        if (user.alertMonthlyReset) {
          const daysSinceAlertReset = Math.floor(
            (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSinceAlertReset >= 30) {
            await prisma.user.update({
              where: { id: user.id },
              data: { alertEmailsSent: 0, criticalEmailsSent: 0, alertMonthlyReset: now },
            });
            user.alertEmailsSent = 0;
            user.criticalEmailsSent = 0;
            user.alertMonthlyReset = now;
          }
        } else {
          await prisma.user.update({
            where: { id: user.id },
            data: { alertMonthlyReset: now },
          });
          user.alertMonthlyReset = now;
        }

        // Standard: reserved 50-pool se count. Basic: shared 100-pool se count.
        const count = isStandard ? (user.criticalEmailsSent ?? 0) : (user.alertEmailsSent ?? 0);
        const limit = isStandard ? (user.criticalEmailsLimit ?? 50) : (user.alertEmailsLimit ?? 100);

        if (count < limit) {
          try {
            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
              },
            });

            await transporter.sendMail({
              from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
              to: user.email,
              subject: '🔔 New Low Rating Review Alert',
              html: buildAlertEmail('Low Rating Alert', {
                reviewerName: newReview.reviewerName,
                rating: newReview.rating,
                comment: newReview.comment,
                reviewDate: newReview.reviewDate.toISOString(),
              }),
            });

            if (isStandard) {
              await prisma.user.update({
                where: { id: user.id },
                data: { criticalEmailsSent: { increment: 1 } },
              });
              user.criticalEmailsSent = (user.criticalEmailsSent ?? 0) + 1;
            } else {
              await prisma.user.update({
                where: { id: user.id },
                data: { alertEmailsSent: { increment: 1 } },
              });
              user.alertEmailsSent = (user.alertEmailsSent ?? 0) + 1;
            }
          } catch (emailError) {
            console.error('Failed to send alert email for user', user.email, emailError);
          }
        }
      }
