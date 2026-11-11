import type { Metadata } from 'next';
import PublicNav from "@/components/PublicNav";

export const metadata: Metadata = {
  title: 'Contact ReviewReply AI | Support & Business Enquiries',
  description:
    'Contact the ReviewReply AI team for support, billing questions, data deletion requests or partnership enquiries. We reply to every message within one business day.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/contact',
  },
};

const SUPPORT_EMAIL = 'support@reviewreply-ai.in';

export default function ContactPage() {
  return (
    <main className="contact-page">
      <PublicNav />
      <header className="hero">
        <div className="eyebrow">Contact</div>
        <h1>Talk to the ReviewReply AI team</h1>
        <p className="dek">
          Questions about setup, billing, your Google Business Profile connection or data
          deletion? Send us a message and a real person replies, usually within one
          business day.
        </p>
      </header>

      <section className="section">
        <h2>Email us</h2>
        <p>
          The fastest way to reach us is email. Include your account email and, if it is a
          technical issue, a screenshot of what you see.
        </p>
        <p className="mail-line">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </section>

      <section className="section">
        <h2>What we can help with</h2>
        <ul>
          <li><strong>Setup and Google connection:</strong> connecting a Google Business Profile, syncing reviews, or fixing a connection that stopped working.</li>
          <li><strong>AI replies:</strong> tone, language, length, and why a reply was drafted a certain way.</li>
          <li><strong>Billing and plans:</strong> upgrading, downgrading, invoices and refund questions.</li>
          <li><strong>Privacy and data:</strong> deleting your account, removing connected Google data, or questions about our privacy policy.</li>
          <li><strong>Partnerships:</strong> agencies and multi-location businesses managing reviews for clients.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Response times</h2>
        <p>
          Support runs Monday to Saturday, 10:00 to 19:00 IST. Most messages get a reply
          the same day, and every message gets one within one business day. Billing and
          data-deletion requests are handled within 7 days, as described in our privacy
          policy.
        </p>
      </section>

      <section className="section">
        <h2>Business details</h2>
        <p>
          ReviewReply AI is an independent software product built and operated by Afnan
          Khan, India. For formal correspondence, legal notices or data protection
          requests, write to the same address with the subject line &quot;Legal&quot; or
          &quot;Data request&quot; and it will be routed to the right place.
        </p>
      </section>

      <section className="section cta">
        <h2>Want to see the product first?</h2>
        <p>Start with your Google Business Profile and generate your first AI reply in a few minutes.</p>
        <a className="cta-button" href="https://www.reviewreply-ai.in/">Get started</a>
      </section>

      <style>{`
        .contact-page { max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.7; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 600; margin-bottom: 0.75rem; }
        h1 { font-size: 2.1rem; line-height: 1.2; margin: 0 0 1rem; font-weight: 700; color: #14213d; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.05rem; color: #454e63; margin: 0; }
        .section { margin: 2.5rem 0; }
        h2 { font-size: 1.35rem; color: #14213d; margin: 0 0 0.85rem; font-weight: 700; }
        p { font-size: 1.02rem; margin: 0 0 1rem; }
        ul { font-size: 1.02rem; margin: 0 0 1rem; padding-left: 1.4rem; }
        li { margin-bottom: 0.5rem; }
        strong { color: #14213d; }
        .mail-line { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.1rem; }
        .mail-line a { color: #14213d; font-weight: 600; text-decoration: none; border-bottom: 2px solid #b8860b; padding-bottom: 2px; }
        .cta { text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta-button { display: inline-block; margin-top: 0.5rem; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; font-size: 0.98rem; }
        @media (max-width: 640px) { h1 { font-size: 1.7rem; } }
      `}</style>
    </main>
  );
}
