import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
  try {
    // Dynamic import to avoid build‑time issues
    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("pdfmake/build/vfs_fonts"));
    pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.default;

    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
      include: { reviews: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const reviews = user.reviews;
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

    const tableRows = [
      ["Reviewer", "Rating", "Comment", "Date"],
      ...reviews.map(r => [
        r.reviewerName,
        r.rating.toString(),
        r.comment || "",
        new Date(r.reviewDate).toLocaleDateString(),
      ]),
    ];

    const docDefinition: any = {
      content: [
        { text: "Review Export Report", style: "header" },
        `Average Rating: ${avgRating}   Total Reviews: ${reviews.length}`,
        { text: " ", margin: [0, 8] },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "auto"],
            body: tableRows,
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 8] },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      pdfDoc.getBuffer((buffer: Buffer) => resolve(buffer));
    });

    const pdfArray = new Uint8Array(pdfBuffer);

    await prisma.export.create({
      data: {
        userId: user.id,
        type: "pdf",
        fileName: `reviews-report-${new Date().toISOString().slice(0, 10)}.pdf`,
      },
    });

    return new NextResponse(pdfArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="reviews-report-${new Date().toISOString().slice(0, 10)}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
