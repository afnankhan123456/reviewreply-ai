export default function SummaryCard({ title, description }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold text-black dark:text-white mb-2">
        {title}
      </h2>

      <p className="text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

    </div>
  );
}
