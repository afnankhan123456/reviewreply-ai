export default function ExportCard() {

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-xl font-bold text-black mb-5">
        Export Reviews
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-black text-white py-3 rounded-2xl">
          Export CSV
        </button>

        <button className="bg-blue-600 text-white py-3 rounded-2xl">
          Export PDF
        </button>

      </div>

    </div>

  );

}