import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ In-memory queue (production mein Redis ya DB use karna)
const downloadQueue: { userId: string; format: string; type: string }[] = [];
let isProcessing = false;

export async function POST(req: Request) {
  try {
    const { userId, format, type } = await req.json();

    if (!userId || !format || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ User ko queue mein add karo
    downloadQueue.push({ userId, format, type });
    const position = downloadQueue.length;

    return NextResponse.json({
      success: true,
      message: 'Added to download queue',
      position,
      estimatedWait: position * 5, // seconds
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
    // ✅ Queue ki current status return karo
    const queueLength = downloadQueue.length;
    const currentProcessing = isProcessing;

    return NextResponse.json({
      success: true,
      queueLength,
      isProcessing,
      queue: downloadQueue,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// ✅ Queue processor (background mein chalta hai)
export async function processQueue() {
  if (isProcessing || downloadQueue.length === 0) return;

  isProcessing = true;

  while (downloadQueue.length > 0) {
    const request = downloadQueue.shift(); // FIFO
    if (!request) continue;

    const { userId, format, type } = request;

    try {
      console.log(`Processing download for user ${userId} (${type} - ${format})`);

      // ✅ Yahan actual download logic call karo
      // await generateAndSendReport(userId, format, type);
      
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log(`✅ Download processed for user ${userId}`);
    } catch (error) {
      console.error(`❌ Error processing download for user ${userId}:`, error);
    }
  }

  isProcessing = false;
  console.log('✅ Queue processing finished');
}

// ✅ Start queue processor (call this on server start or periodically)
if (process.env.NODE_ENV !== 'test') {
  setInterval(processQueue, 3000); // Har 3 second mein queue check karo
}
