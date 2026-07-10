import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Please login first" },
        { status: 401 }
      );
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: { email: session.user.email },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { success: true, withdrawals },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
