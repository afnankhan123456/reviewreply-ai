import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {

  try {

    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken) {

      return NextResponse.json({
        success: false,
        error: "No Google access token found",
      });
    }

    const users = await prisma.user.findMany({
      include: {
        businessLocations: true,
      },
    });

    for (const user of users) {

      if (user.reviewsUsed >= user.reviewsLimit) {
        continue;
      }

      for (const location of user.businessLocations) {

        const response = await fetch(
          `https://mybusiness.googleapis.com/v4/${location.googleLocationId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );

        const data = await response.json();

        const reviews = data.reviews || [];

        for (const review of reviews) {

          if (user.reviewsUsed >= user.reviewsLimit) {
            break;
          }

          const existingReview = await prisma.review.findFirst({
            where: {
              googleReviewId: review.reviewId,
            },
          });

          if (existingReview) {
            continue;
          }

          await prisma.review.create({
            data: {
              userId: user.id,

              businessLocationId: location.id,

              googleReviewId: review.reviewId,

              reviewerName:
                review.reviewer?.displayName || "Anonymous",

              rating: review.starRating || 0,

              reviewText:
                review.comment || "",

              reviewReply:
                review.reviewReply?.comment || "",

              replied:
                !!review.reviewReply,

              reviewDate:
                new Date(review.createTime),

              syncedAt:
                new Date(),
            },
          });

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              reviewsUsed: {
                increment: 1,
              },
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Auto sync completed",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: String(error),
    });

  }
}
