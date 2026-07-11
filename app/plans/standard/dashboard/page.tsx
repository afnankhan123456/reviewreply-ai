"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [planInfo, setPlanInfo] = useState({ plan: "", days: "" });

  useEffect(() => {
    const plan = searchParams.get("plan") || "Not selected";
    const days = searchParams.get("days") || "Not selected";
    setPlanInfo({ plan, days });

    // Save plan to localStorage for now (badme API call se database me save karenge)
    if (plan !== "Not selected" && days !== "Not selected") {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(days));
      
      localStorage.setItem("userPlan", plan);
      localStorage.setItem("planExpiry", expiryDate.toISOString());
      localStorage.setItem("planDays", days);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-4 text-slate-600 text-lg">
          Welcome to your dashboard!
        </p>
        {planInfo.plan !== "Not selected" && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-lg inline-block">
            <p className="text-slate-700">
              <span className="font-semibold">Selected Plan:</span> {planInfo.plan}
            </p>
            <p className="text-slate-700 mt-2">
              <span className="font-semibold">Duration:</span> {planInfo.days} days
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
