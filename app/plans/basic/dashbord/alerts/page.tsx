import {
  AlertTriangle,
  BellRing,
  MessageSquareWarning,
  Star,
} from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          Alerts
        </h1>

        <p className="text-zinc-500 mt-2">
          Monitor important review alerts and customer issues.
        </p>
      </div>

      {/* TOP ALERT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-zinc-500">
                Low Rating Alerts
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                12
              </h2>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>

          </div>
        </div>

        {/* CARD 2 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-zinc-500">
                Unanswered Reviews
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                8
              </h2>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-yellow-500" />
            </div>

          </div>
        </div>

        {/* CARD 3 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-zinc-500">
                Negative Feedback
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                5
              </h2>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-500" />
            </div>

          </div>
        </div>

        {/* CARD 4 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-zinc-500">
                New Notifications
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                21
              </h2>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <BellRing className="w-6 h-6 text-blue-500" />
            </div>

          </div>
        </div>

      </div>

      {/* RECENT ALERTS */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold text-black">
              Recent Alerts
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Latest important activities from customer reviews.
            </p>
          </div>

        </div>

        <div className="space-y-5">

          {/* ALERT ITEM */}

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-start justify-between border border-zinc-200 rounded-2xl p-4 hover:bg-zinc-50 transition"
            >

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    Low Rating Review Detected
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    A customer left a 2-star review mentioning poor service experience.
                  </p>

                  <p className="text-xs text-zinc-400 mt-2">
                    2 minutes ago
                  </p>
                </div>

              </div>

              <button className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition">
                View
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
