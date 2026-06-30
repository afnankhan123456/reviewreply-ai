import {
  Download,
  FileSpreadsheet,
  FileText,
  Database,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function ExportPage() {
  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-black">
          Export
        </h1>

        <p className="text-zinc-500 mt-2">
          Export reviews, analytics, and business reports.
        </p>

      </div>

      {/* TOP EXPORT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* CARD 1 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Total Exports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                84
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-500" />
            </div>

          </div>

        </div>

        {/* CARD 2 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                CSV Exports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                42
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-green-500" />
            </div>

          </div>

        </div>

        {/* CARD 3 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                PDF Reports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                18
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>

          </div>

        </div>

        {/* CARD 4 */}

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Successful Exports
              </p>

              <h2 className="text-3xl font-bold text-black mt-2">
                99%
              </h2>

            </div>

            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-500" />
            </div>

          </div>

        </div>

      </div>

      {/* EXPORT OPTIONS */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-black">
            Export Options
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Download customer reviews and analytics in multiple formats.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* CSV EXPORT */}

          <div className="border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition bg-white">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-7 h-7 text-green-500" />
            </div>

            <h3 className="text-lg font-bold text-black mt-5">
              Export CSV
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Download all customer reviews in CSV format.
            </p>

            <button className="mt-5 w-full py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
              Export CSV
            </button>

          </div>

          {/* PDF EXPORT */}

          <div className="border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition bg-white">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FileText className="w-7 h-7 text-yellow-500" />
            </div>

            <h3 className="text-lg font-bold text-black mt-5">
              Export PDF
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Generate detailed analytics reports in PDF format.
            </p>

            <button className="mt-5 w-full py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
              Export PDF
            </button>

          </div>

          {/* DATABASE EXPORT */}

          <div className="border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition bg-white">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Database className="w-7 h-7 text-blue-500" />
            </div>

            <h3 className="text-lg font-bold text-black mt-5">
              Backup Data
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Export and backup all business review data securely.
            </p>

            <button className="mt-5 w-full py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
              Backup Now
            </button>

          </div>

        </div>

      </div>

      {/* RECENT EXPORTS */}

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-bold text-black">
              Recent Exports
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Recently generated export files and reports.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 rounded-2xl p-5 hover:bg-zinc-50 transition">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Clock3 className="w-7 h-7 text-blue-500" />
              </div>

              <div>

                <h3 className="font-semibold text-black">
                  Customer Reviews Export
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  CSV export containing all recent customer reviews.
                </p>

                <p className="text-xs text-zinc-400 mt-2">
                  Generated 2 hours ago
                </p>

              </div>

            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition">
              <Download className="w-4 h-4" />
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}