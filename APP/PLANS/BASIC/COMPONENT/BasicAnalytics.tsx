export default function BasicAnalytics() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Basic Analytics
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Response Rate</span>
          <span className="font-bold text-green-500">
            92%
          </span>
        </div>

        <div className="flex justify-between">
          <span>Review Growth</span>
          <span className="font-bold">
            +18%
          </span>
        </div>

        <div className="flex justify-between">
          <span>Average Rating</span>
          <span className="font-bold">
            4.7 ?
          </span>
        </div>

      </div>

    </div>
  );
}