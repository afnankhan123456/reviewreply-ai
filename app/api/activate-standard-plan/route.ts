import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { activateOrQueuePlan } from "@/lib/planActivation";
import { getExpectedPrice, isAmountValid } from "@/lib/planPricing";

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
    const planType = body.plan; // "monthly", "quarterly", "halfyearly", "yearly"
    const orderID = body.orderID;

    // ✅ FIX: bina verified PayPal payment ke Standard plan activate nahi hoga.
    // Pehle orderID zaroori hai, phir PayPal se seedha verify karo ki
    // payment sach me COMPLETED hai — client pe bharosa nahi karna.
    if (!orderID) {
      return NextResponse.json(
        { success: false, error: "Missing orderID — payment verification required" },
        { status: 400 }
      );
    }

    // ✅ FIX: planType ka sahi price server-side table se pata karo
    const expectedPrice = getExpectedPrice("standard", planType);
    if (expectedPrice === null) {
      return NextResponse.json(
        { success: false, error: "Invalid plan type" },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { success: false, error: "PayPal authentication failed" },
        { status: 500 }
      );
    }

    const orderRes = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const orderData = await orderRes.json();

    if (orderData.status !== "COMPLETED") {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // ✅ FIX: PayPal se asal me jitna paisa charge hua hai, wo plan ke sahi
    // price se match hona chahiye — warna order tampered hai.
    const paidAmount = orderData.purchase_units?.[0]?.amount?.value;
    if (!paidAmount || !isAmountValid(paidAmount, expectedPrice)) {
      return NextResponse.json(
        { success: false, error: "Payment amount does not match plan price" },
        { status: 400 }
      );
    }

    try {
      // ✅ Ab manual prisma.user.update ki jagah shared activateOrQueuePlan
      // use karte hai — taaki queue-logic (agar purana plan chalu hai) bhi sahi se lage.
      const result = await activateOrQueuePlan(token.email, planType, "standard");
      return NextResponse.json({
        success: true,
        queued: result.queued,
        message: result.queued
          ? "Naya plan queue ho gaya hai — purane plan ke khatam hone ke agle din se shuru hoga"
          : "Standard plan activated",
        plan: result.plan,
      });
    } catch (e: any) {
      return NextResponse.json(
        { success: false, error: e.message || "Invalid plan type" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
