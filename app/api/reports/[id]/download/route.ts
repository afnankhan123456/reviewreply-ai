import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";   // 5 levels up
import { getToken } from "next-auth/jwt";

export async function GET(req: any, context: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email || !token?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const reportId = context.params.id;
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        user: { include: { reviews: true } },
      },
    });

    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 });
    }

    // Verify karo ye report isi logged-in user ka hai
    if (report.userId !== token.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // Build a simple CSV
    const reviews = report.user.reviews || [];
    const csvRows = ["Reviewer Name,Rating,Comment,Date"];
    reviews.forEach((r) => {
      csvRows.push(
        `"${r.reviewerName}","${r.rating}","${(r.comment || "").replace(/"/g, '""')}","${r.reviewDate.toISOString()}"`
      );
    });

    const csvContent = csvRows.join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="report-${reportId}.csv"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
