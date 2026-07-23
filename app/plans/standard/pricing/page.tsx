"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const pricingPlans = [
  {
    id: "monthly",
    title: "1 Month",
    regularPrice: 29,
    finalPrice: 29,
    discount: null,
    monthlyEquivalent: "$29.00/mo",
    popular: false,
    days: 30,
  },
  {
    id: "quarterly",
    title: "3 Months",
    regularPrice: 87,
    finalPrice: 80,
    discount: "8% OFF",
    monthlyEquivalent: "$26.67/mo",
    popular: false,
    days: 90,
  },
  {
    id: "halfyearly",
    title: "6 Months",
    regularPrice: 174,
    finalPrice: 149,
    discount: "14% OFF",
    monthlyEquivalent: "$24.83/mo",
    popular: true,
    days: 180,
  },
  {
    id: "yearly",
    title: "12 Months",
    regularPrice: 348,
    finalPrice: 269,
    discount: "22% OFF",
    monthlyEquivalent: "$22.42/mo",
    popular: false,
    days: 360,
  },
];

export default function StandardPricingPage() {
  const router = useRouter();
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  const handleChoosePlan = async (plan: (typeof pricingPlans)[number]) => {
    try {
      setActivatingPlan(plan.id);

      const res = await fetch("/api/activate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id, tier: "standard" }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/plans/standard/dashboard?plan=${plan.id}&days=${plan.days}`);
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
    <main className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 relative overflow-hidden">

      {/* Background glow orbs — same theme as plans page */}
      <div className="absolute top-[10%] left-[-200px] w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[5%] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-violet-500/40 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold tracking-widest text-violet-300">STANDARD PLAN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Standard Plan{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>

          <p className="mt-4 text-zinc-400 text-sm sm:text-base md:text-lg">
            Choose the billing period that works best for your business.
          </p>
        </div>

        {/* ✅ MOBILE — stacked cards (screens below md) */}
        <div className="block md:hidden space-y-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-5 ${
                plan.popular
                  ? "border-violet-500/50 bg-gradient-to-br from-violet-950/40 to-blue-950/40 shadow-[0_0_40px_-15px_rgba(139,92,246,0.4)]"
                  : "border-zinc-800 bg-zinc-900/60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                {plan.popular && (
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 text-[10px] font-semibold text-white">
                    BEST VALUE
                  </span>
                )}
              </div>

              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  ${plan.finalPrice}
                </span>
                {plan.discount && (
                  <span className="text-sm text-zinc-500 line-through mb-1">
                    ${plan.regularPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs">
                {plan.discount ? (
                  <span className="rounded-full bg-green-500/10 border border-green-500/30 px-2.5 py-1 text-green-400 font-semibold">
                    {plan.discount}
                  </span>
                ) : (
                  <span className="text-zinc-600">No discount</span>
                )}
                <span className="text-zinc-400">{plan.monthlyEquivalent}</span>
              </div>

              <button
                onClick={() => handleChoosePlan(plan)}
                disabled={activatingPlan !== null}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {activatingPlan === plan.id ? "Activating..." : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP — table (md and above) */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-[0_0_60px_-20px_rgba(139,92,246,0.3)]">
          <table className="w-full">
            <thead className="bg-black/60 text-white border-b border-zinc-800">
              <tr>
                <th className="px-8 py-5 text-left font-semibold">Plan</th>
                <th className="px-8 py-5 text-center font-semibold">Regular Price</th>
                <th className="px-8 py-5 text-center font-semibold">Discount</th>
                <th className="px-8 py-5 text-center font-semibold">Final Price</th>
                <th className="px-8 py-5 text-center font-semibold">
                  Monthly Equivalent
                </th>
                <th className="px-8 py-5 text-center"></th>
              </tr>
            </thead>

            <tbody>
              {pricingPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className={`border-t border-zinc-800 ${
                    plan.popular ? "bg-gradient-to-r from-violet-950/40 to-blue-950/40" : "bg-transparent"
                  }`}
                >
                  <td className="px-8 py-6 font-semibold text-lg text-white">
                    {plan.title}

                    {plan.popular && (
                      <span className="ml-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        BEST VALUE
                      </span>
                    )}
                  </td>

                  <td className="px-8 py-6 text-center text-zinc-400">
                    ${plan.regularPrice}
                  </td>

                  <td className="px-8 py-6 text-center">
                    {plan.discount ? (
                      <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-green-400 font-semibold">
                        {plan.discount}
                      </span>
                    ) : (
                      <span className="text-zinc-600">-</span>
                    )}
                  </td>

                  <td className="px-8 py-6 text-center text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    ${plan.finalPrice}
                  </td>

                  <td className="px-8 py-6 text-center font-medium text-zinc-300">
                    {plan.monthlyEquivalent}
                  </td>

                  <td className="px-8 py-6 text-center">
                    <button
                      onClick={() => handleChoosePlan(plan)}
                      disabled={activatingPlan !== null}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      {activatingPlan === plan.id ? "Activating..." : "Choose Plan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
