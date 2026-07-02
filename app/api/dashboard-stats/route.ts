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
      include: { reviews: true, businessLocations: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Reviews Synced stats
    const reviewsSynced = {
      current: user.reviewsUsed,
      total: user.reviewsLimit,
    };

    // Sync status
    const syncStatus = {
      active: user.syncEnabled,
      lastSynced: user.lastReviewSync ? user.lastReviewSync.toISOString() : "",
    };

    // All reviews
    const allReviews = user.reviews;

    // Average rating
    const totalReviews = allReviews.length;
    const averageRating =
      totalReviews > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    // Rating counts [5,4,3,2,1]
    const ratingCounts = [0, 0, 0, 0, 0];
    allReviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingCounts[5 - r.rating]++; // index 0 -> 5 stars, 4 -> 1 star
      }
    });

    // Sentiment (positive = 4+, negative = 1-2)
    let positive = 0;
    let negative = 0;
    allReviews.forEach((r) => {
      if (r.rating >= 4) positive++;
      else if (r.rating <= 2) negative++;
    });
    const sentiment = {
      positive: totalReviews > 0 ? Math.round((positive / totalReviews) * 100) : 0,
      negative: totalReviews > 0 ? Math.round((negative / totalReviews) * 100) : 0,
    };

    // Unanswered reviews (replied = false)
    const unansweredReviews = allReviews
      .filter((r) => !r.replied)
      .map((r) => ({
        name: r.reviewerName,
        text: r.comment || "",
        rating: r.rating,
        initial: r.reviewerName?.charAt(0) || "?",
      }));

    // Recent reviews (last 5)
    const recentReviews = allReviews
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((r) => ({
        name: r.reviewerName,
        text: r.comment || "",
        rating: r.rating,
        initial: r.reviewerName?.charAt(0) || "?",
        status: r.replied ? "Replied" : "Pending",
        statusColor: r.replied
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      }));

    // Top keywords (empty for now)
    const topKeywords: any[] = [];

    // Response tracking
    const repliedCount = allReviews.filter((r) => r.replied).length;
    const pendingCount = allReviews.filter((r) => !r.replied).length;
    const responseTracking = {
      total: totalReviews,
      replied: repliedCount,
      pending: pendingCount,
      noReply: 0, // You can adjust later
    };

    return NextResponse.json({
      success: true,
      data: {
        reviewsSynced,
        syncStatus,
        averageRating,
        totalReviews,
        ratingCounts,
        sentiment,
        unansweredReviews,
        recentReviews,
        topKeywords,
        responseTracking,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
