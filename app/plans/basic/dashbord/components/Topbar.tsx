"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-t-2xl p-2 sm:p-0">
      
      {/* 🔥 Comment ab <div> ke ANDAR hai, isse build error fix ho jayega */}

      {/* 📱 LEFT: Mobile Hamburger Menu (Sirf phone par dikhega) */}
      <button
        onClick={onMenuClick}
        className="p-2 lg:hidden rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* 🟣 CENTER: Logo */}
      <div className="flex items-center justify-center gap-3 flex-1 py-2">
        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
          R
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg">
            ReviewReply AI
          </span>
          <span className="hidden sm:block text-[10px] text-gray-500 dark:text-gray-400">
            AI Powered Review Management
          </span>
        </div>
      </div>

      {/* 👤 RIGHT: User Profile (Aapka original code) */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-white dark:bg-[#111827] border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
        >
          <img
            src={session?.user?.image || "/default-avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-black dark:text-white">
              {session?.user?.name}
            </span>
          </div>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#111827] border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 z-50 transition-colors duration-300">
            <button
              onClick={() => signOut()}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
