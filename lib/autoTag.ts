type TagRule = {
  tag: string;
  keywords: string[];
};

const TAG_RULES: TagRule[] = [
  {
    tag: 'Delivery',
    keywords: ['late', 'delivery', 'delayed', 'not delivered', 'order aaya nahi', 'slow delivery', 'never arrived', 'shipping', 'courier'],
  },
  {
    tag: 'Staff Behavior',
    keywords: ['rude', 'staff', 'behavior', 'behaviour', 'misbehave', 'unprofessional', 'attitude', 'impolite', 'disrespect'],
  },
  {
    tag: 'Food Quality',
    keywords: ['taste', 'tasteless', 'stale', 'cold food', 'quality', 'undercooked', 'overcooked', 'bland', 'spoiled', 'fresh'],
  },
  {
    tag: 'Pricing',
    keywords: ['expensive', 'overpriced', 'price', 'costly', 'cheap', 'value for money', 'affordable', 'rip off', 'ripoff'],
  },
  {
    tag: 'Cleanliness',
    keywords: ['dirty', 'clean', 'hygiene', 'unclean', 'smell', 'unhygienic', 'filthy', 'messy'],
  },
  {
    tag: 'Refund Issue',
    keywords: ['refund', 'money back', 'chargeback', 'reimburse', 'return policy', 'no refund'],
  },
  {
    tag: 'Great Experience',
    keywords: ['amazing', 'excellent', 'best', 'awesome', 'loved it', 'fantastic', 'wonderful', 'great service', 'highly recommend', 'perfect'],
  },
  {
    tag: 'Wait Time',
    keywords: ['waiting', 'wait time', 'long queue', 'took forever', 'too long', 'slow service'],
  },
  {
    tag: 'Packaging',
    keywords: ['packaging', 'packed', 'box damaged', 'broken package', 'wrapping'],
  },
  {
    tag: 'Communication',
    keywords: ['no response', 'ignored', 'unresponsive', 'didn\'t reply', 'no update', 'poor communication'],
  },
  {
    tag: 'Product Quality',
    keywords: ['defective', 'broken', 'damaged', 'faulty', 'not working', 'poor quality', 'durable'],
  },
  {
    tag: 'Ambience',
    keywords: ['ambience', 'ambiance', 'atmosphere', 'decor', 'vibe', 'noisy', 'cozy'],
  },
];

export function autoTagReview(comment: string | null | undefined): string[] {
  if (!comment) return [];
  const text = comment.toLowerCase();
  const matchedTags: string[] = [];

  for (const rule of TAG_RULES) {
    const isMatch = rule.keywords.some((keyword) => text.includes(keyword.toLowerCase()));
    if (isMatch) {
      matchedTags.push(rule.tag);
    }
  }

  return matchedTags;
}

export function getAllPossibleTags(): string[] {
  return TAG_RULES.map((r) => r.tag);
}
