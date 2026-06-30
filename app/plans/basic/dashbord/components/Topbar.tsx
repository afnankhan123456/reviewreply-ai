"use client";

export default function Topbar() {
  return (
    <div className="flex items-center justify-end">

      <div className="flex items-center gap-4">

        {/* DATE CARD */}

        <div className="bg-white border border-zinc-200 rounded-xl px-5 py-3">
          May 19 - Jun 18, 2025
        </div>

        {/* USER PROFILE */}

        <button className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-2 hover:bg-zinc-50 transition">

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-black">
              User Profile
            </span>

            <span className="text-xs text-zinc-500">
              Logged In
            </span>
          </div>

        </button>

      </div>

    </div>
  );
}
