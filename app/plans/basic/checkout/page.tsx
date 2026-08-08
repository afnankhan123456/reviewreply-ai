"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { CalendarDays, ShieldCheck, ArrowLeft } from "lucide-react";
import PayPalButton from "@/app/components/PayPalButton";

const planLabels: Record<string, { duration: string; monthly: string }> = {
  "1m": { duration: "1 Month", monthly: "$0.01 / month" },
  "3m": { duration: "3 Months", monthly: "$8 / month" },
  "6m": { duration: "6 Months", monthly: "$7.50 / month" },
  "12m": { duration: "12 Months", monthly: "$7.33 / month" },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  const planId = searchParams.get("plan") || "";
  const amount = searchParams.get("amount") || "";
  const planInfo = planLabels[planId];

  const handleSuccess = () => {
    setDone(true);
    setTimeout(() => {
      router.push("/plans/basic/dashbord?paid=1");
    }, 1200);
  };

  const handleFailure = (message: string) => {
    setErrorMsg(message);
  };

  if (!planId || !amount || !planInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Invalid plan selected.</p>
          <button
            onClick={() => router.push("/plans/basic/pricing")}
            className="text-violet-700 font-semibold underline"
          >
            Go back to pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[28px] border border-gray-200 shadow-xl p-6 sm:p-8">
        <button
          onClick={() => router.push("/plans/basic/pricing")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={16} />
          Back to plans
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="text-violet-700" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Basic Plan — {planInfo.duration}
            </h1>
            <p className="text-sm text-gray-500">{planInfo.monthly}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mb-6">
          <span className="text-gray-600 font-medium">Total</span>
          <span className="text-3xl font-black text-gray-900">${amount}</span>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
            {errorMsg}
          </div>
        )}

        {done ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl text-sm text-center font-medium">
            Payment successful! Redirecting to your dashboard...
          </div>
        ) : (
          <div className="w-full">
            <PayPalButton
              amount={amount}
              planType={planId}
              tier="basic"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
            />
          </div>
        )}

        <div className="flex items-center gap-2 justify-center mt-6 text-xs text-gray-400">
          <ShieldCheck size={14} />
          100% secure payment via PayPal
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CheckoutContent />
    </Suspense>
  );
}
