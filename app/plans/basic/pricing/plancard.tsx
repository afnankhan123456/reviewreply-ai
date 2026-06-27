"use client";

import Link from "next/link";

export default function PlanCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 transition-all h-full flex flex-col">

      {/* TITLE */}

      <h2 className="text-4xl font-bold mb-4 text-white">
        Basic
      </h2>

      <p className="text-zinc-400 mb-8">
        Perfect for small businesses
      </p>

      {/* FEATURES */}

      <div className="space-y-4 text-zinc-300 flex-1">

        <div>? 1 Business Location</div>

        <div>? 100 Reviews Sync / Month</div>

        <div>? Google Review Sync</div>

        <div>? Review Dashboard</div>

        <div>? New Review Email Alerts</div>

        <div>? Unanswered Reviews Tracking</div>

        <div>? Basic Rating Overview</div>

        <div>? Positive & Negative Review Detection</div>

        <div>? Basic Review Analytics</div>

      </div>

      {/* BUTTON */}

      <Link
        href="/plans/basic/pricing"
        className="mt-10 block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-4 font-semibold text-white"
      >
        View Full Pricing
      </Link>

    </div>
  );
}