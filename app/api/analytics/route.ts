import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
      include: { reviews: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const reviewsPerMonth: { [key: string]: number } = {};
    user.reviews.forEach((r) => {
      const month = r.reviewDate.toISOString().slice(0, 7); // YYYY-MM
      reviewsPerMonth[month] = (reviewsPerMonth[month] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      analytics: {
        totalReviews: user.reviews.length,
        averageRating:
          user.reviews.length > 0
            ? user.reviews.reduce((sum, r) => sum + r.rating, 0) / user.reviews.length
            : 0,
        reviewsPerMonth,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
