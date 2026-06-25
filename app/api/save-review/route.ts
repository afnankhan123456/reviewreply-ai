import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {

    const review =
      await prisma.review.create({
        data: {
          author: "Afnan",
          rating: 5,
          comment: "Amazing service",
          reply: "Thank you so much!",
        },
      });

    return Response.json({
      success: true,
      review,
    });

  } catch (error: any) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
