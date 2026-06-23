export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-3">
            Total Reviews
          </h2>

          <p className="text-5xl font-bold">
            248
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-3">
            Positive Reviews
          </h2>

          <p className="text-5xl font-bold text-green-400">
            89%
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-3">
            Negative Reviews
          </h2>

          <p className="text-5xl font-bold text-red-400">
            11%
          </p>
        </div>

      </div>

    </div>
  );
}