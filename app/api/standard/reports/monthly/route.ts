import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    const responseData = await getCachedOrFetch(
      'monthly-report',
      async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now);
        endOfMonth.setHours(23, 59, 59, 999);

        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        const avgRating = await prisma.review.aggregate({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          _avg: { rating: true },
        });

        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        const responseRate = totalReviews > 0
          ? Math.round((repliedReviews / totalReviews) * 100)
          : 0;

        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

        return {
          success: true,
          data: {
            month: monthName,
            totalReviews,
            avgRating: avgRating._avg.rating || 0,
            positiveReviews,
            negativeReviews,
            responseRate,
            reviews,
            generatedAt: now.toISOString(),
          },
          format,
        };
      },
      3600
    );

    // ✅ CSV format (data download)
    if (format === 'csv') {
      const { data } = responseData;
      const rows = data.reviews.map((review: any) => ({
        'Review ID': review.id,
        'Rating': review.rating,
        'Comment': review.comment || '',
        'Replied': review.replied ? 'Yes' : 'No',
        'AI Replied': review.aiReplied ? 'Yes' : 'No',
        'Created At': new Date(review.createdAt).toLocaleDateString(),
      }));

      const headers = Object.keys(rows[0] || {});
      const csvRows = [
        headers.join(','),
        ...rows.map(row => headers.map(h => `"${row[h]}"`).join(','))
      ];
      const csvString = csvRows.join('\n');

      return new NextResponse(csvString, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="monthly-report-${data.month.replace(/ /g, '-')}.csv"`,
        },
      });
    }

    // ✅ PDF format (using pdfmake - same as your file)
    if (format === 'pdf') {
      const { data } = responseData;
      
      // Dynamic import of pdfmake (to avoid build issues)
      const pdfMake = (await import('pdfmake/build/pdfmake')).default;
      const pdfFonts = (await import('pdfmake/build/vfs_fonts'));
      pdfMake.vfs = pdfFonts.default?.pdfMake?.vfs || pdfFonts.default;

      // Table rows for PDF
      const tableRows = [
        ['Review ID', 'Rating', 'Comment', 'Replied', 'Date'],
        ...data.reviews.map((review: any) => [
          review.id,
          review.rating.toString(),
          review.comment || '',
          review.replied ? 'Yes' : 'No',
          new Date(review.createdAt).toLocaleDateString(),
        ]),
      ];

      const docDefinition: any = {
        content: [
          { text: `Monthly Report - ${data.month}`, style: 'header' },
          { text: `Total Reviews: ${data.totalReviews}   Avg Rating: ${data.avgRating.toFixed(1)} ★   Response Rate: ${data.responseRate}%`, margin: [0, 8] },
          { text: `Positive: ${data.positiveReviews}   Negative: ${data.negativeReviews}`, margin: [0, 4] },
          { text: ' ', margin: [0, 8] },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', '*', 'auto', 'auto'],
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

      return new NextResponse(pdfArray, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="monthly-report-${data.month.replace(/ /g, '-')}.pdf"`,
        },
      });
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Monthly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
