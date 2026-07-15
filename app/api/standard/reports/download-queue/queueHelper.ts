// app/api/standard/reports/download-queue/queueHelper.ts

// ✅ In-memory queue (production mein Redis ya DB use karna)
const downloadQueue: { userId: string; format: string; type: string }[] = [];
let isProcessing = false;

// ✅ Queue mein add karne ka function
export async function addToQueue(userId: string, format: string, type: string) {
  downloadQueue.push({ userId, format, type });
  const position = downloadQueue.length;
  return { position, estimatedWait: position * 5 };
}

// ✅ Queue status return karne ka function
export async function getQueueStatus() {
  return {
    queueLength: downloadQueue.length,
    isProcessing,
    queue: downloadQueue,
  };
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
