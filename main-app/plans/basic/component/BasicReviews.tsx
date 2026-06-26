export default function BasicReviews() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Recent Reviews
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">

          <p className="font-semibold mb-2">
            ????? Sarah Johnson
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Amazing customer service and very fast delivery.
          </p>

        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">

          <p className="font-semibold mb-2">
            ???? Michael Lee
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Great quality but delivery was slightly late.
          </p>

        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">

          <p className="font-semibold mb-2">
            ????? Emma Watson
          </p>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Friendly support and professional service.
          </p>

        </div>

      </div>

    </div>
  );
}