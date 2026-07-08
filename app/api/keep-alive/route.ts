import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Just a dummy query to keep the Neon database alive
    await prisma.$queryRaw`SELECT 1;`;
    
    return NextResponse.json({
      success: true,
      message: "Database kept alive successfully",
    });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { error: "Failed to keep database alive" },
      { status: 500 }
    );
  }
}
