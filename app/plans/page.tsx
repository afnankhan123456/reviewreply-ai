"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Feather, Crown, Zap, ArrowRight, Gift, Sparkles } from "lucide-react";

const basicFeatures = [
  "1 Business Location",
  "100 Reviews Sync / Month",
  "Google Review Sync",
  "Review Dashboard",
  "New Review Email Alerts",
  "Unanswered Reviews Tracking",
  "Rating Overview",
  "Positive & Negative Detection",
  "Basic Analytics",
  "Low Rating Alerts",
  "Monthly PDF Report",
  "Review Reply Templates",
  "Response Rate Tracking",
  "Top 5 Review Keywords",
  "Review Search & Filter",
  "30 Days Data History",
  "CSV/PDF Export",
];

const standardFeatures = [
  "2 Business Locations",
  "500 AI Replies / Month",
  "Google Review Sync",
  "Review Dashboard",
  "New Review Email Alerts",
  "Unanswered Reviews Tracking",
  "Rating Overview",
  "Positive & Negative Detection",
  "Basic Analytics",
  "Advanced Analytics",
  "Low Rating Alerts",
  "Monthly PDF Report",
  "Weekly Performance Report",
  "AI Review Reply Generator",
  "500 AI Reply Templates",
  "Response Rate Tracking",
  "Top 20 Review Keywords",
  "Review Search & Filter",
  "Sentiment Analysis",
  "Review Tags & Categories",
  "6 Months Data History",
  "CSV/PDF Export",
  "Email Notifications",
  "QR Code Generator",
  "Email Review Requests",
  "2 Team Members",
  "Priority Support",
];

const proFeatures = [
  "Unlimited Locations",
  "Premium AI Features",
  "Team Access",
  "Priority Support",
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-6 relative overflow-hidden">

      <div className="absolute top-[10%] left-[-200px] w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[5%] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />

      <div className="relative z-10">

        {/* TOP HEADER */}
        <div className="border-b border-zinc-800 pb-8 mb-16">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-3 md:gap-5">

              <Image
                src="/ai-logo.png"
                alt="ReviewReply AI"
                width={60}
                height={60}
                className="object-contain w-[60px] h-[60px] md:w-[100px] md:h-[100px]"
              />

              <div className="flex flex-col justify-center h-auto md:h-[100px]">

                <h1 className="text-2xl md:text-4xl font-bold leading-none">
                  ReviewReply AI
                </h1>

                <p className="text-zinc-400 text-base md:text-xl mt-1 md:mt-2">
                  AI Powered Review Management
                </p>

              </div>

            </div>

            <Link href="/plans/refer-earn">

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl hover:border-violet-500 transition-all cursor-pointer w-fit">

                <Gift size={16} className="text-violet-400" />

                <span className="text-base md:text-lg font-semibold">
                  Refer & Earn
                </span>

                <span className="bg-violet-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  ₹100
                </span>

              </div>

            </Link>

          </div>

        </div>

        {/* HEADING */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-violet-500/40 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-xs font-semibold tracking-widest text-violet-300">PRICING PLANS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Choose the plan that
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              drives your growth
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl">
            Select the perfect plan for your business
          </p>

        </div>

        {/* PLANS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1600px] mx-auto items-stretch">

          {/* BASIC */}
          <Link href="/plans/basic/pricing" className="h-full">

            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-3xl p-6 hover:border-violet-500 transition-all cursor-pointer h-full flex flex-col">

              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-5">
                <Feather size={20} className="text-violet-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Basic
              </h2>

              <p className="text-zinc-400 mb-8">
                Perfect for small businesses
              </p>

              <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-zinc-300 text-xs flex-1">
                {basicFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                    <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
                    <span className="truncate" title={feature}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <div className="bg-violet-600 hover:bg-violet-700 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

          </Link>

          {/* STANDARD */}
          <Link href="/plans/standard/pricing" className="h-full">

            <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-blue-500/50 rounded-3xl p-8 hover:border-blue-400 transition-all cursor-pointer h-full flex flex-col shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)]">

              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                ★ MOST POPULAR
              </div>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-5 mt-2">
                <Crown size={20} className="text-blue-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Standard
              </h2>

              <p className="text-zinc-400 mb-8">
                Best for growing businesses
              </p>

              <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-zinc-300 text-xs flex-1">
                {standardFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                    <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                    <span className="truncate" title={feature}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <div className="bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

          </Link>

          {/* PRO */}
          <Link href="/plans/pro/pricing" className="h-full">

            <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all cursor-pointer h-full flex flex-col">

              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-5">
                <Zap size={20} className="text-yellow-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Pro
              </h2>

              <p className="text-zinc-400 mb-8">
                Full power for agencies & brands
              </p>

              <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 text-zinc-300 text-xs flex-1">
                {proFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                    <CheckCircle2 size={13} className="text-yellow-400 shrink-0" />
                    <span className="truncate" title={feature}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <div className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 text-center font-semibold py-3 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight size={16} />
                </div>
              </div>

            </div>

          </Link>

        </div>

        {/* FOOTER */}
        <div className="border-t border-zinc-800 mt-20 pt-8 flex flex-col items-center gap-4">

          <div className="flex items-center gap-6 md:gap-8 text-zinc-400 text-sm">

            <Link
              href="/legal/privacy-policy"
              className="hover:text-white transition-all"
            >
              Privacy Policy
            </Link>

            <Link
              href="/legal/terms"
              className="hover:text-white transition-all"
            >
              Terms
            </Link>

            <Link
              href="/legal/disclaimer"
              className="hover:text-white transition-all"
            >
              Disclaimer
            </Link>

          </div>

          <p className="text-zinc-500 text-sm">
            © 2026 ReviewReply AI. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}
