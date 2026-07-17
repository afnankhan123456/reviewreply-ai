import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

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

    const durations: Record<string, number> = {
      "1m": 30,
      "3m": 90,
      "6m": 180,
      "12m": 365,
      "monthly": 30,
      "quarterly": 90,
      "halfyearly": 180,
      "yearly": 360,
    };

    if (!planType || !durations[planType]) {
      return NextResponse.json({ success: false, error: "Invalid plan type" }, { status: 400 });
    }

    const start = new Date();
    const end = new Date(start.getTime() + durations[planType] * 24 * 60 * 60 * 1000);

    const combinedPlan = `${tier}-${planType}`;
    const alertEmailsLimit = tier === "standard" ? 450 : 100;
    const criticalEmailsLimit = tier === "standard" ? 50 : 0;

    const currentUser = await prisma.user.findUnique({
      where: { email: token.email },
      select: { gmailConnected: true },
    });

    await prisma.user.update({
      where: { email: token.email },
      data: {
        subscriptionStart: start,
        subscriptionEnd: end,
        plan: combinedPlan,
        reviewsUsed: 0,
        monthlyResetDate: start,
        ...(currentUser?.gmailConnected ? { alertEmailsLimit, criticalEmailsLimit } : {}),
      },
    });

    return NextResponse.json({ success: true, message: "Plan activated", plan: combinedPlan });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
