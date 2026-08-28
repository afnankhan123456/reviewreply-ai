import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Set Up Automatic Google Review Replies (Without Losing Your Personal Touch)',
  description:
    'Learn how automatic Google review replies work, when to use full automation, when to keep a human in the loop, and how to keep responses feeling personal instead of robotic.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/automatic-google-review-reply',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function AutomaticGoogleReviewReply() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">Guide · Automation</div>
        <h1>How to Set Up Automatic Google Review Replies</h1>
        <p className="dek">
          &quot;Automatic&quot; makes some owners nervous &mdash; the fear is a robotic,
          copy-pasted reply. Done right, automation means every customer gets a fast, relevant
          reply without you sitting at a keyboard every day.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>8 min read</span>
        </div>
        <AutomationSplit />
      </header>

      <section className="section">
        <h2>How automatic replies actually work</h2>
        <p>
          Modern tools don&apos;t send the same canned message to every review. Instead, they read
          the incoming review&apos;s content and star rating, generate a reply that references
          specific details the customer mentioned, match the tone you&apos;ve set for your brand,
          and either publish automatically or hold the draft for your approval &mdash; depending
          on your settings.
        </p>
      </section>

      <section className="section">
        <h2>When full automation makes sense</h2>
        <ul className="feature-list">
          <li>Positive reviews (4&ndash;5 stars) with straightforward, low-risk content</li>
          <li>High review volume where manual replies aren&apos;t realistic</li>
          <li>Repetitive feedback themes where the same thoughtful response applies again and again</li>
        </ul>
      </section>

      <section className="section">
        <h2>When to keep a human in the loop</h2>
        <p>
          Most businesses keep a person reviewing drafts for negative or complex reviews, anything
          mentioning specific staff or incidents, and anything involving refunds, legal concerns,
          or safety &mdash; these deserve a person&apos;s eyes before publishing. A good tool lets
          you set this distinction directly.
        </p>
      </section>

      <section className="section">
        <h2>Keeping automated replies from sounding robotic</h2>
        <p>
          The difference between a good and bad automated reply usually comes down to specificity.
          Good AI reply tools pull real details from the review text instead of falling back on a
          generic line.
        </p>
        <GenericVsSpecific />
      </section>

      <section className="section">
        <h2>Getting started</h2>
        <p>
          Start with automation on positive reviews only, and manually approve everything else for
          a few weeks. Once you&apos;re confident in how the AI writes and you&apos;ve tuned the
          tone to match your brand, expand automation further &mdash; most businesses eventually
          automate the majority of their replies and only step in for the tricky ones.
        </p>
      </section>

      <section className="section cta">
        <h2>Set your automation rules</h2>
        <p>Choose what auto-posts and what needs your approval &mdash; in minutes.</p>
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

function AutomationSplit() {
  return (
    <svg
      viewBox="0 0 680 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Recommended automation split between auto-post and manual review"
    >
      <rect x="0" y="0" width="680" height="160" rx="16" fill="#f1ede2" />
      <text x="30" y="45" fontSize="13" fontWeight="600" fill="#14213d" fontFamily="-apple-system, sans-serif">Recommended automation split</text>

      <text x="30" y="82" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">4-5★ reviews</text>
      <rect x="160" y="72" width="440" height="14" rx="7" fill="#e7e0d2" />
      <rect x="160" y="72" width="374" height="14" rx="7" fill="#1a8f6f" />
      <text x="610" y="83" fontSize="11" fontWeight="600" fill="#1a8f6f" fontFamily="-apple-system, sans-serif">Auto-post</text>

      <text x="30" y="118" fontSize="12" fill="#454e63" fontFamily="-apple-system, sans-serif">1-3★ / complex</text>
      <rect x="160" y="108" width="440" height="14" rx="7" fill="#e7e0d2" />
      <rect x="160" y="108" width="154" height="14" rx="7" fill="#c0392b" />
      <text x="610" y="119" fontSize="11" fontWeight="600" fill="#c0392b" fontFamily="-apple-system, sans-serif">Review first</text>
    </svg>
  );
}

function GenericVsSpecific() {
  return (
    <svg
      viewBox="0 0 680 190"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', margin: '1.5rem 0' }}
      role="img"
      aria-label="Example of a generic automated reply versus a specific one"
    >
      <rect x="0" y="0" width="680" height="190" rx="16" fill="#f1ede2" />

      <rect x="30" y="25" width="290" height="140" rx="12" fill="#fbf9f4" stroke="#e4dfd3" />
      <text x="55" y="52" fontSize="11" fontWeight="700" fill="#c0392b" fontFamily="-apple-system, sans-serif">GENERIC</text>
      <text x="55" y="85" fontSize="12" fill="#454e63" fontFamily="Georgia, serif" fontStyle="italic">
        <tspan x="55" dy="0">&quot;Thank you for your</tspan>
        <tspan x="55" dy="18">review!&quot;</tspan>
      </text>
      <text x="55" y="140" fontSize="10" fill="#8a8370" fontFamily="-apple-system, sans-serif">Feels automated</text>

      <rect x="360" y="25" width="290" height="140" rx="12" fill="#14213d" />
      <text x="385" y="52" fontSize="11" fontWeight="700" fill="#7fd6b0" fontFamily="-apple-system, sans-serif">SPECIFIC</text>
      <text x="385" y="80" fontSize="11.5" fill="#e8ebf2" fontFamily="Georgia, serif" fontStyle="italic">
        <tspan x="385" dy="0">&quot;Thanks for the kind</tspan>
        <tspan x="385" dy="16">words about our brunch</tspan>
        <tspan x="385" dy="16">menu, Sarah!&quot;</tspan>
      </text>
      <text x="385" y="145" fontSize="10" fill="#9aa4bb" fontFamily="-apple-system, sans-serif">Feels human</text>
    </svg>
  );
}
