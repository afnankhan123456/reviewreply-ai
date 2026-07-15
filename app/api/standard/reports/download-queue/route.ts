import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ Queue helper functions import karo
import { addToQueue, getQueueStatus, processQueue } from './queueHelper';

export async function POST(req: Request) {
  try {
    const { userId, format, type } = await req.json();

    if (!userId || !format || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Queue mein add karo
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
    // ✅ Queue status return karo
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

// ✅ Queue processor ko background mein run karo
if (process.env.NODE_ENV !== 'test') {
  setInterval(async () => {
    await processQueue();
  }, 3000); // Har 3 second mein queue check karo
}
