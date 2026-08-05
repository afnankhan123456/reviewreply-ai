"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { CalendarDays, ShieldCheck, ArrowLeft } from "lucide-react";
import PayPalButton from "@/app/components/PayPalButton";

const planLabels: Record<string, { duration: string; days: number }> = {
  monthly: { duration: "1 Month", days: 30 },
  quarterly: { duration: "3 Months", days: 90 },
  halfyearly: { duration: "6 Months", days: 180 },
  yearly: { duration: "12 Months", days: 360 },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  const planId = searchParams.get("plan") || "";
  const amount = searchParams.get("amount") || "";
  const planInfo = planLabels[planId];

  const handleSuccess = async () => {
    setDone(true);
    // ✅ session refresh karo taaki naya plan turant reflect ho,
    // warna dashboard layout purana plan dekh kar wapas /plans bhej deta hai
    await update();
    setTimeout(() => {
      router.push(`/plans/standard/dashboard?plan=${planId}&days=${planInfo.days}`);
    }, 1200);
  };

  const handleFailure = (message: string) => {
    setErrorMsg(message);
  };

  if (!planId || !amount || !planInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-zinc-300 mb-4">Invalid plan selected.</p>
          <button
            onClick={() => router.push("/plans/standard/pricing")}
            className="text-violet-400 font-semibold underline"
          >
            Go back to pricing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background glow orbs — same theme as pricing page */}
      <div className="absolute top-[10%] left-[-200px] w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[5%] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg rounded-[28px] border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-[0_0_60px_-20px_rgba(139,92,246,0.3)] p-6 sm:p-8">
        <button
          onClick={() => router.push("/plans/standard/pricing")}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6"
        >
          <ArrowLeft size={16} />
          Back to plans
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
            <CalendarDays className="text-violet-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Standard Plan — {planInfo.duration}
            </h1>
            <p className="text-sm text-zinc-400">Billed once for {planInfo.duration.toLowerCase()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-b border-zinc-800 py-4 mb-6">
          <span className="text-zinc-400 font-medium">Total</span>
          <span className="text-3xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            ${amount}
          </span>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-4">
            {errorMsg}
          </div>
        )}

        {done ? (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-4 rounded-xl text-sm text-center font-medium">
            Payment successful! Redirecting to your dashboard...
          </div>
        ) : (
          <div className="w-full">
            <PayPalButton
              amount={amount}
              planType={planId}
              tier="standard"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
            />
          </div>
        )}

        <div className="flex items-center gap-2 justify-center mt-6 text-xs text-zinc-500">
          <ShieldCheck size={14} />
          100% secure payment via PayPal
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CheckoutContent />
    </Suspense>
  );
}
