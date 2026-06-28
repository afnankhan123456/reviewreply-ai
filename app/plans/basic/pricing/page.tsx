"use client";

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

          {/* MAIN CONTENT */}

          <div className="grid grid-cols-6">

            {/* COLUMN 1 */}

            <div className="border-r border-zinc-800">

              <div className="p-6 border-b border-zinc-800 font-semibold flex items-center gap-3">
                📅 1 Month
              </div>

              <div className="p-6 border-b border-zinc-800 font-semibold flex items-center gap-3">
                📅 3 Months
              </div>

              <div className="p-6 border-b border-zinc-800 font-semibold flex items-center gap-3">
                📅 6 Months
              </div>

              <div className="p-6 font-semibold flex items-center gap-3">
                📅 12 Months
              </div>

            </div>

            {/* COLUMN 2 */}

            <div className="border-r border-zinc-800">

              <div className="p-6 border-b border-zinc-800 text-4xl font-bold">
                $9
              </div>

              <div className="p-6 border-b border-zinc-800 text-4xl font-bold">
                $24
              </div>

              <div className="p-6 border-b border-zinc-800 text-4xl font-bold">
                $45
              </div>

              <div className="p-6 text-4xl font-bold">
                $88
              </div>

            </div>

            {/* COLUMN 3 */}

            <div className="border-r border-zinc-800">

              <div className="p-6 border-b border-zinc-800">
                $9 / month
              </div>

              <div className="p-6 border-b border-zinc-800">
                $8 / month
              </div>

              <div className="p-6 border-b border-zinc-800">
                $7.50 / month
              </div>

              <div className="p-6">
                $7.33 / month
              </div>

            </div>

            {/* COLUMN 4 */}

            <div className="border-r border-zinc-800">

              <div className="p-6 border-b border-zinc-800">
                —
              </div>

              <div className="p-6 border-b border-zinc-800 text-green-500 font-bold">
                Save 11%
              </div>

              <div className="p-6 border-b border-zinc-800 text-green-500 font-bold">
                Save 17%
              </div>

              <div className="p-6 text-green-500 font-bold">
                Save 20%
              </div>

            </div>

            {/* COLUMN 5 */}

            <div className="border-r border-zinc-800">

              <div className="p-6 border-b border-zinc-800 text-blue-400 font-semibold cursor-pointer hover:text-blue-300">
                Click
              </div>

              <div className="p-6 border-b border-zinc-800 text-blue-400 font-semibold cursor-pointer hover:text-blue-300">
                Click
              </div>

              <div className="p-6 border-b border-zinc-800 text-blue-400 font-semibold cursor-pointer hover:text-blue-300">
                Click
              </div>

              <div className="p-6 text-blue-400 font-semibold cursor-pointer hover:text-blue-300">
                Click
              </div>

            </div>

            {/* COLUMN 6 */}

            <div className="p-6 space-y-4 text-zinc-300 text-sm">

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
