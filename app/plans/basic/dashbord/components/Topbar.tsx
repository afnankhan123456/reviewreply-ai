"use client";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-black">
          Welcome back, Business Owner! ??
        </h1>

        <p className="text-zinc-500 mt-2">
          Here's what's happening with your reviews.
        </p>

      </div>

      <div className="flex gap-4">

        <div className="bg-white border border-zinc-200 rounded-xl px-5 py-3">
          1 Business Location
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl px-5 py-3">
          May 19 - Jun 18, 2025
        </div>

      </div>

    </div>
  );
}