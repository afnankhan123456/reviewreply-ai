'use server'

import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function sendReviewRequestEmail(name: string, email: string) {
  if (!email || !name) {
    return { message: 'Name and Email are required' };
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { message: 'User not authenticated' };
    }

    // Team member ho to Owner ka data use hoga; View Only ko email bhejne nahi denge
    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { message: 'You have view-only access and cannot send review requests.' };
    }

    // Owner ka googlePlaceId fetch karo
    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { googlePlaceId: true },
    });

    let reviewLink = '';
    if (user?.googlePlaceId) {
      reviewLink = `https://search.google.com/local/writereview?placeid=${user.googlePlaceId}`;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const message = `
      Dear ${name},
      We value your feedback! If you'd like to share your experience with us, please leave a review.
      ${reviewLink ? `Please leave a review here: ${reviewLink}` : 'Please review us on Google.'}
      Thank you for your time!
      Best regards,
      ReviewMate Team
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: `We'd love your feedback, ${name}!`,
      text: message,
    });

    return { message: `Review request sent to ${email}` };
  } catch (error) {
    console.error('Email error:', error);
    return { message: 'Failed to send email. Please try again.' };
  }
}

export async function getWhatsAppShareLink(name: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'User not authenticated' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot send review requests.' };
    }

    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { googlePlaceId: true },
    });

    let reviewLink = '';
    if (user?.googlePlaceId) {
      reviewLink = `https://search.google.com/local/writereview?placeid=${user.googlePlaceId}`;
    }

    const customerName = name?.trim() || 'there';
    const text = reviewLink
      ? `Hi ${customerName}! We value your feedback. Please leave a review here: ${reviewLink}`
      : `Hi ${customerName}! We value your feedback. Please review us on Google.`;

    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    return { success: true, whatsappUrl };
  } catch (error) {
    console.error('WhatsApp link error:', error);
    return { error: 'Failed to generate WhatsApp link' };
  }
}
