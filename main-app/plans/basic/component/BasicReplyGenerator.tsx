export default function BasicReplyGenerator() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        AI Reply Generator
      </h2>

      <textarea
        className="w-full h-[140px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 outline-none resize-none"
        defaultValue="Customer loved our fast delivery and support."
      />

      <button className="w-full mt-4 bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-3 font-semibold text-white">
        Generate Reply
      </button>

      <div className="mt-5 bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">

        <p className="text-sm">
          Thank you for your wonderful feedback! We're happy you enjoyed our fast delivery and support.
        </p>

      </div>

    </div>
  );
}