export default function PDFReportCard() {

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-500 text-sm">
            Monthly Reports
          </p>

          <h2 className="text-2xl font-bold text-black mt-2">
            PDF Export
          </h2>

        </div>

        <div className="text-4xl">
          ??
        </div>

      </div>

      <button className="mt-6 w-full bg-black text-white py-3 rounded-2xl">
        Download Report
      </button>

    </div>

  );

}