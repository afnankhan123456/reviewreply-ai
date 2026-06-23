export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl max-w-2xl">

        <div className="mb-6">
          <label className="block mb-2 text-zinc-400">
            Business Name
          </label>

          <input
            type="text"
            placeholder="Your business name"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-zinc-400">
            Google Account
          </label>

          <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold">
            Connect Google
          </button>
        </div>

        <button className="bg-blue-600 px-6 py-3 rounded-xl font-semibold">
          Save Settings
        </button>

      </div>

    </div>
  );
}