import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Get More Google Reviews (Without Being Pushy)',
  description:
    'A practical playbook for getting more Google reviews — the right time to ask, the right way to ask, and why most businesses leave reviews on the table without realizing it.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/how-to-get-more-google-reviews',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function HowToGetMoreGoogleReviews() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">Guide · Growth</div>
        <h1>How to Get More Google Reviews</h1>
        <p className="dek">
          Most happy customers don&apos;t leave a review &mdash; not because they don&apos;t want
          to, but because nobody asked at the right moment. Fix the moment, and the numbers move
          on their own.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>9 min read</span>
        </div>
        <ReviewFunnelChart />
      </header>

      <section className="section">
        <h2>Why most customers never leave a review</h2>
        <p>
          It&apos;s rarely reluctance &mdash; it&apos;s friction and timing. A customer who had a
          genuinely good experience is willing to leave a review; they just forget within the
          hour, or they&apos;re never asked at all. Businesses that fix this one gap consistently
          see review volume climb without changing anything else about their service.
        </p>
      </section>

      <section className="section">
        <h2>When to ask</h2>
        <p>
          Timing matters more than wording. Ask too early and the experience isn&apos;t finished
          yet; ask too late and the moment has faded from memory. The sweet spot is right after
          a visible win &mdash; a completed service, a delivered order, a resolved issue &mdash;
          while the good feeling is still fresh.
        </p>
        <RequestTimingComparison />
      </section>

      <section className="section">
        <h2>How to ask, without sounding like you&apos;re begging</h2>
        <ul className="feature-list">
          <li>Make it specific: mention what the review is for, not just &quot;please review us&quot;</li>
          <li>Make it a one-tap link, not a search-and-find process</li>
          <li>Ask once, at the right moment &mdash; not repeatedly through five channels</li>
          <li>Let staff ask in person after a genuinely good interaction; it converts better than any automated message</li>
        </ul>
      </section>

      <section className="section">
        <h2>Where to ask from</h2>
        <p>
          The best-performing channels are the ones closest to the moment of satisfaction: a
          receipt or invoice with a QR code, a follow-up text or email after service, or a
          staff member handing over a card at checkout. Generic social media posts asking for
          reviews tend to underperform &mdash; they reach the wrong audience at the wrong time.
        </p>
      </section>

      <section className="section">
        <h2>What to avoid</h2>
        <p>
          A few things reliably backfire: offering incentives or discounts in exchange for
          reviews (against Google&apos;s policies and easy for customers to spot), asking only
          customers you know were happy while ignoring everyone else, and sending the same
          generic request to every customer regardless of what actually happened during their
          visit.
        </p>
      </section>

      <section className="section">
        <h2>Turning replies into more reviews</h2>
        <p>
          Here&apos;s the part most businesses miss: replying to the reviews you already have
          encourages more of them. Future customers who see an engaged business are more likely
          to leave their own feedback, because it clearly gets read and acknowledged rather than
          disappearing into a void.
        </p>
      </section>

      <section className="section cta">
        <h2>Keep the momentum going</h2>
        <p>Reply to every review fast, so the next one feels worth leaving.</p>
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

function ReviewFunnelChart() {
  return (
    <svg
      viewBox="0 0 680 210"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Funnel showing how many happy customers actually leave a review at each stage"
    >
      <rect x="0" y="0" width="680" height="210" rx="16" fill="#f1ede2" />
      <text x="30" y="38" fontSize="13" fontWeight="600" fill="#14213d" fontFamily="-apple-system, sans-serif">
        Where happy customers drop off before reviewing
      </text>

      <polygon points="30,60 650,60 590,95 90,95" fill="#1a8f6f" />
      <text x="340" y="82" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="-apple-system, sans-serif">Had a good experience</text>

      <polygon points="90,100 590,100 530,135 150,135" fill="#4ea587" />
      <text x="340" y="122" fontSize="12.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="-apple-system, sans-serif">Were willing to leave a review</text>

      <polygon points="150,140 530,140 480,175 200,175" fill="#d9a404" />
      <text x="340" y="162" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="-apple-system, sans-serif">Were actually asked</text>

      <polygon points="200,180 480,180 450,205 230,205" fill="#c0392b" />
      <text x="340" y="197" fontSize="11.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="-apple-system, sans-serif">Actually left one</text>
    </svg>
  );
}

function RequestTimingComparison() {
  return (
    <svg
      viewBox="0 0 680 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', margin: '1.5rem 0' }}
      role="img"
      aria-label="Comparison of asking for a review at the wrong time versus the right time"
    >
      <rect x="0" y="0" width="680" height="200" rx="16" fill="#f1ede2" />

      <text x="30" y="35" fontSize="12.5" fontWeight="600" fill="#14213d" fontFamily="-apple-system, sans-serif">
        Timing the ask
      </text>

      <line x1="60" y1="90" x2="620" y2="90" stroke="#d8d2c2" strokeWidth="2" />

      <circle cx="90" cy="90" r="7" fill="#c0392b" />
      <text x="90" y="115" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">Service</text>
      <text x="90" y="129" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">starts</text>

      <circle cx="260" cy="90" r="7" fill="#1a8f6f" />
      <text x="260" y="65" fontSize="11" fontWeight="700" fill="#1a8f6f" textAnchor="middle" fontFamily="-apple-system, sans-serif">Best moment</text>
      <text x="260" y="115" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">Right after</text>
      <text x="260" y="129" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">the win</text>

      <circle cx="440" cy="90" r="7" fill="#e7e0d2" />
      <text x="440" y="115" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">A few</text>
      <text x="440" y="129" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">days later</text>

      <circle cx="600" cy="90" r="7" fill="#e7e0d2" />
      <text x="600" y="115" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">Memory</text>
      <text x="600" y="129" fontSize="11" fill="#454e63" textAnchor="middle" fontFamily="-apple-system, sans-serif">fades</text>

      <text x="260" y="175" fontSize="10.5" fill="#8a8370" textAnchor="middle" fontFamily="-apple-system, sans-serif">
        Ask while the experience is still fresh — not a week later
      </text>
    </svg>
  );
}
