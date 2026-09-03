// app/api/offer-status/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Next.js ko caching band karne ke liye bolna zaroori hai
export const revalidate = 0;

const OFFER_ID = "standard-yearly-offer";

export async function GET() {
  try {
    const offer = await prisma.offerSetting.findUnique({
      where: { id: OFFER_ID },
    });

    const isExpired =
      offer?.isActive && offer.expiresAt && offer.expiresAt < new Date();

    const result = {
      isActive: isExpired ? false : offer?.isActive ?? false,
      expiresAt: isExpired ? null : offer?.expiresAt ?? null,
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching public offer status:", error);
    return NextResponse.json(
      { isActive: false, expiresAt: null },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}
