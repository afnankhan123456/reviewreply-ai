export default function ReplyBox() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold text-white mb-5">
        AI Reply Tool
      </h2>

      <textarea
        placeholder="Paste review..."
        className="w-full h-36 bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-white outline-none resize-none"
      />

      <button className="w-full mt-5 bg-white text-black py-4 rounded-xl font-bold">
        Generate Reply
      </button>

    </div>
  );
}