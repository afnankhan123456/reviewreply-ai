import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { MessageSquareText, ShieldCheck, Sparkles, BarChart3, Info, RefreshCw, Star } from "lucide-react";
import TransparentLogoVideo from "./TransparentLogoVideo";

const APP_NAME = "ReviewReply AI"; // ⚠️ must be IDENTICAL to the name on OAuth consent screen

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
      {/* ✅ NAYA — asli <video> ki jagah TransparentLogoVideo. Ye "/logo-animation.mp4"
          (color+mask stacked video) ko canvas pe real-time combine karke true
          per-pixel transparency deta hai — kisi bhi background ke peeche fit
          ho jaata hai, chahe wo is card ka red glow ho ya kuch aur, aur sab
          browsers (Chrome/Safari/Firefox) me equally kaam karta hai. */}
      <TransparentLogoVideo
        src="/logo-animation.mp4"
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
            <h1 className="text-xl font-black tracking-tight text-white">
              ReviewReply <span className="text-[#a78bfa]">AI</span>
            </h1>
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
              <h1 className="text-3xl font-black tracking-tight text-white">
                ReviewReply <span className="text-blue-400">AI</span>
              </h1>
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
  const features = [
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
          {features.map(({ icon: Icon, title, desc }, idx) => (
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

export default function LoginUI() {
  return (
    <>
      <LoginHero />
      <WhatItDoes />
      <DataUsage />
    </>
  );
}
