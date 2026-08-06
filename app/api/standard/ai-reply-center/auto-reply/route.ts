import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAIReply } from '@/lib/aiReply';
import { postReplyToGoogle } from '@/lib/googlePostReply';

export async function GET(req: Request) {
  // Fail-safe: is route ka apna dedicated secret — sirf isi route ke liye valid.
  const authHeader = req.headers.get('authorization');
  if (!process.env.CRON_SECRET_AUTO_REPLY || authHeader !== `Bearer ${process.env.CRON_SECRET_AUTO_REPLY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        autoReplyMode: { in: ['draft', 'auto'] },
        OR: [{ subscriptionEnd: null }, { subscriptionEnd: { gt: new Date() } }],
      },
      select: { id: true, autoReplyMode: true, email: true },
    });

    const results: any[] = [];

    for (const user of users) {
      const unansweredReviews = await prisma.review.findMany({
        where: { userId: user.id, replied: false, replyStatus: 'none' },
        take: 10,
        orderBy: { createdAt: 'asc' },
      });

      for (const review of unansweredReviews) {
        const aiResult = await generateAIReply(user.id, {
          reviewText: review.comment || review.text || '',
          reviewerName: review.reviewerName,
          rating: review.rating,
        });

        if (!aiResult.success) {
          results.push({ email: user.email, reviewId: review.id, sent: false, reason: aiResult.error });
          continue;
        }

        if (user.autoReplyMode === 'draft') {
          await prisma.review.update({
            where: { id: review.id },
            data: { reviewReply: aiResult.reply, replyStatus: 'pending_approval', aiReplied: true },
          });
          results.push({ email: user.email, reviewId: review.id, mode: 'draft', sent: true });
        } else if (user.autoReplyMode === 'auto') {
          await prisma.review.update({
            where: { id: review.id },
            data: { aiReplied: true },
          });
          const postResult = await postReplyToGoogle(review.id, aiResult.reply!);
          results.push({
            email: user.email,
            reviewId: review.id,
            mode: 'auto',
            posted: postResult.success,
            error: postResult.error,
          });
        }
      }
    }

    return NextResponse.json({ success: true, usersProcessed: users.length, results });
  } catch (error) {
    console.error('Auto-Reply Cron Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
