import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Review Response Matters for Local Businesses (And What It Costs You If You Skip It)',
  description:
    'Responding to Google reviews isn\'t optional anymore. See how review replies affect local SEO, customer trust, and revenue — backed by data and real examples.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/why-review-response-matters-local-business',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function WhyReviewResponseMatters() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">Guide · Local SEO &amp; Trust</div>
        <h1>Why Review Response Matters for Local Businesses</h1>
        <p className="dek">
          Every unanswered review is a small, visible signal to future customers &mdash; and to
          Google. Here&apos;s what replying (or not) actually does to your rankings, your trust
          score, and your bottom line.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>10 min read</span>
        </div>
        <TrustImpactChart />
      </header>

      <section className="section">
        <h2>Reviews are a conversation, not a scoreboard</h2>
        <p>
          Most owners treat reviews like a report card &mdash; something to glance at and move
          on from. But every review is public, permanent, and read by far more people than the
          one who wrote it. A star rating tells a potential customer <em>what</em> happened. Your
          reply tells them <em>who you are</em> when something goes right or wrong.
        </p>
        <p>
          That&apos;s the part most businesses miss: the reply is often more persuasive to a new
          customer than the review itself.
        </p>
      </section>

      <section className="section">
        <h2>The local SEO angle</h2>
        <p>
          Google has been explicit that review responses are a ranking signal for local search.
          Businesses that respond regularly tend to see stronger visibility in the Local Pack and
          Google Maps results, for a few concrete reasons:
        </p>
        <ul className="feature-list">
          <li>Owner responses add fresh, relevant content and keywords tied to your business and location</li>
          <li>Response rate and response time are tracked signals Google surfaces to searchers</li>
          <li>Engagement signals overall account activity, which correlates with trustworthiness</li>
        </ul>
      </section>

      <section className="section">
        <h2>The trust angle</h2>
        <p>
          Consumer research consistently finds that shoppers don&apos;t just read reviews &mdash;
          they read how a business responds to them, especially the negative ones. A thoughtful
          reply to a 2-star review can do more for conversion than a dozen more 5-star reviews
          with no owner engagement at all.
        </p>
        <BeforeAfterComparison />
      </section>

      <section className="section">
        <h2>What happens when you don&apos;t reply</h2>
        <p>
          Silence isn&apos;t neutral &mdash; it reads as one of a few things to a browsing
          customer: nobody&apos;s watching, the business doesn&apos;t care, or the complaint was
          true and there&apos;s no defense. None of those are the impression you want sitting at
          the top of your Google Business Profile for years.
        </p>
      </section>

      <section className="section">
        <h2>What a good reply actually does</h2>
        <p>
          A strong reply isn&apos;t about winning an argument with a reviewer. It does three
          things at once:
        </p>
        <ul className="feature-list">
          <li>Acknowledges the specific thing the customer mentioned, so it doesn&apos;t read as copy-pasted</li>
          <li>Shows future readers how you handle problems, not just praise</li>
          <li>Gives context or a resolution path without getting defensive or argumentative</li>
        </ul>
      </section>

      <section className="section">
        <h2>How often should you actually reply?</h2>
        <p>
          The realistic answer for most local businesses: every review, ideally within 24&ndash;48
          hours. That sounds like a lot until you realize most locations get a handful of reviews
          a week &mdash; the barrier usually isn&apos;t time, it&apos;s remembering to check and
          knowing what to say. That&apos;s the gap automation is built to close.
        </p>
      </section>

      <section className="section cta">
        <h2>Never miss a review again</h2>
        <p>Get fast, on-brand replies to every review &mdash; automatically.</p>
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
        .cta { text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta-button { display: inline-block; margin-top: 0.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.98rem; }
        @media (max-width: 640px) { h1 { font-size: 1.75rem; } }
      `}</style>
    </article>
  );
}

function TrustImpactChart() {
  return (
    <svg
      viewBox="0 0 680 210"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Impact of replying to reviews on customer trust and visibility"
    >
      <rect x="0" y="0" width="680" height="210" rx="16" fill="#f1ede2" />
      <text x="30" y="42" fontSize="13" fontWeight="600" fill="#14213d" fontFamily="-apple-system, sans-serif">
        Businesses that reply to reviews vs. those that don&apos;t
      </text>

      <text x="30" y="82" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">Perceived trustworthiness</text>
      <rect x="230" y="70" width="400" height="16" rx="8" fill="#e7e0d2" />
      <rect x="230" y="70" width="340" height="16" rx="8" fill="#1a8f6f" />
      <text x="590" y="83" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="end" fontFamily="-apple-system, sans-serif">85%</text>

      <text x="30" y="122" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">Local Pack visibility</text>
      <rect x="230" y="110" width="400" height="16" rx="8" fill="#e7e0d2" />
      <rect x="230" y="110" width="292" height="16" rx="8" fill="#1a8f6f" />
      <text x="510" y="123" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="end" fontFamily="-apple-system, sans-serif">73%</text>

      <text x="30" y="162" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">Repeat customer rate</text>
      <rect x="230" y="150" width="400" height="16" rx="8" fill="#e7e0d2" />
      <rect x="230" y="150" width="252" height="16" rx="8" fill="#1a8f6f" />
      <text x="470" y="163" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="end" fontFamily="-apple-system, sans-serif">63%</text>

      <text x="30" y="196" fontSize="10.5" fill="#8a8370" fontFamily="-apple-system, sans-serif">
        Illustrative figures — actual impact varies by industry and location
      </text>
    </svg>
  );
}

function BeforeAfterComparison() {
  return (
    <svg
      viewBox="0 0 680 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', margin: '1.5rem 0' }}
      role="img"
      aria-label="Comparison of a Google Business Profile with no owner replies versus one with active replies"
    >
      <rect x="0" y="0" width="680" height="220" rx="16" fill="#f1ede2" />

      <rect x="30" y="25" width="290" height="170" rx="12" fill="#fbf9f4" stroke="#e4dfd3" />
      <text x="55" y="52" fontSize="11" fontWeight="700" fill="#c0392b" fontFamily="-apple-system, sans-serif">NO OWNER REPLIES</text>

      <circle cx="66" cy="78" r="3" fill="#c0392b" />
      <text x="80" y="82" fontSize="11.5" fill="#454e63" fontFamily="-apple-system, sans-serif">Looks unmonitored</text>

      <circle cx="66" cy="103" r="3" fill="#c0392b" />
      <text x="80" y="107" fontSize="11.5" fill="#454e63" fontFamily="-apple-system, sans-serif">Negative reviews stand alone</text>

      <circle cx="66" cy="128" r="3" fill="#c0392b" />
      <text x="80" y="132" fontSize="11.5" fill="#454e63" fontFamily="-apple-system, sans-serif">No fresh, local keyword content</text>

      <circle cx="66" cy="153" r="3" fill="#c0392b" />
      <text x="80" y="157" fontSize="11.5" fill="#454e63" fontFamily="-apple-system, sans-serif">Lower trust at first glance</text>

      <rect x="360" y="25" width="290" height="170" rx="12" fill="#14213d" />
      <text x="385" y="52" fontSize="11" fontWeight="700" fill="#7fd6b0" fontFamily="-apple-system, sans-serif">ACTIVE REPLIES</text>

      <circle cx="396" cy="78" r="3" fill="#7fd6b0" />
      <text x="410" y="82" fontSize="11.5" fill="#e8ebf2" fontFamily="-apple-system, sans-serif">Reads as actively managed</text>

      <circle cx="396" cy="103" r="3" fill="#7fd6b0" />
      <text x="410" y="107" fontSize="11.5" fill="#e8ebf2" fontFamily="-apple-system, sans-serif">Negative reviews get context</text>

      <circle cx="396" cy="128" r="3" fill="#7fd6b0" />
      <text x="410" y="132" fontSize="11.5" fill="#e8ebf2" fontFamily="-apple-system, sans-serif">Fresh, relevant content signals</text>

      <circle cx="396" cy="153" r="3" fill="#7fd6b0" />
      <text x="410" y="157" fontSize="11.5" fill="#e8ebf2" fontFamily="-apple-system, sans-serif">Higher trust, more clicks</text>
    </svg>
  );
}
