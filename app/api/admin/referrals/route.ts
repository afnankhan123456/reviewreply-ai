import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const referrals = await prisma.referralSignup.findMany({
      orderBy: { signupDate: "desc" },
    });

    const enrichedReferrals = await Promise.all(
      referrals.map(async (ref) => {
        // Find referrer
        const referrer = await prisma.user.findFirst({
          where: {
            OR: [
              { email: ref.referrerEmail },
              { referralCode: ref.referrerEmail },
            ],
          },
          select: {
            id: true,
            name: true,
            email: true,
            referralCode: true,
          },
        });

        // Find referred user
        const referredUser = await prisma.user.findUnique({
          where: { email: ref.signupEmail },
          select: {
            name: true,
            email: true,
            plan: true,
            subscriptionStatus: true,
          },
        });

        // Get referral stats
        const stats = referrer
          ? await prisma.referralStats.findFirst({
              where: { userId: referrer.id },
            })
          : null;

        const hasSubscription =
          referredUser?.subscriptionStatus === "active" &&
          referredUser?.plan !== "basic";

        return {
          id: ref.id,
          referrerName: referrer?.name || "Unknown",
          referrerEmail: referrer?.email || ref.referrerEmail,
          referrerCode: referrer?.referralCode || ref.referrerEmail,
          referredUserName: referredUser?.name || "Unknown",
          referredUserEmail: ref.signupEmail,
          signupDate: ref.signupDate,
          hasSubscription: hasSubscription,
          plan: referredUser?.plan || "basic",
          commission: hasSubscription ? 250 : 0,
          paidSubscriptions: stats?.paidSubscriptions || 0,
          totalEarnings: (stats?.paidSubscriptions || 0) * 100,
        };
      })
    );

    return NextResponse.json({
      success: true,
      referrals: enrichedReferrals,
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
