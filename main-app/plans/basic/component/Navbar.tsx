"use client";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl px-6 py-4 mb-6">

      <div>

        <h1 className="text-2xl font-bold">
          ReviewReply AI
        </h1>

        <p className="text-sm text-zinc-500">
          AI Review Management Dashboard
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="bg-violet-600 hover:bg-violet-700 transition-all px-5 py-2 rounded-2xl text-white font-semibold">
          Upgrade
        </button>

        <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>

      </div>

    </div>
  );
}