import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Review Reply Tool — Common Questions Answered',
  description:
    'Straight answers to the questions businesses ask most often about Google review reply tools — setup, AI accuracy, cost, safety, and what to expect day to day.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/google-review-reply-tool-faq',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

const faqs = [
  {
    q: 'What does a Google review reply tool actually do?',
    a: 'It connects to your Google Business Profile, automatically syncs incoming reviews, and helps you respond to them — usually by generating an AI-drafted reply you can edit and approve, rather than writing every response from scratch.',
  },
  {
    q: 'Is it safe to connect my Google Business Profile to a third-party tool?',
    a: 'A properly built tool uses Google\u2019s official Business Profile API with permission-based access, the same kind of connection used by scheduling, review, and marketing tools generally. You grant access, and you can revoke it at any time from your Google account.',
  },
  {
    q: 'Do AI-generated replies actually sound natural?',
    a: 'It depends on whether the tool is context-aware. A generic template that swaps in a name reads as robotic. A tool that reads the review\u2019s actual content and sentiment before drafting a reply produces something that references specifics — which is what makes a reply feel genuine.',
  },
  {
    q: 'Can I edit a reply before it gets published?',
    a: 'Yes, with any reasonably built tool. The AI draft is a starting point, not a final answer — you read it, adjust anything that doesn\u2019t sound right, and approve it before it goes live on your profile.',
  },
  {
    q: 'What happens to reviews I received before setting up the tool?',
    a: 'Tools that sync your full review history will pull in older, unanswered reviews as well as new ones — so you can clear a backlog instead of only handling reviews that arrive going forward.',
  },
  {
    q: 'Will using an AI tool get my Google Business Profile penalized?',
    a: 'No, as long as replies are genuine responses to real reviews and the profile itself follows Google\u2019s guidelines. What gets profiles penalized is fake reviews, incentivized reviews, or review-gating — not the act of using a tool to help write replies faster.',
  },
  {
    q: 'How much does a tool like this typically cost?',
    a: 'Focused, Google-only tools built for small businesses are usually priced in the single-digit to low double-digit dollars per month range on longer billing cycles. Broader reputation suites aimed at enterprises typically cost significantly more and often involve custom quotes.',
  },
  {
    q: 'Can it handle more than one business location?',
    a: 'Depends on the plan and tool. Many tools offer single-location plans for small businesses and separate tiers for multi-location management with a unified dashboard across profiles.',
  },
  {
    q: 'Does replying to reviews actually help my business get found more?',
    a: 'Google has said that engagement on a Business Profile — including replying to reviews — is one of several signals that can influence local search visibility. It works alongside other factors like relevance and distance, rather than replacing them.',
  },
  {
    q: 'What should I check before choosing a tool?',
    a: 'Whether it connects directly to Google Business Profile (not manual entry), whether replies are context-aware rather than templated, whether it flags negative reviews specifically, and whether the pricing is transparent enough to try without a long-term commitment.',
  },
];

export default function GoogleReviewReplyToolFAQArticle() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">FAQ</div>
        <h1>Google Review Reply Tool — Common Questions Answered</h1>
        <p className="dek">
          The questions businesses ask most often before adopting a Google review reply tool
          &mdash; setup, safety, cost, and what day-to-day use actually looks like.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>6 min read</span>
        </div>
        <QuestionMarkIllustration />
      </header>

      <section className="section faq">
        {faqs.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>

      <section className="section cta">
        <h2>Still have a question?</h2>
        <p>
          Connect your Google Business Profile to ReviewReply AI and see how it handles your own
          reviews — most of these answers are easier to trust once you see it firsthand.
        </p>
        <a className="cta-button" href="https://www.reviewreply-ai.in/">
          Get started
        </a>
      </section>

      <style>{`
        .article { max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.7; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 600; margin-bottom: 0.75rem; }
        h1 { font-size: 2.15rem; line-height: 1.2; margin: 0 0 1rem; font-weight: 700; color: #14213d; letter-spacing: -0.01em; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.06rem; color: #454e63; line-height: 1.6; margin: 0 0 1.25rem; }
        .meta { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.85rem; color: #8a8370; display: flex; gap: 0.5rem; align-items: center; margin-bottom: 2rem; }
        .dot { opacity: 0.5; }
        .section { margin: 2.75rem 0; }
        h2 { font-size: 1.4rem; color: #14213d; margin: 0 0 1rem; font-weight: 700; letter-spacing: -0.01em; }
        p { font-size: 1.03rem; margin: 0 0 1.1rem; }
        .faq details { border-bottom: 1px solid #e4dfd3; padding: 1.15rem 0; }
        .faq summary { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; font-size: 1.04rem; cursor: pointer; color: #14213d; }
        .faq p { margin-top: 0.75rem; font-size: 0.98rem; color: #3a4257; }
        .cta { text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta-button { display: inline-block; margin-top: 0.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.98rem; }
        @media (max-width: 640px) { h1 { font-size: 1.7rem; } }
      `}</style>
    </article>
  );
}

/** Illustration: a review bubble with a question mark resolving into a checkmark reply */
function QuestionMarkIllustration() {
  return (
    <svg
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Illustration of common questions being resolved into clear answers"
    >
      <rect x="0" y="0" width="680" height="180" rx="16" fill="#f1ede2" />

      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${80 + i * 60}, ${40 + (i % 2) * 10})`}>
          <circle r="26" fill="#fbf9f4" stroke="#c9c2ad" strokeWidth="2" opacity={1 - i * 0.15} />
          <text
            y="8"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="#8a8370"
            fontFamily="-apple-system, sans-serif"
          >
            ?
          </text>
        </g>
      ))}

      <path d="M300 90 L360 90" stroke="#8a8370" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow4)" />
      <defs>
        <marker id="arrow4" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8a8370" />
        </marker>
      </defs>

      <circle cx="420" cy="90" r="34" fill="#1f7a6c" />
      <path
        d="M406 90 L416 100 L436 78"
        stroke="#fbf9f4"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="500"
        y="80"
        fontSize="13"
        fontFamily="-apple-system, sans-serif"
        fontWeight="700"
        fill="#14213d"
      >
        Clear answers,
      </text>
      <text
        x="500"
        y="100"
        fontSize="13"
        fontFamily="-apple-system, sans-serif"
        fontWeight="700"
        fill="#14213d"
      >
        no jargon.
      </text>
    </svg>
  );
}
