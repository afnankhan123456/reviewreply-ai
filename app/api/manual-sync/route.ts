import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
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

    const locations = await prisma.businessLocation.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!locations.length) {
      return NextResponse.json({
        success: false,
        error: "No business location connected",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Manual sync started",
      locations,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
