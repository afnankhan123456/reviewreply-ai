"use client";

import Link from "next/link";

export default function BasicPricingPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white p-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-6xl font-bold mb-4">
            BASIC PLAN
          </h1>

          <p className="text-zinc-500 text-xl">
            Perfect for Small Businesses & Startups
          </p>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800">

            <div className="grid grid-cols-4 bg-violet-700 text-white font-semibold text-center">

              <div className="p-5 border-r border-violet-500">
                DURATION
              </div>

              <div className="p-5 border-r border-violet-500">
                PRICE (USD)
              </div>

              <div className="p-5 border-r border-violet-500">
                EFFECTIVE PRICE / MONTH
              </div>

              <div className="p-5">
                YOU SAVE
              </div>

            </div>

            <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 font-semibold">
                1 Month
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 text-5xl font-bold">
                $9
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                $9 / month
              </div>

              <div className="p-8">
                —
              </div>

            </div>

            <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 font-semibold">
                3 Months
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 text-5xl font-bold">
                $24
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                $8 / month
              </div>

              <div className="p-8 text-green-500 font-bold">
                Save 11%
              </div>

            </div>

            <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 font-semibold">
                6 Months
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 text-5xl font-bold">
                $45
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                $7.50 / month
              </div>

              <div className="p-8 text-green-500 font-bold">
                Save 17%
              </div>

            </div>

            <div className="grid grid-cols-4 text-center border-t border-zinc-200 dark:border-zinc-800">

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 font-semibold">
                12 Months
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800 text-5xl font-bold">
                $88
              </div>

              <div className="p-8 border-r border-zinc-200 dark:border-zinc-800">
                $7.33 / month
              </div>

              <div className="p-8 text-green-500 font-bold">
                Save 20%
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8">

            <h2 className="text-3xl font-bold mb-8 text-center">
              FEATURES INCLUDED
            </h2>

            <div className="space-y-5">

              <div>? 1 Business Location</div>

              <div>? 100 AI Review Analysis / Month</div>

              <div>? AI Generated Review Replies</div>

              <div>? Google Review Sync</div>

              <div>? Positive & Negative Review Detection</div>

              <div>? Basic Review Analytics</div>

              <div>? Reply Templates</div>

              <div>? Manual Reply Approval</div>

              <div>? Review History</div>

              <div>? Email Support</div>

              <div>? Dashboard Access</div>

              <div>? Fast Setup</div>

            </div>

            <Link
              href="/plans/basic/dashboard"
              className="mt-10 block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-4 font-semibold text-white text-lg"
            >
              Continue To Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}