import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const reports = await prisma.report.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      reports,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (user.subscriptionEnd && new Date(user.subscriptionEnd) < new Date()) {
      return NextResponse.json({ success: false, error: "Subscription expired. Please renew your plan." }, { status: 403 });
    }

    const now = new Date();
    const periodStart = user.monthlyResetDate || user.createdAt;
    const periodEnd = now;

    const currentMonthReviews = await prisma.review.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: periodStart, lte: periodEnd },
      },
    });

    const totalReviews = currentMonthReviews.length;
    const averageRating =
      totalReviews > 0
        ? currentMonthReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    const report = await prisma.report.create({
      data: {
        userId: user.id,
        title: `Monthly Performance Report - ${periodStart.toLocaleDateString()} to ${periodEnd.toLocaleDateString()}`,
        type: "monthly",
        averageRating,
        totalReviews,
        periodStart,
        periodEnd,
      },
    });

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
