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
// BUMPER OFFER — sabke liye, admin settings se controlled
// ============================================================
const OFFER_ID = "standard-yearly-offer";
const YEARLY_OFFER_PRICE = 260;

async function isYearlyOfferLive(): Promise<boolean> {
  try {
    const offer = await prisma.offerSetting.findUnique({ where: { id: OFFER_ID } });
    if (!offer?.isActive) return false;
    if (offer.expiresAt && offer.expiresAt < new Date()) return false;
    return true;
  } catch (error) {
    console.error("Error checking bumper offer status in planPricing:", error);
    return false;
  }
}

// ============================================================
// PER-USER SPECIAL DISCOUNT — sirf specific email, 30-min expiry
// ============================================================
async function getUserDiscount(email: string, planType: string): Promise<number> {
  try {
    const offer = await prisma.userSpecialOffer.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!offer || offer.expiresAt < new Date()) return 0;

    if (planType === "yearly") return offer.yearlyDiscount || 0;
    if (planType === "halfyearly") return offer.halfYearlyDiscount || 0;

    return 0;
  } catch (error) {
    console.error("Error checking user special offer in planPricing:", error);
    return 0;
  }
}

// ⚠️ Async hai — jahan bhi use ho raha hai wahan `await` lagana zaroori hai.
// `email` optional hai — jab pass karoge tabhi personal discount check hoga.
export async function getExpectedPrice(
  tier: "basic" | "standard",
  planType: string,
  email?: string
): Promise<number | null> {
  const basePrice = PLAN_PRICES[tier]?.[planType];
  if (typeof basePrice !== "number") return null;

  // 1) Personal discount ki sabse zyada priority hai
  if (tier === "standard" && email && (planType === "yearly" || planType === "halfyearly")) {
    const discount = await getUserDiscount(email, planType);
    if (discount > 0) {
      return basePrice - discount;
    }
  }

  // 2) Fir bumper offer (sirf yearly ke liye)
  if (tier === "standard" && planType === "yearly" && (await isYearlyOfferLive())) {
    return YEARLY_OFFER_PRICE;
  }

  return basePrice;
}

// PayPal se aaya actual paid amount is expected price se match karta hai ya nahi
export function isAmountValid(paidAmount: string | number, expectedPrice: number) {
  const paid = Number(paidAmount);
  if (Number.isNaN(paid)) return false;
  return Math.abs(paid - expectedPrice) < 0.01;
}
