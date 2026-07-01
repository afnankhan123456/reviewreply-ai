import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {

  try {

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Google Business API connected",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });

  }
}