import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { getAllPossibleTags } from '@/lib/autoTag';

function deriveNameFromEmail(email: string) {
  const localPart = email.split('@')[0];
  const withoutTrailingNumbers = localPart.replace(/\d+$/, '');
  return withoutTrailingNumbers || localPart;
}

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { ownerId } = await resolveOwnerAndRole(session.user.id);
    const userId = ownerId;

    const userCheck = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionEnd: true, monthlyResetDate: true, createdAt: true, email: true },
    });
    if (userCheck?.subscriptionEnd && new Date(userCheck.subscriptionEnd) < new Date()) {
      return NextResponse.json({ success: false, error: 'Subscription expired. Please renew your plan.' }, { status: 403 });
    }

    const cycleStart = userCheck?.monthlyResetDate || userCheck?.createdAt || new Date();

    // ✅ Saare reviews ek hi baar mein le lo — baaki sab yahan se JS mein calculate hoga
    const allReviews = await prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        reviewerName: true,
        rating: true,
        comment: true,
        source: true,
        replied: true,
        tags: true,
        createdAt: true,
      },
    });

    const totalReviews = allReviews.length;

    const avgRating = totalReviews > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const newReviews = allReviews.filter((r) => r.createdAt >= cycleStart).length;

    const repliedReviews = allReviews.filter((r) => r.replied).length;
    const responseRate = totalReviews > 0 ? Math.round((repliedReviews / totalReviews) * 100) : 0;

    const lowRatingCount = allReviews.filter((r) => r.rating <= 2).length;

    const starBreakdown = [5, 4, 3, 2, 1].map((stars) => {
      const count = allReviews.filter((r) => r.rating === stars).length;
      const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
      return { stars, count, percent };
    });

    const positiveCount = allReviews.filter((r) => r.rating >= 4).length;
    const neutralCount = allReviews.filter((r) => r.rating === 3).length;
    const negativeCount = lowRatingCount;
    const positivePercent = totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 0;
    const neutralPercent = totalReviews > 0 ? Math.round((neutralCount / totalReviews) * 100) : 0;
    const negativePercent = totalReviews > 0 ? Math.round((negativeCount / totalReviews) * 100) : 0;

    const sourceMap: Record<string, number> = {};
    for (const r of allReviews) {
      const key = r.source || 'Other';
      sourceMap[key] = (sourceMap[key] || 0) + 1;
    }
    const sourceBreakdown = Object.entries(sourceMap).map(([source, count]) => ({ source, count }));

    const allTags = getAllPossibleTags();
    const tagCountMap: Record<string, number> = {};
    for (const r of allReviews) {
      for (const t of r.tags) {
        tagCountMap[t] = (tagCountMap[t] || 0) + 1;
      }
    }
    const tagCounts = allTags
      .map((tag) => ({ tag, count: tagCountMap[tag] || 0 }))
      .filter((t) => t.count > 0)
      .sort((a, b) => b.count - a.count);
    const topTags = tagCounts.slice(0, 20);

    const latestReviews = allReviews.slice(0, 3).map((r) => ({
      id: r.id,
      reviewerName: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
      source: r.source,
      createdAt: r.createdAt,
    }));

    // ✅ Pichle 30 din ka daily trend — ek hi pass mein bucket karke
    const dailyBuckets: Record<string, number> = {};
    for (const r of allReviews) {
      const key = new Date(r.createdAt).toDateString();
      dailyBuckets[key] = (dailyBuckets[key] || 0) + 1;
    }

    const dailyTrend = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toDateString();
      dailyTrend.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: dailyBuckets[key] || 0,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        userName: userCheck?.email ? deriveNameFromEmail(userCheck.email) : 'there',
        totalReviews,
        avgRating: Number(avgRating.toFixed(1)),
        newReviews,
        responseRate,
        lowRatingCount,
        starBreakdown,
        sentiment: { positivePercent, neutralPercent, negativePercent },
        sourceBreakdown,
        topTags,
        latestReviews,
        dailyTrend,
      },
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
