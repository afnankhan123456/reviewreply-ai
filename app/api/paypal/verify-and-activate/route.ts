import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { activateOrQueuePlan } from "@/lib/planActivation";

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderID, planType, tier } = body;

    if (!orderID || !planType) {
      return NextResponse.json(
        { success: false, error: "Missing orderID or planType" },
        { status: 400 }
      );
    }

    // 1) PayPal se access token lo
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.log("PayPal Token Error:", tokenData);
      return NextResponse.json(
        { success: false, error: "PayPal authentication failed" },
        { status: 500 }
      );
    }

    // 2) Order ka status seedha PayPal se verify karo — client pe bharosa nahi karna
    const orderRes = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const orderData = await orderRes.json();

    if (orderData.status !== "COMPLETED") {
      console.log("PayPal order not completed:", orderData);
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // 3) Payment confirm ho gaya — ab plan activate ya queue karo
    const planTier = tier === "standard" ? "standard" : "basic";
    const result = await activateOrQueuePlan(token.email, planType, planTier);

    return NextResponse.json({
      success: true,
      queued: result.queued,
      plan: result.plan,
      message: result.queued
        ? "Payment successful — naya plan queue ho gaya hai"
        : "Payment successful — plan activated",
    });
  } catch (error) {
    console.log("PAYPAL VERIFY ERROR:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
