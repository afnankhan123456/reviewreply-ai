"use client";

import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.body.style.background = "#050816";
      document.body.style.color = "white";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background = "white";
      document.body.style.color = "black";
    }
  }, [dark]);

  return (
    <div className={`w-full flex items-center justify-between px-6 py-4 border-b ${dark ? "bg-[#0b1220] text-white border-white/10" : "bg-white text-black border-gray-200"}`}>
      <h1 className="text-xl font-bold">ReviewReply AI</h1>

      <div className="flex items-center gap-4 text-xl relative">
        <button className={`p-2 rounded-full ${dark ? "bg-white/10" : "bg-gray-100"}`}>
          🔔
        </button>

        <button
          onClick={() => setDark(!dark)}
          className={`p-2 rounded-full ${dark ? "bg-white/10" : "bg-gray-100"}`}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${dark ? "bg-white/10" : "bg-gray-100"}`}
          >
            <img
              src="https://avatars.githubusercontent.com/u/190445289?v=4"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">Afnan Khan</span>
          </button>

          {open && (
            <div className={`absolute right-0 mt-2 w-40 rounded-xl shadow-lg p-2 ${dark ? "bg-[#111827] text-white" : "bg-white text-black border"}`}>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
