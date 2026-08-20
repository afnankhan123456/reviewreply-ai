import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Automatically Reply to Google Reviews Using AI',
  description:
    'A step-by-step guide to setting up AI-generated replies for your Google Business Profile reviews — how it works, what to check before publishing, and common mistakes to avoid.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/how-to-reply-google-reviews-with-ai',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

export default function HowToReplyGoogleReviewsWithAI() {
  return (
    <article className="article">
      {/* ---------- HERO ---------- */}
      <header className="hero">
        <div className="eyebrow">Guide · How-To</div>
        <h1>How to Automatically Reply to Google Reviews Using AI</h1>
        <p className="dek">
          Replying to every Google review by hand doesn&apos;t scale past a handful a week. Here&apos;s
          exactly how AI-assisted replies work, how to set them up, and how to keep them sounding
          like your business instead of a robot.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">•</span>
          <span>7 min read</span>
        </div>

        <BeforeAfterIllustration />
      </header>

      {/* ---------- WHY MANUAL BREAKS DOWN ---------- */}
      <section className="section">
        <h2>Why manual replies stop working</h2>
        <p>
          Writing one thoughtful reply takes two or three minutes if you&apos;re being careful.
          That&apos;s fine for the occasional review. It falls apart once a business is getting
          reviews daily, across multiple locations, or from a team that doesn&apos;t have a
          dedicated person for it. The usual outcome isn&apos;t bad replies &mdash; it&apos;s no
          replies. Reviews sit unanswered for weeks, and the ones that need urgent attention (a
          1-star review about a real problem) get buried the same way a 5-star review does.
        </p>
        <p>
          AI-assisted reply tools exist to remove the time cost, not the judgment. A well-built
          tool drafts a reply in seconds; a person still reviews and approves it before it goes
          live.
        </p>
      </section>

      {/* ---------- STEP BY STEP ---------- */}
      <section className="section">
        <h2>Setting it up, step by step</h2>
        <StepsDiagram />

        <ol className="numbered">
          <li>
            <strong>Connect your Google Business Profile.</strong> This is a direct, official
            connection &mdash; the tool needs read access to pull reviews and write access to
            publish replies you approve. This step usually takes under two minutes.
          </li>
          <li>
            <strong>Let reviews sync.</strong> Existing and new reviews import automatically from
            that point on. No manual copy-paste, and nothing is missed.
          </li>
          <li>
            <strong>Set your tone once.</strong> Most tools let you pick a reply style &mdash;
            warm and casual, formal and concise, or something in between &mdash; so every draft
            starts sounding like your business, not a generic assistant.
          </li>
          <li>
            <strong>Review each AI-generated draft.</strong> The AI reads the review&apos;s
            content and sentiment and writes a reply that responds to specifics &mdash; not just
            &quot;Thank you for your feedback.&quot; You read it, edit if needed, and approve.
          </li>
          <li>
            <strong>Publish.</strong> The approved reply posts to your Google Business Profile,
            visible to anyone reading that review.
          </li>
        </ol>
      </section>

      {/* ---------- WHAT A GOOD REPLY LOOKS LIKE ---------- */}
      <section className="section">
        <h2>What separates a good AI reply from a generic one</h2>
        <p>
          The difference is specificity. A template-based reply reads the same on every review. A
          context-aware reply references what the customer actually said.
        </p>

        <div className="compare-cards">
          <div className="compare-card weak">
            <div className="compare-label">Generic template</div>
            <p>
              &quot;Thank you for your review! We appreciate your feedback and hope to see you
              again soon.&quot;
            </p>
          </div>
          <div className="compare-card strong">
            <div className="compare-label">Context-aware reply</div>
            <p>
              &quot;Thanks for the kind words about our weekend brunch, Priya &mdash; glad the
              wait wasn&apos;t too long this time. We&apos;ll pass your compliment about Arjun&apos;s
              service on to the team.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ---------- NEGATIVE REVIEWS ---------- */}
      <section className="section">
        <h2>Handling negative reviews specifically</h2>
        <p>
          Negative reviews need a different approach than positive ones &mdash; acknowledge the
          issue directly, avoid sounding defensive, and give a clear next step (a phone number, an
          email, an invitation to discuss it directly) rather than a vague apology. A good tool
          flags these separately with a low-rating alert, so they don&apos;t sit in the same queue
          as routine 5-star reviews waiting to be noticed.
        </p>
        <p className="callout">
          <strong>Rule of thumb:</strong> reply to negative reviews faster than positive ones, not
          slower. A prompt, calm response to a complaint is often what other readers actually
          notice &mdash; more than the complaint itself.
        </p>
      </section>

      {/* ---------- MISTAKES TO AVOID ---------- */}
      <section className="section">
        <h2>Common mistakes to avoid</h2>
        <ul className="feature-list">
          <li>
            <strong>Auto-publishing without review.</strong> Even a good AI draft should get a
            quick human check before it&apos;s posted publicly.
          </li>
          <li>
            <strong>Using the same tone for every review.</strong> A 1-star complaint and a 5-star
            compliment shouldn&apos;t get replies that sound interchangeable.
          </li>
          <li>
            <strong>Ignoring the backlog.</strong> Old unanswered reviews are still visible to
            anyone reading your profile &mdash; clearing the backlog matters as much as staying
            current.
          </li>
          <li>
            <strong>Treating replies as a one-time task.</strong> Consistency over months is what
            builds trust, not a single week of catching up.
          </li>
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section faq">
        <h2>Frequently asked questions</h2>

        <details open>
          <summary>Will customers know a reply was AI-generated?</summary>
          <p>
            Not if it&apos;s written well. Context-aware replies reference specific details from
            the review, which is what makes a reply feel personal &mdash; whether a human or an AI
            drafted the first version.
          </p>
        </details>

        <details>
          <summary>How long does setup actually take?</summary>
          <p>
            Connecting a Google Business Profile typically takes under two minutes. Reviews sync
            automatically after that, and the first AI-generated drafts are usually ready
            immediately.
          </p>
        </details>

        <details>
          <summary>Can I edit a reply before it&apos;s published?</summary>
          <p>
            Yes &mdash; and it&apos;s worth doing, at least at first. Most tools let you edit the
            draft freely before approving it, and the AI improves at matching your voice the more
            it&apos;s used.
          </p>
        </details>

        <details>
          <summary>What happens to reviews that came in before I set this up?</summary>
          <p>
            Tools that sync your full review history will surface older, unanswered reviews too
            &mdash; not just new ones &mdash; so you can clear a backlog instead of only handling
            reviews going forward.
          </p>
        </details>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section cta">
        <h2>Connect your profile and see it in action</h2>
        <p>
          ReviewReply AI syncs your Google Business Profile in under two minutes and starts
          drafting context-aware replies you can review and publish right away.
        </p>
        <a className="cta-button" href="https://www.reviewreply-ai.in/">
          Get started
        </a>
      </section>

      <style>{`
        .article {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif;
          color: #1c2333;
          background: #fbf9f4;
          line-height: 1.7;
        }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b8860b;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        h1 {
          font-size: 2.3rem;
          line-height: 1.18;
          margin: 0 0 1rem;
          font-weight: 700;
          color: #14213d;
          letter-spacing: -0.01em;
        }
        .dek {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 1.08rem;
          color: #454e63;
          line-height: 1.6;
          margin: 0 0 1.25rem;
        }
        .meta {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 0.85rem;
          color: #8a8370;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 2rem;
        }
        .dot { opacity: 0.5; }
        .section { margin: 2.75rem 0; }
        h2 {
          font-size: 1.45rem;
          color: #14213d;
          margin: 0 0 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        p { font-size: 1.05rem; margin: 0 0 1.1rem; }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 0;
        }
        .feature-list li {
          position: relative;
          padding: 0.9rem 0 0.9rem 1.75rem;
          border-bottom: 1px solid #e4dfd3;
          font-size: 1.02rem;
        }
        .feature-list li:before {
          content: '';
          position: absolute;
          left: 0;
          top: 1.35rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d9a404;
        }
        .numbered {
          padding-left: 1.25rem;
          margin: 1rem 0;
        }
        .numbered li { margin-bottom: 1.1rem; font-size: 1.02rem; }
        .callout {
          background: #f1ede2;
          border-left: 3px solid #1f7a6c;
          padding: 1.25rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          margin: 0;
        }
        .compare-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
        }
        @media (max-width: 640px) {
          .compare-cards { grid-template-columns: 1fr; }
          h1 { font-size: 1.85rem; }
        }
        .compare-card {
          border-radius: 10px;
          padding: 1.25rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .compare-card p { font-size: 0.95rem; margin: 0; line-height: 1.6; }
        .compare-card.weak {
          background: #f1ede2;
          border: 1px dashed #c9c2ad;
        }
        .compare-card.strong {
          background: #eaf3f0;
          border: 1px solid #1f7a6c;
        }
        .compare-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .compare-card.weak .compare-label { color: #8a8370; }
        .compare-card.strong .compare-label { color: #1f7a6c; }
        .faq details {
          border-bottom: 1px solid #e4dfd3;
          padding: 1.1rem 0;
        }
        .faq summary {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 600;
          font-size: 1.02rem;
          cursor: pointer;
          color: #14213d;
        }
        .faq p { margin-top: 0.75rem; font-size: 0.98rem; color: #3a4257; }
        .cta {
          text-align: center;
          background: #fbf3d9;
          border-radius: 14px;
          padding: 2.5rem 1.5rem;
        }
        .cta-button {
          display: inline-block;
          margin-top: 0.5rem;
          background: #14213d;
          color: #fbf9f4;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 600;
          text-decoration: none;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          font-size: 0.98rem;
        }
      `}</style>
    </article>
  );
}

