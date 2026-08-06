// ✅ Server-side source of truth for plan prices.
// Client se aaya "amount" kabhi trust nahi karna — hamesha isi table se compare karo.

export const PLAN_PRICES: Record<"basic" | "standard", Record<string, number>> = {
  basic: {
    "1m": 0.01,
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
// ⚠️ TEMPORARY: basic/1m ko $0.01 pe test karne ke liye MIN_PLAN_PRICE
// abhi 0.01 kar diya hai. Payment testing complete hone ke baad
// basic.1m ko real price se update karo aur MIN_PLAN_PRICE wapas 5 kar do.
const MIN_PLAN_PRICE = 0.01;
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

export function getExpectedPrice(
  tier: "basic" | "standard",
  planType: string
): number | null {
  const price = PLAN_PRICES[tier]?.[planType];
  return typeof price === "number" ? price : null;
}

// PayPal se aaya actual paid amount is expected price se match karta hai ya nahi
export function isAmountValid(paidAmount: string | number, expectedPrice: number) {
  const paid = Number(paidAmount);
  if (Number.isNaN(paid)) return false;
  return Math.abs(paid - expectedPrice) < 0.01; // chhota tolerance rounding ke liye
}
