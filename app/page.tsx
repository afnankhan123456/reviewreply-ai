import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-white mb-6">
          ReviewReply AI
        </h1>

        <p className="text-zinc-400 text-xl mb-8">
          Smart AI replies for Google reviews.
        </p>

        <Link
          href="/dashboard"
          className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg"
        >
          Open Dashboard
        </Link>

      </div>

    </div>
  );
}