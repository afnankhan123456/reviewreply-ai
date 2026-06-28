"use client";

export default function AnalyticsChart() {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-xl font-semibold text-black mb-6">
        Basic Review Analytics
      </h2>

      <div className="h-[220px] flex items-end gap-3">

        <div className="bg-blue-500 w-full h-[40%] rounded-t-xl"></div>

        <div className="bg-blue-500 w-full h-[55%] rounded-t-xl"></div>

        <div className="bg-blue-500 w-full h-[70%] rounded-t-xl"></div>

        <div className="bg-blue-500 w-full h-[50%] rounded-t-xl"></div>

        <div className="bg-blue-500 w-full h-[80%] rounded-t-xl"></div>

        <div className="bg-blue-500 w-full h-[60%] rounded-t-xl"></div>

      </div>

    </div>
  );
}