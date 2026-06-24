import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-80 min-h-screen bg-[#0B1020]/90 backdrop-blur-2xl border-r border-white/10 flex-col justify-between px-6 py-8 shadow-2xl">
      <div>
        <div className="mb-12">
          <h1 className="text-3xl font-black text-white tracking-tight">
            ReviewReply AI
          </h1>

          <p className="text-sm text-zinc-400 mt-2">
            Premium AI Review Platform
          </p>
        </div>

        <nav className="space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-4 text-white font-semibold shadow-xl"
          >
            <span className="text-xl">📊</span>
            Dashboard
          </Link>

          <Link
            href="/reviews"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">⭐</span>
            Reviews
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">📈</span>
            Analytics
          </Link>

          <Link
            href="/summary"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">🤖</span>
            AI Summary
          </Link>

          <Link
            href="/reply-tool"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">💬</span>
            Reply Tool
          </Link>

          <Link
            href="/alerts"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">🔔</span>
            Alerts
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <span className="text-xl">⚙️</span>
            Settings
          </Link>
        </nav>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-2xl">
        <p className="text-sm text-zinc-400 mb-2">
          AI Review Performance
        </p>

        <h3 className="text-3xl font-bold text-white">
          98%
        </h3>

        <div className="mt-4 h-3 rounded-full bg-zinc-800 overflow-hidden">
          <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"></div>
        </div>
      </div>
    </aside>
  );
}
