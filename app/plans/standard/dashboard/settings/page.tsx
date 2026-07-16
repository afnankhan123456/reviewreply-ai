"use client";

import { useState, useEffect, useCallback } from "react";
import { saveGooglePlaceId, getGooglePlaceId } from "./actions";

export default function SettingsPage() {
  const [placeId, setPlaceId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Load existing Place ID on page load
  useEffect(() => {
    const fetchPlaceId = async () => {
      const result = await getGooglePlaceId();
      if (result?.placeId) {
        setPlaceId(result.placeId);
      }
    };
    fetchPlaceId();
  }, []);

  // Auto-save function (triggered on every keystroke)
  const handleChange = async (value: string) => {
    setPlaceId(value);
    setIsSaved(false);
    setMessage("");

    if (!value.trim()) return;

    // Call server action to save
    const result = await saveGooglePlaceId(value);
    if (result.message) {
      setMessage(result.message);
      setIsSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage your business details
          </p>
        </div>

        {/* Card Style Input - Auto Save */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-400">Google Place ID</label>
              {isSaved && placeId.trim() && (
                <span className="text-xs text-green-400">✓ Saved</span>
              )}
            </div>
            <input
              type="text"
              value={placeId}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="ChIJ1234567890"
            />
            <p className="text-xs text-gray-500 mt-2">
              Find your Place ID from Google Maps URL.
            </p>
          </div>

          {message && (
            <p className="text-sm text-green-400">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
