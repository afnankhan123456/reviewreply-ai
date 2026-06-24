"use client";

import { Bell, Moon, Sun, User } from "lucide-react";
import { useState } from "react";

export default function AdminNavbar() {
  const [dark, setDark] = useState(true);

  return (
    <div className={`w-full flex items-center justify-between px-6 py-4 border-b ${dark ? "bg-[#0b1220] text-white border-white/10" : "bg-white text-black border-gray-200"}`}>
      <h1 className="text-xl font-bold">ReviewReply AI</h1>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-white/10">
          <Bell size={20} />
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-white/10"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10">
          <User size={18} />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
}
