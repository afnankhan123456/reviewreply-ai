"use client";

import { useState, useEffect } from "react";
import { saveGooglePlaceId, getGooglePlaceId } from "./actions";

export default function SettingsPage() {
  const [placeId, setPlaceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlaceId = async () => {
      const result = await getGooglePlaceId();
      if (result?.placeId) {
        setPlaceId(result.placeId);
      }
    };
    fetchPlaceId();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await saveGooglePlaceId(placeId);
    setMessage(result.message);
    setLoading(false);
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

        {/* Card Style Input */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Google Place ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={placeId}
                onChange={(e) => setPlaceId(e.target.value)}
                className="flex-1 bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="ChIJ1234567890"
              />
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
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
