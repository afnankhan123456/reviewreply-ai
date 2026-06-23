export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Reviews
      </h1>

      <div className="space-y-5">

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <h2 className="font-bold text-lg">
            Rahul Sharma
          </h2>

          <p className="text-zinc-400 mt-2">
            Great service and friendly staff.
          </p>

          <span className="inline-block mt-3 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
            Positive
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
          <h2 className="font-bold text-lg">
            Priya Verma
          </h2>

          <p className="text-zinc-400 mt-2">
            Delivery was a bit slow.
          </p>

          <span className="inline-block mt-3 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
            Negative
          </span>
        </div>

      </div>

    </div>
  );
}

