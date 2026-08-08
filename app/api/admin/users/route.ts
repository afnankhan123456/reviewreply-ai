import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        subscriptionStatus: true,
        subscriptionStart: true,
        subscriptionEnd: true,
        pendingPlan: true,
        pendingPlanActivatesAt: true,
        googleConnected: true,
        googleBusinessConnected: true,
        gmailConnected: true,
        syncEnabled: true,
        lastReviewSync: true,
        autoReplyMode: true,
        reviewsUsed: true,
        reviewsLimit: true,
        aiRepliesUsed: true,
        aiRepliesLimit: true,
        locationsUsed: true,
        locationsLimit: true,
        referralCode: true,
        createdAt: true,
        lastLogin: true,
        referralStats: {
          select: {
            referralClicks: true,
            googleSignups: true,
            paidSubscriptions: true,
          },
        },
        teamMembersOwned: {
          select: { id: true, status: true },
        },
      },
    });

    // Payment history — kis-kis email ne kabhi PayPal se paisa diya
    const paidOrders = await prisma.usedPaypalOrder.findMany({
      select: { userEmail: true, tier: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    const paidMap = new Map<string, { count: number; lastTier: string; lastDate: Date }>();
    for (const o of paidOrders) {
      const existing = paidMap.get(o.userEmail);
      if (!existing) {
        paidMap.set(o.userEmail, { count: 1, lastTier: o.tier, lastDate: o.createdAt });
      } else {
        existing.count += 1;
      }
    }

    const now = new Date();

    const enriched = users.map((u) => {
      const payment = paidMap.get(u.email);
      const daysLeft = u.subscriptionEnd
        ? Math.ceil((new Date(u.subscriptionEnd).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      let statusLabel = "Login only (never paid)";
      if (payment) {
        if (u.subscriptionEnd && new Date(u.subscriptionEnd) < now) {
          statusLabel = "Expired";
        } else if (u.plan !== "basic" && u.subscriptionStatus === "active") {
          statusLabel = "Active paid";
        } else {
          statusLabel = "Paid (inactive)";
        }
      }

      return {
        id: u.id,
        name: u.name || "—",
        email: u.email,
        plan: u.plan,
        subscriptionStatus: u.subscriptionStatus,
        subscriptionStart: u.subscriptionStart,
        subscriptionEnd: u.subscriptionEnd,
        daysLeft,
        statusLabel,
        hasEverPaid: !!payment,
        totalPayments: payment?.count || 0,
        pendingPlan: u.pendingPlan,
        pendingPlanActivatesAt: u.pendingPlanActivatesAt,
        googleConnected: u.googleConnected,
        googleBusinessConnected: u.googleBusinessConnected,
        gmailConnected: u.gmailConnected,
        syncEnabled: u.syncEnabled,
        lastReviewSync: u.lastReviewSync,
        autoReplyMode: u.autoReplyMode,
        reviewsUsed: u.reviewsUsed,
        reviewsLimit: u.reviewsLimit,
        aiRepliesUsed: u.aiRepliesUsed,
        aiRepliesLimit: u.aiRepliesLimit,
        locationsUsed: u.locationsUsed,
        locationsLimit: u.locationsLimit,
        referralCode: u.referralCode,
        referralClicks: u.referralStats[0]?.referralClicks || 0,
        referralSignups: u.referralStats[0]?.googleSignups || 0,
        referralPaidConversions: u.referralStats[0]?.paidSubscriptions || 0,
        teamMembersCount: u.teamMembersOwned.length,
        createdAt: u.createdAt,
        lastLogin: u.lastLogin,
      };
    });

    const summary = {
      total: enriched.length,
      activePaid: enriched.filter((u) => u.statusLabel === "Active paid").length,
      expired: enriched.filter((u) => u.statusLabel === "Expired").length,
      loginOnly: enriched.filter((u) => u.statusLabel === "Login only (never paid)").length,
      googleConnected: enriched.filter((u) => u.googleConnected).length,
      usingReferral: enriched.filter((u) => u.referralSignups > 0 || u.referralClicks > 0).length,
    };

    return NextResponse.json({ success: true, users: enriched, summary });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
