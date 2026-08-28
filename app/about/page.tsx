import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Target, Users, Rocket } from "lucide-react";

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
            <span className="text-white font-semibold">Afnan Khan</span>{" "}
            founded ReviewReply AI after seeing how many small and growing
            businesses struggled to keep up with Google reviews &mdash;
            missing negative feedback, replying inconsistently, and spending
            hours every week writing responses by hand.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The goal was simple: build a tool that connects directly to a
            Google Business Profile, understands each review&apos;s context,
            and generates fast, on-brand replies &mdash; so no business owner
            has to choose between running their business and managing their
            reputation.
          </p>
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
