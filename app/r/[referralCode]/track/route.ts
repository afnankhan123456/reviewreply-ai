import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { GET as authHandler } from "../../api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ referralCode: string }> }
) {
  try {
    const { referralCode } = await params;

    if (!referralCode) {
      return NextResponse.json(
        { error: "Missing referral code" },
        { status: 400 }
      );
    }

    // 1. Find the user who owns this referral code
    const referrer = await prisma.user.findUnique({
      where: { referralCode: referralCode },
      select: { email: true },
    });

    if (!referrer) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      );
    }

    // 2. Get current logged-in user (if any) - to track who clicked
    const session = await getServerSession(authHandler) as any;
    const clickerEmail = session?.user?.email || null;

    // 3. Record the click in ReferralClick table
    await prisma.referralClick.create({
      data: {
        referrerEmail: referrer.email,
        clickerEmail: clickerEmail,
      },
    });

    // 4. Redirect to the actual referral landing page
    return NextResponse.redirect(
      new URL(`/r/${referralCode}`, request.url)
    );

  } catch (error) {
    console.error("Error tracking referral click:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
