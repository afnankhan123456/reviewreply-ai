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
        headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADING – responsive font size */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            BASIC PLAN
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Perfect for Small Businesses & Startups
          </p>
        </div>

        {/* PRICING TABLE CONTAINER – responsive */}
        <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
          {/* SCROLLABLE WRAPPER for mobile */}
          <div className="overflow-x-auto">
            {/* TABLE – min width forces horizontal scroll on small screens */}
            <div className="min-w-[600px]">
              {/* HEADER ROW */}
              <div className="grid grid-cols-5 bg-[#0B2C74] text-white font-semibold text-center text-xs md:text-sm">
                <div className="p-3 md:p-4 border-r border-blue-800">
                  DURATION
                </div>
                <div className="p-3 md:p-4 border-r border-blue-800">
                  PRICE (USD)
                </div>
                <div className="p-3 md:p-4 border-r border-blue-800">
                  EFFECTIVE PRICE / MONTH
                </div>
                <div className="p-3 md:p-4 border-r border-blue-800">
                  YOU SAVE
                </div>
                <div className="p-3 md:p-4">PAY</div>
              </div>

              {/* ROW 1 – 1 Month */}
              <div className="grid grid-cols-5 border-t border-zinc-800">
                <div className="flex items-center gap-1 md:gap-2 p-3 md:p-4 border-r border-zinc-800 font-semibold text-sm md:text-lg">
                  📅 1 Month
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-2xl md:text-4xl font-bold">
                  $0.01
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-xs md:text-base">
                  $0.01 / month
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-xs md:text-base">
                  —
                </div>
                <div className="flex items-center justify-center p-3 md:p-4">
                  <button
                    onClick={() => handlePlanActivation("1m")}
                    disabled={activatingPlan !== null}
                    className="text-blue-400 font-bold text-base md:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                  >
                    {activatingPlan === "1m" ? "Activating..." : "Pay"}
                  </button>
                </div>
              </div>

              {/* ROW 2 – 3 Months */}
              <div className="grid grid-cols-5 border-t border-zinc-800">
                <div className="flex items-center gap-1 md:gap-2 p-3 md:p-4 border-r border-zinc-800 font-semibold text-sm md:text-lg">
                  📅 3 Months
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-2xl md:text-4xl font-bold">
                  $24
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-xs md:text-base">
                  $8 / month
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-green-500 font-bold text-xs md:text-base">
                  Save 11%
                </div>
                <div className="flex items-center justify-center p-3 md:p-4">
                  <button
                    onClick={() => handlePlanActivation("3m")}
                    disabled={activatingPlan !== null}
                    className="text-blue-400 font-bold text-base md:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                  >
                    {activatingPlan === "3m" ? "Activating..." : "Pay"}
                  </button>
                </div>
              </div>

              {/* ROW 3 – 6 Months */}
              <div className="grid grid-cols-5 border-t border-zinc-800">
                <div className="flex items-center gap-1 md:gap-2 p-3 md:p-4 border-r border-zinc-800 font-semibold text-sm md:text-lg">
                  📅 6 Months
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-2xl md:text-4xl font-bold">
                  $45
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-xs md:text-base">
                  $7.50 / month
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-green-500 font-bold text-xs md:text-base">
                  Save 17%
                </div>
                <div className="flex items-center justify-center p-3 md:p-4">
                  <button
                    onClick={() => handlePlanActivation("6m")}
                    disabled={activatingPlan !== null}
                    className="text-blue-400 font-bold text-base md:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                  >
                    {activatingPlan === "6m" ? "Activating..." : "Pay"}
                  </button>
                </div>
              </div>

              {/* ROW 4 – 12 Months */}
              <div className="grid grid-cols-5 border-t border-zinc-800">
                <div className="flex items-center gap-1 md:gap-2 p-3 md:p-4 border-r border-zinc-800 font-semibold text-sm md:text-lg">
                  📅 12 Months
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-2xl md:text-4xl font-bold">
                  $88
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-xs md:text-base">
                  $7.33 / month
                </div>
                <div className="flex items-center p-3 md:p-4 border-r border-zinc-800 text-green-500 font-bold text-xs md:text-base">
                  Save 20%
                </div>
                <div className="flex items-center justify-center p-3 md:p-4">
                  <button
                    onClick={() => handlePlanActivation("12m")}
                    disabled={activatingPlan !== null}
                    className="text-blue-400 font-bold text-base md:text-lg hover:text-blue-300 transition-all disabled:opacity-50"
                  >
                    {activatingPlan === "12m" ? "Activating..." : "Pay"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
