// app/plans/standard/pricing/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

// 12-Month plan ki bumper-offer price (sabke liye)
const YEARLY_OFFER_PRICE = 260;
const YEARLY_OFFER_MONTHLY_EQUIVALENT = "$21.67/mo";

function formatCountdown(totalSeconds: number) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatMinSec(totalSeconds: number) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// expiresAt (ISO string) ke against har second remaining seconds calculate karta hai
function useCountdownTo(expiresAt: string | null) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!expiresAt) {
      setSecondsLeft(0);
      return;
    }

    const target = new Date(expiresAt).getTime();

    const tick = () => {
      const diff = Math.floor((target - Date.now()) / 1000);
      setSecondsLeft(diff > 0 ? diff : 0);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  return secondsLeft;
}

// Bumper offer (sabke liye) — har 2 second me poll hota hai
function useOfferStatus() {
  const [isActive, setIsActive] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStatus = () => {
      fetch("/api/offer-status")
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setIsActive(data.isActive ?? false);
          setExpiresAt(data.expiresAt ?? null);
        })
        .catch((err) => console.error("Failed to fetch offer status:", err))
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { isActive, expiresAt, loading };
}

// Per-user special discount (sirf logged-in user ke apne email ke liye) — har 2 second me poll hota hai
function useUserOfferStatus() {
  const [hasOffer, setHasOffer] = useState(false);
  const [yearlyDiscount, setYearlyDiscount] = useState(0);
  const [halfYearlyDiscount, setHalfYearlyDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStatus = () => {
      fetch("/api/user-offer-status")
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setHasOffer(data.hasOffer ?? false);
          setYearlyDiscount(data.yearlyDiscount ?? 0);
          setHalfYearlyDiscount(data.halfYearlyDiscount ?? 0);
          setExpiresAt(data.expiresAt ?? null);
        })
        .catch((err) => console.error("Failed to fetch user offer status:", err))
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { hasOffer, yearlyDiscount, halfYearlyDiscount, expiresAt, loading };
}

function BumperOfferBanner({ secondsLeft }: { secondsLeft: number }) {
  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-center shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)] animate-pulse-slow">
      <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
        ⚡ LIMITED TIME OFFER — ENDS IN{" "}
        <span className="ml-1 rounded-md bg-white/15 px-2 py-1 font-mono tabular-nums">
          {formatCountdown(secondsLeft)}
        </span>
      </span>
    </div>
  );
}

function PersonalOfferBanner({ secondsLeft }: { secondsLeft: number }) {
  return (
    <div className="mb-8 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-center shadow-[0_0_30px_-10px_rgba(16,185,129,0.6)]">
      <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
        🎁 A SPECIAL PRICE HAS BEEN UNLOCKED FOR YOU — ENDS IN{" "}
        <span className="ml-1 rounded-md bg-white/15 px-2 py-1 font-mono tabular-nums">
          {formatMinSec(secondsLeft)}
        </span>
      </span>
    </div>
  );
}

