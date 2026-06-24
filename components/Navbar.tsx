"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold">
        ReviewReply AI
      </h1>

      <div className="flex items-center gap-4 relative">

        <button className="h-11 w-11 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center">
          🔔
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="h-11 w-11 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-zinc-200 dark:bg-zinc-900 px-3 py-2 rounded-2xl"
          >
            <img
              src="https://avatars.githubusercontent.com/u/190445289?v=4"
              alt="profile"
              className="h-10 w-10 rounded-full"
            />

            <div className="text-left">
              <p className="text-sm font-semibold">
                Afnan Khan
              </p>
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-40 rounded-2xl border border-zinc-800 bg-zinc-900 p-2">
              <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-zinc-800">
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


