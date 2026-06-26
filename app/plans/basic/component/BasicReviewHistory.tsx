export default function BasicReviewHistory() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Review History
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          AI replied to Google review from Sarah Johnson
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Manual approval completed for customer feedback
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Positive review synced successfully
        </div>

      </div>

    </div>
  );
}