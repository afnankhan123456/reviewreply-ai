"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, BadgePercent, CalendarDays, CheckCircle2, Crown } from "lucide-react";

const standardPlans = [
  {
    duration: "1 Month",
    regularPrice: "$29",
    discount: "—",
    finalPrice: "$29",
    monthlyEquivalent: "$29.00/mo",
  },
  {
    duration: "3 Months",
    regularPrice: "$87",
    discount: "8% OFF",
    finalPrice: "$80",
    monthlyEquivalent: "$26.67/mo",
  },
  {
    duration: "6 Months",
    regularPrice: "$174",
    discount: "14% OFF",
    finalPrice: "$149",
    monthlyEquivalent: "$24.83/mo",
  },
  {
    duration: "12 Months",
    regularPrice: "$348",
    discount: "22% OFF",
    finalPrice: "$269",
    monthlyEquivalent: "$22.42/mo",
  },
];

export default function StandardPricingPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/plans/standard/dashboard");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f9ff] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Crown className="h-4 w-4" />
            STANDARD PLAN PRICING
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Choose Your <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">Standard</span> Plan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Best for growing businesses that need more locations, more AI replies, and advanced review management features.
          </p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-[0_24px_90px_rgba(37,99,235,0.14)]">
          <div className="grid grid-cols-5 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-5 py-4 text-sm font-bold uppercase tracking-wide text-white">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Plan
            </div>
            <div>Regular Price</div>
            <div className="flex items-center gap-2">
              <BadgePercent className="h-4 w-4" />
              Discount
            </div>
            <div>Final Price</div>
            <div>Monthly Equivalent</div>
          </div>

          <div className="divide-y divide-slate-100">
            {standardPlans.map((plan) => (
              <div
                key={plan.duration}
                className="grid grid-cols-1 gap-4 px-5 py-5 text-sm transition hover:bg-blue-50/60 md:grid-cols-5 md:items-center"
              >
                <div className="font-black text-slate-950">{plan.duration}</div>
                <div className="text-slate-600 line-through decoration-slate-300 decoration-2">{plan.regularPrice}</div>
                <div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                    plan.discount === "—"
                      ? "bg-slate-100 text-slate-500"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {plan.discount}
                  </span>
                </div>
                <div className="text-2xl font-black text-blue-700">{plan.finalPrice}</div>
                <div className="font-semibold text-slate-700">{plan.monthlyEquivalent}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:grid-cols-3">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            2 Business Locations
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            500 AI Replies / Month
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            Advanced Analytics + Priority Support
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-xl"
          >
            Pay / Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
