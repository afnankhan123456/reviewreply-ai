import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        ReviewReply AI
      </h1>

      <div className="space-y-4">

        <Link href="/dashboard" className="block text-white bg-zinc-900 p-4 rounded-xl">
          Dashboard
        </Link>

        <Link href="/reviews" className="block text-zinc-400 hover:text-white">
          Reviews
        </Link>

        <Link href="/analytics" className="block text-zinc-400 hover:text-white">
          Analytics
        </Link>

        <Link href="/settings" className="block text-zinc-400 hover:text-white">
          Settings
        </Link>

      </div>

    </div>
  );
}