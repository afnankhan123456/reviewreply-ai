import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Star,
  BarChart3,
} from "lucide-react";

export default function ReportPage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Reports
        </h1>

        <p className="text-zinc-500 mt-2">
          Generate and download detailed business review reports.
        </p>

      </div>

      {/* TOP REPORT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Total Reports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                24
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Monthly Reports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                12
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>

          </div>

        </div>

        {/* CARD 3 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Avg Rating
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

        {/* CARD 4 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Performance Growth
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                +32%
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>

          </div>

        </div>

      </div>

      {/* REPORT LIST */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-bold text-black">
              Generated Reports
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Access and download your latest business reports.
            </p>

          </div>

          <button className="px-5 py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
            Generate Report
          </button>

        </div>

        <div className="space-y-5">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 rounded-2xl p-5 hover:bg-zinc-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-blue-500" />
                </div>

                <div>

                  <h3 className="font-semibold text-black">
                    Monthly Performance Report
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Review insights, customer feedback, and analytics summary.
                  </p>

                  <p className="text-xs text-zinc-400 mt-2">
                    Generated on June 28, 2026
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-3">

                <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition">
                  View
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition">
                  <Download className="w-4 h-4" />
                  Download
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}