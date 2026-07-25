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
    const planType = body.plan;
    const tier = body.tier === "standard" ? "standard" : "basic";

    try {
      const result = await activateOrQueuePlan(token.email, planType, tier);
      return NextResponse.json({
        success: true,
        queued: result.queued,
        message: result.queued
          ? `Naya plan queue ho gaya hai — purane plan ke khatam hone ke agle din se shuru hoga`
          : "Plan activated",
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
