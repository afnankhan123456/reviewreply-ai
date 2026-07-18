import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET(req: Request, context: any) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const cycleId = context.params.cycleId;
    const cycle = await prisma.tagCycle.findUnique({ where: { id: cycleId } });

    if (!cycle) {
      return NextResponse.json({ success: false, error: 'Cycle not found' }, { status: 404 });
    }
    if (cycle.userId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        userId: session.user.id,
        createdAt: { gte: cycle.cycleStart, lt: cycle.cycleEnd },
      },
      orderBy: { createdAt: 'desc' },
    });

    const csvRows = ['Reviewer Name,Rating,Comment,Tags,Date'];
    reviews.forEach((r) => {
      csvRows.push(
        `"${r.reviewerName}","${r.rating}","${(r.comment || '').replace(/"/g, '""')}","${r.tags.join('; ')}","${r.createdAt.toISOString()}"`
      );
    });

    const csvContent = csvRows.join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="tags-history-${cycleId}.csv"`,
      },
    });
  } catch (error) {
    console.error('Cycle download error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
