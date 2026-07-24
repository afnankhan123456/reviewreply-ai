import { prisma } from './prisma';

const SYSTEM_PROMPT = `You are replying to a customer review on behalf of a real small business owner. Write like an actual human business owner would — warm, genuine, and specific to what the customer said.

Rules:
- Detect the language the review is written in, and reply in that SAME language. Never translate or switch languages.
- Sound like a real person, not an AI or customer-support bot. Avoid stiff, generic, or robotic phrases like "Thank you for your valuable feedback" or "We appreciate your business."
- Reference something specific from the review naturally (e.g. mention what they liked or the issue they raised), don't just give a generic template response.
- Keep it concise — 2-4 sentences, conversational tone.
- If the review is negative, be genuinely apologetic and specific about making it right, not defensive or scripted.
- Never mention that you are an AI, a bot, or a template.
- Vary your phrasing — don't repeat the same opening line every time.`;

interface GenerateOptions {
  reviewText?: string;
  reviewerName?: string;
  rating?: number;
  template?: string;
}

export async function generateAIReply(ownerId: string, options: GenerateOptions) {
  const user = await prisma.user.findUnique({ where: { id: ownerId } });
  if (!user) return { success: false, error: 'User not found' };

  const now = new Date();

  // Monthly quota reset — same 30-din rolling cycle jo reviews-sync use karta hai
  let aiRepliesUsed = user.aiRepliesUsed ?? 0;
  if (user.monthlyResetDate) {
    const daysSinceReset = Math.floor(
      (now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceReset >= 30) {
      await prisma.user.update({ where: { id: user.id }, data: { aiRepliesUsed: 0 } });
      aiRepliesUsed = 0;
    }
  }

  const aiRepliesLimit = user.aiRepliesLimit ?? 500;
  if (aiRepliesUsed >= aiRepliesLimit) {
    return { success: false, error: `Monthly AI reply limit (${aiRepliesLimit}) reached.` };
  }

  // Cycle khatam hone me kitna time bacha hai (last-24-hours exception ke liye)
  const cycleStart = user.monthlyResetDate ? new Date(user.monthlyResetDate) : now;
  const cycleEnd = new Date(cycleStart.getTime() + 30 * 24 * 60 * 60 * 1000);
  const hoursLeftInCycle = (cycleEnd.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isLastDayOfCycle = hoursLeftInCycle <= 24;

  // Hourly throttle (max 20/hour) — sirf tab jab last-day-exception na lage
  if (!isLastDayOfCycle) {
    let hourCount = user.aiRepliesHourCount ?? 0;
    const hourReset = user.aiRepliesHourReset ? new Date(user.aiRepliesHourReset) : null;
    const hourElapsed = hourReset ? (now.getTime() - hourReset.getTime()) / (1000 * 60 * 60) : 999;

    if (!hourReset || hourElapsed >= 1) {
      hourCount = 0;
      await prisma.user.update({
        where: { id: user.id },
        data: { aiRepliesHourCount: 0, aiRepliesHourReset: now },
      });
    }

    if (hourCount >= 20) {
      return { success: false, error: 'Hourly AI reply limit (20) reached. Please try again later.' };
    }
  }

  const { reviewText, reviewerName, rating, template } = options;

  const reviewContext = reviewText
    ? `Customer review (respond in the SAME language this review is written in):\n"${reviewText}"\n${reviewerName ? `Reviewer name: ${reviewerName}\n` : ''}${rating ? `Rating: ${rating} stars\n` : ''}`
    : 'No specific review text was provided — write a general, warm reply.';

  const userPrompt = `${reviewContext}${template ? `\nOptional style guidance from the business owner: ${template}` : ''}\n\nWrite the reply now.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, unable to generate reply at this time.';

    await prisma.user.update({
      where: { id: user.id },
      data: {
        aiRepliesUsed: { increment: 1 },
        ...(isLastDayOfCycle ? {} : { aiRepliesHourCount: { increment: 1 } }),
      },
    });

    return { success: true, reply, remaining: aiRepliesLimit - (aiRepliesUsed + 1) };
  } catch (error) {
    console.error('generateAIReply error:', error);
    return { success: false, error: 'Failed to generate reply' };
  }
}
