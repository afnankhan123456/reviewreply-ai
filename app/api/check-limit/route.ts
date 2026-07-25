import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id; // request body se nahi, session se

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
