import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
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
    });

    if (!report) {
      return NextResponse.json({ success: false, error: "Report not found" }, { status: 404 });
    }

    if (report.userId !== token.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: report.userId,
        createdAt: {
          gte: report.periodStart ?? undefined,
          lte: report.periodEnd ?? undefined,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

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
