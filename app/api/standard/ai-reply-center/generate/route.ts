import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // View Only member ko AI reply generate karne nahi denge (ye ek action hai)
    const { role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return NextResponse.json(
        { success: false, error: 'You have view-only access and cannot generate AI replies.' },
        { status: 403 }
      );
    }

    const { template } = await request.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that writes professional, empathetic replies for customer reviews.',
          },
          {
            role: 'user',
            content: template
              ? `Write a professional reply for a customer review. Use this template style: ${template}`
              : 'Write a general professional reply for a customer review.',
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, unable to generate reply at this time.';

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error('AI Generate Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
