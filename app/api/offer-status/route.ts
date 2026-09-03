// app/api/offer-status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OFFER_ID = "standard-yearly-offer";

export async function GET() {
  try {
    const offer = await prisma.offerSetting.findUnique({
      where: { id: OFFER_ID },
    });

    if (offer?.isActive && offer.expiresAt && offer.expiresAt < new Date()) {
      return NextResponse.json({ isActive: false, expiresAt: null });
    }

    return NextResponse.json({
      isActive: offer?.isActive ?? false,
      expiresAt: offer?.expiresAt ?? null,
    });
  } catch (error) {
    console.error("Error fetching public offer status:", error);
    return NextResponse.json({ isActive: false, expiresAt: null });
  }
}
