import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Review Reply Examples by Industry (Restaurants, Clinics, Salons, Gyms)',
  description:
    'Industry-specific Google review reply examples with the reasoning behind each one: restaurants, dental clinics, salons, gyms, hotels, real estate and auto service.',
  alternates: {
    canonical: 'https://www.reviewreply-ai.in/blog/google-review-reply-examples-by-industry',
  },
};

const lastUpdated = new Date().toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

const industries = [
  {
    name: 'Restaurants and cafes',
    context:
      'Reviews here mention specific dishes, wait times and noise. Generic replies waste the best SEO asset you have: dish names that people search for.',
    positive:
      'Thank you for coming in and for mentioning the Chettinad mutton biryani by name. Our kitchen team will be glad to hear it landed. If you are back on a Friday, ask for the weekend special: it is the same spice base with a slower cook.',
    negative:
      'You waited 35 minutes for a main course and I am sorry, that is longer than we aim for on a Tuesday. We have added a second runner during the 8 to 10 pm window, which is when the kitchen bottlenecks. If you give us another evening, message us first and we will hold a table away from the door.',
  },
  {
    name: 'Dental clinics',
    context:
      'Patients mention pain, waiting, cost surprises and specific procedures. Never confirm treatment details in public; keep clinical specifics out of the reply.',
    positive:
      'Thank you for the kind words about Dr Menon and the front desk. We have passed this on to the team. For your next visit, the reminder call will come two days ahead as usual, so you can plan around it.',
    negative:
      'I am sorry the final bill was higher than the estimate you were given. You are right that the difference should have been explained before the procedure, not at payment. We now send a written estimate by WhatsApp that the patient approves before we start. Please call reception and ask for the clinic manager so we can review your invoice line by line.',
  },
  {
    name: 'Salons and spas',
    context:
      'Expect comments on colour, cut, hygiene and therapist behaviour. Be specific about the service, and never argue about what a photo showed.',
    positive:
      'Thank you for the review, and for trusting us with a big colour change. Balayage on previously treated hair needs that extra toning step, which is why we booked the longer slot. Enjoy the new look and message us if you want the care routine we discussed.',
    negative:
      'The cut being shorter than you asked for is on us, and I am sorry. I have reviewed the consultation checklist with the team: the length you want in centimetres now has to be written down before the first cut. Please book with our senior stylist this week at no charge if you would like us to refine the shape.',
  },
  {
    name: 'Gyms and fitness studios',
    context:
      'Reviews cover equipment condition, crowding at peak hours, trainer attention and billing. Billing complaints are the most damaging, so answer those with a specific resolution.',
    positive:
      'Thanks for mentioning the 6 am strength slot and coach Rakesh. That block is capped at 12 people on purpose, so everyone gets form checks. See you next week.',
    negative:
      'A renewal charged without your confirmation is not acceptable, and I am sorry. We have refunded the charge and switched your account to manual renewal. If the confirmation message never reached you, that is the same bug: our SMS provider was changed on the 1st and the templates were not re-approved.',
  },
  {
    name: 'Hotels and guest houses',
    context:
      'Guests mention rooms by type, noise, breakfast and check-in delays. Naming the actual fix is what separates a real reply from a copy-paste one.',
    positive:
      'Thank you for the detailed review, especially about the breakfast spread and the early check-in. We keep two rooms ready before 11 am for exactly that reason. Come back in the winter: the terrace is much better then.',
    negative:
      'Street noise until midnight and a slow check-in is a poor combination, and I am sorry. Those front rooms are getting secondary glazing next month; until then we are moving light sleepers to the courtyard side on request. If you book again, write to me directly and I will handle the allocation.',
  },
  {
    name: 'Real estate and property',
    context:
      'Reviews often involve money, timelines and paperwork. Keep public replies factual and never discuss a specific client transaction or legal dispute.',
    positive:
      'Thank you for the review. The paperwork side of a resale is never quick, and it helped that you kept the documents ready in advance. We wish you well in the new flat.',
    negative:
      'I am sorry the handover took longer than the date we gave you. The delay came from the society NOC, but we should have updated you every few days instead of only when you called. We have since added a weekly status email for every active deal. Please call the office and ask for the operations head so we can go through the pending items on your file.',
  },
  {
    name: 'Auto service and repair',
    context:
      'Reviews mention cost, repeat faults and waiting. Customers value honesty about what was replaced and why, so use the reply to show it.',
    positive:
      'Thanks for the review. The brake job on that model takes longer because of the sensor reset, which is why we keep the car for the day. Happy to have it running properly again.',
    negative:
      'The same fault coming back within two weeks means we did not diagnose the root cause, and that is our mistake. Bring the car in and we will redo the diagnosis and the part at no cost, and give you the old component so you can see what failed. I have also asked the workshop to photograph every replaced part from this month onwards.',
  },
];

