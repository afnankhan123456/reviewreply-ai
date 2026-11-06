import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Target, Users, Rocket, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "About ReviewReply AI | Founded by Afnan Khan",
  description:
    "ReviewReply AI was founded by Afnan Khan to help businesses automate Google review replies, track sentiment, and grow their online reputation.",
  alternates: {
    canonical: "https://www.reviewreply-ai.in/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ReviewReply AI",
    url: "https://www.reviewreply-ai.in/about",
    mainEntity: {
      "@type": "Organization",
      name: "ReviewReply AI",
      url: "https://www.reviewreply-ai.in",
      founder: {
        "@type": "Person",
        name: "Afnan Khan",
        jobTitle: "Founder",
        description:
          "Data scientist with deep expertise in machine learning and AI systems.",
        sameAs: ["https://www.linkedin.com/in/afnan-khan-byte/"],
      },
    },
  };

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_10%,rgba(255,45,85,0.15),transparent_70%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(180,0,60,0.2),transparent_70%),radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(80,0,50,0.25),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative z-10 px-5 pt-20 pb-16 md:pt-28 md:pb-20 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#ff2d55] mb-4">
          <Sparkles className="w-4 h-4" />
          About Us
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          About <span className="text-[#ff2d55]">ReviewReply AI</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          ReviewReply AI was founded by{" "}
          <span className="text-white font-semibold">Afnan Khan</span> to help
          businesses stop losing time and reputation to unanswered Google
          reviews.
        </p>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-4xl mx-auto">
        <div className="rounded-2xl border border-[#ff2d55]/20 bg-white/5 backdrop-blur-sm p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
            Our Story
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            <span className="text-white font-semibold">Afnan Khan</span>, a
            data scientist with deep expertise in machine learning, founded
            ReviewReply AI after seeing how many small and growing businesses
            struggled to keep up with Google reviews &mdash; missing negative
            feedback, replying inconsistently, and spending hours every week
            writing responses by hand.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            The goal was simple: build a tool that connects directly to a
            Google Business Profile, understands each review&apos;s context,
            and generates fast, on-brand replies &mdash; so no business owner
            has to choose between running their business and managing their
            reputation.
          </p>
          <a
            href="https://www.linkedin.com/in/afnan-khan-byte/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff2d55] hover:text-[#ff5577] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            Connect with the founder on LinkedIn
          </a>
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center mb-10">
          What Drives <span className="text-[#ff2d55]">Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Purpose-built",
              desc: "Focused entirely on Google Business Profile reviews, not a dozen platforms nobody uses.",
            },
            {
              icon: Users,
              title: "Built for owners",
              desc: "Designed for real business owners and teams, not enterprise agencies with big budgets.",
            },
            {
              icon: Rocket,
              title: "Always improving",
              desc: "Continuously refined based on how businesses actually manage their online reputation.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[#ff2d55]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-[#ff2d55]" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          What ReviewReply AI <span className="text-[#ff2d55]">does</span>
        </h2>
        <p className="text-gray-400 leading-relaxed mb-8 max-w-3xl">
          ReviewReply AI is a review management workspace for businesses that live on
          Google search results: clinics, salons, gyms, restaurants, hotels, retail stores
          and the agencies that manage them. It connects to a Google Business Profile,
          pulls in every review, and drafts a reply for each one so nothing sits
          unanswered for weeks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: "Google Business Profile sync",
              desc: "Connect your profile once and new reviews appear in one inbox instead of scattered across locations.",
            },
            {
              title: "AI-drafted replies",
              desc: "Replies are written from the review text, your business type and the tone you choose - professional, friendly, empathetic or formal.",
            },
            {
              title: "Approve before publishing",
              desc: "Nothing goes live automatically. You read the draft, edit a word if you want, and publish with one click.",
            },
            {
              title: "Sentiment and topic tagging",
              desc: "Every review is tagged positive, neutral or negative and grouped by topic, so you can see what customers keep mentioning.",
            },
            {
              title: "Low-rating alerts",
              desc: "One and two star reviews trigger a notification immediately, because those are the ones that cost customers.",
            },
            {
              title: "Reports you can share",
              desc: "Monthly summaries of ratings, response rate and response time - useful for owners and for agencies reporting to clients.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
          How it <span className="text-[#ff2d55]">works</span>
        </h2>
        <ol className="space-y-4">
          {[
            "Sign in with Google and authorise read access to your Business Profile reviews.",
            "Reviews sync into your dashboard, newest first, with rating and language detected.",
            "ReviewReply AI drafts a reply for each review. You can regenerate it, change the tone, or edit the text.",
            "Publish the reply to Google, and the review is marked as answered so you never reply twice.",
          ].map((step, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/30 text-[#ff2d55] text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-xl font-extrabold tracking-tight mb-3">Who it is for</h2>
            <ul className="text-sm text-gray-400 space-y-2 leading-relaxed">
              <li>Single-location businesses that get a handful of reviews a week.</li>
              <li>Multi-location brands that need one view across every branch.</li>
              <li>Agencies replying to reviews on behalf of client businesses.</li>
              <li>Owners who want replies written in English, Hindi or Hinglish.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
            <h2 className="text-xl font-extrabold tracking-tight mb-3">Pricing</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Two plans, no call with a sales team and no lock-in: Basic at $9 per month
              for reply drafting, and Standard at $29 per month for AI replies, sentiment
              analysis, alerts, reports and team members.
            </p>
            <Link href="/plans" className="text-sm font-semibold text-[#ff2d55] hover:text-[#ff5577]">
              Compare plans &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-12 max-w-4xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <h2 className="text-xl font-extrabold tracking-tight mb-3">
            How we treat your data
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            We ask for the minimum Google access the product needs: your basic profile,
            your Business Profile locations, their reviews and the replies you publish. We
            do not request Gmail, Drive, Calendar, Contacts, Photos or YouTube. Access is
            granted only after you approve it on Google&apos;s consent screen, and you can
            revoke it at any time.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#ff2d55]">
            <Link href="/legal/privacy-policy" className="hover:text-[#ff5577]">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-[#ff5577]">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#ff5577]">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-16 md:py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          Ready to take control of your reviews?
        </h2>
        <p className="text-gray-400 mb-8">
          Connect your Google Business Profile and let ReviewReply AI handle
          the rest.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#ff2d55] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#e0264b] transition-colors"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
