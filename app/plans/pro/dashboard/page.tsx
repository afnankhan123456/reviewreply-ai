"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Query params read karne ke liye alag component (Suspense ke liye)
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL se plan aur days lo (agar nahi hai toh default)
  const plan = searchParams.get("plan") || "monthly";
  const days = searchParams.get("days") || "30";

  // Button click par naye query params ke saath navigate karo
  const handlePlanSelect = (planType: string, daysCount: number) => {
    router.push(`/plans/pro/dashboard?plan=${planType}&days=${daysCount}`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Pro Dashboard</h1>

      {/* Yahan plan aur days dikhao */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <p>Current Plan: <span className="text-violet-400 font-semibold">{plan}</span></p>
        <p>Duration: <span className="text-violet-400 font-semibold">{days} days</span></p>
      </div>

      {/* Plan choice buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => handlePlanSelect("monthly", 30)}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition"
        >
          Monthly (30 days)
        </button>

        <button
          onClick={() => handlePlanSelect("yearly", 365)}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg transition"
        >
          Yearly (365 days)
        </button>

        <button
          onClick={() => handlePlanSelect("trial", 7)}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition"
        >
          Trial (7 days)
        </button>
      </div>

      {/* Baaki dashboard ka content */}
    </div>
  );
}

// Suspense mein wrap karo (Next.js 15+ recommended)
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
