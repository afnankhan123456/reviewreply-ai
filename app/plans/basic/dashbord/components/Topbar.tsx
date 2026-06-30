"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Topbar() {

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-end">

      <div className="flex items-center gap-4">

        {/* DATE CARD */}

        <div className="bg-white border border-zinc-200 rounded-xl px-5 py-3">
          May 19 - Jun 18, 2025
        </div>

        {/* USER PROFILE */}

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl px-4 py-2 hover:bg-zinc-50 transition"
          >

            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-black">
                {session?.user?.name}
              </span>
            </div>

          </button>

          {/* DROPDOWN */}

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-zinc-200 rounded-xl shadow-lg p-2 z-50">

              <button
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-100 text-sm font-medium text-red-500"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
