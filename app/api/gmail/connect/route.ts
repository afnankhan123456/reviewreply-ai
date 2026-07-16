import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; 
import { getToken } from "next-auth/jwt";

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Allow connection even if user logged in via email (removed provider check)
    // User can connect their business account even if they logged in with regular email

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // If already connected, just return success
    if (user.gmailConnected) {
      return NextResponse.json({ success: true, message: "Gmail already connected" });
    }

    // Connect Gmail and set alert monthly reset if not already set
    await prisma.user.update({
      where: { email: token.email },
      data: {
        gmailConnected: true,
        // Set initial monthly reset date if not present
        alertMonthlyReset: user.alertMonthlyReset || new Date(),
      },
    });

    return NextResponse.json({ success: true, message: "Gmail connected successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
