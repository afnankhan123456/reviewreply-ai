// lib/planPricing.ts

// ✅ Server-side source of truth for plan prices.
// Client se aaya "amount" kabhi trust nahi karna — hamesha isi table se compare karo.

import { prisma } from "@/lib/prisma";

export const PLAN_PRICES: Record<"basic" | "standard", Record<string, number>> = {
  basic: {
    "1m": 9,
    "3m": 24,
    "6m": 45,
    "12m": 88,
  },
  standard: {
    monthly: 29,
    quarterly: 80,
    halfyearly: 149,
    yearly: 269,
  },
};

// ✅ FIX (Bug 11): startup sanity check — koi bhi price ek reasonable
// min/max range se bahar nahi hona chahiye. Typo (jaise ek extra/missing
// zero) ko CI/build/startup pe hi pakad lena hai, production mein nahi.
const MIN_PLAN_PRICE = 5;
const MAX_PLAN_PRICE = 500;

function assertPlanPricesInRange() {
  for (const tier of Object.keys(PLAN_PRICES) as Array<keyof typeof PLAN_PRICES>) {
    for (const [planType, price] of Object.entries(PLAN_PRICES[tier])) {
      if (price < MIN_PLAN_PRICE || price > MAX_PLAN_PRICE) {
        throw new Error(
          `Invalid plan price for ${tier}/${planType}: $${price}. ` +
          `Expected a value between $${MIN_PLAN_PRICE} and $${MAX_PLAN_PRICE}. ` +
          `Check lib/planPricing.ts for a possible typo.`
        );
      }
    }
  }
}

assertPlanPricesInRange();

// ============================================================
// BUMPER OFFER — sirf standard/yearly ke liye, admin settings se controlled
// ============================================================
const OFFER_ID = "standard-yearly-offer"; // app/api/admin/offer/route.ts wala hi id
const YEARLY_OFFER_PRICE = 260;

// Admin ne offer ON kiya hai aur woh abhi expire nahi hua, to true.
// Yehi logic app/api/offer-status/route.ts aur app/api/admin/offer/route.ts
// me bhi hai — teeno jagah same rehna chahiye.
async function isYearlyOfferLive(): Promise<boolean> {
  try {
    const offer = await prisma.offerSetting.findUnique({
      where: { id: OFFER_ID },
    });

    if (!offer?.isActive) return false;
    if (offer.expiresAt && offer.expiresAt < new Date()) return false;

    return true;
  } catch (error) {
    console.error("Error checking offer status in planPricing:", error);
    return false; // DB dikkat me galti se discount na de do
  }
}

// ⚠️ Ab async hai — jahan bhi use ho raha hai wahan `await` lagana zaroori hai
// (app/api/paypal/create-order/route.ts aur app/api/paypal/verify-and-activate/route.ts)
export async function getExpectedPrice(
  tier: "basic" | "standard",
  planType: string
): Promise<number | null> {
  const basePrice = PLAN_PRICES[tier]?.[planType];
  if (typeof basePrice !== "number") return null;

  if (tier === "standard" && planType === "yearly" && (await isYearlyOfferLive())) {
    return YEARLY_OFFER_PRICE;
  }

  return basePrice;
}

// PayPal se aaya actual paid amount is expected price se match karta hai ya nahi
export function isAmountValid(paidAmount: string | number, expectedPrice: number) {
  const paid = Number(paidAmount);
  if (Number.isNaN(paid)) return false;
  return Math.abs(paid - expectedPrice) < 0.01; // chhota tolerance rounding ke liye
}
