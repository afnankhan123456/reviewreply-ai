import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Sentiment Analysis Matters for Business Reviews',
  description:
    'What sentiment analysis actually does with review data, why star rating alone hides important patterns, and how businesses use sentiment trends to catch problems early.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/why-sentiment-analysis-matters',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function SentimentAnalysisArticle() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">Guide · Analytics</div>
        <h1>Why Sentiment Analysis Matters for Business Reviews</h1>
        <p className="dek">
          A 4.2 average rating can hide two very different stories. Sentiment analysis is what
          tells them apart &mdash; and what lets a business catch a real problem weeks before it
          shows up in the star average.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>7 min read</span>
        </div>
        <RatingVsSentimentIllustration />
      </header>

      <section className="section">
        <h2>Why star rating alone isn&apos;t enough</h2>
        <p>
          Star rating is a single number that averages out everything a customer felt into one
          data point. Two businesses can both sit at 4.2 stars &mdash; one because reviews are
          consistently solid across the board, the other because half the reviews are glowing and
          half are frustrated, with nothing in between. The average looks identical. The underlying
          reality doesn&apos;t.
        </p>
        <p>
          Sentiment analysis reads the actual text of a review and classifies it &mdash; typically
          as positive, neutral, or negative &mdash; and often identifies which specific topics
          (service speed, staff, pricing, cleanliness) are driving that sentiment. That&apos;s the
          layer of detail a star average can&apos;t provide on its own.
        </p>
      </section>

      <section className="section">
        <h2>What sentiment analysis actually catches</h2>
        <ul className="feature-list">
          <li>
            <strong>Emerging problems, before they tank the rating.</strong> If negative sentiment
            around &quot;wait time&quot; starts climbing over a few weeks, that&apos;s visible in
            sentiment trends well before enough 1-star reviews accumulate to move the average.
          </li>
          <li>
            <strong>What&apos;s actually driving satisfaction.</strong> If positive sentiment
            consistently clusters around one staff member or one specific service, that&apos;s
            useful operational information, not just a nice compliment.
          </li>
          <li>
            <strong>Mixed reviews that a star rating flattens.</strong> A 3-star review that says
            &quot;great food, painfully slow service&quot; contains two opposite sentiments in one
            review. Sentiment analysis separates them instead of averaging them into a single
            unhelpful middle score.
          </li>
          <li>
            <strong>Which reviews need a reply first.</strong> Sorting by negative sentiment
            surfaces the reviews that need urgent attention, instead of working through reviews in
            the order they arrived.
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>An example</h2>
        <div className="compare-cards">
          <div className="compare-card weak">
            <div className="compare-label">Star rating only</div>
            <p>&quot;4.2 average, 340 reviews.&quot;</p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#8a8370' }}>
              Tells you the outcome. Not why, and not what to do about it.
            </p>
          </div>
          <div className="compare-card strong">
            <div className="compare-label">With sentiment analysis</div>
            <p>
              &quot;4.2 average. Positive sentiment steady around staff and food quality. Negative
              sentiment up 18% this month, concentrated on wait times during weekend brunch.&quot;
            </p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#1f7a6c' }}>
              Tells you exactly where to focus, and by when.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>How it fits into day-to-day review management</h2>
        <p>
          On its own, sentiment analysis is just a classification layer. It becomes useful when
          it&apos;s connected to action &mdash; sorting negative-sentiment reviews to the top of a
          reply queue, triggering an alert when negative sentiment on a specific topic spikes, or
          feeding a monthly report that shows sentiment trends over time instead of a single static
          number. That combination &mdash; automatic detection plus a clear next step &mdash; is
          what turns review data from something you read into something you act on.
        </p>
      </section>

      <section className="section faq">
        <h2>Frequently asked questions</h2>

        <details open>
          <summary>Isn&apos;t star rating already a form of sentiment?</summary>
          <p>
            It&apos;s a proxy for it, but a coarse one. A customer might leave 3 stars for a mixed
            experience even though their written review clearly describes something specific and
            fixable. Sentiment analysis reads the text itself, not just the number the customer
            picked.
          </p>
        </details>

        <details>
          <summary>Can sentiment analysis be wrong about a review?</summary>
          <p>
            Sarcasm and unusual phrasing can occasionally confuse any automated sentiment system.
            That&apos;s part of why sentiment analysis works best as a way to prioritize and spot
            trends, with a person still reading and replying to individual reviews rather than
            acting on classification alone.
          </p>
        </details>

        <details>
          <summary>How often should sentiment trends be reviewed?</summary>
          <p>
            Weekly is usually enough to catch an emerging issue early without over-reacting to
            normal day-to-day noise in a handful of reviews. Monthly reports are useful for
            spotting slower-moving trends over a full season or quarter.
          </p>
        </details>

        <details>
          <summary>Does sentiment analysis replace reading reviews yourself?</summary>
          <p>
            No &mdash; it directs attention rather than replacing judgment. It&apos;s most useful
            for surfacing which reviews matter most right now, especially once volume is too high
            to read everything in order.
          </p>
        </details>
      </section>

      <section className="section cta">
        <h2>See sentiment trends in your own reviews</h2>
        <p>
          ReviewReply AI analyzes sentiment on every synced Google review automatically, so
          patterns are visible without reading every review line by line.
        </p>
        <a className="cta-button" href="https://www.reviewreply-ai.in/">
          Get started
        </a>
      </section>

      <style>{`
        .article { max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.7; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 600; margin-bottom: 0.75rem; }
        h1 { font-size: 2.2rem; line-height: 1.2; margin: 0 0 1rem; font-weight: 700; color: #14213d; letter-spacing: -0.01em; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.06rem; color: #454e63; line-height: 1.6; margin: 0 0 1.25rem; }
        .meta { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.85rem; color: #8a8370; display: flex; gap: 0.5rem; align-items: center; margin-bottom: 2rem; }
        .dot { opacity: 0.5; }
        .section { margin: 2.75rem 0; }
        h2 { font-size: 1.4rem; color: #14213d; margin: 0 0 1rem; font-weight: 700; letter-spacing: -0.01em; }
        p { font-size: 1.03rem; margin: 0 0 1.1rem; }
        .feature-list { list-style: none; padding: 0; margin: 1rem 0 0; }
        .feature-list li { position: relative; padding: 0.85rem 0 0.85rem 1.75rem; border-bottom: 1px solid #e4dfd3; font-size: 1rem; }
        .feature-list li:before { content: ''; position: absolute; left: 0; top: 1.3rem; width: 8px; height: 8px; border-radius: 50%; background: #d9a404; }
        .compare-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
        @media (max-width: 640px) { .compare-cards { grid-template-columns: 1fr; } h1 { font-size: 1.75rem; } }
        .compare-card { border-radius: 10px; padding: 1.25rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .compare-card p { font-size: 0.95rem; margin: 0; line-height: 1.6; }
        .compare-card.weak { background: #f1ede2; border: 1px dashed #c9c2ad; }
        .compare-card.strong { background: #eaf3f0; border: 1px solid #1f7a6c; }
        .compare-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; margin-bottom: 0.6rem; }
        .compare-card.weak .compare-label { color: #8a8370; }
        .compare-card.strong .compare-label { color: #1f7a6c; }
        .faq details { border-bottom: 1px solid #e4dfd3; padding: 1.1rem 0; }
        .faq summary { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; font-size: 1.02rem; cursor: pointer; color: #14213d; }
        .faq p { margin-top: 0.75rem; font-size: 0.98rem; color: #3a4257; }
        .cta { text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta-button { display: inline-block; margin-top: 0.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.98rem; }
      `}</style>
    </article>
  );
}

