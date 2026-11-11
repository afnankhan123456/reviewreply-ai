import type { Metadata } from 'next';
import PublicNav from '@/components/PublicNav';

export const metadata: Metadata = {
  title: 'Pricing | ReviewReply AI — $9 and $29 per month',
  description:
    'Simple pricing for Google review management: Basic at $9 per month for reply drafting, Standard at $29 per month with AI replies, sentiment analysis, low-rating alerts, reports and team members. No contracts.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/pricing',
  },
};

const rows = [
  { feature: 'Google Business Profile connection', basic: true, standard: true },
  { feature: 'Reviews synced into one inbox', basic: true, standard: true },
  { feature: 'Reply drafting', basic: 'Templates + manual edit', standard: 'AI drafts with tone control' },
  { feature: 'Languages', basic: 'English', standard: 'English, Hindi, Hinglish' },
  { feature: 'Approve before publishing', basic: true, standard: true },
  { feature: 'Publish replies to Google', basic: true, standard: true },
  { feature: 'Sentiment analysis and topic tags', basic: false, standard: true },
  { feature: 'Alerts on 1 and 2 star reviews', basic: false, standard: true },
  { feature: 'Monthly reports you can share', basic: false, standard: true },
  { feature: 'Team members', basic: '1', standard: 'Up to 5' },
  { feature: 'Locations', basic: '1', standard: 'Up to 3' },
  { feature: 'Support', basic: 'Email', standard: 'Priority email' },
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <PublicNav />

      <header className="hero">
        <div className="eyebrow">Pricing</div>
        <h1>Two plans. No sales call, no contract.</h1>
        <p className="dek">
          ReviewReply AI connects to your Google Business Profile and drafts a reply for every
          review. You approve, it publishes. Pick a plan, connect Google, and start with your
          existing backlog today.
        </p>
      </header>

      <section className="plans">
        <div className="plan">
          <h2>Basic</h2>
          <p className="price">$9<span>/month</span></p>
          <p className="for">For a single location that wants every review answered.</p>
          <ul>
            <li>Google Business Profile connection</li>
            <li>All reviews in one inbox</li>
            <li>Reply drafting with templates</li>
            <li>Approve and publish to Google</li>
            <li>1 location, 1 team member</li>
          </ul>
          <a className="btn ghost" href="https://www.reviewreply-ai.in/">Start with Basic</a>
        </div>

        <div className="plan featured">
          <div className="badge">Most businesses pick this</div>
          <h2>Standard</h2>
          <p className="price">$29<span>/month</span></p>
          <p className="for">For businesses with steady review volume and more than one branch.</p>
          <ul>
            <li>Everything in Basic</li>
            <li>AI replies with tone and language control</li>
            <li>Sentiment analysis and topic tags</li>
            <li>Alerts the moment a 1 or 2 star review lands</li>
            <li>Monthly reports for owners and clients</li>
            <li>Up to 3 locations, 5 team members</li>
          </ul>
          <a className="btn" href="https://www.reviewreply-ai.in/">Start with Standard</a>
        </div>
      </section>

      <section className="table-section">
        <h2>What is in each plan</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Basic $9</th>
                <th>Standard $29</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature}>
                  <td>{r.feature}</td>
                  <td>{r.basic === true ? 'Included' : r.basic === false ? '—' : r.basic}</td>
                  <td>{r.standard === true ? 'Included' : r.standard === false ? '—' : r.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="notes">
        <h2>Good to know</h2>
        <ul>
          <li><strong>No contract.</strong> Monthly billing, cancel whenever you want. Your data stays exportable.</li>
          <li><strong>No setup fee.</strong> Connect Google and the sync starts on the same day.</li>
          <li><strong>Nothing publishes without you.</strong> Every reply waits for your approval, on both plans.</li>
          <li><strong>Your Google access is limited.</strong> Reviews and replies only — not Gmail, Drive, Calendar, Contacts, Photos or YouTube.</li>
          <li><strong>GST invoices</strong> are available for Indian businesses on request.</li>
        </ul>
      </section>

      <section className="questions">
        <h2>Questions before you pay</h2>
        <details>
          <summary>Can I try it before choosing a plan?</summary>
          <p>
            Yes. Connect your Google Business Profile and generate a reply on a real review
            before you subscribe. If you would rather see it first, the product demo shows the
            full workflow with sample data.
          </p>
        </details>
        <details>
          <summary>What happens to my reviews if I cancel?</summary>
          <p>
            Your reviews stay on Google — they were never ours. You export your reply history
            from the dashboard before cancelling, and the connection to your profile can be
            revoked from your Google account at any time.
          </p>
        </details>
        <details>
          <summary>Do you reply on my behalf?</summary>
          <p>
            No. Replies are published from your own Google Business Profile after you approve
            them, which keeps ownership and accountability with your business.
          </p>
        </details>
        <details>
          <summary>Is there a plan for agencies?</summary>
          <p>
            Standard covers up to 3 locations and 5 team members, which suits small agencies.
            For larger portfolios, write to <a href="/contact">support</a> with the number of
            client locations and we will put together something sensible.
          </p>
        </details>
      </section>

      <section className="cta">
        <h2>Start with the reviews you already have</h2>
        <p>Connect Google, clear the backlog, then keep it to a few minutes a day.</p>
        <a className="btn" href="https://www.reviewreply-ai.in/">Get started</a>
      </section>

      <style>{`
        .pricing-page { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.7; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 700; margin-bottom: 0.75rem; }
        h1 { font-size: 2.1rem; line-height: 1.2; margin: 0 0 1rem; color: #14213d; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.05rem; color: #454e63; margin: 0; }
        .plans { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin: 2rem 0 3rem; }
        .plan { background: #fff; border: 1px solid #e7e0d2; border-radius: 16px; padding: 1.8rem; position: relative; }
        .plan.featured { border-color: #14213d; box-shadow: 0 10px 24px rgba(20,33,61,0.08); }
        .badge { position: absolute; top: -0.7rem; left: 1.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 999px; }
        .plan h2 { font-size: 1.2rem; margin: 0 0 0.4rem; color: #14213d; }
        .price { font-family: -apple-system, sans-serif; font-size: 2.2rem; font-weight: 800; color: #14213d; margin: 0 0 0.3rem; }
        .price span { font-size: 0.95rem; font-weight: 500; color: #6b7385; }
        .for { font-family: -apple-system, sans-serif; font-size: 0.92rem; color: #454e63; margin: 0 0 1rem; }
        .plan ul { font-size: 0.96rem; padding-left: 1.1rem; margin: 0 0 1.4rem; }
        .plan li { margin-bottom: 0.45rem; }
        .btn { display: inline-block; background: #14213d; color: #fbf9f4; font-family: -apple-system, sans-serif; font-weight: 600; font-size: 0.95rem; text-decoration: none; padding: 0.8rem 1.4rem; border-radius: 8px; }
        .btn.ghost { background: transparent; color: #14213d; border: 1px solid #14213d; }
        .table-section h2, .notes h2, .questions h2 { font-size: 1.35rem; color: #14213d; margin: 0 0 1rem; }
        .table-wrap { overflow-x: auto; background: #fff; border: 1px solid #e7e0d2; border-radius: 12px; }
        table { width: 100%; border-collapse: collapse; font-family: -apple-system, sans-serif; font-size: 0.9rem; }
        th, td { text-align: left; padding: 0.7rem 1rem; border-bottom: 1px solid #efeae0; }
        th { background: #f1ede2; color: #14213d; font-weight: 700; }
        tbody tr:last-child td { border-bottom: none; }
        .notes, .questions { margin: 2.5rem 0; }
        .notes ul { font-size: 1rem; padding-left: 1.2rem; }
        .notes li { margin-bottom: 0.5rem; }
        details { background: #fff; border: 1px solid #e7e0d2; border-radius: 10px; padding: 0.9rem 1.1rem; margin-bottom: 0.6rem; }
        summary { cursor: pointer; font-weight: 700; color: #14213d; }
        details p { font-family: -apple-system, sans-serif; font-size: 0.95rem; color: #454e63; margin: 0.7rem 0 0; }
        a { color: #14213d; }
        .cta { margin-top: 3rem; text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta h2 { margin: 0 0 0.5rem; }
        .cta p { font-family: -apple-system, sans-serif; margin: 0 0 1rem; }
        @media (max-width: 720px) { .plans { grid-template-columns: 1fr; } h1 { font-size: 1.7rem; } }
      `}</style>
    </main>
  );
}
