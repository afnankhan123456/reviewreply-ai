"use client";

import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("Every 6 Hours");

  // ✅ MOBILE SIDEBAR STATE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="p-10 min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">

      {/* ✅ MOBILE TOPBAR ONLY */}
      <div className="block lg:hidden mb-6">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        Settings
      </h1>

      <div className="space-y-6">

        {/* GOOGLE CONNECTION */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between transition-colors duration-300">

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Google Business Connection
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Connect your Google Business Profile
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
            Connect
          </button>

        </div>

        {/* EMAIL NOTIFICATIONS */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between transition-colors duration-300">

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Email Notifications
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Receive important email updates
            </p>
          </div>

          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`px-5 py-2 rounded-xl text-white transition ${
              emailNotifications ? "bg-green-600" : "bg-zinc-400"
            }`}
          >
            {emailNotifications ? "ON" : "OFF"}
          </button>

        </div>

        {/* REVIEW ALERTS */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between transition-colors duration-300">

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              New Review Alerts
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Get alerts when new reviews arrive
            </p>
          </div>

          <button
            onClick={() => setReviewAlerts(!reviewAlerts)}
            className={`px-5 py-2 rounded-xl text-white transition ${
              reviewAlerts ? "bg-green-600" : "bg-zinc-400"
            }`}
          >
            {reviewAlerts ? "ON" : "OFF"}
          </button>

        </div>

        {/* REVIEW SYNC FREQUENCY */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between transition-colors duration-300">

          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Review Sync Frequency
            </h2>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Choose how often reviews sync
            </p>
          </div>

          <select
            value={syncFrequency}
            onChange={(e) => setSyncFrequency(e.target.value)}
            className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-4 py-2"
          >
            <option>Every 1 Hour</option>
            <option>Every 6 Hours</option>
            <option>Every 12 Hours</option>
            <option>Daily</option>
          </select>

        </div>

        {/* DARK MODE */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between transition-colors duration-300">

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

    </div>
  );
}
