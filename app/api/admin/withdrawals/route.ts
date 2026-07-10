import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const month = searchParams.get("month");

    const whereClause: any = {};

    if (email) {
      whereClause.email = { contains: email };
    }

    if (month !== null && month !== "") {
      const year = new Date().getFullYear();
      whereClause.createdAt = {
        gte: new Date(year, parseInt(month), 1),
        lt: new Date(year, parseInt(month) + 1, 1),
      };
    }

    const withdrawals = await prisma.withdrawal.findMany({
      where: whereClause,
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