/* ---------------- Sub-components ---------------- */

/** Before/after style hero: a raw review turning into a polished, sent reply */
function BeforeAfterIllustration() {
  return (
    <svg
      viewBox="0 0 680 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', marginTop: '1.5rem' }}
      role="img"
      aria-label="Illustration showing a Google review being turned into an AI-drafted reply, then published"
    >
      <rect x="0" y="0" width="680" height="200" rx="16" fill="#f1ede2" />

      {/* incoming review bubble */}
      <rect x="30" y="30" width="230" height="70" rx="12" fill="#fbf9f4" stroke="#e4dfd3" />
      <text x="48" y="55" fontSize="12" fontFamily="-apple-system, sans-serif" fill="#3a4257" fontWeight="600">
        New review received
      </text>
      <rect x="48" y="68" width="190" height="6" rx="3" fill="#c9c2ad" />
      <rect x="48" y="80" width="150" height="6" rx="3" fill="#c9c2ad" />

      {/* arrow down to AI */}
      <path d="M145 100 L145 130" stroke="#8a8370" strokeWidth="2" strokeDasharray="4 4" />

      {/* AI processing node */}
      <circle cx="145" cy="150" r="26" fill="#14213d" />
      <text x="145" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fbf9f4" fontFamily="-apple-system, sans-serif">
        AI
      </text>

      {/* arrow across */}
      <path d="M330 150 L400 150" stroke="#1f7a6c" strokeWidth="3" markerEnd="url(#arrow2)" />
      <defs>
        <marker id="arrow2" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1f7a6c" />
        </marker>
      </defs>

      {/* drafted reply bubble */}
      <rect x="420" y="30" width="230" height="70" rx="12" fill="#eaf3f0" stroke="#1f7a6c" />
      <text x="438" y="55" fontSize="12" fontFamily="-apple-system, sans-serif" fill="#1f7a6c" fontWeight="700">
        Draft reply ready
      </text>
      <rect x="438" y="68" width="190" height="6" rx="3" fill="#9cc5bb" />
      <rect x="438" y="80" width="140" height="6" rx="3" fill="#9cc5bb" />

      {/* approve + publish button */}
      <rect x="480" y="140" width="130" height="30" rx="15" fill="#d9a404" />
      <text x="545" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="-apple-system, sans-serif" fill="#14213d">
        Approve &amp; Publish
      </text>
    </svg>
  );
}

