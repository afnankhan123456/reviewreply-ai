import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { template } = await request.json();

    // 🔥 REAL AI LOGIC YAHAN AAYEGA (OpenAI / Gemini)
    // const aiResponse = await openai.chat.completions.create({ ... });

    const reply = template
      ? `Thank you for your feedback! We appreciate your kind words and are glad you had a great experience. (Using template: ${template})`
      : `Thank you for your valuable feedback. We truly appreciate your kind words and look forward to serving you again soon!`;

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
