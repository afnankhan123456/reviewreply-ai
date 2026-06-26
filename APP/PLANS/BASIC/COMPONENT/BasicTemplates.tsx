export default function BasicTemplates() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Reply Templates
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Thank you for your valuable feedback!
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          We appreciate your support and trust.
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Sorry for the inconvenience caused.
        </div>

      </div>

    </div>
  );
}