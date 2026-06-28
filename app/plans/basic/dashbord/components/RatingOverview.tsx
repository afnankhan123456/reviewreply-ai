"use client";

export default function RatingOverview() {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-xl font-semibold text-black mb-6">
        Basic Rating Overview
      </h2>

      <div className="flex items-center justify-center h-[220px]">

        <div className="w-[170px] h-[170px] rounded-full border-[14px] border-green-500 flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-5xl font-bold text-black">
              4.6
            </h1>

            <p className="text-zinc-500 mt-2">
              Average Rating
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}