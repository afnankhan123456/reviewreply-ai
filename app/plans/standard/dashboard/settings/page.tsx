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
    <div className="p-6 bg-[#0B0E14] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-400 mb-6">
        Update your business details to personalize review requests.
      </p>

      <form onSubmit={handleSave} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Google Place ID</label>
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            placeholder="ChIJ1234567890"
          />
          <p className="text-xs text-gray-500 mt-1">
            Find your Place ID from Google Maps URL.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Place ID"}
        </button>

        {message && (
          <p className="text-sm text-green-400 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
