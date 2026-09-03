"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Offer toggle state
  const [offerActive, setOfferActive] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [offerLoading, setOfferLoading] = useState(true);
  const [offerSaving, setOfferSaving] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

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

  // Offer status fetch karo jab page load ho
  useEffect(() => {
    fetchOfferStatus();
  }, []);

  const fetchOfferStatus = async () => {
    try {
      const res = await fetch("/api/admin/offer");
      const data = await res.json();
      setOfferActive(data.isActive ?? false);
      setExpiresAt(data.expiresAt ?? null);
    } catch (err) {
      console.error("Failed to fetch offer status:", err);
    } finally {
      setOfferLoading(false);
    }
  };

  const toggleOffer = async () => {
    setOfferSaving(true);
    try {
      const res = await fetch("/api/admin/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !offerActive }),
      });
      const data = await res.json();
      if (data.success) {
        setOfferActive(data.isActive);
        setExpiresAt(data.expiresAt);
      }
    } catch (err) {
      console.error("Failed to update offer:", err);
    } finally {
      setOfferSaving(false);
    }
  };

  // Har second remaining time calculate karo, aur 24h khatam hone par UI khud OFF dikha de
  useEffect(() => {
    if (!offerActive || !expiresAt) {
      setTimeLeft("");
      return;
    }

    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("");
        setOfferActive(false);
        setExpiresAt(null);
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [offerActive, expiresAt]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Admin Settings
      </h1>

      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between mb-6">
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

      {/* Bumper Offer toggle */}
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            12-Month Bumper Offer
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {offerActive
              ? "Offer is LIVE. It will auto turn off in 24 hours if you don't stop it manually."
              : "Offer is currently off. Turn it on whenever you want to run it."}
          </p>
          {offerActive && timeLeft && (
            <p className="text-xs mt-2 font-mono text-violet-500 dark:text-violet-400">
              Auto-off in: {timeLeft}
            </p>
          )}
        </div>
        <button
          onClick={toggleOffer}
          disabled={offerLoading || offerSaving}
          className={`px-5 py-2 rounded-xl transition font-semibold disabled:opacity-50 ${
            offerActive
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
          }`}
        >
          {offerLoading
            ? "Loading..."
            : offerSaving
            ? "Saving..."
            : offerActive
            ? "Turn Offer OFF"
            : "Turn Offer ON"}
        </button>
      </div>
    </div>
  );
}
