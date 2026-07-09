import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get whitelisted emails
    const partners = await prisma.partnerWhitelist.findMany({
      select: { email: true },
    });
    const whitelistEmails = partners.map((p) => p.email);

    // Get all referrals
    const referrals = await prisma.referralSignup.findMany({
      orderBy: { signupDate: "desc" },
    });

    // Filter only whitelisted
    const enrichedReferrals = await Promise.all(
      referrals
        .filter((ref) => {
          // Check if referrer email is in whitelist
          return whitelistEmails.includes(ref.referrerEmail);
        })
        .map(async (ref) => {
          const referrer = await prisma.user.findFirst({
            where: {
              OR: [
                { email: ref.referrerEmail },
                { referralCode: ref.referrerEmail },
              ],
            },
            select: { id: true, name: true, email: true, referralCode: true },
          });

          const referredUser = await prisma.user.findUnique({
            where: { email: ref.signupEmail },
            select: { name: true, email: true, plan: true, subscriptionStatus: true },
          });

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
            isWhitelisted: true,
          };
        })
    );

    return NextResponse.json({
      success: true,
      referrals: enrichedReferrals,
    });
  } catch (error) {
    console.error("Error fetching whitelist referrals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
