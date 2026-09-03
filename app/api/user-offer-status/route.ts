// app/api/user-offer-status/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Logged-in user apne khud ke email pe koi special discount active hai ya nahi, yahi check karta hai
export async function GET(req: NextRequest) {
  try {
    const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { hasOffer: false },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const offer = await prisma.userSpecialOffer.findUnique({
      where: { email: token.email.toLowerCase() },
    });

    if (!offer || offer.expiresAt < new Date()) {
      return NextResponse.json(
        { hasOffer: false },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      {
        hasOffer: true,
        yearlyDiscount: offer.yearlyDiscount,
        halfYearlyDiscount: offer.halfYearlyDiscount,
        expiresAt: offer.expiresAt,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching user offer status:", error);
    return NextResponse.json(
      { hasOffer: false },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
