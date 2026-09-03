// app/api/admin/user-offer/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

const OFFER_DURATION_MS = 30 * 60 * 1000; // 30 minutes

// GET → sabhi currently-active per-user offers ki list (admin panel ke liye)
export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const offers = await prisma.userSpecialOffer.findMany({
      where: { expiresAt: { gt: new Date() } },
      orderBy: { expiresAt: "desc" },
    });

    return NextResponse.json({ offers });
  } catch (error) {
    console.error("Error fetching user offers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST → ek email ke liye naya 30-min discount grant karo (already hai to overwrite/refresh)
export async function POST(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, yearlyDiscount, halfYearlyDiscount } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const yearly = Number(yearlyDiscount) || 0;
    const halfYearly = Number(halfYearlyDiscount) || 0;

    if (yearly <= 0 && halfYearly <= 0) {
      return NextResponse.json(
        { error: "At least one discount amount is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const expiresAt = new Date(Date.now() + OFFER_DURATION_MS);

    const offer = await prisma.userSpecialOffer.upsert({
      where: { email: normalizedEmail },
      update: { yearlyDiscount: yearly, halfYearlyDiscount: halfYearly, expiresAt },
      create: {
        email: normalizedEmail,
        yearlyDiscount: yearly,
        halfYearlyDiscount: halfYearly,
        expiresAt,
      },
    });

    return NextResponse.json({ success: true, offer });
  } catch (error) {
    console.error("Error granting user offer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE → koi offer time se pehle hi revoke karna ho to (body: { email })
export async function DELETE(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await prisma.userSpecialOffer.deleteMany({
      where: { email: email.trim().toLowerCase() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking user offer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
