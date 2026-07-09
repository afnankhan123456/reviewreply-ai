import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found with this email" },
        { status: 404 }
      );
    }

    // Find and reset ALL referral stats
    const existingStats = await prisma.referralStats.findFirst({
      where: { userId: user.id },
    });

    if (existingStats) {
      await prisma.referralStats.update({
        where: { id: existingStats.id },
        data: {
          referralClicks: 0,
          googleSignups: 0,
          paidSubscriptions: 0,
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `All stats reset to 0 for ${user.email}`,
    });
  } catch (error) {
    console.error("Error resetting earnings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
