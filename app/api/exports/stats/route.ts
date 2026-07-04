import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
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
      include: { exports: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const totalExports = user.exports.length;
    const csvExports = user.exports.filter(e => e.type === "csv").length;
    const pdfExports = user.exports.filter(e => e.type === "pdf").length;
    const successRate = totalExports > 0 ? 100 : 0; // all exports are successful

    return NextResponse.json({
      success: true,
      stats: { totalExports, csvExports, pdfExports, successRate },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
