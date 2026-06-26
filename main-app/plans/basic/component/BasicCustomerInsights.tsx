export default function BasicCustomerInsights() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

      <h2 className="text-2xl font-bold mb-6">
        Customer Insights
      </h2>

      <div className="space-y-4">

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Customers love fast support responses.
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Positive reviews increased this month.
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
          Delivery experience improved significantly.
        </div>

      </div>

    </div>
  );
}