import type { Metadata } from "next";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import {
  MessageSquareText, ShieldCheck, Sparkles, BarChart3, RefreshCw, Star, Check, Info,
} from "lucide-react";

const APP_NAME = "ReviewReply AI"; // ⚠️ must be IDENTICAL to the name on OAuth consent screen
const SITE = "https://www.reviewreply-ai.in";

export const metadata: Metadata = {
  title: "ReviewReply AI – Affordable AI Google Review Management Software (from $9/mo)",
  description:
    "Reply to Google reviews with AI. ReviewReply AI is Google Business Profile review management software for small businesses. Plans from $9/month, AI replies from $29/month.",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: "ReviewReply AI – Affordable AI Google Review Management Software",
    description: "AI review replies, Google review sync and reputation analytics for small businesses. From $9/month.",
    url: SITE,
    images: [`${SITE}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewReply AI – Affordable AI Google Review Management Software",
    description: "Reply to Google reviews with AI. Plans from $9/month.",
    images: [`${SITE}/og-image.png`],
  },
};

const standardFeatures = [
  "2 Business Locations",
  "500 AI Replies / Month",
  "Google Business Connection",
  "Google Review Sync",
  "Manual Review Sync",
  "Review Dashboard",
  "Review Management",
  "New Review Email Alerts",
  "Email Notifications",
  "Unanswered Reviews Tracking",
  "Rating Overview",
  "Positive & Negative Detection",
  "Sentiment Analysis",
  "Review Tags & Categories",
  "Top 20 Review Keywords",
  "Review Search & Filter",
  "AI Review Reply Generator",
  "AI Reply Center",
  "500 AI Reply Templates",
  "Response Rate Tracking",
  "Basic Analytics",
  "Advanced Analytics",
  "Analytics Dashboard",
  "Low Rating Alerts",
  "Alerts Dashboard",
  "Monthly PDF Report",
  "Weekly Performance Report",
  "Reports Dashboard",
  "CSV Export",
  "PDF Export",
  "QR Code Generator",
  "Email Review Requests",
  "2 Team Members",
  "Team Management",
  "Dashboard Settings",
  "Support Ticket System",
  "Bug Reporting",
  "Knowledge Base / Help Center",
  "Priority Support",
  "Custom Review Filters",
  "Unified Inbox",
  "Social Media Sharing",
  "WhatsApp Review Requests",
  "Public Review Page",
];

const prices = [
  { name: "ReviewReply AI – Basic", price: "$9/month", us: true },
  { name: "ReviewReply AI – Standard (AI features)", price: "$29/month", us: true },
  { name: "SocialPilot Reviews", price: "~$25.50/month" },
  { name: "Synup", price: "~$34.99/month" },
  { name: "BrightLocal (Core)", price: "$39/month" },
  { name: "NiceJob", price: "~$75/month" },
  { name: "ReviewTrackers", price: "~$89/month" },
  { name: "Birdeye", price: "~$299/month" },
  { name: "Podium", price: "~$399/month" },
];

const comparisons = [
  { href: "/compare/brightlocal-vs-reviewreply-ai", label: "BrightLocal", note: "Core plan is $39/month; ReviewReply AI starts at $9/month." },
  { href: "/compare/birdeye-vs-reviewreply-ai", label: "Birdeye", note: "Starts around $299/month; ReviewReply AI's AI plan is $29/month." },
  { href: "/compare/podium-vs-reviewreply-ai", label: "Podium", note: "Starts around $399/month; a lighter option for small businesses." },
  { href: "/compare/reviewtrackers-vs-reviewreply-ai", label: "ReviewTrackers", note: "Starts around $89/month." },
  { href: "/compare/socialpilot-vs-reviewreply-ai", label: "SocialPilot Reviews", note: "Starts around $25.50/month." },
];

const audiences = [
  ["Restaurants", "Answer diner reviews quickly, including complaints."],
  ["Clinics & Dentists", "Keep replies professional and consistent."],
  ["Gyms", "Respond to member feedback and ask happy members for reviews."],
  ["Salons", "Turn regular clients into reviewers with QR codes and WhatsApp requests."],
  ["Retail Stores", "Monitor reviews across busy periods."],
  ["Local Businesses", "Save time without an enterprise budget."],
  ["Marketing Agencies", "Manage review replies for several clients with team access and reports."],
];

const benefits = [
  "Save hours each week on review replies",
  "Respond faster and more consistently",
  "Never miss a new review with alerts",
  "Understand customer sentiment at a glance",
  "Ask for more reviews via QR, email and WhatsApp",
  "Pay a fraction of enterprise platform prices",
];

const steps = [
  ["Sign in with Google", "Connect your Google Business Profile."],
  ["Sync reviews", "Automatically, or manually when you need it."],
  ["Generate an AI reply", "Use the AI Reply Center to draft a response."],
  ["Edit and approve", "Publish to Google only after your approval."],
  ["Track results", "Use analytics and reports to measure response performance."],
];

const faqs: [string, string][] = [
  ["What is the best AI Google review management tool?", "The best tool depends on budget and needs. ReviewReply AI is an affordable option for small businesses, with Google Business Profile integration, AI reply generation and analytics from $9/month (AI features from $29/month)."],
  ["What is the cheapest AI review management software?", "Based on publicly available pricing of the tools compared, ReviewReply AI's $9/month starting price and $29/month AI plan are among the lowest."],
  ["Which software can automatically reply to Google reviews?", "ReviewReply AI generates AI replies to Google reviews. You can approve replies before publishing, or use your own automation settings."],
  ["How do I manage Google reviews with AI?", "Connect your Google Business Profile, sync reviews, generate AI reply drafts, edit them, and publish from one dashboard."],
  ["What is the best alternative to Birdeye?", "For small businesses looking for a more affordable option, ReviewReply AI is an alternative to Birdeye. Based on publicly available pricing, Birdeye starts at around $299/month, while ReviewReply AI's AI plan starts at $29/month. Birdeye offers additional enterprise features that may be better suited for larger organizations."],
  ["What is the best alternative to Podium?", "For small businesses looking for a more affordable option focused on Google reviews, ReviewReply AI is an alternative to Podium. Based on publicly available pricing, Podium starts at around $399/month, while ReviewReply AI's AI plan starts at $29/month. Podium offers additional messaging and payments features that may be better suited for larger organizations."],
  ["What is the best alternative to BrightLocal?", "For small businesses looking for a more affordable option, ReviewReply AI is an alternative to BrightLocal. Based on publicly available pricing, BrightLocal's Core plan starts at $39/month, while ReviewReply AI starts at $9/month with a focus on AI review replies. BrightLocal offers additional local SEO tools that may be better suited for agencies and multi-location businesses."],
  ["How much does Google review management software cost?", "Prices range from about $9/month to several hundred dollars per month depending on features and business size."],
  ["Can AI write Google review replies?", "Yes. AI can draft professional replies to positive and negative reviews. You should review and approve them."],
  ["Which review management software is best for small businesses?", "Small businesses usually benefit from simple, affordable tools. ReviewReply AI is built for this audience."],
  ["What is ReviewReply AI?", "An AI-powered Google review management platform that syncs reviews, drafts replies and shows analytics."],
  ["How much does ReviewReply AI cost?", "Basic is $9/month and Standard (with AI features) is $29/month."],
  ["Does ReviewReply AI connect to Google Business Profile?", "Yes, through Google sign-in."],
  ["Will AI post replies without my approval?", "No. Replies are not posted without your review or your explicit automation settings."],
  ["Can I sync reviews manually?", "Yes, manual sync is available in addition to automatic sync."],
  ["Does ReviewReply AI support sentiment analysis?", "Yes, it classifies review sentiment and shows trends."],
  ["Can I request reviews from customers?", "Yes, via QR code, email and WhatsApp."],
  ["Does it have a unified inbox?", "Yes."],
  ["Can I add team members?", "Yes, team management is included."],
  ["Can I search and filter reviews?", "Yes, with search, filters and tags."],
  ["Can I track which reviews I've replied to?", "Yes, through response tracking."],
  ["Does it provide reports?", "Yes, review reports are available."],
  ["Is ReviewReply AI good for restaurants?", "Yes, restaurants get many reviews and benefit from faster replies."],
  ["Is it suitable for clinics and dentists?", "Yes. Keep replies free of private patient information and always review AI drafts."],
  ["Can marketing agencies use it?", "Yes, with team access and reports."],
  ["Is my Google data safe?", "We use Google's secure authentication and only request needed permissions. We do not sell your data."],
  ["Do I need technical skills?", "No. Sign in with Google and start syncing."],
  ["Why is ReviewReply AI cheaper than other tools?", "It is focused on Google review management for small businesses, without enterprise overhead."],
  ["Is there a difference between Basic and Standard?", "Basic starts at $9/month; Standard is $29/month and includes AI features. See the pricing page for details."],
  ["How do I get started?", `Go to ${SITE} and click "Continue with Google".`],
  ["Who built ReviewReply AI?", "ReviewReply AI is built by Afnan Khan, an expert in machine learning and AI technology, to give small businesses an affordable way to manage Google reviews."],
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    url: SITE,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Affordable AI-powered Google review management software for small businesses. Sync Google Business Profile reviews, generate AI replies and track reputation.",
    offers: [
      { "@type": "Offer", name: "Basic", price: "9.00", priceCurrency: "USD", url: `${SITE}/basic` },
      { "@type": "Offer", name: "Standard", price: "29.00", priceCurrency: "USD", url: `${SITE}/standard` },
    ],
    featureList: standardFeatures,
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: APP_NAME,
    brand: { "@type": "Brand", name: APP_NAME },
    description: "AI Google review management software for small businesses.",
    url: `${SITE}/pricing`,
    offers: { "@type": "AggregateOffer", lowPrice: "9.00", highPrice: "29.00", priceCurrency: "USD", offerCount: "2" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/home` }],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

