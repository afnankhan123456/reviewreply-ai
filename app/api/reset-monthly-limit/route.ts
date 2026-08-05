import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: Request) {
  try {
    // ✅ Sirf Vercel Cron (jiske paas sahi CRON_SECRET hai) ye chala sakta hai
    // Fail-safe: agar CRON_SECRET set hi nahi hai to route hamesha reject karo.
    const authHeader = req.headers.get("authorization");
    if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
