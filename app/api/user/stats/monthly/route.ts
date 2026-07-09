import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { GET as authHandler } from "../../../auth/[...nextauth]/route";

export async function GET() {
  try {
    // 1. Get current logged-in user
    const session = await getServerSession(authHandler) as any;
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 2. Get user from database
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3. Fetch referral stats from referral_stats table
    const referralStats = await prisma.referralStats.findFirst({
      where: { userId: user.id },
    });

    // 4. Default values agar koi stats nahi hai
    const referralClicks = referralStats?.referralClicks || 0;
    const googleSignups = referralStats?.googleSignups || 0;
    const paidSubscriptions = referralStats?.paidSubscriptions || 0;
    
    // 5. Calculate conversion rate
    const conversionRate = referralClicks > 0 
      ? parseFloat(((paidSubscriptions / referralClicks) * 100).toFixed(2))
      : 0;

    // 6. Calculate total earnings (₹100 per paid subscription)
    const totalEarnings = paidSubscriptions * 100;

    return NextResponse.json({
      success: true,
      referralClicks: referralClicks,
      googleSignups: googleSignups,
      paidSubscriptions: paidSubscriptions,
      conversionRate: conversionRate,
      totalEarnings: totalEarnings,
    });

  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
