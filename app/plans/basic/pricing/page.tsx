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
    <main className="min-h-screen w-screen overflow-hidden bg-black text-white">
      <section className="w-full bg-black overflow-hidden">
        
        {/* HEADING */}
        <div className="text-center pt-6 pb-6 px-4 bg-black">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            BASIC PLAN
          </h1>

          <p className="text-zinc-400 text-sm md:text-base">
            Perfect for Small Businesses & Startups
          </p>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-hidden bg-black">
          
          <div className="bg-zinc-900 border-y border-zinc-800">

            {/* HEADER */}
            <div className="grid grid-cols-4 sm:grid-cols-5 bg-[#0B2C74] text-white text-center text-[10px] md:text-sm font-semibold">

              <div className="p-2 md:p-4 border-r border-blue-800 break-words">
                DURATION
              </div>

              <div className="p-2 md:p-4 border-r border-blue-800 break-words">
                PRICE
              </div>

              <div className="hidden sm:block p-2 md:p-4 border-r border-blue-800 break-words">
                PRICE / MONTH
              </div>

              <div className="p-2 md:p-4 border-r border-blue-800 break-words">
                SAVE
              </div>

              <div className="p-2 md:p-4 break-words">
                PAY
              </div>
            </div>

            {/* ROW 1 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="p-2 md:p-4 border-r border-zinc-800 text-xs md:text-base font-semibold">
                1 Month
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-lg md:text-3xl font-bold">
                $0.01
              </div>

              <div className="hidden sm:flex items-center p-2 md:p-4 border-r border-zinc-800 text-xs md:text-sm">
                $0.01/mo
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-xs md:text-sm">
                —
              </div>

              <div className="flex items-center justify-center p-2 md:p-4">
                <button
                  onClick={() => handlePlanActivation("1m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold hover:text-blue-300 disabled:opacity-50"
                >
                  {activatingPlan === "1m" ? "..." : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="p-2 md:p-4 border-r border-zinc-800 text-xs md:text-base font-semibold">
                3 Months
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-lg md:text-3xl font-bold">
                $24
              </div>

              <div className="hidden sm:flex items-center p-2 md:p-4 border-r border-zinc-800 text-xs md:text-sm">
                $8/mo
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-green-500 text-xs md:text-sm font-bold">
                11%
              </div>

              <div className="flex items-center justify-center p-2 md:p-4">
                <button
                  onClick={() => handlePlanActivation("3m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold hover:text-blue-300 disabled:opacity-50"
                >
                  {activatingPlan === "3m" ? "..." : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="p-2 md:p-4 border-r border-zinc-800 text-xs md:text-base font-semibold">
                6 Months
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-lg md:text-3xl font-bold">
                $45
              </div>

              <div className="hidden sm:flex items-center p-2 md:p-4 border-r border-zinc-800 text-xs md:text-sm">
                $7.5/mo
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-green-500 text-xs md:text-sm font-bold">
                17%
              </div>

              <div className="flex items-center justify-center p-2 md:p-4">
                <button
                  onClick={() => handlePlanActivation("6m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold hover:text-blue-300 disabled:opacity-50"
                >
                  {activatingPlan === "6m" ? "..." : "Pay"}
                </button>
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-4 sm:grid-cols-5 border-t border-zinc-800">

              <div className="p-2 md:p-4 border-r border-zinc-800 text-xs md:text-base font-semibold">
                12 Months
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-lg md:text-3xl font-bold">
                $88
              </div>

              <div className="hidden sm:flex items-center p-2 md:p-4 border-r border-zinc-800 text-xs md:text-sm">
                $7.33/mo
              </div>

              <div className="p-2 md:p-4 border-r border-zinc-800 text-green-500 text-xs md:text-sm font-bold">
                20%
              </div>

              <div className="flex items-center justify-center p-2 md:p-4">
                <button
                  onClick={() => handlePlanActivation("12m")}
                  disabled={activatingPlan !== null}
                  className="text-blue-400 font-bold hover:text-blue-300 disabled:opacity-50"
                >
                  {activatingPlan === "12m" ? "..." : "Pay"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
