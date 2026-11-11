import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Reviews FAQ: Replies, Ratings, Removal & Policy Answers',
  description:
    'Straight answers to the questions business owners ask most about Google reviews: reply timing, ratings maths, removal policy, review requests, language and local SEO.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/faq',
  },
};

const groups = [
  {
    title: 'Replying to reviews',
    items: [
      {
        q: 'How fast should a business reply to a Google review?',
        a: 'Within 24 to 48 hours for anything under four stars, and within a week for positive reviews. Speed matters less for the reviewer, who has usually moved on, than for the next person reading the listing. A reply written after two weeks reads like an afterthought, and readers notice.',
      },
      {
        q: 'Does replying to reviews improve local ranking?',
        a: 'Not directly. Google has said that owner responses are not a ranking factor. What responses do affect is click-through and conversion: people choose between two nearby businesses based on the rating and how the owner behaves in the replies. Response rate also shows the profile is actively managed, which matters for trust signals.',
      },
      {
        q: 'Should I reply differently to 5-star reviews?',
        a: 'Yes, but shorter. A good five-star reply names the specific thing that went well and stays under 40 words. Long replies to praise waste the reader\u2019s attention; the useful work happens under complaints.',
      },
      {
        q: 'Can I use the same reply for every review?',
        a: 'No. Identical replies are the single clearest sign of an unmanaged profile, and Google can filter repetitive content. Two or three sentences with one specific detail from the review is enough to avoid it.',
      },
      {
        q: 'Should I reply in the language the customer used?',
        a: 'Yes. If the review is in Hindi, Marathi or Tamil, reply in that language or in the language mix the customer used. A Hindi review answered in English reads as boilerplate to every reader who wrote in Hindi.',
      },
    ],
  },
  {
    title: 'Ratings and averages',
    items: [
      {
        q: 'How many 5-star reviews does it take to offset a 1-star?',
        a: 'Roughly, one 1-star review pulls the average down by about 0.2 stars on a profile with 20 reviews, and by less as the count grows. On a profile with 10 reviews, one 1-star drops the average by nearly 0.4 stars. The practical fix is volume of genuine reviews, not argument.',
      },
      {
        q: 'Do old reviews count towards my rating?',
        a: 'Yes. Google does not expire reviews by age, so a two-year-old complaint still counts. Reviews are only removed for policy violations or when a business closes or moves.',
      },
      {
        q: 'Can I delete a bad review?',
        a: 'You cannot delete a review yourself. You can report it if it breaks Google policy (spam, fake, offensive, off-topic, personal data, conflict of interest). If it describes a real experience, it stays and the reply is your only lever.',
      },
    ],
  },
  {
    title: 'Getting more reviews',
    items: [
      {
        q: 'Is it allowed to ask customers for reviews?',
        a: 'Yes, asking is allowed. What is not allowed is offering money or discounts in exchange for reviews, or filtering out unhappy customers so only happy ones are asked. Both can get reviews filtered and, in repeated cases, the listing suspended.',
      },
      {
        q: 'What is the best time to ask?',
        a: 'At the moment the customer is satisfied, at the counter or in the follow-up message the same day. A WhatsApp or SMS link sent within an hour converts far better than an email sent a week later.',
      },
      {
        q: 'Can I send a direct review link instead of asking people to search?',
        a: 'Yes, and you should. A short link that opens the review form on the customer\u2019s phone removes the search step, which is where most requests die.',
      },
    ],
  },
  {
    title: 'About ReviewReply AI',
    items: [
      {
        q: 'What does ReviewReply AI actually do?',
        a: 'It connects to your Google Business Profile, pulls in reviews, and drafts a reply for each one in the tone and language you choose. You approve or edit the draft, then publish it to Google from the dashboard.',
      },
      {
        q: 'Which Google data does it access?',
        a: 'Your basic profile (name, email, picture), your Business Profile locations, their reviews and the replies you publish. It does not request Gmail, Drive, Calendar, Contacts, Photos or YouTube, and access can be revoked at any time from your Google account.',
      },
      {
        q: 'How much does it cost?',
        a: 'Basic is $9 per month for reply drafting. Standard is $29 per month and adds AI replies with tone control, sentiment analysis, alerts on low ratings, reports and team members. There is no setup fee and no annual lock-in.',
      },
      {
        q: 'Do replies publish automatically?',
        a: 'No. Every reply waits for your approval. Automatic publishing is possible, but we default to manual approval because a wrong public reply is harder to undo than a wrong draft.',
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((g) =>
      g.items.map((i) => ({
        '@type': 'Question',
        name: i.q,
        acceptedAnswer: { '@type': 'Answer', text: i.a },
      }))
    ),
  };

  return (
    <main className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="hero">
        <div className="eyebrow">FAQ</div>
        <h1>Google Reviews: Straight Answers</h1>
        <p className="dek">
          The questions business owners actually ask about Google reviews, answered without
          padding. Reply timing, rating maths, removal policy, review requests, and how
          ReviewReply AI handles your data.
        </p>
      </header>

      {groups.map((g) => (
        <section key={g.title} className="group">
          <h2>{g.title}</h2>
          {g.items.map((i) => (
            <details key={i.q} className="qa">
              <summary>{i.q}</summary>
              <p>{i.a}</p>
            </details>
          ))}
        </section>
      ))}

      <section className="cta">
        <h2>Want the replies written for you?</h2>
        <p>
          Connect your Google Business Profile and ReviewReply AI drafts a reply for every
          new review. You approve, it publishes.
        </p>
        <a className="cta-button" href="https://www.reviewreply-ai.in/">
          Get started
        </a>
      </section>

      <p className="more">
        Deeper reading:{' '}
        <a href="/blog/how-to-reply-to-a-1-star-google-review">replying to 1-star reviews</a>
        {' '}&middot;{' '}
        <a href="/blog/how-to-report-and-remove-fake-google-reviews">reporting fake reviews</a>
        {' '}&middot;{' '}
        <a href="/blog/google-review-reply-examples-by-industry">examples by industry</a>
      </p>

      <style>{`
        .faq-page { max-width: 780px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.75; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 700; margin-bottom: 0.75rem; }
        h1 { font-size: 2.1rem; line-height: 1.2; margin: 0 0 1rem; color: #14213d; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.05rem; color: #454e63; margin: 0; }
        .group { margin: 2.5rem 0; }
        h2 { font-size: 1.35rem; color: #14213d; margin: 0 0 1rem; }
        .qa { background: #ffffff; border: 1px solid #e7e0d2; border-radius: 10px; padding: 1rem 1.2rem; margin-bottom: 0.7rem; }
        .qa summary { cursor: pointer; font-weight: 700; color: #14213d; font-size: 1.02rem; }
        .qa p { margin: 0.8rem 0 0; font-size: 0.99rem; color: #454e63; }
        a { color: #14213d; text-decoration: underline; text-decoration-color: #b8860b; text-underline-offset: 3px; }
        .cta { margin-top: 3rem; text-align: center; background: #fbf3d9; border-radius: 14px; padding: 2.5rem 1.5rem; }
        .cta h2 { margin-bottom: 0.5rem; }
        .cta p { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1rem; margin: 0 0 1rem; }
        .cta-button { display: inline-block; background: #14213d; color: #fbf9f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-decoration: none; padding: 0.85rem 1.75rem; border-radius: 8px; }
        .more { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.95rem; margin-top: 2rem; color: #454e63; }
        @media (max-width: 640px) { h1 { font-size: 1.7rem; } }
      `}</style>
    </main>
  );
}
