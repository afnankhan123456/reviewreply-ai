import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

    // ✅ PDF format (actual PDF file download)
    if (format === 'pdf') {
      const { data } = responseData;
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text(`Monthly Report - ${data.month}`, 105, 20, { align: 'center' });
      
      // Stats
      doc.setFontSize(12);
      doc.text(`Total Reviews: ${data.totalReviews}`, 20, 40);
      doc.text(`Avg Rating: ${data.avgRating.toFixed(1)} ★`, 20, 50);
      doc.text(`Response Rate: ${data.responseRate}%`, 20, 60);
      doc.text(`Positive: ${data.positiveReviews}`, 20, 70);
      doc.text(`Negative: ${data.negativeReviews}`, 20, 80);
      
      // Reviews Table
      const tableData = data.reviews.map((review: any) => [
        review.id,
        review.rating,
        review.comment || '',
        review.replied ? 'Yes' : 'No',
        new Date(review.createdAt).toLocaleDateString(),
      ]);

      autoTable(doc, {
        head: [['ID', 'Rating', 'Comment', 'Replied', 'Date']],
        body: tableData,
        startY: 90,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [79, 70, 229] },
      });

      // PDF Buffer
      const pdfBuffer = doc.output('arraybuffer');

      return new NextResponse(pdfBuffer, {
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
