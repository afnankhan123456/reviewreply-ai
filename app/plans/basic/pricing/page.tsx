"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 transition-all h-full">

      {/* TITLE */}

      <h2 className="text-4xl font-bold mb-4 text-white">
        Basic
      </h2>

      <p className="text-zinc-400 mb-8">
        Perfect for small businesses
      </p>

      {/* PRICING */}

      <div className="space-y-4 mb-8">

        <div className="flex items-center justify-between bg-zinc-800 rounded-2xl px-5 py-4">

          <span className="text-zinc-300 font-medium">
            1 Month
          </span>

          <span className="text-2xl font-bold text-white">
            $9
          </span>

        </div>

        <div className="flex items-center justify-between bg-zinc-800 rounded-2xl px-5 py-4">

          <span className="text-zinc-300 font-medium">
            3 Months
          </span>

          <span className="text-2xl font-bold text-white">
            $24
          </span>

        </div>

        <div className="flex items-center justify-between bg-zinc-800 rounded-2xl px-5 py-4">

          <span className="text-zinc-300 font-medium">
            6 Months
          </span>

          <span className="text-2xl font-bold text-white">
            $45
          </span>

        </div>

        <div className="flex items-center justify-between bg-zinc-800 rounded-2xl px-5 py-4">

          <span className="text-zinc-300 font-medium">
            12 Months
          </span>

          <span className="text-2xl font-bold text-white">
            $88
          </span>

        </div>

      </div>

      {/* FEATURES */}

      <div className="space-y-4 text-zinc-300 mb-10">

        <div>✓ 1 Business Location</div>

        <div>✓ AI Review Replies</div>

        <div>✓ Review Dashboard</div>

        <div>✓ Basic Analytics</div>

      </div>

      {/* BUTTON */}

      <Link
        href="/plans/basic/pricing"
        className="block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-4 font-semibold text-white"
      >
        View Full Pricing
      </Link>

    </div>
  );
}




