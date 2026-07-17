import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { googleLocationId, businessName, address } = body;

    const userId = token.id; // request body se nahi, session se liya

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found",
      });
    }

    if (user.locationsUsed >= user.locationsLimit) {
      return NextResponse.json({
        success: false,
        error: "Basic plan supports only 1 location",
      });
    }

    await prisma.businessLocation.create({
      data: {
        userId,
        googleLocationId,
        businessName,
        address,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        locationsUsed: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
