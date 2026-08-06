import { NextResponse } from "next/server";
import { getExpectedPrice } from "@/lib/planPricing";

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

export async function POST(req: Request) {
  try {
    const { planType, tier } = await req.json();
    const planTier = tier === "standard" ? "standard" : "basic";

    // ✅ FIX: client se aaya "amount" ab kabhi use nahi hota — price hamesha
    // server-side table se nikalta hai, taaki request tamper karke amount
    // ghata na sake.
    const amount = getExpectedPrice(planTier, planType);

    if (amount === null) {
      return NextResponse.json(
        { error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // PAYPAL ACCESS TOKEN
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
      console.log("PayPal Token Error:", tokenData);
      return NextResponse.json(
        { error: "Failed to get PayPal access token" },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    // CREATE ORDER — server-calculated amount use hoti hai
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
      console.log("PayPal Order Error:", orderData);
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
    console.log("PAYPAL ERROR:", error);
    return NextResponse.json(
      { error: "PayPal Server Error" },
      { status: 500 }
    );
  }
}
