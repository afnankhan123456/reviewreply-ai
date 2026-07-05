"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Admin Settings
      </h1>
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Dark / Light Mode
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Change dashboard appearance
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-zinc-900 dark:bg-white dark:text-black text-white px-5 py-2 rounded-xl transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
