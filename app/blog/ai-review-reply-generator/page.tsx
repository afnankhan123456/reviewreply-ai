import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Review Reply Generator: How It Works and Why Your Business Needs One',
  description:
    'Discover how an AI review reply generator saves hours every week, keeps your replies professional, and helps your business respond to every Google review instantly.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/ai-review-reply-generator',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function AiReviewReplyGenerator() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">Guide · AI</div>
        <h1>AI Review Reply Generator: How It Works and Why Your Business Needs One</h1>
        <p className="dek">
          Every new review is a small moment of truth. An AI review reply generator makes sure
          every customer gets a fast, thoughtful response &mdash; without it costing you hours of
          your week.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>6 min read</span>
        </div>
        <SpeedStat />
      </header>

      <section className="section">
        <h2>What is an AI review reply generator?</h2>
        <p>
          It&apos;s a tool that reads an incoming customer review and automatically drafts a
          relevant, well-written response in seconds &mdash; instead of you staring at a blank box
          trying to figure out how to word a reply to a 3-star review.
        </p>
        <p>
          Tools like ReviewReply AI go further by understanding sentiment, referencing specific
          details from the review, matching a tone you choose, and flagging anything that needs a
          human&apos;s personal touch before it&apos;s published.
        </p>
      </section>

      <section className="section">
        <h2>Why this matters for local SEO</h2>
        <p>
          Google has repeatedly indicated that businesses which actively respond to reviews tend
          to perform better in local search results. Response rate and speed are read as signals
          of an active, trustworthy business.
        </p>
      </section>

      <section className="section">
        <h2>Handling negative reviews gracefully</h2>
        <p>
          This is where most owners struggle most &mdash; and where AI genuinely helps. A
          well-trained generator can draft a calm, empathetic, non-defensive reply that
          acknowledges the issue and invites the customer to resolve it offline.
        </p>
      </section>

      <section className="section cta">
        <h2>Try it on your own reviews</h2>
        <p>Connect your Google Business Profile and start generating replies in minutes.</p>
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
        .cta { text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta-button { display: inline-block; margin-top: 0.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.98rem; }
        @media (max-width: 640px) { h1 { font-size: 1.75rem; } }
      `}</style>
    </article>
  );
}

function SpeedStat() {
  return (
    <svg
      viewBox="0 0 680 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Manual reply time versus AI-assisted reply time"
    >
      <rect x="0" y="0" width="680" height="160" rx="16" fill="#f1ede2" />
      <circle cx="105" cy="80" r="55" fill="#14213d" />
      <text x="105" y="76" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fbf9f4" fontFamily="-apple-system, sans-serif">90s</text>
      <text x="105" y="96" textAnchor="middle" fontSize="10" fill="#b7bdd0" fontFamily="-apple-system, sans-serif">per reply</text>

      <text x="200" y="55" fontSize="13" fontWeight="600" fill="#14213d" fontFamily="-apple-system, sans-serif">Manual vs. AI-assisted reply time</text>

      <text x="200" y="82" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">Manual</text>
      <rect x="270" y="72" width="330" height="12" rx="6" fill="#e7e0d2" />
      <rect x="270" y="72" width="300" height="12" rx="6" fill="#c0392b" />
      <text x="612" y="82" fontSize="11" fill="#454e63" fontFamily="-apple-system, sans-serif">4-5 min</text>

      <text x="200" y="110" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">AI-assisted</text>
      <rect x="270" y="100" width="330" height="12" rx="6" fill="#e7e0d2" />
      <rect x="270" y="100" width="50" height="12" rx="6" fill="#1a8f6f" />
      <text x="612" y="110" fontSize="11" fill="#454e63" fontFamily="-apple-system, sans-serif">~90s</text>
    </svg>
  );
}
