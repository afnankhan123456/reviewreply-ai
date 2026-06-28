"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between p-5">

      <div>

        {/* LOGO */}

        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          ReviewSync
        </h1>

        {/* MENU */}

        <div className="space-y-3">

          <Link href="#" className="block bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium">
            Dashboard
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Reviews
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Alerts
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Unanswered
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Analytics
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Settings
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Integrations
          </Link>

          <Link href="#" className="block hover:bg-zinc-100 px-4 py-3 rounded-xl">
            Billing
          </Link>

        </div>

      </div>

      {/* USER */}

      <div className="bg-zinc-100 rounded-2xl p-4">
        <p className="font-semibold">Business Owner</p>
        <p className="text-sm text-zinc-500">Basic Plan</p>
      </div>

    </div>
  );
}