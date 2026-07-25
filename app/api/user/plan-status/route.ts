import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { activatePendingPlanIfDue } from "@/lib/planQueue";

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Pehle check karo — agar naya (queued) plan activate hone ka time aa gaya hai to abhi kar do
    await activatePendingPlanIfDue(token.id);

    const user = await prisma.user.findUnique({
      where: { id: token.id },
      select: {
        plan: true,
        subscriptionEnd: true,
        pendingPlan: true,
        pendingPlanActivatesAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    let daysLeft: number | null = null;
    if (user.subscriptionEnd) {
      const diffMs = new Date(user.subscriptionEnd).getTime() - Date.now();
      daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    }

    return NextResponse.json({
      success: true,
      plan: user.plan,
      subscriptionEnd: user.subscriptionEnd,
      daysLeft,
      hasPendingPlan: !!user.pendingPlan,
      pendingPlanActivatesAt: user.pendingPlanActivatesAt,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
