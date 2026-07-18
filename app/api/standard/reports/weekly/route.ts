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
    const cacheKey = `weekly-report-${userId}`;

    const responseData = await getCachedOrFetch(
      cacheKey,
      async () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(now);
        endOfWeek.setHours(23, 59, 59, 999);

        const totalReviews = await prisma.review.count({
          where: { userId, createdAt: { gte: startOfWeek, lte: endOfWeek } },
        });

        const newReviews = totalReviews;

        const repliedReviews = await prisma.review.count({
          where: { userId, replied: true, createdAt: { gte: startOfWeek, lte: endOfWeek } },
        });

        const responseRate = totalReviews > 0
          ? Math.round((repliedReviews / totalReviews) * 100)
          : 0;

        const positiveReviews = await prisma.review.count({
          where: { userId, rating: { gte: 4 }, createdAt: { gte: startOfWeek, lte: endOfWeek } },
        });

        const negativeReviews = await prisma.review.count({
          where: { userId, rating: { lte: 2 }, createdAt: { gte: startOfWeek, lte: endOfWeek } },
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
            where: { userId, createdAt: { gte: startOfDay, lte: endOfDay } },
          });
          dailyData.push(count);
        }

        const reviews = await prisma.review.findMany({
          where: { userId, createdAt: { gte: startOfWeek, lte: endOfWeek } },
          take: 500,
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
          'Content-Disposition': `attachment; filename="weekly-report-week-${data.week.replace(/ /g, '-')}-${data.year}.csv"`,
        },
      });
    }

    if (format === 'pdf') {
      const { data } = responseData;
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text(`Weekly Report - ${data.week} ${data.year}`, 105, 20, { align: 'center' });

      doc.setFontSize(12);
      doc.text(`New Reviews: ${data.newReviews}`, 20, 40);
      doc.text(`Total Reviews: ${data.totalReviews}`, 20, 50);
      doc.text(`Response Rate: ${data.responseRate}%`, 20, 60);
      doc.text(`Positive: ${data.positiveReviews}`, 20, 70);
      doc.text(`Negative: ${data.negativeReviews}`, 20, 80);

      doc.text('Daily Trend:', 20, 95);
      const trendData = data.dailyTrend.map((count: number, index: number) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        return [date.toLocaleDateString(), count.toString()];
      });

      autoTable(doc, {
        head: [['Date', 'Reviews']],
        body: trendData,
        startY: 100,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [168, 85, 247] },
      });

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
        startY: (doc as any).lastAutoTable.finalY + 10,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [168, 85, 247] },
      });

      const pdfBuffer = doc.output('arraybuffer');

      return new NextResponse(pdfBuffer, {
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
