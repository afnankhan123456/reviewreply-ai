import { prisma } from "@/lib/prisma";

export async function GET() {

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
}