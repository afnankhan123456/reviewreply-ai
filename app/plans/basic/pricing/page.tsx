"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BasicPricingPage() {
  const router = useRouter();
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  const handlePlanActivation = async (planType: string) => {
    try {
      setActivatingPlan(planType);

      const res = await fetch("/api/activate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: planType }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/plans/basic/dashbord");
      } else {
        alert(data.error || "Failed to activate plan");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setActivatingPlan(null);
    }
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-black text-white">
      <div className="w-full min-h-screen bg-black">
        
        {/* HEADING */}
        <div className="text-center pt-6 pb-6 px-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            BASIC PLAN
          </h1>

          <p className="text-zinc-400 text-sm md:text-base">
            Perfect for Small Businesses & Startups
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-hidden bg-black px-0">
          <div className="w-full border border-zinc-800 bg-zinc-900">

            {/* HEADER */}
            <div className="grid grid-cols-4 sm:grid-cols-5 bg-[#0B2C74] text-white font-semibold text-center text-[10px] md:text-sm">

              <div className="p-2 sm:p-4 border-r border-blue-800">
                DURATION
              </div>

              <div className="p-2 sm:p-4 border-r border-blue-800">
                PRICE (USD)
              </div>

              <div className="hidden sm:block p-2 sm:p-4 border-r border-blue-800">
                EFFECTIVE PRICE / MONTH
              </div>

              <div className="p-2 sm:p-4 border-r border-blue-800">
                YOU SAVE
              </div>

              <div className="p-2 sm:p-4">
                PAY
              </div>
            </div>

            {/* ROW 1 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="flex items-center gap-1 p-2 sm:p-4 border-r border-zinc-800 font-semibold text-xs sm:text-lg">
                📅 1 Month
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-lg sm:text-4xl font-bold">
                $0.01
              </div>

              <div className="hidden sm:flex items-center p-2 sm:p-4 border-r border-zinc-800 text-[10px] sm:text-base">
                $0.01 / month
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-[10px] sm:text-base">
                —
              </div>

              <div className="flex items-center justify-center p-2 sm:p-4">
                <button
                  onClick={() => handlePlanActivation("1m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold text-sm sm:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                >
                  {activatingPlan === "1m"
                    ? "Activating..."
                    : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="flex items-center gap-1 p-2 sm:p-4 border-r border-zinc-800 font-semibold text-xs sm:text-lg">
                📅 3 Months
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-lg sm:text-4xl font-bold">
                $24
              </div>

              <div className="hidden sm:flex items-center p-2 sm:p-4 border-r border-zinc-800 text-[10px] sm:text-base">
                $8 / month
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-green-500 font-bold text-[10px] sm:text-base">
                Save 11%
              </div>

              <div className="flex items-center justify-center p-2 sm:p-4">
                <button
                  onClick={() => handlePlanActivation("3m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold text-sm sm:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                >
                  {activatingPlan === "3m"
                    ? "Activating..."
                    : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="flex items-center gap-1 p-2 sm:p-4 border-r border-zinc-800 font-semibold text-xs sm:text-lg">
                📅 6 Months
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-lg sm:text-4xl font-bold">
                $45
              </div>

              <div className="hidden sm:flex items-center p-2 sm:p-4 border-r border-zinc-800 text-[10px] sm:text-base">
                $7.50 / month
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-green-500 font-bold text-[10px] sm:text-base">
                Save 17%
              </div>

              <div className="flex items-center justify-center p-2 sm:p-4">
                <button
                  onClick={() => handlePlanActivation("6m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold text-sm sm:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                >
                  {activatingPlan === "6m"
                    ? "Activating..."
                    : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="flex items-center gap-1 p-2 sm:p-4 border-r border-zinc-800 font-semibold text-xs sm:text-lg">
                📅 12 Months
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-lg sm:text-4xl font-bold">
                $88
              </div>

              <div className="hidden sm:flex items-center p-2 sm:p-4 border-r border-zinc-800 text-[10px] sm:text-base">
                $7.33 / month
              </div>

              <div className="flex items-center p-2 sm:p-4 border-r border-zinc-800 text-green-500 font-bold text-[10px] sm:text-base">
                Save 20%
              </div>

              <div className="flex items-center justify-center p-2 sm:p-4">
                <button
                  onClick={() => handlePlanActivation("12m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold text-sm sm:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                >
                  {activatingPlan === "12m"
                    ? "Activating..."
                    : "Pay"}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