export default function ReplyExamplesByIndustry() {
  return (
    <article className="article">
      <header className="hero">
        <div className="eyebrow">EXAMPLES &bull; BY INDUSTRY</div>
        <h1>Google Review Reply Examples by Industry</h1>
        <p className="dek">
          A reply that works for a dentist sounds wrong coming from a restaurant. These
          examples are written for the reviews each industry actually receives, with a note
          on what the reply is doing and why that detail matters.
        </p>
        <div className="meta">
          <span>Last updated: {lastUpdated}</span>
          <span className="dot">&bull;</span>
          <span>7 min read</span>
        </div>
      </header>

      <section className="section">
        <h2>Why industry matters more than tone</h2>
        <p>
          Most reply advice is about tone: be warm, be brief, be professional. Tone is the
          easy part. What separates a reply that converts a reader from one that reads like
          a template is whether it engages with the thing that industry gets complained
          about. Restaurant reviews are about time and food; clinics about cost and pain;
          salons about expectation versus result; gyms about billing and crowding.
        </p>
        <p>
          Each pair below shows a five-star reply and a one-star reply for the same
          industry, because the two need different jobs done. The positive reply should
          reinforce what you want more of. The negative reply has to prove that a human
          understood the failure.
        </p>
      </section>

      <section className="section">
        {industries.map((ind) => (
          <div key={ind.name} className="industry">
            <h2>{ind.name}</h2>
            <p className="context">{ind.context}</p>
            <p className="label good">Replying to positive feedback</p>
            <p className="good-text">{ind.positive}</p>
            <p className="label bad">Replying to a complaint</p>
            <p className="bad-text">{ind.negative}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>What every one of these has in common</h2>
        <ol>
          <li>
            <strong>A named detail.</strong> A dish, a room, a procedure, a staff member, a
            time of day. Specificity is the cheapest proof of authenticity.
          </li>
          <li>
            <strong>An operational change, not a promise.</strong> &ldquo;We now&hellip;&rdquo;
            beats &ldquo;we will try to&hellip;&rdquo; every time.
          </li>
          <li>
            <strong>A private channel for the messy part.</strong> Refunds, medical details
            and contracts never belong in a public reply. Offer the channel, not the detail.
          </li>
          <li>
            <strong>Around 70 to 100 words.</strong> Long enough to be specific, short
            enough that people finish it.
          </li>
        </ol>
      </section>

      <section className="section">
        <h2>Adapting these to your own business</h2>
        <p>
          Swap the named detail for something only your staff would know: the table by the
          window, the second-floor treatment room, the Wednesday delivery. Then swap the fix
          for something you have genuinely changed or can change this week. If there is
          nothing true to say, say less rather than inventing a process.
        </p>
        <p>
          For the underlying structure see{" "}
          <a href="/blog/how-to-reply-to-a-1-star-google-review">
            how to reply to a 1-star review
          </a>
          , for ready-made wording see the{" "}
          <a href="/blog/google-review-response-templates">reply template library</a>, and
          for policy-breaking reviews see{" "}
          <a href="/blog/how-to-report-and-remove-fake-google-reviews">
            reporting and removing fake reviews
          </a>
          .
        </p>
        <p>
          If you would rather not write these by hand,{" "}
          <a href="https://www.reviewreply-ai.in/">ReviewReply AI</a> drafts a reply for
          each new review using the tone and language you select, and publishes it to Google
          once you approve it.
        </p>
      </section>

      <footer className="author">
        <p>
          <strong>Written by Afnan Khan</strong>, founder of ReviewReply AI. Afnan builds
          review-management tooling for small businesses and writes about Google Business
          Profile practice and local reputation. Connect on{" "}
          <a href="https://www.linkedin.com/in/afnan-khan-byte" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
      </footer>

      <style>{`
        .article { max-width: 760px; margin: 0 auto; padding: 3rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.75; }
        .hero { margin-bottom: 2.5rem; }
        .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 700; margin-bottom: 0.75rem; }
        h1 { font-size: 2.2rem; line-height: 1.18; margin: 0 0 1rem; color: #14213d; }
        .dek { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 1.05rem; color: #454e63; margin: 0 0 1rem; }
        .meta { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.85rem; color: #6b7385; display: flex; gap: 0.5rem; }
        .section { margin: 2.4rem 0; }
        h2 { font-size: 1.42rem; color: #14213d; margin: 1.8rem 0 0.7rem; line-height: 1.3; }
        p { font-size: 1.03rem; margin: 0 0 1rem; }
        ul, ol { font-size: 1.03rem; padding-left: 1.4rem; margin: 0 0 1rem; }
        li { margin-bottom: 0.6rem; }
        strong { color: #14213d; }
        a { color: #14213d; text-decoration: underline; text-decoration-color: #b8860b; text-underline-offset: 3px; }
        .industry { background: #ffffff; border: 1px solid #e7e0d2; border-radius: 12px; padding: 1.4rem 1.5rem; margin: 1.4rem 0; }
        .industry h2 { margin-top: 0; font-size: 1.2rem; }
        .context { font-size: 0.97rem; color: #454e63; }
        .label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; margin: 1rem 0 0.3rem; }
        .label.bad { color: #a33; } .label.good { color: #2c7a52; }
        .bad-text { background: #fdf1f1; border-radius: 8px; padding: 0.8rem 1rem; font-size: 0.98rem; }
        .good-text { background: #f0f7f2; border-radius: 8px; padding: 0.8rem 1rem; font-size: 0.98rem; }
        .author { margin-top: 3rem; border-top: 1px solid #e7e0d2; padding-top: 1.5rem; font-size: 0.95rem; color: #454e63; }
        @media (max-width: 640px) { h1 { font-size: 1.7rem; } h2 { font-size: 1.25rem; } }
      `}</style>
    </article>
  );
}
