"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { saveGooglePlaceId, getGooglePlaceId } from "./actions";

export default function SettingsPage() {
  const { data: authSession } = useSession();
  const isOwner = (authSession?.user as any)?.teamRole === "OWNER";

  const [placeId, setPlaceId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // Fetch saved Place ID for owner
  useEffect(() => {
    if (!isOwner) return;

    const fetchPlaceId = async () => {
      const result = await getGooglePlaceId();

      if (result?.placeId) {
        setPlaceId(result.placeId);
        setIsSaved(true);
      }
    };

    fetchPlaceId();
  }, [isOwner]);

  const handleSave = async () => {
    if (!placeId.trim()) {
      setMessage("Please enter a Google Place ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await saveGooglePlaceId(placeId);

    if (result?.message) {
      setMessage(result.message);
      setIsSaved(true);
    }

    setLoading(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Team member (Owner nahi) is page ko access nahi kar sakta
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium">Access Denied</h2>
          <p className="text-gray-400 text-sm mt-1">
            Only the account owner can access settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-[#0B0E14] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your business settings
          </p>
        </div>

        {/* Google Place ID Card (unchanged) */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl overflow-hidden">
          {/* Card Header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#181D27] transition"
          >
            <div>
              <h2 className="text-lg font-medium text-left">
                Enter Place ID
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Save your Google Business Place ID
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isSaved && (
                <span className="text-xs text-green-400">
                  ✓ Saved
                </span>
              )}

              <span className="text-xl">
                {isOpen ? "−" : "+"}
              </span>
            </div>
          </button>

          {/* Expand Area */}
          {isOpen && (
            <div className="border-t border-[#1F2430] px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Google Place ID
                </label>

                <textarea
                  rows={3}
                  value={placeId}
                  onChange={(e) => {
                    setPlaceId(e.target.value);
                    setIsSaved(false);
                    setMessage("");
                  }}
                  placeholder="Enter your Google Place ID..."
                  className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-indigo-500"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Copy your Google Place ID and paste it here.
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-6 py-2 rounded-lg font-medium transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              {message && (
                <p className="text-sm text-green-400">
                  {message}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ✅ Appearance / Theme Card (NEW) */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-medium text-white mb-1">Appearance</h2>
          <p className="text-sm text-gray-400 mb-4">Choose your preferred theme</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Dark Mode</span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                theme === "dark" ? "bg-indigo-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Toggle between light and dark mode.
          </p>
        </div>
      </div>
    </div>
  );
}
