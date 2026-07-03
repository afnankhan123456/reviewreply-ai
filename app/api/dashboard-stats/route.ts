import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

// Simple stop words list (extend as needed)
const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "i", "you", "he", "she", "it", "we", "they", "me", "him",
  "her", "us", "them", "my", "your", "his", "its", "our", "their",
  "mine", "yours", "hers", "ours", "theirs", "this", "that", "these",
  "those", "not", "no", "nor", "just", "very", "too", "so", "than",
  "also", "if", "then", "else", "when", "where", "why", "how", "all",
  "each", "every", "both", "few", "more", "most", "other", "some",
  "such", "only", "own", "same", "into", "over", "about", "again",
  "further", "once", "here", "there", "up", "down", "out", "off",
  "above", "below", "between", "among", "from", "by", "without",
]);

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

    const allReviews = user.reviews;

    // Basic stats
    const reviewsSynced = {
      current: user.reviewsUsed,
      total: user.reviewsLimit,
    };

    const syncStatus = {
      active: user.syncEnabled,
      lastSynced: user.lastReviewSync ? user.lastReviewSync.toISOString() : "",
    };

    const totalReviews = allReviews.length;
    const averageRating =
      totalReviews > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    // Rating counts [5,4,3,2,1]
    const ratingCounts = [0, 0, 0, 0, 0];
    allReviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingCounts[5 - r.rating]++;
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

    // Unanswered reviews
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

    // Top Keywords extraction
    const wordCounts: Record<string, number> = {};
    allReviews.forEach((r) => {
      const words = (r.comment || "")
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    });

    const sortedKeywords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const maxKeywordCount = sortedKeywords.length > 0 ? sortedKeywords[0][1] : 1;
    const topKeywords = sortedKeywords.map(([word, count]) => ({
      name: word.charAt(0).toUpperCase() + word.slice(1),
      value: `${count} (${Math.round((count / totalReviews) * 100)}%)`,
      width: `${Math.round((count / maxKeywordCount) * 100)}%`,
    }));

    // -------------------------------------------------
    // Filter reviews by plan duration for monthly charts
    // -------------------------------------------------
    const planStart = user.subscriptionStart;
    const planEnd = user.subscriptionEnd ?? new Date();   // if no end date, use now

    const planReviews = allReviews.filter((r) => {
      return r.reviewDate >= planStart && r.reviewDate <= planEnd;
    });

    const reviewsPerMonth: Record<string, number> = {};
    planReviews.forEach((r) => {
      const month = r.reviewDate.toISOString().slice(0, 7); // "YYYY-MM"
      reviewsPerMonth[month] = (reviewsPerMonth[month] || 0) + 1;
    });

    const monthlyData = Object.entries(reviewsPerMonth)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Response tracking
    const repliedCount = allReviews.filter((r) => r.replied).length;
    const pendingCount = allReviews.filter((r) => !r.replied).length;
    const responseTracking = {
      total: totalReviews,
      replied: repliedCount,
      pending: pendingCount,
      noReply: 0,
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
        monthlyData,            // now plan‑period filtered
        responseTracking,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