// ============================================================
// OFFER COIN — custom animated badge for the 12-Month plan (bumper offer)
// ============================================================
function OfferCoin({
  wasPrice,
  nowPrice,
  secondsLeft,
}: {
  wasPrice: number;
  nowPrice: number;
  secondsLeft: number;
}) {
  return (
    <div className="offer-coin-stack">
      <div className="offer-coin-float">
        <div className="offer-coin-glow" />
        <div className="offer-coin">
          <div className="offer-coin-sheen" />
          <div className="offer-coin-ribbon">BEST DEAL</div>
          <div className="offer-coin-was">${wasPrice}</div>
          <div className="offer-coin-now">${nowPrice}</div>
          <div className="offer-coin-sub">12 months</div>
        </div>
      </div>

      <div className="offer-coin-timer">
        <span className="offer-coin-dot" />
        {formatCountdown(secondsLeft)}
      </div>

      <style jsx>{`
        .offer-coin-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .offer-coin-float {
          position: relative;
          width: 118px;
          height: 118px;
          animation: coin-float 3.2s ease-in-out infinite;
        }
        .offer-coin-glow {
          position: absolute;
          inset: -14px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.55) 0%,
            rgba(37, 99, 235, 0.35) 45%,
            rgba(0, 0, 0, 0) 72%
          );
          filter: blur(4px);
          animation: coin-pulse 2.4s ease-in-out infinite;
        }
        .offer-coin {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background: radial-gradient(circle at 32% 28%, #26263a 0%, #131320 55%, #060609 100%);
          border: 1px solid rgba(167, 139, 250, 0.45);
          box-shadow:
            0 0 0 4px rgba(9, 9, 14, 0.9),
            0 0 0 5px rgba(167, 139, 250, 0.25),
            inset 0 0 18px rgba(139, 92, 246, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .offer-coin-sheen {
          position: absolute;
          inset: -40%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.16) 18deg,
            transparent 40deg,
            transparent 320deg
          );
          animation: coin-spin 3.6s linear infinite;
        }
        .offer-coin-ribbon {
          position: absolute;
          top: 16px;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #fde68a;
          text-shadow: 0 0 8px rgba(253, 230, 138, 0.6);
        }
        .offer-coin-was {
          margin-top: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #71717a;
          text-decoration: line-through;
        }
        .offer-coin-now {
          font-size: 26px;
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(90deg, #c4b5fd, #93c5fd);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .offer-coin-sub {
          margin-top: 3px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #a1a1aa;
        }
        .offer-coin-timer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 600;
          color: #ddd6fe;
          background: rgba(24, 24, 32, 0.85);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 9999px;
          padding: 4px 12px;
          box-shadow: 0 0 16px -4px rgba(139, 92, 246, 0.5);
        }
        .offer-coin-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #fb7185;
          box-shadow: 0 0 6px 1px rgba(251, 113, 133, 0.8);
          animation: coin-blink 1s ease-in-out infinite;
        }
        @keyframes coin-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes coin-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes coin-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes coin-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .offer-coin-float, .offer-coin-glow, .offer-coin-sheen, .offer-coin-dot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function StandardPricingPage() {
  const router = useRouter();
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  // Bumper offer (sabke liye)
  const { isActive: bumperActive, expiresAt: bumperExpiresAt, loading: bumperLoading } = useOfferStatus();
  const bumperSecondsLeft = useCountdownTo(bumperExpiresAt);
  const isBumperLive = bumperActive && !bumperLoading && bumperSecondsLeft > 0;

  // Per-user special discount (sirf isi logged-in email ke liye)
  const {
    hasOffer: hasUserOffer,
    yearlyDiscount: userYearlyDiscount,
    halfYearlyDiscount: userHalfYearlyDiscount,
    expiresAt: userOfferExpiresAt,
    loading: userOfferLoading,
  } = useUserOfferStatus();
  const userOfferSecondsLeft = useCountdownTo(userOfferExpiresAt);
  const isUserOfferLive = hasUserOffer && !userOfferLoading && userOfferSecondsLeft > 0;

  // Har plan ke liye final price nikalne wala helper:
  // Priority: personal (per-user) discount > bumper offer > normal price
  const getDisplayPrice = (plan: (typeof pricingPlans)[number]) => {
    if (plan.id === "yearly" && isUserOfferLive && userYearlyDiscount > 0) {
      return {
        price: plan.finalPrice - userYearlyDiscount,
        strikePrice: plan.finalPrice,
        isPersonal: true,
      };
    }
    if (plan.id === "halfyearly" && isUserOfferLive && userHalfYearlyDiscount > 0) {
      return {
        price: plan.finalPrice - userHalfYearlyDiscount,
        strikePrice: plan.finalPrice,
        isPersonal: true,
      };
    }
    if (plan.id === "yearly" && isBumperLive) {
      return { price: YEARLY_OFFER_PRICE, strikePrice: plan.finalPrice, isPersonal: false };
    }
    return { price: plan.finalPrice, strikePrice: null, isPersonal: false };
  };

  const getMonthlyEquivalent = (plan: (typeof pricingPlans)[number], price: number) => {
    if (price === plan.finalPrice) {
      return plan.monthlyEquivalent;
    }
    if (plan.id === "yearly" && !getDisplayPrice(plan).isPersonal && isBumperLive) {
      return YEARLY_OFFER_MONTHLY_EQUIVALENT;
    }
    const months = plan.days / 30;
    return `$${(price / months).toFixed(2)}/mo`;
  };

  const handleChoosePlan = (plan: (typeof pricingPlans)[number]) => {
    const { price } = getDisplayPrice(plan);
    setActivatingPlan(plan.id);
    router.push(`/plans/standard/checkout?plan=${plan.id}&amount=${price}`);
  };

  return (
    <main className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-200px] w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[5%] right-[-200px] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />

      {/* Offer coin — bumper offer, sirf personal discount na hone par dikhega */}
      {isBumperLive && !isUserOfferLive && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 scale-[0.8] sm:scale-90 md:scale-100 origin-top-right">
          <OfferCoin wasPrice={269} nowPrice={YEARLY_OFFER_PRICE} secondsLeft={bumperSecondsLeft} />
        </div>
      )}

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

        {/* Personal discount banner sabse pehle priority pe dikhega */}
        {isUserOfferLive ? (
          <PersonalOfferBanner secondsLeft={userOfferSecondsLeft} />
        ) : (
          isBumperLive && <BumperOfferBanner secondsLeft={bumperSecondsLeft} />
        )}

        {/* ✅ MOBILE — stacked cards */}
        <div className="block md:hidden space-y-4">
          {pricingPlans.map((plan) => {
            const { price: displayFinalPrice, strikePrice, isPersonal } = getDisplayPrice(plan);
            const displayMonthlyEquivalent = getMonthlyEquivalent(plan, displayFinalPrice);
            const showStrike = strikePrice !== null;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-5 ${
                  isPersonal
                    ? "border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 to-teal-950/40 shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)]"
                    : plan.popular
                    ? "border-violet-500/50 bg-gradient-to-br from-violet-950/40 to-blue-950/40 shadow-[0_0_40px_-15px_rgba(139,92,246,0.4)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
                  {isPersonal ? (
                    <span className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-[10px] font-semibold text-white">
                      JUST FOR YOU
                    </span>
                  ) : (
                    plan.popular && (
                      <span className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 text-[10px] font-semibold text-white">
                        BEST VALUE
                      </span>
                    )
                  )}
                </div>

                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    ${displayFinalPrice}
                  </span>
                  {showStrike && (
                    <span className="text-sm text-zinc-500 line-through mb-1">${strikePrice}</span>
                  )}
                  {!showStrike && plan.discount && (
                    <span className="text-sm text-zinc-500 line-through mb-1">${plan.regularPrice}</span>
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
                  <span className="text-zinc-400">{displayMonthlyEquivalent}</span>
                </div>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  disabled={activatingPlan !== null}
                  className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {activatingPlan === plan.id ? "Activating..." : "Choose Plan"}
                </button>
              </div>
            );
          })}
        </div>

        {/* ✅ DESKTOP — table */}
        <div className="hidden md:block relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-[0_0_60px_-20px_rgba(139,92,246,0.3)]">
          <div className="overflow-hidden rounded-2xl">
            <table className="w-full">
              <thead className="bg-black/60 text-white border-b border-zinc-800">
                <tr>
                  <th className="px-8 py-5 text-left font-semibold">Plan</th>
                  <th className="px-8 py-5 text-center font-semibold">Regular Price</th>
                  <th className="px-8 py-5 text-center font-semibold">Discount</th>
                  <th className="px-8 py-5 text-center font-semibold">Final Price</th>
                  <th className="px-8 py-5 text-center font-semibold">Monthly Equivalent</th>
                  <th className="px-8 py-5 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {pricingPlans.map((plan) => {
                  const { price: displayFinalPrice, strikePrice, isPersonal } = getDisplayPrice(plan);
                  const displayMonthlyEquivalent = getMonthlyEquivalent(plan, displayFinalPrice);
                  const showStrike = strikePrice !== null;

                  return (
                    <tr
                      key={plan.id}
                      className={`border-t border-zinc-800 ${
                        isPersonal
                          ? "bg-gradient-to-r from-emerald-950/40 to-teal-950/40"
                          : plan.popular
                          ? "bg-gradient-to-r from-violet-950/40 to-blue-950/40"
                          : "bg-transparent"
                      }`}
                    >
                      <td className="px-8 py-6 font-semibold text-lg text-white">
                        {plan.title}
                        {isPersonal && (
                          <span className="ml-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-xs font-semibold text-white">
                            JUST FOR YOU
                          </span>
                        )}
                        {!isPersonal && plan.popular && (
                          <span className="ml-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 text-xs font-semibold text-white">
                            BEST VALUE
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-6 text-center text-zinc-400">${plan.regularPrice}</td>

                      <td className="px-8 py-6 text-center">
                        {plan.discount ? (
                          <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-green-400 font-semibold">
                            {plan.discount}
                          </span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>

                      <td className="px-8 py-6 text-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                          ${displayFinalPrice}
                        </span>
                        {showStrike && (
                          <span className="ml-2 text-sm text-zinc-500 line-through align-middle">
                            ${strikePrice}
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-6 text-center font-medium text-zinc-300">
                        {displayMonthlyEquivalent}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
