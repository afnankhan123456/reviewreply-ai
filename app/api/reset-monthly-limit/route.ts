import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    await prisma.user.updateMany({
      data: {
        reviewsUsed: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Monthly review limits reset successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
