import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

const STAR_MAP: Record<string, number> = {
  STAR_RATING_UNSPECIFIED: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken || !token?.id) {
      return NextResponse.json({
        success: false,
        error: "No Google access token found",
      });
    }

    const locationName = req.nextUrl.searchParams.get("location");

    if (!locationName) {
      return NextResponse.json({
        success: false,
        error: "Location is required",
      });
    }

    const reviewsResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/${locationName}/reviews`,
      { headers: { Authorization: `Bearer ${token.accessToken}` } }
    );

    const reviewsData = await reviewsResponse.json();
    const googleReviews = reviewsData.reviews || [];

    // Is location ka humara internal BusinessLocation record dhoondo
    const businessLocation = await prisma.businessLocation.findUnique({
      where: { googleLocationId: locationName },
    });

    let savedCount = 0;

    for (const r of googleReviews) {
      const rating = STAR_MAP[r.starRating] ?? 0;

      try {
        await prisma.review.upsert({
          where: { googleReviewId: r.reviewId },
          update: {
            rating,
            comment: r.comment || null,
            reviewReply: r.reviewReply?.comment || null,
            replied: !!r.reviewReply,
          },
          create: {
            userId: token.id,
            businessLocationId: businessLocation?.id || null,
            googleReviewId: r.reviewId,
            reviewerName: r.reviewer?.displayName || "Anonymous",
            reviewerPhoto: r.reviewer?.profilePhotoUrl || null,
            source: "google",
            rating,
            comment: r.comment || null,
            replied: !!r.reviewReply,
            reviewReply: r.reviewReply?.comment || null,
            reviewDate: r.createTime ? new Date(r.createTime) : new Date(),
            syncedAt: new Date(),
          },
        });
        savedCount++;
      } catch (saveError) {
        console.error("Error saving review:", r.reviewId, saveError);
      }
    }

    return NextResponse.json({
      success: true,
      fetched: googleReviews.length,
      saved: savedCount,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
