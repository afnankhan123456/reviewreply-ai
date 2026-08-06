// app/api/standard/reports/download-queue/route.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { addToQueue, getQueueStatus } from './queueHelper';

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { format, type } = await req.json();

    if (!format || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // userId ab request body se nahi, session se liya — spoof nahi ho sakta
    const userId = token.id;

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

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Sirf isi user ki queue status dikhao — poora array sabko nahi
    const status = await getQueueStatus(token.id);

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
