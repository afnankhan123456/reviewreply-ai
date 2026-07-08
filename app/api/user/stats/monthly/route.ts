import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { GET as authHandler } from "../../auth/[...nextauth]/route";

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

    // 2. Fetch total impressions (clicks on referral link)
    const impressions = await prisma.referralClick.count({
      where: { referrerEmail: userEmail },
    });

    // 3. Fetch total subscriptions (signups via referral link)
    const subscriptions = await prisma.referralSignup.count({
      where: { referrerEmail: userEmail },
    });

    // 4. Calculate Click Rate
    // (impressions / total signed up users) * 100
    const clickRate = impressions > 0 
      ? ((subscriptions / impressions) * 100).toFixed(2) 
      : 0;

    return NextResponse.json({
      success: true,
      impressions: impressions,
      clicks: impressions, // same as impressions for now
      subscriptions: subscriptions,
      clickRate: parseFloat(clickRate as string),
    });

  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
