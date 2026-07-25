import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
    const planType = body.plan; // "monthly", "quarterly", "halfyearly", "yearly"

    const durations: Record<string, number> = {
      monthly: 30,
      quarterly: 90,
      halfyearly: 180,
      yearly: 360,
    };

    if (!planType || !durations[planType]) {
      return NextResponse.json({ success: false, error: "Invalid plan type" }, { status: 400 });
    }

    const start = new Date();
    const end = new Date(start.getTime() + durations[planType] * 24 * 60 * 60 * 1000);

    await prisma.user.update({
      where: { email: token.email },
      data: {
        plan: "standard",
        subscriptionStatus: "active",
        subscriptionStart: start,
        subscriptionEnd: end,
        reviewsUsed: 0,
        monthlyResetDate: start,
        alertEmailsLimit: 500,
        locationsLimit: 2,
      },
    });

    return NextResponse.json({ success: true, message: "Standard plan activated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
