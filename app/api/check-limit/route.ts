import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    // 🔁 Monthly reset logic
    if (user.monthlyResetDate) {
      const now = new Date();
      const daysSinceReset = Math.floor(
        (now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceReset >= 30) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            reviewsUsed: 0,
            monthlyResetDate: now,
          },
        });
        user.reviewsUsed = 0;
        user.monthlyResetDate = now;
      }
    }

    const limitReached = user.reviewsUsed >= user.reviewsLimit;

    return NextResponse.json({
      success: true,
      reviewsUsed: user.reviewsUsed,
      reviewsLimit: user.reviewsLimit,
      limitReached,
      message: limitReached
        ? "Monthly review sync limit reached"
        : "Sync available",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
