import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";  // 4 levels up from api/admin/bugs
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Ensure only admin can access
    if (!token?.email || !token.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const bugReports = await prisma.bugReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true, name: true },  // include user info for display
        },
      },
    });

    return NextResponse.json({ success: true, bugs: bugReports });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
