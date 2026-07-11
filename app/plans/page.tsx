"use client";

import Link from "next/link";
import Image from "next/image";
import PlanCard from "./basic/pricing/PlanCard";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-6">

      {/* TOP HEADER */}
      <div className="border-b border-zinc-800 pb-8 mb-16">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT SIDE – logo + text */}
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

          {/* RIGHT SIDE – Refer & Earn */}
          <Link href="/plans/refer-earn">

            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl hover:border-violet-500 transition-all cursor-pointer w-fit">

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

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Choose Your Plan
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl">
          Select the perfect plan for your business
        </p>

      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">

        {/* BASIC */}
        <PlanCard />

        {/* STANDARD */}
        <Link href="/plans/standard/pricing" className="h-full">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition-all cursor-pointer h-full flex flex-col">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Standard
            </h2>

            <p className="text-zinc-400 mb-8">
              Best for growing businesses
            </p>

            <div className="space-y-2.5 text-zinc-300 text-sm flex-1">
              <div>2 Business Locations / 1,000 Reviews Sync / Month</div>
              <div>Google Review Sync / Facebook Review Sync</div>
              <div>Review Dashboard / New Review Email Alerts</div>
              <div>Unanswered Reviews Tracking / Rating Overview</div>
              <div>Positive & Negative Detection / Basic Analytics</div>
              <div>Advanced Analytics / Low Rating Alerts</div>
              <div>Monthly PDF Report / Weekly Performance Report</div>
              <div>AI Review Reply Generator / Unlimited AI Reply Templates</div>
              <div>Custom AI Tone / Auto-Reply Rules (5⭐–1⭐)</div>
              <div>Response Rate Tracking / Top 20 Review Keywords</div>
              <div>Review Search & Filter / Sentiment Analysis</div>
              <div>Review Tags & Categories / Unlimited Data History</div>
              <div>CSV/PDF Export / Email Notifications</div>
              <div>QR Code & Review Request Link / SMS Review Requests</div>
              <div>Email Review Requests / Competitor Comparison</div>
              <div>3 Team Members / Role-Based Access</div>
              <div>Custom Review Request Landing Page / Priority Support</div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800">
              <div className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all text-sm">
                View Full Pricing
              </div>
            </div>

          </div>

        </Link>

        {/* PRO */}
        <Link href="/plans/pro/pricing" className="h-full">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all cursor-pointer h-full flex flex-col">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pro
            </h2>

            <p className="text-zinc-400 mb-8">
              Full power for agencies & brands
            </p>

            <div className="space-y-4 text-zinc-300 flex-1">
              <div>Unlimited Locations</div>
              <div>Premium AI Features</div>
              <div>Team Access</div>
              <div>Priority Support</div>
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
  );
}
