import ClientSidebar from "../../components/client_Sidebar";
import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <ClientSidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVENUE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              $12,430
            </h2>

            <p className="text-green-500 text-xs">
              ↑ 18%
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              AVG RATING
            </p>

            <h2 className="text-2xl font-bold mb-2">
              ⭐ 4.8
            </h2>

            <p className="text-green-500 text-xs">
              ↑ 0.3
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              PENDING REPLY
            </p>

            <h2 className="text-2xl font-bold mb-2">
              28
            </h2>

            <p className="text-red-500 text-xs">
              ↓ 8%
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              RESPONSE RATE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              92%
            </h2>

            <p className="text-green-500 text-xs">
              ↑ 12%
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL VIEWS
            </p>

            <h2 className="text-2xl font-bold mb-2">
              84.3K
            </h2>

            <p className="text-green-500 text-xs">
              ↑ 24%
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVIEW
            </p>

            <h2 className="text-2xl font-bold mb-2">
              3,842
            </h2>

            <p className="text-green-500 text-xs">
              ↑ 16%
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Reviews
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  ⭐ Amazing service and support
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  ⭐ Fast response and good quality
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  ⭐ Professional business
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  ⭐ Highly recommended
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              AI Reply Generator
            </h2>

            <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 mb-6">

              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">
                Review
              </p>

              <p className="font-medium">
                “Loved the customer service”
              </p>

            </div>

            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-semibold">
              Generate Professional Reply
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Business Overview
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Google Reviews Connected
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Facebook Page Connected
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Instagram Connected
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                WhatsApp Connected
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                • New Review Received
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                • AI Reply Sent
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                • Rating Increased
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                • Customer Replied
              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Review By Rating
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>⭐⭐⭐⭐⭐</span>
                <span>2,310 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐⭐⭐</span>
                <span>980 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐⭐</span>
                <span>320 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐</span>
                <span>90 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐</span>
                <span>42 Reviews</span>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Top Keywords
            </h2>

            <div className="space-y-4">

              <div>• Fast Service</div>
              <div>• Friendly Staff</div>
              <div>• Professional</div>
              <div>• Quick Response</div>
              <div>• Recommended</div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Customer Insights
            </h2>

            <div className="space-y-4">

              <div>• 82% Positive Reviews</div>
              <div>• 18% Negative Reviews</div>
              <div>• Peak Time: Evening</div>
              <div>• Most Active Customers</div>
              <div>• Returning Users: 68%</div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
