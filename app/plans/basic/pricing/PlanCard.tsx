"use client";

import Link from "next/link";

export default function PlanCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 hover:border-violet-500 transition-all h-full flex flex-col">

      {/* TITLE */}

      <h2 className="text-3xl font-bold mb-1 text-white">
        Basic
      </h2>

      <p className="text-zinc-400 mb-4 text-xs">
        Perfect for small businesses
      </p>

      {/* FEATURES */}

      <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[12px] leading-tight text-zinc-300 flex-1">

        <div>✓ 1 Business Location</div>

        <div>✓ Low Rating Alerts</div>

        <div>✓ 100 Review Sync</div>

        <div>✓ Monthly PDF Reports</div>

        <div>✓ Google Review Sync</div>

        <div>✓ Reply Templates</div>

        <div>✓ Review Dashboard</div>

        <div>✓ Response Tracking</div>

        <div>✓ Email Alerts</div>

        <div>✓ Top 5 Keywords</div>

        <div>✓ Unanswered Tracking</div>

        <div>✓ Search & Filter</div>

        <div>✓ Rating Overview</div>

        <div>✓ 30 Day History</div>

        <div>✓ Review Analytics</div>

        <div>✓ Export CSV/PDF</div>

      </div>

      {/* BUTTON */}

      <Link
        href="/plans/basic/pricing"
        className="mt-5 block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-3 text-sm font-semibold text-white"
      >
        View Full Pricing
      </Link>

    </div>
  );
}
