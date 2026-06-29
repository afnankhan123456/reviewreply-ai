"use client";

import Link from "next/link";

export default function PlanCard() {
  const features = [
    "1 Business Location",
    "100 Reviews Sync / Month",
    "Google Review Sync",
    "Review Dashboard",
    "New Review Email Alerts",
    "Unanswered Reviews Tracking",
    "Basic Rating Overview",
    "Positive & Negative Detection",
    "Basic Review Analytics",
    "Low Rating Alerts",
    "Monthly PDF Report",
    "Review Reply Templates",
    "Response Rating Tracking",
    "Top 5 Keywords",
    "Review Search & Filter",
    "30 Day Data History",
    "Export Reviews (CSV/PDF)",
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-violet-500 transition-all h-full flex flex-col">

      {/* TITLE */}

      <h2 className="text-3xl font-bold mb-2 text-white">
        Basic
      </h2>

      <p className="text-zinc-400 mb-6 text-sm">
        Perfect for small businesses
      </p>

      {/* FEATURES */}

      <div className="grid grid-cols-1 gap-3 text-sm text-zinc-300 flex-1">

        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-2"
          >
            <span className="text-violet-400 mt-[2px]">✓</span>
            <span>{feature}</span>
          </div>
        ))}

      </div>

      {/* BUTTON */}

      <Link
        href="/plans/basic/pricing"
        className="mt-8 block text-center bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-3 font-semibold text-white"
      >
        View Full Pricing
      </Link>

    </div>
  );
}

