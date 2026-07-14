import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';

    const responseData = await getCachedOrFetch(
      'weekly-report',
      async () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(now);
        endOfWeek.setHours(23, 59, 59, 999);

        const newReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        const totalReviews = await prisma.review.count({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        const repliedReviews = await prisma.review.count({
          where: {
            replied: true,
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        const responseRate = totalReviews > 0
          ? Math.round((repliedReviews / totalReviews) * 100)
          : 0;

        const positiveReviews = await prisma.review.count({
          where: {
            rating: { gte: 4 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        const negativeReviews = await prisma.review.count({
          where: {
            rating: { lte: 2 },
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
        });

        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);

          const count = await prisma.review.count({
            where: {
              createdAt: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          });
          dailyData.push(count);
        }

        const reviews = await prisma.review.findMany({
          where: {
            createdAt: {
              gte: startOfWeek,
              lte: endOfWeek,
            },
          },
          orderBy: { createdAt: 'desc' },
        });

        const weekNumber = Math.ceil((now.getDate() + new Date(now.getFullYear(), now.getMonth(), 1).getDay()) / 7);

        return {
          success: true,
          data: {
            week: `Week ${weekNumber}`,
            year: now.getFullYear(),
            newReviews,
            totalReviews,
            responseRate,
            positiveReviews,
            negativeReviews,
            dailyTrend: dailyData,
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
          'Content-Disposition': `attachment; filename="weekly-report-week-${data.week.replace(/ /g, '-')}-${data.year}.csv"`,
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

      // Daily trend data (optional)
      const trendRows = [
        ['Date', 'Reviews'],
        ...data.dailyTrend.map((count: number, index: number) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - index));
          return [date.toLocaleDateString(), count];
        }),
      ];

      const docDefinition: any = {
        content: [
          { text: `Weekly Report - ${data.week} ${data.year}`, style: 'header' },
          { text: `New Reviews: ${data.newReviews}   Total Reviews: ${data.totalReviews}   Response Rate: ${data.responseRate}%`, margin: [0, 8] },
          { text: `Positive: ${data.positiveReviews}   Negative: ${data.negativeReviews}`, margin: [0, 4] },
          { text: 'Daily Trend:', margin: [0, 8] },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto'],
              body: trendRows,
            },
            margin: [0, 0, 0, 8],
          },
          { text: 'Reviews List:', margin: [0, 8] },
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
          'Content-Disposition': `attachment; filename="weekly-report-${data.week.replace(/ /g, '-')}-${data.year}.pdf"`,
        },
      });
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Weekly Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
