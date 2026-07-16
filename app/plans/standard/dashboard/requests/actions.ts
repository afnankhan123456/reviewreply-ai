'use server'

import nodemailer from 'nodemailer';

export async function sendReviewRequestEmail(name: string, email: string) {
  if (!email || !name) {
    return { message: 'Name and Email are required' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const personalizedMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #4F46E5;">We value your feedback, ${name}!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for choosing us! We would love to hear about your experience with us.</p>
        <p>Please take a moment to share your valuable feedback by leaving a review.</p>
        <p style="margin-top: 20px;">
          <a href="https://reviewreply-ai-pi.vercel.app/review" 
             style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Leave a Review
          </a>
        </p>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          Thank you for your time!<br>
          Best regards,<br>
          <strong>ReviewMate Team</strong>
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Review Request for ${name}`,
      html: personalizedMessage,
    });

    return { message: `Personalized review request sent to ${email}` };
  } catch (error) {
    console.error('Email error:', error);
    return { message: 'Failed to send email. Please try again.' };
  }
}
