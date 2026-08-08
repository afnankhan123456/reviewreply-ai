import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  // Fail-safe: is route ka apna dedicated secret — sirf isi route ke liye valid.
  const authHeader = req.headers.get("authorization");
  if (
    !process.env.CRON_SECRET_EXPIRE_SUBSCRIPTIONS ||
    authHeader !== `Bearer ${process.env.CRON_SECRET_EXPIRE_SUBSCRIPTIONS}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Jin users ka subscriptionEnd nikal chuka hai lekin status abhi bhi
    // "active" dikha raha hai — unko "expired" mark karo.
    const result = await prisma.user.updateMany({
      where: {
        subscriptionEnd: { lt: now },
        subscriptionStatus: "active",
      },
      data: {
        subscriptionStatus: "expired",
      },
    });

    return NextResponse.json({
      success: true,
      expiredCount: result.count,
      checkedAt: now.toISOString(),
    });
  } catch (error) {
    console.error("Error expiring subscriptions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
