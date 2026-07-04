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
      include: { reviews: { orderBy: { createdAt: "desc" } } },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const headers = "Reviewer Name,Rating,Comment,Date";
    const rows = user.reviews.map((r) =>
      `"${r.reviewerName}","${r.rating}","${(r.comment || "").replace(/"/g, '""')}","${r.reviewDate.toISOString()}"`
    );
    const csvContent = [headers, ...rows].join("\n");

    await prisma.export.create({
      data: {
        userId: user.id,
        type: "csv",
        fileName: `reviews-export-${new Date().toISOString().slice(0, 10)}.csv`,
      },
    });

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="reviews-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
