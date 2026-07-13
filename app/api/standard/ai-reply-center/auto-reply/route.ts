import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ Auto Reply Logic (Triggers every hour via Vercel Cron)
export async function GET() {
  try {
    console.log('🚀 Auto-Reply Triggered...');

    // 1. Fetch first 5 Unanswered reviews (replied = false)
    const unansweredReviews = await prisma.review.findMany({
      where: { replied: false },
      take: 5, // Test mode: sirf 5 reviews process honge
      orderBy: { createdAt: 'asc' },
    });

    if (unansweredReviews.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No unanswered reviews found.',
        processed: 0,
      });
    }

    console.log(`✅ Found ${unansweredReviews.length} unanswered reviews`);

    // 2. For each review, generate AI reply
    const updatedReviews = [];
    for (const review of unansweredReviews) {
      try {
        // AI API Call (OpenRouter)
        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that writes professional, empathetic replies for customer reviews.',
              },
              {
                role: 'user',
                content: `Write a professional reply for this review: "${review.comment || review.text}"`,
              },
            ],
          }),
        });

        const data = await aiResponse.json();
        const replyText = data.choices?.[0]?.message?.content || 'Thank you for your feedback!';

        // 3. Save reply to database
        await prisma.review.update({
          where: { id: review.id },
          data: {
            reviewReply: replyText,
            replied: true,
            aiReplied: true, // ✅ AI reply flag (manual reply se alag)
          },
        });

        updatedReviews.push({ id: review.id, reply: replyText });
        console.log(`✅ Reply sent to review ID: ${review.id}`);
      } catch (error) {
        console.error(`❌ Error replying to review ${review.id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Auto-replied to ${updatedReviews.length} reviews.`,
      processed: updatedReviews.length,
      reviews: updatedReviews,
    });
  } catch (error) {
    console.error('Auto-Reply Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
