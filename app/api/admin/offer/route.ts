// app/api/admin/offer/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

const OFFER_ID = "standard-yearly-offer"; // fixed singleton row id
const OFFER_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// GET → current offer status (auto-expires if 24h nikal chuke hain)
export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let offer = await prisma.offerSetting.findUnique({
      where: { id: OFFER_ID },
    });

    // Agar offer ON hai lekin expiresAt nikal chuka hai to khud-ba-khud OFF kar do
    if (offer?.isActive && offer.expiresAt && offer.expiresAt < new Date()) {
      offer = await prisma.offerSetting.update({
        where: { id: OFFER_ID },
        data: { isActive: false, expiresAt: null },
      });
    }

    return NextResponse.json({
      isActive: offer?.isActive ?? false,
      expiresAt: offer?.expiresAt ?? null,
    });
  } catch (error) {
    console.error("Error fetching offer setting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST → offer on/off toggle karo. ON karte waqt expiresAt = now + 24h set hota hai.
export async function POST(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { isActive } = await req.json();

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "isActive (boolean) is required" },
        { status: 400 }
      );
    }

    const expiresAt = isActive ? new Date(Date.now() + OFFER_DURATION_MS) : null;

    const offer = await prisma.offerSetting.upsert({
      where: { id: OFFER_ID },
      update: { isActive, expiresAt },
      create: { id: OFFER_ID, isActive, expiresAt },
    });

    return NextResponse.json({
      success: true,
      isActive: offer.isActive,
      expiresAt: offer.expiresAt,
    });
  } catch (error) {
    console.error("Error updating offer setting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
