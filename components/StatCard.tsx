export default function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-black dark:text-white">
        {value}
      </h2>
    </div>
  );
}
