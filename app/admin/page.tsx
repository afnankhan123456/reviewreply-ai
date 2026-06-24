import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white transition-all">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            Manage clients, payments, reviews and system controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              TOTAL CLIENTS
            </p>

            <h2 className="text-4xl font-bold mb-3">
              128
            </h2>

            <p className="text-green-500 font-medium text-sm">
              ↑ 12% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              TOTAL REVIEWS
            </p>

            <h2 className="text-4xl font-bold mb-3">
              3,842
            </h2>

            <p className="text-green-500 font-medium text-sm">
              ↑ 24% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              AI REPLIES
            </p>

            <h2 className="text-4xl font-bold mb-3">
              2,731
            </h2>

            <p className="text-green-500 font-medium text-sm">
              ↑ 31% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
              MONTHLY REVENUE
            </p>

            <h2 className="text-4xl font-bold mb-3">
              $12,430
            </h2>

            <p className="text-green-500 font-medium text-sm">
              ↑ 18% this month
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
