// app/api/paypal/create-order/route.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getExpectedPrice } from "@/lib/planPricing";

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

// ---- Simple in-memory rate limiter (per user) ----
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5; // order creation ko strict rakha
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

export async function POST(req: Request) {
  try {
    // ✅ FIX: sirf logged-in users hi order create kar sakte hain
    const token: any = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX: per-user rate limit
    if (isRateLimited(token.id)) {
      return NextResponse.json(
        { error: "Too many requests, please try again shortly" },
        { status: 429 }
      );
    }

    const { planType, tier } = await req.json();
    const planTier = tier === "standard" ? "standard" : "basic";

    // ⚠️ ab async — live bumper offer + is user ka personal discount (agar hai) yahi check karta hai
    const amount = await getExpectedPrice(planTier, planType, token.email);

    if (amount === null) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      // ✅ FIX (Bug 10): poora tokenData object nahi, sirf error field log karo
      console.error("PayPal Token Error:", tokenData?.error || "unknown");
      return NextResponse.json(
        { error: "Failed to get PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    const orderResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: String(amount),
              },
            },
          ],
          application_context: {
            return_url: "https://www.reviewreply-ai.in/plans/basic/dashboard",
            cancel_url: "https://www.reviewreply-ai.in/plans/basic/pricing",
            brand_name: "ReviewReply AI",
            landing_page: "BILLING",
            user_action: "PAY_NOW",
          },
        }),
      }
    );

    const orderData = await orderResponse.json();

    if (!orderData.links) {
      // ✅ FIX (Bug 10): poora orderData object nahi
      console.error("PayPal Order Error:", orderData?.name || "unknown");
      return NextResponse.json(
        { error: "Failed to create PayPal order" },
        { status: 500 }
      );
    }

    const approveLink = orderData.links?.find(
      (link: any) => link.rel === "approve"
    );

    if (!approveLink) {
      return NextResponse.json(
        { error: "No approval link found" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: approveLink.href,
    });
  } catch (error) {
    console.log("PAYPAL ERROR:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      { error: "PayPal Server Error" },
      { status: 500 }
    );
  }
}
