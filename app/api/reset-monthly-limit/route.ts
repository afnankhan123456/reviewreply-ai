import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  try {
    // ✅ Is route ka apna dedicated secret — sirf isi route ke liye valid
    // Fail-safe: agar secret set hi nahi hai to route hamesha reject karo.
    const authHeader = req.headers.get("authorization");
    if (!process.env.CRON_SECRET_RESET_LIMIT || authHeader !== `Bearer ${process.env.CRON_SECRET_RESET_LIMIT}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.updateMany({
      data: {
        reviewsUsed: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Monthly review limits reset successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
