"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-3">
            BASIC PLAN
          </h1>

          <p className="text-zinc-400 text-base">
            Perfect for Small Businesses & Startups
          </p>

        </div>

        {/* MAIN WRAPPER */}

        <div className="flex rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">

          {/* LEFT TABLE */}

          <div className="w-[75%]">

            {/* HEADER */}

            <div className="grid grid-cols-5 bg-[#0B2C74] text-white font-semibold text-center text-sm">

              <div className="p-4 border-r border-blue-800">
                DURATION
              </div>

              <div className="p-4 border-r border-blue-800">
                PRICE (USD)
              </div>

              <div className="p-4 border-r border-blue-800">
                EFFECTIVE PRICE / MONTH
              </div>

              <div className="p-4 border-r border-blue-800">
                YOU SAVE
              </div>

              <div className="p-4">
                CLICK
              </div>

            </div>

            {/* ROW 1 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[85px]">

              <div className="flex items-center gap-2 p-4 border-r border-zinc-800 font-semibold text-lg">
                📅 1 Month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-4xl font-bold">
                $9
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                $9 / month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                —
              </div>

              <div className="flex items-center justify-center p-4">

                <Link
                  href="/plans/basic/dashbord"
                  className="text-blue-400 font-bold text-lg hover:text-blue-300"
                >
                  Click
                </Link>

              </div>

            </div>

            {/* ROW 2 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[85px]">

              <div className="flex items-center gap-2 p-4 border-r border-zinc-800 font-semibold text-lg">
                📅 3 Months
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-4xl font-bold">
                $24
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                $8 / month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-green-500 font-bold text-base">
                Save 11%
              </div>

              <div className="flex items-center justify-center p-4">

                <Link
                  href="/plans/basic/dashbord"
                  className="text-blue-400 font-bold text-lg hover:text-blue-300"
                >
                  Click
                </Link>

              </div>

            </div>

            {/* ROW 3 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[85px]">

              <div className="flex items-center gap-2 p-4 border-r border-zinc-800 font-semibold text-lg">
                📅 6 Months
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-4xl font-bold">
                $45
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                $7.50 / month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-green-500 font-bold text-base">
                Save 17%
              </div>

              <div className="flex items-center justify-center p-4">

                <Link
                  href="/plans/basic/dashbord"
                  className="text-blue-400 font-bold text-lg hover:text-blue-300"
                >
                  Click
                </Link>

              </div>

            </div>

            {/* ROW 4 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[85px]">

              <div className="flex items-center gap-2 p-4 border-r border-zinc-800 font-semibold text-lg">
                📅 12 Months
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-4xl font-bold">
                $88
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                $7.33 / month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-green-500 font-bold text-base">
                Save 20%
              </div>

              <div className="flex items-center justify-center p-4">

                <Link
                  href="/plans/basic/dashbord"
                  className="text-blue-400 font-bold text-lg hover:text-blue-300"
                >
                  Click
                </Link>

              </div>

            </div>

          </div>

          {/* RIGHT FEATURE BOX */}

          <div className="w-[25%] border-l border-zinc-800">

            {/* FEATURE HEADER */}

            <div className="bg-[#0B2C74] text-white font-semibold text-center text-sm p-4">
              FEATURES INCLUDED
            </div>

            {/* FEATURE AREA */}

            <div className="p-5 space-y-4 text-zinc-300 text-base">

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

        </div>

      </div>

    </div>
  );
}





