import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const {
      userId,
      googleLocationId,
      businessName,
      address,
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
      where: {
        id: userId,
      },
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
      error,
    });

  }
}