import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { MessageSquareText, ShieldCheck, Sparkles, BarChart3, Info } from "lucide-react";

const APP_NAME = "ReviewReply AI"; // ⚠️ must be IDENTICAL to the name on OAuth consent screen

function LoginHero() {
  return (
    <>
      {/* ✅ MOBILE HERO */}
      <div className="flex md:hidden min-h-[100dvh] flex-col justify-center relative bg-black px-5 py-8 overflow-hidden">
        <img
          src="/main-ph.webp"
          alt={`${APP_NAME} Background`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <GoogleSignInButton className="absolute top-3 right-3 z-20 bg-white text-[#111827] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
          Get Started
        </GoogleSignInButton>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src="/ai-logo.png" alt={`${APP_NAME} logo`} className="w-9 h-9 object-contain" />
            <h1 className="text-xl font-black tracking-tight text-white">{APP_NAME}</h1>
          </div>

          {/* 👇 EXPLICIT PURPOSE – added for verification */}
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

          <p className="text-[11px] font-semibold text-gray-200 leading-snug max-w-xs">
            {APP_NAME} is an AI-powered Google Business Profile review management platform
            that helps businesses manage and reply to Google reviews with AI.
          </p>
        </div>
      </div>

      {/* ✅ DESKTOP HERO */}
      <div className="hidden md:flex min-h-[100dvh] flex-col justify-center relative bg-black overflow-hidden px-10 lg:px-20 py-16">
        <img
          src="/main-BG.webp"
          alt={`${APP_NAME} Background`}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        <GoogleSignInButton className="absolute top-6 right-10 lg:right-20 z-20 bg-white hover:bg-gray-100 transition-all text-[#111827] text-sm font-bold px-5 py-2.5 rounded-full shadow-sm">
          Get Started
        </GoogleSignInButton>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <img src="/ai-logo.png" alt={`${APP_NAME} logo`} className="w-11 h-11 object-contain" />
            <h1 className="text-3xl font-black tracking-tight text-white">{APP_NAME}</h1>
          </div>

          {/* 👇 EXPLICIT PURPOSE – added for verification */}
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
    <section className="bg-black px-6 md:px-20 py-16 border-t border-white/5">
      <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
        What {APP_NAME} does
      </h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base">
        {APP_NAME} helps business owners and marketing teams manage customer reviews on their
        Google Business Profile without switching between multiple tools. It reads incoming
        reviews, drafts AI-generated replies in your brand voice, and lets you publish approved
        responses directly back to Google — all from one dashboard.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
          >
            <Icon className="w-6 h-6 text-[#ff2d55]" />
            <h3 className="text-white font-bold text-sm">{title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataUsage() {
  return (
    <section className="bg-black px-6 md:px-20 py-16 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
          Why we ask for Google account access
        </h2>
        <p className="text-gray-400 text-center text-sm md:text-base mb-8">
          {APP_NAME} only requests the minimum Google permissions needed to provide its core
          feature: reading and replying to reviews on your Google Business Profile.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <ShieldCheck className="w-5 h-5 text-[#ff2d55] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white text-sm font-bold">Google Business Profile access</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Used to read your business locations and customer reviews, and to publish the
                replies you approve. We never post a reply without your review or explicit
                automation settings.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <ShieldCheck className="w-5 h-5 text-[#ff2d55] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white text-sm font-bold">Basic Google profile info</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Used only to create and secure your {APP_NAME} account (name, email, profile
                photo). We do not sell or share this data with third parties.
              </p>
            </div>
          </div>
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
