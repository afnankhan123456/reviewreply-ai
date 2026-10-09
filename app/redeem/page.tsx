export default function RedeemPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center">
          Redeem AppSumo Code
        </h1>

        <p className="mt-3 text-center text-zinc-400">
          Enter your AppSumo license code to activate your ReviewReply AI plan.
        </p>

        <form className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Enter your AppSumo code"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-yellow-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Redeem Code
          </button>
        </form>
      </div>
    </main>
  );
}
