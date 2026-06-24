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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL CLIENTS
            </p>

            <h2 className="text-3xl font-bold mb-2">
              128
            </h2>

            <p className="text-green-500 font-medium text-xs">
              ↑ 12% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVIEWS
            </p>

            <h2 className="text-3xl font-bold mb-2">
              3,842
            </h2>

            <p className="text-green-500 font-medium text-xs">
              ↑ 24% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              AI REPLIES
            </p>

            <h2 className="text-3xl font-bold mb-2">
              2,731
            </h2>

            <p className="text-green-500 font-medium text-xs">
              ↑ 31% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              MONTHLY REVENUE
            </p>

            <h2 className="text-3xl font-bold mb-2">
              $12,430
            </h2>

            <p className="text-green-500 font-medium text-xs">
              ↑ 18% this month
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Top Clients
              </h2>

              <button className="text-sm text-violet-500 font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">
                    Starbucks Coffee
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    482 Reviews
                  </p>
                </div>

                <span className="text-green-500 font-semibold">
                  +24%
                </span>
              </div>

              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">
                    Burger King
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    371 Reviews
                  </p>
                </div>

                <span className="text-green-500 font-semibold">
                  +18%
                </span>
              </div>

              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <div>
                  <h3 className="font-semibold">
                    Pizza Hut
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    290 Reviews
                  </p>
                </div>

                <span className="text-green-500 font-semibold">
                  +12%
                </span>
              </div>

            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-5">

              <div>
                <p className="font-medium">
                  New review received
                </p>

                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  2 min ago
                </span>
              </div>

              <div>
                <p className="font-medium">
                  AI reply generated
                </p>

                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  10 min ago
                </span>
              </div>

              <div>
                <p className="font-medium">
                  New client added
                </p>

                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  1 hour ago
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
