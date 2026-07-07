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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
          <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
        <div className="text-center p-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg border border-white/20">
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
          
          <a
            href="/plans"
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
