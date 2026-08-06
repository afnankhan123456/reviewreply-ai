import { prisma } from './prisma';

/**
 * Auto-post se pehle AI-generated reply ko yahan se check karte hain.
 * Teen tarah ke content checks: banned keywords, URLs/links, weird formatting.
 * Plus rate/pattern detection (bahut zyada replies ek saath, ya same reply
 * baar baar) — sab reuse hone ke liye ek jagah rakha hai.
 */

export interface FilterResult {
  suspicious: boolean;
  reasons: string[];
}

// Prompt-injection leakage, spam/promo aur unsafe content ke tell-tale words
const BANNED_KEYWORDS: string[] = [
  // possible prompt-injection / system-prompt leakage
  'ignore previous instructions',
  'ignore all previous instructions',
  'disregard previous instructions',
  'system prompt',
  'you are an ai',
  'as an ai language model',
  'i am an ai',
  'act as',
  'jailbreak',
  'new instructions',
  // spam / scam-ish content that should never appear in a public reply
  'click here',
  'free money',
  'crypto',
  'bitcoin',
  'whatsapp me at',
  'call me at',
  'discount code',
  'promo code',
  'coupon code',
  'limited time offer',
  'visit our website',
  'dm me',
  // profanity placeholders — apne market ke hisaab se extend karo
  'fuck',
  'chutiya',
  'madarchod',
  'bhosdi',
];

// URL / link detection — auto-posted public replies me links allow nahi karte
const URL_REGEX = /(https?:\/\/|www\.)[^\s]+/i;

// Phone number jaisa pattern (7+ consecutive digits, spaces/dashes allowed)
const PHONE_REGEX = /(\+?\d[\d\s-]{7,}\d)/;

// HTML/script tags — reply plain text hona chahiye
const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*?>/i;

function hasBannedKeyword(text: string): string | null {
  const lower = text.toLowerCase();
  for (const keyword of BANNED_KEYWORDS) {
    if (lower.includes(keyword)) return keyword;
  }
  return null;
}

function hasWeirdFormatting(text: string): string | null {
  if (HTML_TAG_REGEX.test(text)) return 'Contains HTML/script tags';

  // Excessive caps (shouting) — sirf tab flag karo jab reply lamba ho, chhote
  // acronyms (jaise "ASAP") ko false-positive na maare
  if (text.length > 20) {
    const letters = text.replace(/[^a-zA-Z]/g, '');
    const caps = text.replace(/[^A-Z]/g, '');
    if (letters.length > 15 && caps.length / letters.length > 0.6) {
      return 'Excessive uppercase (looks like shouting)';
    }
  }

  // Same character/emoji 6+ baar repeat (spammy formatting)
  if (/(.)\1{5,}/u.test(text)) {
    return 'Excessive repeated characters';
  }

  // Control characters / non-printable junk
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(text)) {
    return 'Contains control/non-printable characters';
  }

  return null;
}

/**
 * Ek AI-generated reply ko content ke basis par check karta hai.
 * Auto-post se pehle route.ts isko call karega.
 */
export function filterReply(replyText: string): FilterResult {
  const reasons: string[] = [];

  if (!replyText || !replyText.trim()) {
    reasons.push('Empty reply');
    return { suspicious: true, reasons };
  }

  if (URL_REGEX.test(replyText)) reasons.push('Contains a URL/link');
  if (PHONE_REGEX.test(replyText)) reasons.push('Contains a phone-number-like sequence');

  const keyword = hasBannedKeyword(replyText);
  if (keyword) reasons.push(`Banned keyword/phrase detected: "${keyword}"`);

  const formatIssue = hasWeirdFormatting(replyText);
  if (formatIssue) reasons.push(formatIssue);

  if (replyText.length > 900) reasons.push('Reply unusually long');

  return { suspicious: reasons.length > 0, reasons };
}

/**
 * Rate detection — ek user ke liye ek chhote window me kitne auto-replies
 * post ho chuke hain. Bahut zyada rate (e.g. bug ya loop) ko suspicious maano.
 */
export async function checkAutoReplyRate(
  userId: string,
  windowMinutes = 60,
  maxAllowed = 15
): Promise<FilterResult> {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);

  const recentCount = await prisma.review.count({
    where: {
      userId,
      aiReplied: true,
      replyStatus: 'posted',
      repliedAt: { gte: since },
    },
  });

  if (recentCount >= maxAllowed) {
    return {
      suspicious: true,
      reasons: [`Rate limit tripped: ${recentCount} auto-replies posted in the last ${windowMinutes} minutes`],
    };
  }

  return { suspicious: false, reasons: [] };
}

/**
 * Pattern detection — agar last N posted replies me se kaafi saari
 * (near-)identical hain, to yeh ek stuck loop ya bot-jaisa pattern ho sakta hai.
 */
export async function checkRepeatedPattern(
  userId: string,
  candidateReply: string,
  lookback = 5,
  duplicateThreshold = 3
): Promise<FilterResult> {
  const recent = await prisma.review.findMany({
    where: { userId, aiReplied: true, replyStatus: 'posted' },
    orderBy: { repliedAt: 'desc' },
    take: lookback,
    select: { reviewReply: true },
  });

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  const target = normalize(candidateReply);

  const duplicates = recent.filter((r) => r.reviewReply && normalize(r.reviewReply) === target).length;

  if (duplicates >= duplicateThreshold) {
    return {
      suspicious: true,
      reasons: [`Near-identical reply repeated ${duplicates} times in the last ${lookback} auto-posts`],
    };
  }

  return { suspicious: false, reasons: [] };
}
