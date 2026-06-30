import {
  TrendingUp,
  Star,
  MessageSquare,
  Reply,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Analytics
        </h1>

        <p className="text-zinc-500 mt-2">
          Track review performance and customer engagement.
        </p>

      </div>

      {/* TOP ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Total Reviews
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                1,248
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Average Rating
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                4.8
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>

          </div>

        </div>

        {/* CARD 3 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Reply Rate
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                92%
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Reply className="w-6 h-6 text-green-500" />
            </div>

          </div>

        </div>

        {/* CARD 4 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Growth Rate
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                +24%
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>

          </div>

        </div>

      </div>

      {/* CHART SECTION */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-black">
            Review Growth Analytics
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Monthly review performance overview.
          </p>

        </div>

        <div className="h-[320px] flex items-end justify-between gap-4">

          {[40, 60, 90, 120, 150, 180].map((height, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 w-full"
            >

              <div
                className="w-full rounded-t-2xl bg-blue-500"
                style={{ height: `${height}px` }}
              />

              <span className="text-sm text-zinc-500">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* RECENT PERFORMANCE */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-bold text-black">
              Recent Performance
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Latest review insights and engagement metrics.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border border-zinc-200 rounded-2xl p-5 hover:bg-zinc-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>

                <div>

                  <h3 className="font-semibold text-black">
                    Review Engagement Increased
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Customer engagement improved by 18% this week.
                  </p>

                </div>

              </div>

              <span className="text-sm font-medium text-green-600">
                +18%
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
