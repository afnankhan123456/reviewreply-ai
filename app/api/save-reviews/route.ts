import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const {
      userId,
      businessLocationId,
      reviews,
    } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {

      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    if (user.reviewsUsed >= user.reviewsLimit) {

      return NextResponse.json({
        success: false,
        error: "Monthly review sync limit reached",
      });
    }

    let savedCount = 0;

    for (const review of reviews) {

      if (savedCount >= user.reviewsLimit) {
        break;
      }

      const existingReview = await prisma.review.findUnique({
        where: {
          googleReviewId: review.reviewId,
        },
      });

      if (existingReview) {
        continue;
      }

      await prisma.review.create({
        data: {
          userId,
          businessLocationId,

          googleReviewId: review.reviewId,

          reviewerName:
            review.reviewer?.displayName || "Google User",

          rating:
            review.starRating || 5,

          comment:
            review.comment || "",

          reviewReply:
            review.reviewReply?.comment || "",

          replied:
            !!review.reviewReply,

          reviewDate:
            review.createTime
              ? new Date(review.createTime)
              : new Date(),

          syncedAt: new Date(),
        },
      });

      savedCount++;
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        reviewsUsed: {
          increment: savedCount,
        },
      },
    });

    return NextResponse.json({
      success: true,
      savedReviews: savedCount,
      remaining:
        user.reviewsLimit - (user.reviewsUsed + savedCount),
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: String(error),
    });

  }
}