import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import TrackingWrapper from "./TrackingWrapper";

interface PageProps {
  params: Promise<{
    referralCode: string;
  }>;
}

// 👇 New: Track referral click in database
async function trackReferralClick(referralCode: string, referrerEmail: string, referrerId: string) {
  try {
    // Check if referral_stats entry exists
    const existingStats = await prisma.referralStats.findFirst({
      where: { userId: referrerId },
    });

    if (existingStats) {
      // Update: referralClicks +1
      await prisma.referralStats.update({
        where: { id: existingStats.id },
        data: {
          referralClicks: { increment: 1 },
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new stats entry
      await prisma.referralStats.create({
        data: {
          userId: referrerId,
          referralCode: referralCode,
          referralClicks: 1,
          googleSignups: 0,
          paidSubscriptions: 0,
        },
      });
    }

    console.log(`✅ Referral click tracked for: ${referrerEmail}`);
  } catch (error) {
    console.error("Error tracking referral click:", error);
  }
}

// 👇 Public Review Page renderer (jab slug match ho)
async function renderPublicReviewPage(slug: string) {
  const user = await prisma.user.findUnique({
    where: { slug },
    select: { id: true, name: true },
  });

  if (!user) return null;

  const reviews = await prisma.review.findMany({
    where: { userId: user.id, rating: { gte: 4 } },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      reviewerName: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
  });

  const avgResult = await prisma.review.aggregate({
    where: { userId: user.id },
    _avg: { rating: true },
  });

  const totalCount = await prisma.review.count({ where: { userId: user.id } });
  const avgRating = Number((avgResult._avg.rating || 0).toFixed(1));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">{user.name || 'Our Business'}</h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-2xl font-bold text-gray-900">{avgRating}</span>
            <span className="text-yellow-500 text-xl">
              {'★'.repeat(Math.round(avgRating))}
              {'☆'.repeat(5 - Math.round(avgRating))}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Based on {totalCount} reviews</p>
        </div>

        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="text-center text-gray-500 py-10">No reviews yet.</div>
          )}
          {reviews.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{r.reviewerName}</span>
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{r.comment || 'No comment provided.'}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ReferralPage({ params }: PageProps) {
  // Await params since Next.js 15 with async dynamic routes
  const { referralCode } = await params;

  if (!referralCode) {
    notFound();
  }

  try {
    // Find the user who owns this referral code
    const user = await prisma.user.findUnique({
      where: { referralCode: referralCode },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      // 👇 Referral code match nahi hua, ab slug (Public Review Page) check karo
      const reviewPage = await renderPublicReviewPage(referralCode);
      if (reviewPage) {
        return reviewPage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-gray-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Referral Link</h1>
            <p className="text-gray-600">
              The referral link you clicked is invalid or has expired.
            </p>
          </div>
        </div>
      );
    }

    // 👇 Track the referral click
    await trackReferralClick(referralCode, user.email, user.id);

    // Success - Clean Professional Background
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
        
        {/* TrackingWrapper for cookie */}
        <TrackingWrapper referralCode={referralCode} />
        
        {/* Subtle professional background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent pointer-events-none"></div>

        {/* White Card */}
        <div className="relative z-10 text-center p-10 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg">
          <div className="mb-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              Welcome to ReviewReply AI 🚀
            </h1>
            <p className="text-sm font-medium text-gray-600 mb-4">
              Every review can bring your next customer ⭐
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Reply smarter, build stronger trust, and take your business to the next level with AI-powered review management.
            </p>
          </div>
          
          
            href="/login"
            className="inline-block bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-8 py-3 rounded-xl font-medium transition shadow-md mt-4"
          >
            Get Started Now
          </a>

          <p className="text-xs text-gray-400 mt-6">
            Made by Afnan Khan
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in referral page:", error);
    notFound();
  }
}
