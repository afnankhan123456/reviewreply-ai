import {
  Star,
  MessageSquare,
  Reply,
  TrendingUp,
  Search,
} from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-black">
            Reviews
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage and monitor all customer reviews.
          </p>
        </div>

        {/* SEARCH */}

        <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-4 py-3 w-full lg:w-[320px]">

          <Search className="w-5 h-5 text-zinc-400" />

          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full outline-none text-sm"
          />

        </div>

      </div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-zinc-500">
                Total Reviews
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                128
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
                4.6
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
                Replied Reviews
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                94
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
                Review Growth
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                +18%
              </h2>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS LIST */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold text-black">
              Recent Reviews
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Latest customer feedback and ratings.
            </p>
          </div>

        </div>

        <div className="space-y-5">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 rounded-2xl p-5 hover:bg-zinc-50 transition"
            >

              <div className="flex gap-4">

                {/* PROFILE */}

                <img
                  src={`https://i.pravatar.cc/150?img=${item + 10}`}
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* CONTENT */}

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="font-semibold text-black">
                      John Customer
                    </h3>

                    <div className="flex items-center gap-1">

                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-300"
                          }`}
                        />
                      ))}

                    </div>

                  </div>

                  <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
                    Excellent customer service and very professional support.
                    Highly recommended for businesses looking to improve review management.
                  </p>

                  <p className="text-xs text-zinc-400 mt-3">
                    Posted 2 hours ago
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-3">

                <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition">
                  Reply
                </button>

                <button className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-sm font-medium hover:bg-zinc-200 transition">
                  View
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
