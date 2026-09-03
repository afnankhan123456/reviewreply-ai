import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { activateOrQueuePlan } from "@/lib/planActivation";
import { getExpectedPrice, isAmountValid } from "@/lib/planPricing";

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

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
    const planTier = tier === "standard" ? "standard" : "basic";

    if (!orderID || !planType) {
      return NextResponse.json(
        { success: false, error: "Missing orderID or planType" },
        { status: 400 }
      );
    }

    // ✅ FIX: planType ka sahi price server-side table se pata karo — client
    // se aaya amount is baar bhi trust nahi karna.
    // ⚠️ ab async — live bumper offer (agar admin ne ON kiya hai) yahi check karta hai
    const expectedPrice = await getExpectedPrice(planTier, planType);
    if (expectedPrice === null) {
      return NextResponse.json(
        { success: false, error: "Invalid plan type" },
        { status: 400 }
      );
    }

    // 1) PayPal se access token lo
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenRes = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      // ✅ FIX (Bug 10): poora tokenData object nahi
      console.error("PayPal Token Error:", tokenData?.error || "unknown");
      return NextResponse.json(
        { success: false, error: "PayPal authentication failed" },
        { status: 500 }
      );
    }

    // 2) Order ka status seedha PayPal se verify karo — client pe bharosa nahi karna
    const orderRes = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const orderData = await orderRes.json();

    if (orderData.status !== "COMPLETED") {
      // ✅ FIX (Bug 10): poora orderData object nahi (payer PII ho sakti hai)
      console.warn("PayPal order not completed. orderID:", orderID, "status:", orderData.status);
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // ✅ FIX: PayPal se asal me jitna paisa charge hua hai, wo us plan ke
    // sahi price se match hona chahiye — warna order tampered hai.
    const paidAmount = orderData.purchase_units?.[0]?.amount?.value;
    if (!paidAmount || !isAmountValid(paidAmount, expectedPrice)) {
      console.log("PayPal amount mismatch:", { paidAmount, expectedPrice, planType, planTier });
      return NextResponse.json(
        { success: false, error: "Payment amount does not match plan price" },
        { status: 400 }
      );
    }

    // 3) Payment confirm ho gaya aur amount sahi hai — ab plan activate ya queue karo
    // ✅ NAYA FIX: orderID ab activateOrQueuePlan ko bhi diya ja raha hai —
    // taaki wahi function replay-protection (UsedPaypalOrder check) kare.
    let result;
    try {
      result = await activateOrQueuePlan(token.email, planType, planTier, orderID);
    } catch (e: any) {
      // Agar ye orderID already use ho chuka hai, to yahan error aayega
      console.warn("Plan activation blocked:", e?.message || e);
      return NextResponse.json(
        { success: false, error: e?.message || "Plan activation failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      queued: result.queued,
      plan: result.plan,
      message: result.queued
        ? "Payment successful — naya plan queue ho gaya hai"
        : "Payment successful — plan activated",
    });
  } catch (error) {
    // ✅ FIX (Bug 10): sirf message log, client ko raw error mat bhejo
    console.error("PAYPAL VERIFY ERROR:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 });
  }
}
