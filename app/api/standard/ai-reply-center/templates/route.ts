import { NextResponse } from 'next/server';

export async function GET() {
  const templates = [
    'General Thank You',
    'Positive Review Response',
    'Negative Review Response',
    'Neutral Review Response',
    'Short & Sweet',
    'Professional Thank You',
    'Apology Response',
    'Detailed Feedback Response',
    'Quick Acknowledge',
    'VIP Customer Response',
  ];

  return NextResponse.json({ success: true, templates });
}
