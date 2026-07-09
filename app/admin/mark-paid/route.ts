import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { referrerId } = await req.json();

    if (!referrerId) {
      return NextResponse.json(
        { error: "Referrer ID required" },
        { status: 400 }
      );
    }

    // Reset referral stats
    const existingStats = await prisma.referralStats.findFirst({
      where: { userId: referrerId },
    });

    if (existingStats) {
      await prisma.referralStats.update({
        where: { id: existingStats.id },
        data: {
          paidSubscriptions: 0,
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment marked as paid & earnings reset to ₹0",
    });
  } catch (error) {
    console.error("Error marking as paid:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
