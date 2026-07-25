import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function GET(request: Request) {
  try {
    // ✅ Auth check add kiya — ab bina login ke ye endpoint kaam nahi karega
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // ✅ Sirf logged-in user (ya uske owner) ka data milega, kisi aur ka nahi
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build where clause
    const where: any = { userId: ownerId }; // ✅ sirf apna data
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Fetch all reviews
    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });

    if (format === 'csv') {
      // Generate CSV
      const headers = ['ID', 'Rating', 'Comment', 'Replied', 'AI Replied', 'Created At', 'User'];
      const rows = reviews.map((review) => [
        review.id,
        review.rating,
        `"${review.comment || ''}"`,
        review.replied ? 'Yes' : 'No',
        review.aiReplied ? 'Yes' : 'No',
        review.createdAt.toISOString(),
        review.user?.name || 'Anonymous',
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(','))
      ].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="reviews-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    } else if (format === 'pdf') {
      // For PDF, we'll return JSON data (client-side PDF generation)
      return NextResponse.json({
        success: true,
        data: reviews,
        format: 'pdf',
        message: 'PDF generation is handled client-side',
      });
    } else {
      // Default: return JSON
      return NextResponse.json({
        success: true,
        data: reviews,
        count: reviews.length,
      });
    }
  } catch (error) {
    console.error('Export Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
