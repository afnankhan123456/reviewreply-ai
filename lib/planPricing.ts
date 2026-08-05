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
