"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-14">

          <h1 className="text-6xl font-bold mb-4 tracking-wide">
            BASIC PLAN
          </h1>

          <p className="text-zinc-500 text-xl">
            Perfect for Small Businesses & Startups
          </p>

        </div>

        {/* MAIN CARD */}

        <div className="bg-white dark:bg-zinc-900 rounded-[35px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl">

          <div className="grid grid-cols-1 xl:grid-cols-5">

            {/* LEFT TABLE */}

            <div className="xl:col-span-3 border-r border-zinc-200 dark:border-zinc-800">

              {/* TABLE HEADER */}

              <div className="grid grid-cols-4 bg-[#0B2C74] text-white text-center font-semibold">

                <div className="p-6 border-r border-blue-700">
                  DURATION
                </div>

                <div className="p-6 border-r border-blue-700">
                  PRICE (USD)
                </div>

                <div className="p-6 border-r border-blue-700">
                  EFFECTIVE PRICE / MONTH
                </div>

                <div className="p-6">
                  YOU SAVE
                </div>

              </div>

              {/* ROW 1 */}

              <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

                <div className="p-8 font-semibold border-r border-zinc-200 dark:border-zinc-800">
                  1 Month
                </div>

                <div className="p-8 text-5xl font-bold border-r border-zinc-200 dark:border-zinc-800">
                  $9
                </div>

                <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                  $9 / month
                </div>

                <div className="p-8 text-xl">
                  —
                </div>

              </div>

              {/* ROW 2 */}

              <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

                <div className="p-8 font-semibold border-r border-zinc-200 dark:border-zinc-800">
                  3 Months
                </div>

                <div className="p-8 text-5xl font-bold border-r border-zinc-200 dark:border-zinc-800">
                  $24
                </div>

                <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                  $8 / month
                </div>

                <div className="p-8 text-green-600 font-bold">
                  Save 11%
                </div>

              </div>

              {/* ROW 3 */}

              <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

                <div className="p-8 font-semibold border-r border-zinc-200 dark:border-zinc-800">
                  6 Months
                </div>

                <div className="p-8 text-5xl font-bold border-r border-zinc-200 dark:border-zinc-800">
                  $45
                </div>

                <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                  $7.50 / month
                </div>

                <div className="p-8 text-green-600 font-bold">
                  Save 17%
                </div>

              </div>

              {/* ROW 4 */}

              <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

                <div className="p-8 font-semibold border-r border-zinc-200 dark:border-zinc-800">
                  12 Months
                </div>

                <div className="p-8 text-5xl font-bold border-r border-zinc-200 dark:border-zinc-800">
                  $88
                </div>

                <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                  $7.33 / month
                </div>

                <div className="p-8 text-green-600 font-bold">
                  Save 20%
                </div>

              </div>

            </div>

            {/* RIGHT FEATURES */}

            <div className="xl:col-span-2 p-10">

              <h2 className="text-3xl font-bold mb-10 text-center">
                FEATURES INCLUDED
              </h2>

              <div className="space-y-6 text-lg">

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

              <Link
                href="/plans"
                className="mt-12 block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-4 font-semibold text-white text-lg"
              >
                Continue To Dashboard
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


