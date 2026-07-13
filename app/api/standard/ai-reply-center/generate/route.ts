import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { template } = await request.json();

    // 🔥 REAL AI LOGIC USING OPENROUTER
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
