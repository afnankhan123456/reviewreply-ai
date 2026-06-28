"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold mb-4">
            BASIC PLAN
          </h1>

          <p className="text-zinc-400 text-lg">
            Perfect for Small Businesses & Startups
          </p>

        </div>

        {/* TABLE */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

          {/* HEADER */}

          <div className="grid grid-cols-6 bg-[#0B2C74] text-white font-semibold text-center text-sm">

            <div className="p-5 border-r border-blue-800">
              DURATION
            </div>

            <div className="p-5 border-r border-blue-800">
              PRICE (USD)
            </div>

            <div className="p-5 border-r border-blue-800">
              EFFECTIVE PRICE / MONTH
            </div>

            <div className="p-5 border-r border-blue-800">
              YOU SAVE
            </div>

            <div className="p-5 border-r border-blue-800">
              CLICK
            </div>

            <div className="p-5">
              FEATURES INCLUDED
            </div>

          </div>

          {/* ROW 1 */}

          <div className="grid grid-cols-6 border-t border-zinc-800">

            <div className="p-6 border-r border-zinc-800 font-semibold flex items-center gap-3">
              📅 1 Month
            </div>

            <div className="p-6 border-r border-zinc-800 text-4xl font-bold">
              $9
            </div>

            <div className="p-6 border-r border-zinc-800">
              $9 / month
            </div>

            <div className="p-6 border-r border-zinc-800">
              —
            </div>

            <div className="p-6 border-r border-zinc-800">
              <Link
                href="/checkout/basic-1month"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Click
              </Link>
            </div>

            <div className="p-6 row-span-4 space-y-4 text-zinc-300 text-sm">

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

          </div>

          {/* ROW 2 */}

          <div className="grid grid-cols-5 border-t border-zinc-800">

            <div className="p-6 border-r border-zinc-800 font-semibold flex items-center gap-3">
              📅 3 Months
            </div>

            <div className="p-6 border-r border-zinc-800 text-4xl font-bold">
              $24
            </div>

            <div className="p-6 border-r border-zinc-800">
              $8 / month
            </div>

            <div className="p-6 border-r border-zinc-800 text-green-500 font-bold">
              Save 11%
            </div>

            <div className="p-6 border-r border-zinc-800">
              <Link
                href="/checkout/basic-3month"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Click
              </Link>
            </div>

          </div>

          {/* ROW 3 */}

          <div className="grid grid-cols-5 border-t border-zinc-800">

            <div className="p-6 border-r border-zinc-800 font-semibold flex items-center gap-3">
              📅 6 Months
            </div>

            <div className="p-6 border-r border-zinc-800 text-4xl font-bold">
              $45
            </div>

            <div className="p-6 border-r border-zinc-800">
              $7.50 / month
            </div>

            <div className="p-6 border-r border-zinc-800 text-green-500 font-bold">
              Save 17%
            </div>

            <div className="p-6 border-r border-zinc-800">
              <Link
                href="/checkout/basic-6month"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Click
              </Link>
            </div>

          </div>

          {/* ROW 4 */}

          <div className="grid grid-cols-5 border-t border-zinc-800">

            <div className="p-6 border-r border-zinc-800 font-semibold flex items-center gap-3">
              📅 12 Months
            </div>

            <div className="p-6 border-r border-zinc-800 text-4xl font-bold">
              $88
            </div>

            <div className="p-6 border-r border-zinc-800">
              $7.33 / month
            </div>

            <div className="p-6 border-r border-zinc-800 text-green-500 font-bold">
              Save 20%
            </div>

            <div className="p-6 border-r border-zinc-800">
              <Link
                href="/checkout/basic-12month"
                className="text-blue-400 font-semibold hover:text-blue-300"
              >
                Click
              </Link>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
