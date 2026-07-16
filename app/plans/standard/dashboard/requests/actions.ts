'use server'

import nodemailer from 'nodemailer';

export async function sendReviewRequestEmail(email: string) {
  if (!email) {
    return { message: 'Email is required' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We value your feedback!',
      text: `Dear Customer,

We would love to hear about your experience with us. Please take a moment to share your feedback by leaving a review.

Thank you for your time!

Best regards,
ReviewMate Team`,
    });

    return { message: `Review request sent to ${email}` };
  } catch (error) {
    console.error('Email error:', error);
    return { message: 'Failed to send email. Please try again.' };
  }
}
