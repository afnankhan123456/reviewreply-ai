import { prisma } from './prisma';

export async function postReplyToGoogle(reviewId: string, replyText: string) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: { businessLocation: true, user: true },
  });

  if (!review) {
    return { success: false, error: 'Review not found' };
  }

  if (review.source !== 'google' || !review.googleReviewId) {
    await prisma.review.update({
      where: { id: reviewId },
      data: { reviewReply: replyText, replied: true, replyStatus: 'posted', repliedAt: new Date() },
    });
    return { success: true };
  }

  if (!review.businessLocation) {
    return { success: false, error: 'No business location linked to this review' };
  }

  const user = review.user;
  if (!user.googleAccessToken) {
    return { success: false, error: 'Google account not connected for this user' };
  }

  try {
    const accountsResponse = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      { headers: { Authorization: `Bearer ${user.googleAccessToken}` } }
    );
    const accountsData = await accountsResponse.json();
    const accountName = accountsData.accounts?.[0]?.name;

    if (!accountName) {
      return { success: false, error: 'No Google Business account found' };
    }

    const locationPath = review.businessLocation.googleLocationId;
    const replyUrl = `https://mybusiness.googleapis.com/v4/${accountName}/${locationPath}/reviews/${review.googleReviewId}/reply`;

    const replyResponse = await fetch(replyUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.googleAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: replyText }),
    });

    if (!replyResponse.ok) {
      const errText = await replyResponse.text();
      console.error('Google reply post failed:', errText);
      return { success: false, error: 'Failed to post reply to Google' };
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: { reviewReply: replyText, replied: true, replyStatus: 'posted', repliedAt: new Date() },
    });

    return { success: true };
  } catch (error) {
    console.error('postReplyToGoogle error:', error);
    return { success: false, error: 'Failed to post reply to Google' };
  }
}
