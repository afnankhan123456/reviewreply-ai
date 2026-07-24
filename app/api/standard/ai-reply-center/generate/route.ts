import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { generateAIReply } from '@/lib/aiReply';

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // View Only member ko AI reply generate karne nahi denge (ye action hai)
    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return NextResponse.json(
        { success: false, error: 'You have view-only access and cannot generate AI replies.' },
        { status: 403 }
      );
    }

    const { template, reviewText, reviewerName, rating } = await request.json();

    const result = await generateAIReply(ownerId, { reviewText, reviewerName, rating, template });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 429 });
    }

    return NextResponse.json({ success: true, reply: result.reply, remaining: result.remaining });
  } catch (error) {
    console.error('AI Generate Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
