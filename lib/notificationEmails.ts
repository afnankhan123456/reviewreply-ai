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

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Jab auto-reply filter ko koi AI-generated reply suspicious lage (URL,
 * banned keyword, weird formatting, ya rate/pattern spike), to woh reply
 * auto-post nahi hoti — draft me fallback ho jaati hai aur owner ko yeh
 * email jaati hai taaki woh turant review kar sake.
 */
export function buildSuspiciousAutoReplyEmail(details: {
  reviewerName: string;
  reviewText: string;
  aiReply: string;
  reasons: string[];
}) {
  const reasonsList = details.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join('');
  return `
    <h2>🚩 An AI reply was blocked before auto-posting</h2>
    <p>One of your reviews got an AI-generated reply that looked suspicious, so we <strong>did not post it automatically</strong>. It's saved as a draft in your dashboard, waiting for your approval.</p>
    <p><strong>Reviewer:</strong> ${escapeHtml(details.reviewerName || 'Unknown')}</p>
    <p><strong>Review:</strong><br/>${escapeHtml(details.reviewText || '(no text)')}</p>
    <p><strong>Draft reply that was blocked:</strong><br/>${escapeHtml(details.aiReply || '')}</p>
    <p><strong>Why it was flagged:</strong></p>
    <ul>${reasonsList}</ul>
    <p>Please log in to your dashboard to review, edit, or approve this reply.</p>
  `;
}

/**
 * Suspicious auto-reply alert — yeh security-critical hai isliye normal
 * alert/critical email quota se bypass karke turant bhejta hai (sirf
 * gmailConnected check karta hai). Failure silently ignore ho jaati hai
 * taaki cron job block na ho.
 */
export async function sendSuspiciousReplyAlert(
  userId: string,
  details: { reviewerName: string; reviewText: string; aiReply: string; reasons: string[] }
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { sent: false, reason: 'User not found' };
  if (!user.gmailConnected) return { sent: false, reason: 'Gmail not connected' };

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: '🚩 Action needed: an AI reply was blocked before posting',
      html: buildSuspiciousAutoReplyEmail(details),
    });
    return { sent: true };
  } catch (error) {
    console.error('Failed to send suspicious-reply alert to', user.email, error);
    return { sent: false, reason: 'Email send failed' };
  }
}
