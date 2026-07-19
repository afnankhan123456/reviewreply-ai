import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const reviews = await prisma.review.findMany({
      where: { userId: ownerId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
