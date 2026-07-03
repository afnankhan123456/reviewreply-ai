"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("Every 6 Hours");

  // New state for additional sections (placeholder/dummy data)
  const [plan] = useState("Basic");
  const [planExpiry, setPlanExpiry] = useState("2026-08-02");
  const [reviewsUsed, setReviewsUsed] = useState(0);
  const [reviewsLimit] = useState(100);
  const [businessName, setBusinessName] = useState("Test Business");
  const [location, setLocation] = useState("123 Test Street");
  const [lowRatingThreshold, setLowRatingThreshold] = useState(2);
  const [emailFrequency, setEmailFrequency] = useState("Instant");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [googleConnected, setGoogleConnected] = useState(true); // dummy

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    // In future, fetch real data from APIs here and update states
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
      <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
        Settings
      </h1>

      <div className="space-y-6">
        {/* PLAN & USAGE */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Plan & Usage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Current Plan</p>
              <p className="font-medium text-zinc-900 dark:text-white">{plan}</p>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Plan Expiry</p>
              <p className="font-medium text-zinc-900 dark:text-white">{planExpiry}</p>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Reviews Used</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {reviewsUsed} / {reviewsLimit}
              </p>
            </div>
          </div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
            Upgrade Plan
          </button>
        </div>

        {/* BUSINESS PROFILE */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Business Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Business Name</p>
              <p className="font-medium text-zinc-900 dark:text-white">{businessName}</p>
            </div>
            <div>
              <p className="text-zinc-500 dark:text-zinc-400">Location</p>
              <p className="font-medium text-zinc-900 dark:text-white">{location}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white px-4 py-2 rounded-xl transition">
              Edit
            </button>
            <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition">
              Disconnect
            </button>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCES */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {/* Low Rating Alert Threshold */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Low Rating Alert Threshold</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Get alerts for reviews ≤ this rating</p>
              </div>
              <select
                value={lowRatingThreshold}
                onChange={(e) => setLowRatingThreshold(Number(e.target.value))}
                className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-3 py-1"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
              </select>
            </div>
            {/* Email Frequency */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Email Frequency</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">How often you receive email notifications</p>
              </div>
              <select
                value={emailFrequency}
                onChange={(e) => setEmailFrequency(e.target.value)}
                className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-3 py-1"
              >
                <option>Instant</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            {/* Push Notifications (placeholder) */}
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Push Notifications</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</p>
              </div>
              <button disabled className="bg-zinc-400 text-white px-5 py-2 rounded-xl cursor-not-allowed">
                OFF
              </button>
            </div>
          </div>
        </div>

        {/* EXISTING SETTINGS (unchanged) */}
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

        {/* NEW REVIEW ALERTS */}
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

        {/* DATA & PRIVACY */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Data & Privacy
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white px-4 py-2 rounded-xl transition">
              Export Reviews (CSV/PDF)
            </button>
            <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition">
              Clear Review Data
            </button>
            <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition">
              Delete Account
            </button>
          </div>
        </div>

        {/* DISPLAY & LANGUAGE */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Display & Language
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Language</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-3 py-2 w-full"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Timezone</p>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-3 py-2 w-full"
              >
                <option>UTC</option>
                <option>EST</option>
                <option>PST</option>
              </select>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Date Format</p>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl px-3 py-2 w-full"
              >
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>
            </div>
          </div>
        </div>

        {/* INTEGRATIONS */}
        <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Integrations
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Google Business</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {googleConnected ? "Connected" : "Not connected"}
                </p>
              </div>
              {googleConnected ? (
                <button className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition">
                  Disconnect
                </button>
              ) : (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                  Connect
                </button>
              )}
            </div>
            {/* Future Gmail, Slack, Zapier placeholders */}
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Gmail</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</p>
              </div>
              <button disabled className="bg-zinc-400 text-white px-4 py-2 rounded-xl cursor-not-allowed">
                Connect
              </button>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Slack</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</p>
              </div>
              <button disabled className="bg-zinc-400 text-white px-4 py-2 rounded-xl cursor-not-allowed">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