/** 5-step setup diagram */
function StepsDiagram() {
  const steps = ['Connect profile', 'Reviews sync', 'Set tone', 'Review draft', 'Publish'];
  return (
    <svg
      viewBox="0 0 680 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', margin: '1.5rem 0' }}
      role="img"
      aria-label="Five setup steps: connect profile, reviews sync, set tone, review draft, publish"
    >
      <rect x="0" y="0" width="680" height="130" rx="14" fill="#f1ede2" />
      {steps.map((step, i) => {
        const x = 40 + i * 130;
        return (
          <g key={step}>
            <circle cx={x} cy="55" r="22" fill={i === steps.length - 1 ? '#1f7a6c' : '#14213d'} />
            <text
              x={x}
              y="60"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#fbf9f4"
              fontFamily="-apple-system, sans-serif"
            >
              {i + 1}
            </text>
            <text
              x={x}
              y="98"
              textAnchor="middle"
              fontSize="11.5"
              fontFamily="-apple-system, sans-serif"
              fill="#3a4257"
              fontWeight="600"
            >
              {step.split(' ').map((word, wi) => (
                <tspan key={wi} x={x} dy={wi === 0 ? 0 : 13}>
                  {word}
                </tspan>
              ))}
            </text>
            {i < steps.length - 1 && (
              <path
                d={`M${x + 26} 55 L${x + 104} 55`}
                stroke="#c9c2ad"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
