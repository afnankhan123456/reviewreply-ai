'use server'

import nodemailer from 'nodemailer';
import { getReviewRequestEmailTemplate } from '@/lib/emailTemplate';

export async function sendReviewRequestEmail(name: string, email: string, orderId: string) {
  if (!email || !name || !orderId) {
    return { message: 'Name, Email, and Order ID are required' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const reviewLink = `https://reviewreply-ai-pi.vercel.app/review?email=${email}`;
    const htmlContent = getReviewRequestEmailTemplate(name, orderId, reviewLink);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `We'd love your feedback, ${name}!`,
      html: htmlContent,
    });

    return { message: `Professional review request sent to ${email}` };
  } catch (error) {
    console.error('Email error:', error);
    return { message: 'Failed to send email. Please try again.' };
  }
}
