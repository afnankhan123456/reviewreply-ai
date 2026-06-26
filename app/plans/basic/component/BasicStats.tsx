export default function BasicStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

        <p className="text-zinc-500 text-sm mb-2">
          Total Reviews
        </p>

        <h2 className="text-3xl font-bold">
          248
        </h2>

        <p className="text-green-500 text-sm mt-2">
          +32 this month
        </p>

      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

        <p className="text-zinc-500 text-sm mb-2">
          Average Rating
        </p>

        <h2 className="text-3xl font-bold">
          4.7 ?
        </h2>

        <p className="text-green-500 text-sm mt-2">
          Excellent customer feedback
        </p>

      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

        <p className="text-zinc-500 text-sm mb-2">
          Pending Replies
        </p>

        <h2 className="text-3xl font-bold">
          12
        </h2>

        <p className="text-yellow-500 text-sm mt-2">
          Needs response
        </p>

      </div>

    </div>
  );
}