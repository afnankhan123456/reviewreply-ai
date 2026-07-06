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

  const plans = [
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
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-[#0b0b3b]">

      {/* TOP WAVES */}
      <div className="absolute top-0 left-0 w-full h-[350px] opacity-40 pointer-events-none">
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-full"
          fill="none"
        >
          <path
            d="M0 120C140 60 280 200 420 120C560 40 700 200 840 120C980 40 1120 180 1260 120C1350 80 1410 80 1440 100"
            stroke="#B794F4"
            strokeWidth="2"
          />

          <path
            d="M0 200C140 140 280 280 420 200C560 120 700 280 840 200C980 120 1120 260 1260 200C1350 160 1410 160 1440 180"
            stroke="#C4B5FD"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* BLOBS */}
      <div className="absolute -top-32 left-0 w-[350px] h-[350px] bg-violet-300/20 blur-3xl rounded-full"></div>

      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-purple-200/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 pt-10 pb-8">

        {/* LABEL */}
        <div className="flex justify-center mb-5">
          <div className="bg-white/80 backdrop-blur-xl border border-violet-100 shadow-sm text-violet-700 font-semibold px-5 py-2 rounded-full text-xs sm:text-sm">
            SIMPLE PRICING
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-10">

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="text-[#020b4f]">
              Basic
            </span>{" "}

            <span className="bg-gradient-to-r from-violet-700 to-fuchsia-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-xl text-[#66668f]">
            Perfect for Small Businesses & Startups
          </p>
        </div>

        {/* MOBILE CARDS */}
        <div className="block md:hidden space-y-4">

          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-[28px] border border-white/70 bg-white/75 backdrop-blur-xl shadow-lg p-5"
            >
              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <CalendarDays
                    className="text-violet-700"
                    size={20}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#10133d]">
                    {plan.duration}
                  </h3>

                  <p className="text-sm text-[#66668f]">
                    {plan.monthly}
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h2 className="text-4xl font-black text-[#05053b]">
                  {plan.price}
                </h2>
              </div>

              <div className="mb-5">
                {plan.save === "—" ? (
                  <span className="text-xl text-[#222]">
                    —
                  </span>
                ) : (
                  <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                    {plan.save}
                  </div>
                )}
              </div>

              <button
                onClick={() => handlePlanActivation(plan.id)}
                disabled={activatingPlan !== null}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-500 py-3 text-base font-bold text-white shadow-lg transition-all disabled:opacity-50"
              >
                {activatingPlan === plan.id ? (
                  "Activating..."
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Pay
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-hidden rounded-[34px] border border-white/70 bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(124,58,237,0.12)]">

          {/* HEADER */}
          <div className="grid grid-cols-5 bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 text-white text-sm font-semibold">

            <div className="flex items-center gap-2 p-5">
              <CalendarDays size={18} />
              DURATION
            </div>

            <div className="flex items-center gap-2 p-5 border-l border-white/10">
              <BadgeDollarSign size={18} />
              PRICE
            </div>

            <div className="flex items-center gap-2 p-5 border-l border-white/10">
              <TrendingUp size={18} />
              PRICE / MONTH
            </div>

            <div className="flex items-center gap-2 p-5 border-l border-white/10">
              <BadgePercent size={18} />
              SAVE
            </div>

            <div className="flex items-center gap-2 p-5 border-l border-white/10">
              <CreditCard size={18} />
              PAY
            </div>
          </div>

          {/* ROWS */}
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`grid grid-cols-5 items-center bg-white/70 ${
                index !== plans.length - 1
                  ? "border-b border-violet-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4 p-5">

                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <CalendarDays
                    className="text-violet-700"
                    size={20}
                  />
                </div>

                <div className="font-bold text-lg text-[#10133d]">
                  {plan.duration}
                </div>
              </div>

              <div className="p-5 border-l border-violet-100">
                <h2 className="text-4xl font-black text-[#05053b]">
                  {plan.price}
                </h2>
              </div>

              <div className="p-5 border-l border-violet-100 text-[#30306b] font-medium">
                {plan.monthly}
              </div>

              <div className="p-5 border-l border-violet-100">

                {plan.save === "—" ? (
                  <span className="text-2xl text-[#222]">
                    —
                  </span>
                ) : (
                  <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                    {plan.save}
                  </div>
                )}
              </div>

              <div className="p-5 border-l border-violet-100">
                <button
                  onClick={() => handlePlanActivation(plan.id)}
                  disabled={activatingPlan !== null}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-500 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {activatingPlan === plan.id ? (
                    "Activating..."
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Pay
                      <ArrowRight size={18} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-[28px] border border-white/70 bg-white/70 backdrop-blur-xl shadow-lg">

          <div className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
              <ShieldCheck className="text-violet-700" />
            </div>

            <div>
              <h3 className="font-bold">
                Secure Payment
              </h3>

              <p className="text-sm text-[#66668f]">
                100% encrypted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-violet-100 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
              <Headphones className="text-violet-700" />
            </div>

            <div>
              <h3 className="font-bold">
                24/7 Support
              </h3>

              <p className="text-sm text-[#66668f]">
                Always available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-violet-100 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
              <BadgeCheck className="text-violet-700" />
            </div>

            <div>
              <h3 className="font-bold">
                Trusted by Users
              </h3>

              <p className="text-sm text-[#66668f]">
                Loved worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
