export default function ReviewUsageCard() {

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-500 text-sm">
            Monthly Usage
          </p>

          <h2 className="text-4xl font-bold text-black mt-2">
            100/100
          </h2>

        </div>

        <div className="text-4xl">
          ?
        </div>

      </div>

      <div className="w-full h-3 rounded-full bg-zinc-100 mt-6">

        <div className="w-full h-3 rounded-full bg-blue-600"></div>

      </div>

    </div>

  );

}