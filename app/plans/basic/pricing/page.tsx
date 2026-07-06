"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  BadgeDollarSign,
  TrendingUp,
  BadgePercent,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
  Headphones,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

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
    <div className="min-h-screen overflow-x-hidden bg-[#f5f2ff] text-[#0b0b3b] relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-purple-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">

        {/* TOP LABEL */}
        <div className="flex justify-center mb-6">
          <div className="bg-white shadow-sm border border-purple-100 text-purple-600 font-semibold px-5 py-2 rounded-full text-sm">
            SIMPLE PRICING
          </div>
        </div>

        {/* HEADING */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-[#020b4f]">Basic </span>
            <span className="bg-gradient-to-r from-purple-700 to-violet-400 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>

          <p className="mt-5 text-lg md:text-2xl text-[#5b5b8a]">
            Perfect for Small Businesses & Startups
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="rounded-[34px] overflow-hidden border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(124,58,237,0.15)]">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-violet-700 via-purple-600 to-violet-500 text-white font-semibold text-sm md:text-base">

            <div className="flex items-center gap-3 p-5">
              <CalendarDays size={18} />
              DURATION
            </div>

            <div className="flex items-center gap-3 p-5 border-l border-white/10">
              <BadgeDollarSign size={18} />
              PRICE (USD)
            </div>

            <div className="flex items-center gap-3 p-5 border-l border-white/10">
              <TrendingUp size={18} />
              EFFECTIVE PRICE / MONTH
            </div>

            <div className="flex items-center gap-3 p-5 border-l border-white/10">
              <BadgePercent size={18} />
              YOU SAVE
            </div>

            <div className="flex items-center gap-3 p-5 border-l border-white/10">
              <CreditCard size={18} />
              PAY
            </div>
          </div>

          {/* ROWS */}
          {[
            {
              id: "1m",
              duration: "1 Month",
              price: "$0.01",
              monthly: "$0.01 / month",
              save: "—",
            },
            {
              id: "3m",
              duration: "3 Months",
              price: "$24",
              monthly: "$8 / month",
              save: "Save 11%",
            },
            {
              id: "6m",
              duration: "6 Months",
              price: "$45",
              monthly: "$7.50 / month",
              save: "Save 17%",
            },
            {
              id: "12m",
              duration: "12 Months",
              price: "$88",
              monthly: "$7.33 / month",
              save: "Save 20%",
            },
          ].map((plan, index) => (
            <div
              key={plan.id}
              className={`grid grid-cols-5 items-center bg-white ${
                index !== 3 ? "border-b border-[#ece8ff]" : ""
              }`}
            >
              {/* DURATION */}
              <div className="flex items-center gap-4 p-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <CalendarDays className="text-violet-600" size={24} />
                </div>

                <span className="font-bold text-lg text-[#10133d]">
                  {plan.duration}
                </span>
              </div>

              {/* PRICE */}
              <div className="p-6 border-l border-[#ece8ff]">
                <h2 className="text-4xl font-black text-[#05053b]">
                  {plan.price}
                </h2>
              </div>

              {/* MONTHLY */}
              <div className="p-6 border-l border-[#ece8ff] text-lg text-[#23235c]">
                {plan.monthly}
              </div>

              {/* SAVE */}
              <div className="p-6 border-l border-[#ece8ff]">
                {plan.save === "—" ? (
                  <span className="text-2xl text-[#222]">—</span>
                ) : (
                  <div className="inline-flex px-5 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm">
                    {plan.save}
                  </div>
                )}
              </div>

              {/* PAY */}
              <div className="p-6 border-l border-[#ece8ff]">
                <button
                  onClick={() => handlePlanActivation(plan.id)}
                  disabled={activatingPlan !== null}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-700 to-purple-500 py-4 text-white font-bold text-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {activatingPlan === plan.id ? (
                    "Activating..."
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Pay <ArrowRight size={20} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM FEATURES */}
        <div className="mt-10 rounded-[30px] bg-white/80 backdrop-blur-xl border border-white/70 shadow-lg grid grid-cols-1 md:grid-cols-4 overflow-hidden">

          <div className="flex items-center gap-4 p-8">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
              <ShieldCheck className="text-violet-600" />
            </div>

            <div>
              <h3 className="font-bold text-lg">Secure Payment</h3>
              <p className="text-[#676790]">100% secure & encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-8 border-l border-[#ece8ff]">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
              <RefreshCcw className="text-violet-600" />
            </div>

            <div>
              <h3 className="font-bold text-lg">Cancel Anytime</h3>
              <p className="text-[#676790]">No questions asked</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-8 border-l border-[#ece8ff]">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
              <Headphones className="text-violet-600" />
            </div>

            <div>
              <h3 className="font-bold text-lg">24/7 Support</h3>
              <p className="text-[#676790]">We are here to help</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-8 border-l border-[#ece8ff]">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
              <BadgeCheck className="text-violet-600" />
            </div>

            <div>
              <h3 className="font-bold text-lg">Trusted by Businesses</h3>
              <p className="text-[#676790]">Loved by 1000+ users</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
