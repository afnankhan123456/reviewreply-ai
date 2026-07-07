import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../lib/prisma";
import { GET as authHandler } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    // 1. Get current logged-in user session
    const session = await getServerSession(authHandler);
    
    // 2. If not logged in, return error
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // 3. Fetch user from database to get referralCode
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { referralCode: true },
    });

    // 4. If user not found or no referral code, return error
    if (!user || !user.referralCode) {
      return NextResponse.json(
        { error: "Referral code not found for this user" },
        { status: 404 }
      );
    }

    // 5. Return the referral code successfully
    return NextResponse.json(
      { 
        success: true, 
        referralCode: user.referralCode 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching referral code:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