const card =
  "bg-gradient-to-b from-[#141008] to-[#0a0705] border border-[#d4af37]/25 rounded-2xl hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.35)] transition-all duration-500";
const section = "relative bg-[#050302] px-6 md:px-20 py-16 md:py-24 border-t border-[#d4af37]/10";
const h2 = "text-2xl md:text-3xl font-black text-white text-center mb-3";
const sub = "text-gray-400 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base";

/* ============================================================
   OLD CODE (Login UI) — all preserved
   ============================================================ */

// ✅ Google sign-in card (used in both mobile and desktop)
function GoogleCard() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Secure & Trusted",
      desc: "We use Google's secure authentication to protect your data.",
    },
    {
      icon: RefreshCw,
      title: "Instant Connection",
      desc: "Quickly connect your Google Business Profile in just a few clicks.",
    },
    {
      icon: Star,
      title: "All-in-One Dashboard",
      desc: "Manage reviews, replies, and reputation from a single powerful dashboard.",
    },
  ];

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(255,45,85,0.35)]">
      <video
        src="/logo-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-60 block object-cover"
      />

      <div className="p-7">
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="text-xl font-black text-white mb-2">
            Continue with Google to access <span className="text-blue-400">ReviewReply AI</span>
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            Securely sign in with your Google account to connect your Business Profile and get started.
          </p>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-4 mb-5">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#ff2d55]" />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <GoogleSignInButton className="w-full bg-white hover:bg-gray-100 transition-all text-[#111827] text-sm font-bold py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </GoogleSignInButton>
      </div>
    </div>
  );
}