/** Illustration: same star rating splitting into positive/neutral/negative sentiment bars */
function RatingVsSentimentIllustration() {
  return (
    <svg
      viewBox="0 0 680 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Illustration showing one star rating splitting into positive, neutral, and negative sentiment breakdown"
    >
      <rect x="0" y="0" width="680" height="200" rx="16" fill="#f1ede2" />

      {/* single rating number */}
      <circle cx="110" cy="100" r="60" fill="#14213d" />
      <text x="110" y="92" textAnchor="middle" fontSize="30" fontWeight="700" fill="#fbf9f4" fontFamily="-apple-system, sans-serif">
        4.2
      </text>
      <text x="110" y="114" textAnchor="middle" fontSize="11" fill="#b7bdd0" fontFamily="-apple-system, sans-serif">
        340 reviews
      </text>

      {/* arrow */}
      <path d="M190 100 L250 100" stroke="#8a8370" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow3)" />
      <defs>
        <marker id="arrow3" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8a8370" />
        </marker>
      </defs>

      {/* sentiment bars */}
      <g transform="translate(280, 40)">
        <text x="0" y="-10" fontSize="11" fontFamily="-apple-system, sans-serif" fill="#3a4257" fontWeight="700">
          Sentiment breakdown
        </text>

        <text x="0" y="20" fontSize="11" fontFamily="-apple-system, sans-serif" fill="#1f7a6c">Positive</text>
        <rect x="90" y="8" width="220" height="16" rx="8" fill="#e2ede9" />
        <rect x="90" y="8" width="180" height="16" rx="8" fill="#1f7a6c" />

        <text x="0" y="52" fontSize="11" fontFamily="-apple-system, sans-serif" fill="#8a8370">Neutral</text>
        <rect x="90" y="40" width="220" height="16" rx="8" fill="#eee9db" />
        <rect x="90" y="40" width="60" height="16" rx="8" fill="#c9c2ad" />

        <text x="0" y="84" fontSize="11" fontFamily="-apple-system, sans-serif" fill="#b23a48">Negative</text>
        <rect x="90" y="72" width="220" height="16" rx="8" fill="#f3e3e2" />
        <rect x="90" y="72" width="90" height="16" rx="8" fill="#b23a48" />
      </g>
    </svg>
  );
}
