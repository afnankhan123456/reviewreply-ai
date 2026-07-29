"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const { data: authSession } = useSession();

  const sessionPlan = (authSession?.user as any)?.plan;
  const sessionEnd = (authSession?.user as any)?.subscriptionEnd;

  const plan = sessionPlan || searchParams.get("plan") || "monthly";
  const days = searchParams.get("days") || "30";

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Pro Dashboard</h1>

      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <p>
          Current Plan: <span className="text-violet-400 font-semibold">{plan}</span>
        </p>
        <p>
          Duration: <span className="text-violet-400 font-semibold">{days} days</span>
        </p>
        {sessionEnd && (
          <p>
            Valid Until:{" "}
            <span className="text-violet-400 font-semibold">
              {new Date(sessionEnd).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>

      {/* Baaki dashboard ka content yahan aayega */}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