function LoginHero() {
  return (
    <>
      {/* ✅ MOBILE HERO — purple/violet theme */}
      <div className="flex md:hidden min-h-[100dvh] flex-col justify-center relative bg-black px-5 py-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(141,108,240,0.20),transparent_65%),radial-gradient(ellipse_80%_50%_at_15%_100%,rgba(107,70,193,0.16),transparent_70%)]" />
          <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#8d6cf0] to-transparent opacity-20 blur-[80px]" />
          <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-[#6b46c1] to-transparent opacity-15 blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src="/ai-logo.png" alt={`${APP_NAME} logo`} className="w-9 h-9 object-contain" />
            {/* NOTE: was <h1>; changed to <div> so the page has only ONE <h1> (the SEO hero below) */}
            <div className="text-xl font-black tracking-tight text-white">
              ReviewReply <span className="text-[#a78bfa]">AI</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 mb-3 max-w-xs">
            <div className="flex items-center gap-1.5 text-[#ff2d55] mb-1">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">App Purpose</span>
            </div>
            <p className="text-[10px] font-semibold text-white leading-snug">
              {APP_NAME} is an AI-powered Google Business Profile review management platform.
              We help businesses sync, read, and reply to Google reviews with AI – all from one dashboard.
            </p>
          </div>

          <p className="text-[11px] font-semibold text-gray-200 leading-snug max-w-xs mb-5">
            {APP_NAME} is an AI-powered Google Business Profile review management platform
            that helps businesses manage and reply to Google reviews with AI.
          </p>

          <div className="w-full max-w-[26rem] -translate-y-10">
            <GoogleCard />
          </div>
        </div>
      </div>

      {/* ✅ DESKTOP HERO */}
      <div className="hidden md:flex min-h-[100dvh] flex-col justify-center relative bg-black overflow-hidden px-6 lg:px-10 py-8">
        <img
          src="/main-BG.webp"
          alt={`${APP_NAME} Background`}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        {/* 👇 zoom: 0.8 makes this render exactly like 80% browser zoom, even at normal 100% zoom */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16 max-w-7xl mx-auto w-full" style={{ zoom: 0.8 }}>
          <div className="max-w-3xl -translate-y-10 -translate-x-6">
            <div className="flex items-center gap-3 mb-4">
              <img src="/ai-logo.png" alt={`${APP_NAME} logo`} className="w-16 h-16 object-contain" />
              {/* NOTE: was <h1>; changed to <div> so the page has only ONE <h1> (the SEO hero below) */}
              <div className="text-3xl font-black tracking-tight text-white">
                ReviewReply <span className="text-blue-400">AI</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 mb-6 inline-block">
              <div className="flex items-center gap-2 text-[#ff2d55] mb-2">
                <Info className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest">App Purpose</span>
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed max-w-lg">
                {APP_NAME} is an AI-powered Google Business Profile review management platform.
                We help businesses automatically sync Google reviews, generate AI-powered replies,
                and manage their online reputation – all from a single dashboard.
              </p>
            </div>

            <p className="text-base font-semibold text-gray-200 leading-relaxed max-w-lg mb-2">
              {APP_NAME} is an AI-powered Google Business Profile review management platform
              that helps businesses manage and reply to Google reviews with AI.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-lg mb-4">
              Securely connect your Google Business Profile, automatically sync customer reviews,
              generate AI-powered replies, publish responses, and manage your online reputation —
              all from one dashboard.
            </p>
          </div>

          <div className="w-full max-w-[26rem] shrink-0 ml-32">
            <GoogleCard />
          </div>
        </div>
      </div>
    </>
  );
}

function WhatItDoes() {
  // renamed from `features` to avoid clashing with the module-level `features` array
  const whatItDoesFeatures = [
    {
      icon: MessageSquareText,
      title: "Sync your reviews automatically",
      desc: `${APP_NAME} connects to your Google Business Profile and pulls in new customer reviews in real time, so you never miss one.`,
    },
    {
      icon: Sparkles,
      title: "AI-generated replies",
      desc: "Our AI reads each review and drafts a professional, on-brand reply you can edit or publish with one click.",
    },
    {
      icon: BarChart3,
      title: "Reputation dashboard",
      desc: "Track ratings, sentiment trends, and response times for every location you manage, all in a single dashboard.",
    },
  ];

  return (
    <section className="relative bg-[#050302] px-6 md:px-20 py-16 md:py-24 border-t border-[#d4af37]/10 overflow-hidden">
      <style>{`
        @keyframes goldFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes goldPulseGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        @keyframes fadeInUpGold {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gold-card {
          animation: fadeInUpGold 0.7s ease-out both;
        }
        .gold-icon-wrap {
          animation: goldFloat 4s ease-in-out infinite;
        }
        .gold-ambient {
          animation: goldPulseGlow 5s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="gold-ambient absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#d4af37] to-transparent blur-[100px]" />
        <div className="gold-ambient absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#b8860b] to-transparent blur-[100px]" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
          What <span className="text-[#d4af37]">{APP_NAME}</span> does
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
          {APP_NAME} helps business owners and marketing teams manage customer reviews on their
          Google Business Profile without switching between multiple tools. It reads incoming
          reviews, drafts AI-generated replies in your brand voice, and lets you publish approved
          responses directly back to Google — all from one dashboard.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whatItDoesFeatures.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className="gold-card group relative bg-gradient-to-b from-[#141008] to-[#0a0705] border border-[#d4af37]/25 rounded-2xl p-6 flex flex-col gap-3 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="gold-icon-wrap w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="text-white font-bold text-sm">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataUsage() {
  const items = [
    {
      title: "Google Business Profile access",
      desc: "Used to read your business locations and customer reviews, and to publish the replies you approve. We never post a reply without your review or explicit automation settings.",
    },
    {
      title: "Basic Google profile info",
      desc: `Used only to create and secure your ${APP_NAME} account (name, email, profile photo). We do not sell or share this data with third parties.`,
    },
  ];

  return (
    <section className="relative bg-[#050302] px-6 md:px-20 py-16 md:py-24 border-t border-[#d4af37]/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="gold-ambient absolute top-1/3 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-[#d4af37] to-transparent blur-[100px]" style={{ animationDelay: "0.8s" }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
          Why we ask for <span className="text-[#d4af37]">Google account access</span>
        </h2>
        <p className="text-gray-400 text-center text-sm md:text-base mb-8">
          {APP_NAME} only requests the minimum Google permissions needed to provide its core
          feature: reading and replying to reviews on your Google Business Profile.
        </p>
        <div className="space-y-4">
          {items.map(({ title, desc }, idx) => (
            <div
              key={title}
              className="gold-card group flex items-start gap-3 bg-gradient-to-b from-[#141008] to-[#0a0705] border border-[#d4af37]/25 rounded-xl p-4 hover:border-[#d4af37]/60 hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="gold-icon-wrap w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   NEW CODE (SEO Homepage) + OLD sections merged in
   ============================================================ */

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

      {/* OLD: Login hero (App Purpose + Google sign-in card) */}
      <LoginHero />

      {/* NEW: SEO Hero */}
      <section className="px-6 md:px-20 py-20 md:py-28 text-center bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(212,175,55,0.15),transparent_65%)]">
        <h1 className="text-3xl md:text-5xl font-black max-w-4xl mx-auto leading-tight">
          Affordable <span className="text-[#d4af37]">AI Google Review Management</span> Software for Small Businesses
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mt-5 text-sm md:text-lg">
          {APP_NAME} syncs your Google Business Profile reviews, drafts on-brand AI replies, and tracks your online
          reputation from one dashboard. Plans start at <strong>$9/month</strong>, and AI reply features start at{" "}
          <strong>$29/month</strong>.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a href="#pricing" className="border border-[#d4af37]/50 text-[#d4af37] text-sm font-bold py-3.5 px-6 rounded-xl">
            View Pricing
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-5">
          Transparent pricing · Built for restaurants, clinics, dentists, gyms, salons, retail stores and agencies.
        </p>
      </section>

      {/* Problem */}
      <section className={section}>
        <h2 className={h2}>Managing Google reviews shouldn&apos;t cost more than your marketing budget</h2>
        <ul className="max-w-3xl mx-auto space-y-3 text-gray-400 text-sm md:text-base list-disc pl-5">
          <li>Reviews arrive at all hours, and unanswered ones hurt trust and local visibility.</li>
          <li>Writing a thoughtful reply for every review takes time most owners don&apos;t have.</li>
          <li>Many enterprise reputation platforms are priced for large chains, often in the hundreds of dollars per month (based on publicly available pricing).</li>
          <li>Switching between Google, email and messaging apps makes it easy to miss a review.</li>
        </ul>
        <p className="text-center text-gray-300 mt-6 text-sm">{APP_NAME} was built to fix this at a price small businesses can afford.</p>
      </section>

      {/* OLD: What it does (also defines the .gold-* animation styles used by DataUsage) */}
      <WhatItDoes />

      {/* Why choose */}
      <section className={section}>
        <h2 className={h2}>Why businesses choose <span className="text-[#d4af37]">{APP_NAME}</span></h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
          {[
            ["Low starting price", "Basic from $9/month; Standard with AI from $29/month."],
            ["AI replies you control", "Drafts are generated for you to edit and approve. Nothing is posted without your review or your own automation settings."],
            ["Built around Google Business Profile", "Direct integration and review sync, plus manual sync when you need it."],
            ["One dashboard", "Reviews, replies, analytics, alerts and requests in one place."],
            ["Made for local businesses", "Simple setup, no enterprise complexity."],
          ].map(([t, d]) => (
            <div key={t} className={`${card} p-6`}>
              <h3 className="text-white font-bold text-sm mb-2">{t}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features (Standard plan) */}
      <section id="features" className={section}>
        <h2 className={h2}>AI review reply software with everything in one dashboard</h2>
        <p className={sub}>Google review dashboard, AI replies, analytics and review requests for your Google Business Profile.</p>
        <div className={`${card} p-6 md:p-8 max-w-5xl mx-auto`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black">
              <span className="text-[#d4af37]">Standard</span>
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              <span>Best for growing businesses</span>
            </p>
            <p className="text-3xl font-black text-[#d4af37] mt-3">$29<span className="text-sm text-gray-400">/month</span></p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
            {standardFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-gray-300 text-sm">
                <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mt-8 text-sm md:text-base leading-relaxed">
          {APP_NAME} is one of the most affordable options in the market. Based on publicly available pricing,
          comparable review management platforms can cost $199/month or more, while {APP_NAME}&apos;s Standard plan
          includes all of the features above for just $29/month.
        </p>
      </section>

      {/* Pricing comparison */}
      <section id="pricing" className={section}>
        <h2 className={h2}>Google review management software pricing compared</h2>
        <p className={sub}>Starting prices, based on publicly available pricing. Competitor prices may change.</p>
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-3 pr-4">Tool</th>
                <th className="py-3">Starting price</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p) => (
                <tr key={p.name} className={`border-b border-white/5 ${p.us ? "text-[#d4af37] font-bold bg-[#d4af37]/5" : "text-gray-300"}`}>
                  <td className="py-3 pr-4 pl-2">{p.name}</td>
                  <td className="py-3">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-xs md:text-sm text-center max-w-3xl mx-auto mt-4">
          Competitor prices are based on publicly available information and may change. {APP_NAME} offers many
          features at a much lower price.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-10">
          <div className={`${card} p-6`}>
            <h3 className="text-white font-bold">Basic</h3>
            <p className="text-3xl font-black text-[#d4af37] my-2">$9<span className="text-sm text-gray-400">/month</span></p>
            <span className="text-xs text-[#d4af37]">See Basic plan</span>
          </div>
          <div className={`${card} p-6`}>
            <h3 className="text-white font-bold">Standard <span className="text-xs text-gray-400">(AI features)</span></h3>
            <p className="text-3xl font-black text-[#d4af37] my-2">$29<span className="text-sm text-gray-400">/month</span></p>
            <span className="text-xs text-[#d4af37]">See Standard plan</span>
          </div>
        </div>
      </section>

      {/* Why we cost less */}
      <section className={section}>
        <h2 className={h2}>How {APP_NAME} keeps pricing low</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {[
            ["Focused product", "We concentrate on Google review management instead of a large all-in-one suite."],
            ["No enterprise overhead", "No large sales team or long contracts driving up the price."],
            ["Built for small businesses", "Features are chosen for local business needs, not enterprise reporting."],
            ["Transparent plans", "Two simple plans, published openly."],
          ].map(([t, d]) => (
            <div key={t} className={`${card} p-5`}>
              <h3 className="text-white font-bold text-sm mb-1">{t}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor comparison */}
      <section className={section}>
        <h2 className={h2}>{APP_NAME} vs other review management platforms</h2>
        <p className={sub}>
          Many review platforms are excellent, especially for large multi-location brands. If you mainly need Google review sync,
          AI-written replies and a clear dashboard, the price difference matters. Larger platforms may include capabilities
          beyond review management, so compare based on what you actually need.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {comparisons.map((c) => (
            <a key={c.href} href={c.href} className={`${card} p-5 block`}>
              <h3 className="text-white font-bold text-sm mb-1">{c.label} vs {APP_NAME}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{c.note} (based on publicly available pricing)</p>
            </a>
          ))}
        </div>
      </section>

      {/* Who should use */}
      <section className={section}>
        <h2 className={h2}>Who should use {APP_NAME}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
          {audiences.map(([t, d]) => (
            <div key={t} className={`${card} p-5`}>
              <h3 className="text-white font-bold text-sm mb-1">{t}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className={section}>
        <h2 className={h2}>Benefits</h2>
        <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mt-8">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-gray-300 text-sm">
              <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className={section}>
        <h2 className={h2}>How it works</h2>
        <ol className="max-w-3xl mx-auto mt-10 space-y-4">
          {steps.map(([t, d], i) => (
            <li key={t} className={`${card} p-4 flex items-start gap-4`}>
              <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-black flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="text-white font-bold text-sm">{t}</h3>
                <p className="text-gray-400 text-xs">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Why AI chooses */}
      <section className={section}>
        <div className="max-w-3xl mx-auto">
          <h2 className={h2}>What is {APP_NAME}?</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center mb-8">
            {APP_NAME} is an affordable AI-powered Google review management platform for small and local businesses. It connects
            to Google Business Profile, syncs customer reviews, generates AI reply drafts, and provides analytics, review requests
            (QR code, email, WhatsApp), a unified inbox and team management. Plans start at $9/month (Basic), with AI features
            from $29/month (Standard).
          </p>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["Product", APP_NAME],
                ["Category", "Google review management / AI review reply software"],
                ["Best for", "Small businesses, local businesses, agencies"],
                ["Starting price", "$9/month"],
                ["AI plan", "Standard, $29/month"],
                ["Integrates with", "Google Business Profile"],
                ["Website", SITE],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-gray-400 font-semibold w-40">{k}</th>
                  <td className="py-3 text-gray-200">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-gray-400 text-xs mt-4">
            <strong className="text-gray-200">Best choice when:</strong> you want an affordable tool for AI replies to Google reviews without enterprise pricing.{" "}
            <strong className="text-gray-200">May not be the best choice when:</strong> you need a large all-in-one customer messaging or payments suite.
          </p>
        </div>
      </section>

      {/* About / EEAT */}
      <section className={section}>
        <div className="max-w-3xl mx-auto">
          <h2 className={h2}>About {APP_NAME}</h2>
          <ul className="space-y-3 text-gray-400 text-sm list-disc pl-5">
            <li><strong className="text-gray-200">Who built it:</strong> {APP_NAME} is built by Afnan Khan, an expert in machine learning and AI technology.</li>
            <li><strong className="text-gray-200">Why it exists:</strong> Small businesses need review management but are often priced out of enterprise tools.</li>
            <li><strong className="text-gray-200">Who it is for:</strong> Small businesses, local businesses and agencies.</li>
            <li><strong className="text-gray-200">Transparent pricing:</strong> $9/month and $29/month, listed openly.</li>
            <li><strong className="text-gray-200">Clear scope:</strong> We help you manage Google reviews; we do not promise specific ranking or revenue results.</li>
            <li><strong className="text-gray-200">Data use:</strong> Google access is used only to read your locations and reviews and to publish replies you approve. Basic profile info (name, email, photo) is used only to create and secure your account. We do not sell this data.</li>
            <li><strong className="text-gray-200">Contact:</strong> afnank6789@gmail.com</li>
          </ul>
        </div>
      </section>

      {/* OLD: Why we ask for Google account access */}
      <DataUsage />

      {/* FAQ */}
      <section id="faq" className={section}>
        <h2 className={h2}>Frequently asked questions</h2>
        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className={`${card} p-4 group`}>
              <summary className="cursor-pointer text-white font-bold text-sm list-none flex justify-between gap-4">
                {q}
                <span className="text-[#d4af37] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-gray-400 text-xs leading-relaxed mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
