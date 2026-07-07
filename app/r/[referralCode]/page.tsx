import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

interface PageProps {
  params: Promise<{
    referralCode: string;
  }>;
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
        name: true,
        email: true,
      },
    });

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Referral Link</h1>
            <p className="text-gray-600">
              The referral link you clicked is invalid or has expired.
            </p>
          </div>
        </div>
      );
    }

    // Success - Show referral landing page
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4f46e5] via-[#6f8dfc] to-[#a48aff]">
        <div className="text-center p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#4f46e5] to-[#a48aff] rounded-full flex items-center justify-center mx-auto text-white text-4xl font-bold shadow-lg">
              🎉
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            You were invited by {user.name || "a user"}!
          </h1>
          <p className="text-gray-600 mb-8">
            Join ReviewReply AI and start managing your reviews efficiently.
          </p>
          <a
            href="/plans"
            className="inline-block bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-8 py-3 rounded-xl font-medium transition shadow-md"
          >
            Get Started Now
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in referral page:", error);
    notFound();
  }
}
