import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'pdf';
    const cacheKey = `monthly-report-${userId}`;

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const now = new Date();

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { monthlyResetDate: true, createdAt: true },
        });

        // Rolling window: jab se plan liya (ya monthlyResetDate) tab se ab tak
        const cycleStart = user?.monthlyResetDate || user?.createdAt || now;
        const cycleEnd = now;

        const totalReviews = await prisma.review.count({
          where: { userId, createdAt: { gte: cycleStart, lte: cycleEnd } },
        });

        const avgRating = await prisma.review.aggregate({
          where: { userId, createdAt: { gte: cycleStart, lte: cycleEnd } },
          _avg: { rating: true },
        });

        const positiveReviews = await prisma.review.count({
          where: { userId, rating: { gte: 4 }, createdAt: { gte: cycleStart, lte: cycleEnd } },
        });

        const negativeReviews = await prisma.review.count({
          where: { userId, rating: { lte: 2 }, createdAt: { gte: cycleStart, lte: cycleEnd } },
        });

        const repliedReviews = await prisma.review.count({
          where: { userId, replied: true, createdAt: { gte: cycleStart, lte: cycleEnd } },
        });

        const responseRate = totalReviews > 0
          ? Math.round((repliedReviews / totalReviews) * 100)
          : 0;

        const reviews = await prisma.review.findMany({
          where: { userId, createdAt: { gte: cycleStart, lte: cycleEnd } },
          take: 500,
          orderBy: { createdAt: 'desc' },
        });

        const monthLabel = `${cycleStart.toLocaleDateString()} - ${cycleEnd.toLocaleDateString()}`;

        return {
          success: true,
          data: {
            month: monthLabel,
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
      300
    );

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
        ...rows.map((row: any) => headers.map((h) => `"${row[h]}"`).join(',')),
      ];
      const csvString = csvRows.join('\n');

      return new NextResponse(csvString, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="monthly-report-${data.month.replace(/ /g, '-')}.csv"`,
        },
      });
    }

    if (format === 'pdf') {
      const { data } = responseData;
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text(`Monthly Report - ${data.month}`, 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`Total Reviews: ${data.totalReviews}`, 20, 40);
      doc.text(`Avg Rating: ${data.avgRating.toFixed(1)} ★`, 20, 50);
      doc.text(`Response Rate: ${data.responseRate}%`, 20, 60);
      doc.text(`Positive: ${data.positiveReviews}`, 20, 70);
      doc.text(`Negative: ${data.negativeReviews}`, 20, 80);

      const tableData = data.reviews.map((review: any) => [
        review.id.slice(0, 8) + '...',
        review.rating.toString(),
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
