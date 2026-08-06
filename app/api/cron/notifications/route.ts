import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  sendFromCriticalPool,
  buildWeeklyReportEmail,
  buildExpiryWarningEmail,
} from '@/lib/notificationEmails';

export async function GET(req: Request) {
  // Fail-safe: is route ka apna dedicated secret — sirf isi route ke liye valid.
  const authHeader = req.headers.get('authorization');
  if (!process.env.CRON_SECRET_NOTIFICATIONS || authHeader !== `Bearer ${process.env.CRON_SECRET_NOTIFICATIONS}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const isMonday = now.getDay() === 1; // 0=Sunday, 1=Monday
  const results: any[] = [];

  const users = await prisma.user.findMany({
    where: { gmailConnected: true },
    select: {
      id: true,
      email: true,
      plan: true,
      subscriptionEnd: true,
      lastWeeklyReportSent: true,
      lastExpiryNotified: true,
    },
  });

  for (const user of users) {
    if (isMonday) {
      const alreadySentThisWeek =
        user.lastWeeklyReportSent &&
        now.getTime() - new Date(user.lastWeeklyReportSent).getTime() < 6 * 24 * 60 * 60 * 1000;

      if (!alreadySentThisWeek) {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weekReviews = await prisma.review.findMany({
          where: { userId: user.id, createdAt: { gte: sevenDaysAgo } },
          select: { rating: true, replied: true },
        });

        const totalReviews = weekReviews.length;
        const avgRating =
          totalReviews > 0
            ? Number((weekReviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1))
            : 0;
        const responseRate =
          totalReviews > 0
            ? Math.round((weekReviews.filter((r) => r.replied).length / totalReviews) * 100)
            : 0;

        const result = await sendFromCriticalPool(
          user.id,
          '📊 Your Weekly Review Report',
          buildWeeklyReportEmail({ totalReviews, avgRating, responseRate })
        );

        if (result.sent) {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastWeeklyReportSent: now },
          });
        }
        results.push({ email: user.email, type: 'weekly-report', ...result });
      }
    }

    if (user.subscriptionEnd) {
      const daysLeft = Math.ceil(
        (new Date(user.subscriptionEnd).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      const alreadyNotifiedRecently =
        user.lastExpiryNotified &&
        now.getTime() - new Date(user.lastExpiryNotified).getTime() < 25 * 24 * 60 * 60 * 1000;

      if (daysLeft > 0 && daysLeft <= 5 && !alreadyNotifiedRecently) {
        const result = await sendFromCriticalPool(
          user.id,
          '⚠️ Your Plan is Expiring Soon',
          buildExpiryWarningEmail(daysLeft, user.plan || 'Basic')
        );

        if (result.sent) {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastExpiryNotified: now },
          });
        }
        results.push({ email: user.email, type: 'plan-expiry', daysLeft, ...result });
      }
    }
  }

  return NextResponse.json({ success: true, checked: users.length, results });
}
