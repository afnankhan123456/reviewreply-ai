import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ Using @ alias
import { getServerSession } from "next-auth";
import { GET as authHandler } from "../../../api/auth/[...nextauth]/route";

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

    // 4. ✅ FIXED: Use absolute URL for redirect
    const response = NextResponse.redirect(
      new URL(`/r/${referralCode}`, request.url).toString()
    );

    // 🔒 Set the referrer cookie here, server-side, as httpOnly.
    // Client JS can no longer read or forge this value directly.
    response.cookies.set("referrerCode", referralCode, {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (error) {
    console.error("Error tracking referral click:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
