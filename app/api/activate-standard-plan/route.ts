import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, planId, days } = await req.json();

    const subscriptionEnd = new Date();
    subscriptionEnd.setDate(subscriptionEnd.getDate() + days);

    // Plan ke hisaab se alert email limit set hoti hai
    const alertEmailsLimit = planId === "standard" ? 500 : 100;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        plan: planId,
        subscriptionStatus: "active",
        subscriptionStart: new Date(),
        subscriptionEnd: subscriptionEnd,
        alertEmailsLimit,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to activate standard plan" }, { status: 500 });
  }
}
