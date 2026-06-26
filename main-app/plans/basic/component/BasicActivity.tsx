export default function BasicActivity() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          AI replied to 12 reviews today
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Google review sync completed
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          New positive review detected
        </div>

      </div>

    </div>
  );
}