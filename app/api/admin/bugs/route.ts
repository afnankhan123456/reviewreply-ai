import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";  // 4 levels up from api/admin/bugs
import { getToken } from "next-auth/jwt";

// GET – list all bug reports (admin only)
export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email || !token.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const bugReports = await prisma.bugReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });

    return NextResponse.json({ success: true, bugs: bugReports });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

// PUT – resolve a bug report (admin only)
export async function PUT(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email || !token.isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing report ID" }, { status: 400 });
    }

    const updated = await prisma.bugReport.update({
      where: { id },
      data: { status: "Resolved" },
    });

    return NextResponse.json({ success: true, message: "Bug report resolved", bug: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
