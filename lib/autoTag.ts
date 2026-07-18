type TagRule = {
  tag: string;
  keywords: string[];
};

const TAG_RULES: TagRule[] = [
  { tag: 'Delivery', keywords: ['late', 'delivery', 'delayed', 'not delivered', 'order aaya nahi'] },
  { tag: 'Staff Behavior', keywords: ['rude', 'staff', 'behavior', 'misbehave', 'unprofessional'] },
  { tag: 'Food Quality', keywords: ['taste', 'stale', 'cold food', 'quality', 'undercooked', 'overcooked'] },
  { tag: 'Pricing', keywords: ['expensive', 'overpriced', 'price', 'costly', 'cheap'] },
  { tag: 'Cleanliness', keywords: ['dirty', 'clean', 'hygiene', 'unclean', 'smell'] },
  { tag: 'Refund Issue', keywords: ['refund', 'money back', 'chargeback'] },
  { tag: 'Great Experience', keywords: ['amazing', 'excellent', 'best', 'awesome', 'loved it'] },
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
