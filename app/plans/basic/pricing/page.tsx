"use client";

import { useRouter } from "next/navigation";

export default function BasicPricingPage() {

  const router = useRouter();

  // PAY BUTTON

  const handlePayment = async (amount: string) => {

    // TEMPORARY DIRECT DASHBOARD REDIRECT

    router.push("/plans/basic/dashbord");

  };

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

          <div className="w-[72%]">

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
                PAY
              </div>

            </div>

            {/* ROW 1 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[90px]">

              <div className="flex items-center gap-2 p-4 border-r border-zinc-800 font-semibold text-lg">
                📅 1 Month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-4xl font-bold">
                $0.01
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                $0.01 / month
              </div>

              <div className="flex items-center p-4 border-r border-zinc-800 text-base">
                —
              </div>

              <div className="flex items-center justify-center p-4">

                <button
                  onClick={() => handlePayment("0.01")}
                  className="text-blue-400 font-bold text-lg hover:text-blue-300 transition-all"
                >
                  Pay
                </button>

              </div>

            </div>

            {/* ROW 2 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[90px]">

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

                <button
                  onClick={() => handlePayment("24")}
                  className="text-blue-400 font-bold text-lg hover:text-blue-300 transition-all"
                >
                  Pay
                </button>

              </div>

            </div>

            {/* ROW 3 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[90px]">

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

                <button
                  onClick={() => handlePayment("45")}
                  className="text-blue-400 font-bold text-lg hover:text-blue-300 transition-all"
                >
                  Pay
                </button>

              </div>

            </div>

            {/* ROW 4 */}

            <div className="grid grid-cols-5 border-t border-zinc-800 min-h-[90px]">

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

                <button
                  onClick={() => handlePayment("88")}
                  className="text-blue-400 font-bold text-lg hover:text-blue-300 transition-all"
                >
                  Pay
                </button>

              </div>

            </div>

          </div>

          {/* RIGHT FEATURE BOX */}

          <div className="w-[28%] border-l border-zinc-800">

            {/* FEATURE HEADER */}

            <div className="bg-[#0B2C74] text-white font-semibold text-center text-sm p-4">
              FEATURES INCLUDED
            </div>

            {/* FEATURE AREA */}

            <div className="p-4 grid grid-cols-2 gap-x-3 gap-y-3 text-[14px] leading-tight text-zinc-300">

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

          </div>

        </div>

      </div>

    </div>

  );
}









