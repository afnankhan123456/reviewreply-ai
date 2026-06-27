"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-violet-500 transition-all h-full">

      {/* HEADER */}

      <div className="px-8 pt-8 pb-6 border-b border-zinc-800">

        <h2 className="text-4xl font-bold text-white mb-3">
          Basic
        </h2>

        <p className="text-zinc-400">
          Perfect for small businesses
        </p>

      </div>

      {/* TABLE HEADER */}

      <div className="grid grid-cols-5 bg-zinc-800 border-b border-zinc-700 text-sm font-semibold text-zinc-300">

        <div className="p-4 border-r border-zinc-700">
          Duration
        </div>

        <div className="p-4 border-r border-zinc-700">
          Price
        </div>

        <div className="p-4 border-r border-zinc-700">
          Price / Month
        </div>

        <div className="p-4 border-r border-zinc-700">
          You Save
        </div>

        <div className="p-4">
          Features Included
        </div>

      </div>

      {/* ROW 1 */}

      <div className="grid grid-cols-5 border-b border-zinc-800">

        <div className="p-4 border-r border-zinc-800 text-zinc-300 font-medium">
          1 Month
        </div>

        <div className="p-4 border-r border-zinc-800 text-white text-2xl font-bold">
          $9
        </div>

        <div className="p-4 border-r border-zinc-800 text-zinc-300">
          $9/mo
        </div>

        <div className="p-4 border-r border-zinc-800 text-zinc-400">
          —
        </div>

        <div className="p-4 text-zinc-300">
          1 Business Location
        </div>

      </div>

      {/* ROW 2 */}

      <div className="grid grid-cols-5 border-b border-zinc-800">

        <div className="p-4 border-r border-zinc-800 text-zinc-300 font-medium">
          3 Months
        </div>

        <div className="p-4 border-r border-zinc-800 text-white text-2xl font-bold">
          $24
        </div>

        <div className="p-4 border-r border-zinc-800 text-zinc-300">
          $8/mo
        </div>

        <div className="p-4 border-r border-zinc-800 text-green-500 font-semibold">
          11%
        </div>

        <div className="p-4 text-zinc-300">
          AI Review Replies
        </div>

      </div>

      {/* ROW 3 */}

      <div className="grid grid-cols-5 border-b border-zinc-800">

        <div className="p-4 border-r border-zinc-800 text-zinc-300 font-medium">
          6 Months
        </div>

        <div className="p-4 border-r border-zinc-800 text-white text-2xl font-bold">
          $45
        </div>

        <div className="p-4 border-r border-zinc-800 text-zinc-300">
          $7.5/mo
        </div>

        <div className="p-4 border-r border-zinc-800 text-green-500 font-semibold">
          17%
        </div>

        <div className="p-4 text-zinc-300">
          Review Dashboard
        </div>

      </div>

      {/* ROW 4 */}

      <div className="grid grid-cols-5">

        <div className="p-4 border-r border-zinc-800 text-zinc-300 font-medium">
          12 Months
        </div>

        <div className="p-4 border-r border-zinc-800 text-white text-2xl font-bold">
          $88
        </div>

        <div className="p-4 border-r border-zinc-800 text-zinc-300">
          $7.3/mo
        </div>

        <div className="p-4 border-r border-zinc-800 text-green-500 font-semibold">
          20%
        </div>

        <div className="p-4 text-zinc-300">
          Basic Analytics
        </div>

      </div>

      {/* BUTTON */}

      <div className="p-6 border-t border-zinc-800">

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


