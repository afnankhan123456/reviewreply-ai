import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedOrFetch } from '@/app/lib/cache';
import { addToQueue, getQueueStatus } from '../download-queue/queueHelper';

export async function GET(request: Request) {
  try {
    // ✅ Check if user is in queue
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || 'anonymous';
    
    // Check queue status
    const queueStatus = await getQueueStatus();
    
    // If queue is not empty, return queue status
    if (queueStatus.queueLength > 0) {
      return NextResponse.json({
        success: true,
        inQueue: true,
        queueLength: queueStatus.queueLength,
        position: queueStatus.queue.findIndex((q: any) => q.userId === userId) + 1,
        message: 'Your request is in queue. Please wait.',
      });
    }

    // ✅ If queue is empty, process history data
    const responseData = await getCachedOrFetch(
      'history-report',
      async () => {
        const now = new Date();
        
        // ✅ Rolling 6-month window: Current month + previous 5 months
        const sixMonthsAgo = new Date(now);
        sixMonthsAgo.setMonth(now.getMonth() - 6);

        // Monthly breakdown (rolling window)
        const monthlyData = [];
        for (let i = 0; i < 6; i++) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

          // Check if this month has any data
          const count = await prisma.review.count({
            where: {
              createdAt: {
                gte: monthStart,
                lt: monthEnd,
              },
            },
          });

          // If count > 0, calculate average rating
          let avgRating = 0;
          let responseRate = 0;
          
          if (count > 0) {
            const avgRatingResult = await prisma.review.aggregate({
              where: {
                createdAt: {
                  gte: monthStart,
                  lt: monthEnd,
                },
              },
              _avg: {
                rating: true,
              },
            });
            avgRating = avgRatingResult._avg.rating || 0;

            // Response rate for this month
            const repliedCount = await prisma.review.count({
              where: {
                replied: true,
                createdAt: {
                  gte: monthStart,
                  lt: monthEnd,
                },
              },
            });
            responseRate = Math.round((repliedCount / count) * 100);
          }

          monthlyData.push({
            month: monthStart.toLocaleString('default', { month: 'short', year: 'numeric' }),
            count,
            avgRating: Number(avgRating.toFixed(1)),
            responseRate,
          });
        }

        // Filter out months with no data
        const filteredMonthlyData = monthlyData.filter(m => m.count > 0);

        return {
          success: true,
          data: {
            dateRange: {
              start: sixMonthsAgo.toISOString(),
              end: now.toISOString(),
            },
            monthlyData: filteredMonthlyData,
            generatedAt: now.toISOString(),
          },
        };
      },
      3600 // 1 hour cache
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('History Report Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
