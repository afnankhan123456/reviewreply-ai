"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Monitor your business reviews.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-zinc-900 px-5 py-3 rounded-xl text-white flex items-center gap-3">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          )}

          <div>
            <p className="font-semibold">
              {session?.user?.name || "User"}
            </p>

            <p className="text-xs text-zinc-400">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-4 py-3 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}