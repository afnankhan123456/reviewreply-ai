"use client";

import { useState } from "react";

export default function AdminNavbar() {
  const [dark, setDark] = useState(true);

  return (
    <div className={`w-full flex items-center justify-between px-6 py-4 border-b ${dark ? "bg-[#0b1220] text-white border-white/10" : "bg-white text-black border-gray-200"}`}>
      <h1 className="text-xl font-bold">ReviewReply AI</h1>

      <div className="flex items-center gap-4 text-xl">
        <button className="p-2 rounded-full bg-white/10">
          🔔
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-white/10"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10">
          👤
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </div>
  );
}
