"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-violet-500 transition-all h-full flex flex-col">

      {/* TOP */}

      <div className="p-8 border-b border-zinc-800">

        <h2 className="text-4xl font-bold mb-4 text-white">
          Basic
        </h2>

        <p className="text-zinc-400">
          Perfect for small businesses
        </p>

      </div>

      {/* MINI TABLE */}

      <div className="grid grid-cols-2 border-b border-zinc-800">

        <div className="p-4 border-r border-zinc-800 text-zinc-400 font-semibold">
          Starting Price
        </div>

        <div className="p-4 text-white text-2xl font-bold">
          $9/mo
        </div>

      </div>

      <div className="grid grid-cols-2 border-b border-zinc-800">

        <div className="p-4 border-r border-zinc-800 text-zinc-400 font-semibold">
          Save Up To
        </div>

        <div className="p-4 text-green-500 font-bold">
          20%
        </div>

      </div>

      {/* FEATURES */}

      <div className="p-8 space-y-4 text-zinc-300 flex-1">

        <div>✓ 1 Business Location</div>

        <div>✓ 100 Reviews Sync / Month</div>

        <div>✓ Google Review Sync</div>

        <div>✓ Review Dashboard</div>

        <div>✓ New Review Email Alerts</div>

        <div>✓ Unanswered Reviews Tracking</div>

        <div>✓ Basic Rating Overview</div>

        <div>✓ Positive & Negative Review Detection</div>

        <div>✓ Basic Review Analytics</div>

      </div>

      {/* BUTTON */}

      <div className="p-8 pt-0">

        <Link
          href="/plans/basic/pricing"
          className="block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-4 font-semibold text-white"
        >
          View Full Pricing
        </Link>

      </div>

    </div>
  );
}


