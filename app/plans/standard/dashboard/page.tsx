"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [planInfo, setPlanInfo] = useState({ plan: "", days: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const plan = searchParams.get("plan") || "";
    const days = searchParams.get("days") || "";

    if (plan && days) {
      setPlanInfo({ plan, days });
      activatePlan(plan, parseInt(days));
    }
  }, [searchParams]);

  const activatePlan = async (planId: string, days: number) => {
    setLoading(true);
    try {
      const response = await fetch("/api/activate-standard-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user-id", // Replace with actual user ID from auth
          planId,
          days,
        }),
      });

      if (response.ok) {
        console.log("Plan activated successfully");
      }
    } catch (error) {
      console.error("Failed to activate plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-4 text-slate-600 text-lg">
          Welcome to your dashboard!
        </p>
        {loading && (
          <p className="mt-4 text-blue-600">Activating your plan...</p>
        )}
        {planInfo.plan && (
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
