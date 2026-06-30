import {
  LayoutTemplate,
  MessageSquareReply,
  Sparkles,
  Star,
  Copy,
  Pencil,
} from "lucide-react";

export default function TemplatePage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Templates
        </h1>

        <p className="text-zinc-500 mt-2">
          Create and manage AI review reply templates.
        </p>

      </div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Total Templates
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                18
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <LayoutTemplate className="w-6 h-6 text-blue-500" />
            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                AI Generated
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                12
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>

          </div>

        </div>

        {/* CARD 3 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Positive Replies
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                48
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-green-500 fill-green-500" />
            </div>

          </div>

        </div>

        {/* CARD 4 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Reply Templates
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                36
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <MessageSquareReply className="w-6 h-6 text-yellow-500" />
            </div>

          </div>

        </div>

      </div>

      {/* TEMPLATE LIST */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-bold text-black">
              Saved Templates
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Quickly reply to reviews using saved response templates.
            </p>

          </div>

          <button className="px-5 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
            Create Template
          </button>

        </div>

        <div className="space-y-5">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border border-zinc-200 rounded-3xl p-5 hover:bg-zinc-50 transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <div className="flex items-center gap-3">

                    <h3 className="text-lg font-semibold text-black">
                      Positive Review Reply
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
                      Active
                    </span>

                  </div>

                  <p className="text-sm text-zinc-500 mt-3 max-w-3xl">
                    Thank you so much for your kind words! We're happy you had a great experience with our service and look forward to serving you again.
                  </p>

                  <p className="text-xs text-zinc-400 mt-3">
                    Last edited 2 days ago
                  </p>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex items-center gap-3">

                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition">
                    <Copy className="w-4 h-4" />
                    Use
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-sm font-medium hover:bg-zinc-200 transition">
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
