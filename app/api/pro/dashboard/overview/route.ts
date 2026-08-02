import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
function deriveNameFromEmail(email: string) {
  const localPart = email.split('@')[0];
  const withoutTrailingNumbers = localPart.replace(/\d+$/, '');
  return withoutTrailingNumbers || localPart;
}
function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
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
    // Saare reviews ek hi baar mein le lo — baaki sab yahan se JS mein calculate hoga
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
    // ✅ Recent Reviews — Recent Activity section ke liye (liquid glass UI shape ke mutabik)
    const recentReviews = allReviews.slice(0, 5).map((r) => ({
      id: r.id,
      name: r.reviewerName || 'Anonymous',
      time: timeAgo(r.createdAt),
      stars: r.rating,
      text: r.comment || '',
      tag: r.replied ? 'replied' : r.rating <= 2 ? 'negative' : 'pending',
      source: r.source,
    }));

    // ✅ 7-day daily trend — stat card sparkline graphs ke liye (aaj vs pichhle 6 din)
    const today = startOfDay(new Date());
    const dayBoundaries: Date[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dayBoundaries.push(d);
    }
    const trend = {
      totalReviews: [] as number[],
      avgRating: [] as number[],
      newReviews: [] as number[],
      responseRate: [] as number[],
      lowRatingCount: [] as number[],
    };
    for (const dayStart of dayBoundaries) {
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);
      const dayReviews = allReviews.filter((r) => r.createdAt >= dayStart && r.createdAt < dayEnd);
      const dayCount = dayReviews.length;
      const dayReplied = dayReviews.filter((r) => r.replied).length;
      const dayLowRating = dayReviews.filter((r) => r.rating <= 2).length;
      const dayAvgRating = dayCount > 0
        ? dayReviews.reduce((sum, r) => sum + r.rating, 0) / dayCount
        : 0;

      trend.totalReviews.push(dayCount);
      trend.newReviews.push(dayCount);
      trend.avgRating.push(Number(dayAvgRating.toFixed(2)));
      trend.responseRate.push(dayCount > 0 ? Math.round((dayReplied / dayCount) * 100) : 0);
      trend.lowRatingCount.push(dayLowRating);
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
        recentReviews,
        trend,
      },
    });
  } catch (error) {
    console.error('Pro dashboard overview error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
