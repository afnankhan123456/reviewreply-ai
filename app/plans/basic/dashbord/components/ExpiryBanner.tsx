"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function ExpiryBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPlanStatus() {
      try {
        const res = await fetch("/api/user/plan-status");
        const data = await res.json();
        if (!cancelled && data.success) {
          setDaysLeft(data.daysLeft);
        }
      } catch (err) {
        console.error("Failed to load plan status", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPlanStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  // Loading ke dauraan ya plan expiry 5 din se zyada door ho to kuch mat dikhao
  if (loading || daysLeft === null || daysLeft > 5 || daysLeft < 0) {
    return null;
  }

  const dayLabel = daysLeft === 0 ? "aaj" : daysLeft === 1 ? "1 din" : `${daysLeft} din`;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 rounded-2xl px-4 py-3 mb-5">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          {daysLeft === 0
            ? "Aapka plan aaj expire ho raha hai."
            : `Aapka plan ${dayLabel} mein expire ho raha hai.`}
        </p>
      </div>
      <a
        href="/plans/basic/pricing"
        className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap transition-colors"
      >
        Renew Now
      </a>
    </div>
  );
}
