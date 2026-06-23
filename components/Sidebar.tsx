import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        ReviewReply AI
      </h1>

      <div className="space-y-3">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-white bg-zinc-900 p-4 rounded-xl"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/reviews"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          ⭐ Reviews
        </Link>

        <Link
          href="/analytics"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          📈 Analytics
        </Link>

        <Link
          href="/summary"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          🤖 AI Summary
        </Link>

        <Link
          href="/reply-tool"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          💬 Reply Tool
        </Link>

        <Link
          href="/alerts"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          🔔 Alerts
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 text-zinc-400 hover:text-white p-3"
        >
          ⚙️ Settings
        </Link>

      </div>

    </div>
  );
}



