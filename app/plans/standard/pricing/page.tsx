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
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-slate-900">
            Standard Plan Pricing
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Choose the billing period that works best for your business.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-8 py-5 text-left">Plan</th>
                <th className="px-8 py-5 text-center">Regular Price</th>
                <th className="px-8 py-5 text-center">Discount</th>
                <th className="px-8 py-5 text-center">Final Price</th>
                <th className="px-8 py-5 text-center">
                  Monthly Equivalent
                </th>
                <th className="px-8 py-5 text-center"></th>
              </tr>
            </thead>

            <tbody>
              {pricingPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className={`border-t ${
                    plan.popular ? "bg-blue-50" : "bg-white"
                  }`}
                >
                  <td className="px-8 py-6 font-semibold text-lg">
                    {plan.title}

                    {plan.popular && (
                      <span className="ml-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        BEST VALUE
                      </span>
                    )}
                  </td>

                  <td className="px-8 py-6 text-center">
                    ${plan.regularPrice}
                  </td>

                  <td className="px-8 py-6 text-center">
                    {plan.discount ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 font-semibold">
                        {plan.discount}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-8 py-6 text-center text-2xl font-bold text-blue-600">
                    ${plan.finalPrice}
                  </td>

                  <td className="px-8 py-6 text-center font-medium">
                    {plan.monthlyEquivalent}
                  </td>

                  <td className="px-8 py-6 text-center">
                    <button
                      onClick={() => handleChoosePlan(plan)}
                      disabled={activatingPlan !== null}
                      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
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
