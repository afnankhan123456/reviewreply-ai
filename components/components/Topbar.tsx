"use client";

import { Menu, User } from "lucide-react";

// 🔥 IMPORTANT: Ye interface add kiya taaki onMenuClick prop accept ho sake
interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-t-2xl p-2 sm:p-0">
      
      {/* 📱 LEFT SIDE: Hamburger Button (Sirf Phone par dikhega) */}
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

      {/* 👤 RIGHT SIDE: User Profile */}
      <div className="flex items-center justify-end py-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 overflow-hidden flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </div>
      </div>

    </div>
  );
}
