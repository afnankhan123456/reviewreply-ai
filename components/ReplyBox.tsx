export default function ReplyBox() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

      <textarea
        className="w-full bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 outline-none"
        placeholder="Write AI reply..."
      />

      <button className="mt-4 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold">
        Generate Reply
      </button>

    </div>
  );
}
