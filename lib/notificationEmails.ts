import { prisma } from './prisma';
import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * Har user ke 50 (ya basic ke liye 0/shared) wale reserved-critical-pool se
 * ek email bhejta hai — reset-check, quota-check, sending, aur count-increment
 * sab isi function ke andar hota hai. syncReviews.ts (low-rating alert) aur
 * naye weekly-report / plan-expiry dono isi function ko use karte hain.
 */
export async function sendFromCriticalPool(userId: string, subject: string, html: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { sent: false, reason: 'User not found' };
  if (!user.gmailConnected) return { sent: false, reason: 'Gmail not connected' };

  const isStandard = user.plan?.startsWith('standard');
  const now = new Date();

  let alertEmailsSent = user.alertEmailsSent ?? 0;
  let criticalEmailsSent = user.criticalEmailsSent ?? 0;

  // Monthly reset check (same 30-din rolling cycle jo syncReviews.ts use karta hai)
  if (user.alertMonthlyReset) {
    const daysSinceReset = Math.floor(
      (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReset >= 30) {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertEmailsSent: 0, criticalEmailsSent: 0, alertMonthlyReset: now },
      });
      alertEmailsSent = 0;
      criticalEmailsSent = 0;
    }
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: { alertMonthlyReset: now },
    });
  }

  const count = isStandard ? criticalEmailsSent : alertEmailsSent;
  const limit = isStandard ? (user.criticalEmailsLimit ?? 50) : (user.alertEmailsLimit ?? 100);

  if (count >= limit) {
    return { sent: false, reason: 'Quota exhausted' };
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject,
      html,
    });

    if (isStandard) {
      await prisma.user.update({
        where: { id: user.id },
        data: { criticalEmailsSent: { increment: 1 } },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertEmailsSent: { increment: 1 } },
      });
    }

    return { sent: true };
  } catch (error) {
    console.error('Failed to send pooled email to', user.email, error);
    return { sent: false, reason: 'Email send failed' };
  }
}

export function buildWeeklyReportEmail(stats: {
  totalReviews: number;
  avgRating: number;
  responseRate: number;
}) {
  return `
    <h2>📊 Your Weekly Review Report</h2>
    <p><strong>New Reviews This Week:</strong> ${stats.totalReviews}</p>
    <p><strong>Average Rating:</strong> ${stats.avgRating} ⭐</p>
    <p><strong>Response Rate:</strong> ${stats.responseRate}%</p>
    <p>Log in to your dashboard to see the full breakdown.</p>
  `;
}

export function buildExpiryWarningEmail(daysLeft: number, planName: string) {
  return `
    <h2>⚠️ Your Plan is Expiring Soon</h2>
    <p>Your <strong>${planName}</strong> plan will expire in <strong>${daysLeft} day(s)</strong>.</p>
    <p>Please renew your subscription to avoid interruption in review syncing, alerts, and reports.</p>
  `;
}
