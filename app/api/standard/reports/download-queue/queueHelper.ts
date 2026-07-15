// app/api/standard/reports/download-queue/route.ts

import { NextResponse } from 'next/server';
import { addToQueue, getQueueStatus } from './queueHelper';

export async function POST(req: Request) {
  try {
    const { userId, format, type } = await req.json();

    if (!userId || !format || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await addToQueue(userId, format, type);

    return NextResponse.json({
      success: true,
      message: 'Added to download queue',
      position: result.position,
      estimatedWait: result.estimatedWait,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const status = await getQueueStatus();

    return NextResponse.json({
      success: true,
      queueLength: status.queueLength,
      isProcessing: status.isProcessing,
      queue: status.queue,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
