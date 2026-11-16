import type { Metadata } from "next";
import PublicNav from "@/components/PublicNav";

export const metadata: Metadata = {
  title: "Afnan Khan — Founder & Author, ReviewReply AI",
  description:
    "Afnan Khan is a data scientist and the founder of ReviewReply AI. He writes the practical guides on Google reviews, review reply quality and local reputation management published on this site.",
  alternates: {
    canonical: "https://www.reviewreply-ai.in/author/afnan-khan",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Afnan Khan",
  jobTitle: "Founder, ReviewReply AI",
  url: "https://www.reviewreply-ai.in/author/afnan-khan",
  description:
    "Data scientist and founder of ReviewReply AI, building tools that help small businesses handle Google reviews without losing hours every week.",
  knowsAbout: [
    "Google Business Profile",
    "Review management",
    "Local SEO",
    "Machine learning",
    "Customer experience",
  ],
  sameAs: ["https://www.linkedin.com/in/afnan-khan-byte/"],
  worksFor: {
    "@type": "Organization",
    name: "ReviewReply AI",
    url: "https://www.reviewreply-ai.in",
  },
};

export default function AuthorPage() {
  return (
    <main className="author-wrap">
      <PublicNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section>
        <p className="eyebrow">About the author</p>
        <h1>Afnan Khan</h1>
        <p className="role">Data scientist · Founder of ReviewReply AI</p>

        <p>
          I build tools for small businesses, and I write most of the guides published on this
          site. My background is in data science and machine learning, which is why the writing here
          leans on concrete mechanics: what a Google review actually contains, what a reply can and
          cannot fix, and where automation helps versus where it makes a business look careless.
        </p>

        <p>
          ReviewReply AI started from a simple observation while working with local businesses on
          their data: almost none of them had a review problem, they had a <em>response</em> problem.
          Reviews would sit unanswered for weeks, negative ones longest of all, because writing a
          careful reply takes time nobody has during a working day. The product exists to close that
          gap, and the guides on this site exist to explain the thinking behind it.
        </p>

        <h2>What I write about</h2>
        <ul>
          <li>How Google reviews and Google Business Profile actually behave, including policy limits</li>
          <li>Reply strategy: tone, length, escalation and what to avoid during disputes</li>
          <li>When an AI draft is safe to publish and when a person has to write the reply</li>
          <li>Measuring reputation work so it is not just guesswork</li>
        </ul>

        <h2>How the guides are written</h2>
        <p>
          Each guide starts from the Google documentation and the product&apos;s own behaviour, then
          adds the awkward cases that documentation leaves out: the review that names an employee,
          the customer who threatens legal action, the reviewer who was never a customer. Where I am
          unsure about something, the guide says so instead of inventing a statistic. If you spot an
          error, mail me and I will correct it and note the change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, corrections or a topic you want covered: <strong>support@reviewreply-ai.in</strong>{" "}
          or use the <a href="/contact">contact page</a>. You can also read more{" "}
          <a href="/about">about ReviewReply AI</a>.
        </p>

        <h2>Selected guides</h2>
        <ul>
          <li>
            <a href="/blog/how-to-reply-to-a-1-star-google-review">
              How to reply to a 1-star Google review
            </a>
          </li>
          <li>
            <a href="/blog/how-to-report-and-remove-fake-google-reviews">
              How to report and remove fake Google reviews
            </a>
          </li>
          <li>
            <a href="/blog/google-review-reply-examples-by-industry">
              Reply examples by industry
            </a>
          </li>
          <li>
            <a href="/blog/does-replying-to-google-reviews-affect-ranking">
              Does replying to Google reviews affect ranking?
            </a>
          </li>
        </ul>
      </section>

      <style>{`
        .author-wrap { max-width: 720px; margin: 0 auto; padding: 2.5rem 1.5rem 5rem; font-family: 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; color: #1c2333; background: #fbf9f4; line-height: 1.75; }
        .author-wrap .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: #b8860b; font-weight: 700; margin-bottom: 0.6rem; }
        .author-wrap h1 { font-size: 2.3rem; line-height: 1.15; margin: 0 0 0.4rem; color: #14213d; letter-spacing: -0.02em; }
        .author-wrap .role { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 0.92rem; color: #6b7488; margin: 0 0 2rem; }
        .author-wrap h2 { font-size: 1.28rem; margin: 2.2rem 0 0.7rem; color: #14213d; }
        .author-wrap p { margin: 0 0 1.1rem; }
        .author-wrap ul { margin: 0 0 1.2rem; padding-left: 1.2rem; }
        .author-wrap li { margin-bottom: 0.5rem; }
        .author-wrap a { color: #14213d; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #b8860b; }
      `}</style>
    </main>
  );
}
