// app/api/standard/reports/download-queue/queueHelper.ts

const MAX_QUEUE_SIZE = 200;
const MAX_PER_USER = 3;

const downloadQueue: { userId: string; format: string; type: string }[] = [];
let isProcessing = false;

export async function addToQueue(userId: string, format: string, type: string) {
  // Ek user ki bahut zyada pending requests na ho (abuse rokne ke liye)
  const userPending = downloadQueue.filter((q) => q.userId === userId).length;
  if (userPending >= MAX_PER_USER) {
    throw new Error('Too many pending downloads. Please wait for existing ones to finish.');
  }

  // Poori queue ki upper limit — memory exhaustion se bachne ke liye
  if (downloadQueue.length >= MAX_QUEUE_SIZE) {
    throw new Error('Download queue is full right now. Please try again shortly.');
  }

  downloadQueue.push({ userId, format, type });
  const position = downloadQueue.length;
  return { position, estimatedWait: position * 5 };
}

// Sirf caller ke apne queue items return karo — poora array kisi ko nahi
export async function getQueueStatus(userId: string) {
  const userQueue = downloadQueue.filter((q) => q.userId === userId);
  return {
    queueLength: downloadQueue.length,
    isProcessing,
    queue: userQueue,
  };
}

export async function processQueue() {
  if (isProcessing || downloadQueue.length === 0) return;

  isProcessing = true;

  while (downloadQueue.length > 0) {
    const request = downloadQueue.shift();
    if (!request) continue;

    const { userId, format, type } = request;

    try {
      console.log(`Processing download for user ${userId} (${type} - ${format})`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`✅ Download processed for user ${userId}`);
    } catch (error) {
      console.error(`❌ Error processing download for user ${userId}:`, error);
    }
  }

  isProcessing = false;
  console.log('✅ Queue processing finished');
}
