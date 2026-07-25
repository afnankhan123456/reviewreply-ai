"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import {
  Globe,
  Mail,
  Link2,
  CheckCircle2,
  Settings,
  X,
} from "lucide-react";
import {
  getGoogleBusinessLocations,
  getSelectedLocations,
  saveSelectedLocation,
  removeSelectedLocation,
} from "./actions";

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [connectedApps, setConnectedApps] = useState(0);
  const [activeSyncs, setActiveSyncs] = useState(0);
  const [pendingSetup, setPendingSetup] = useState(0);
  const [locationsManaged, setLocationsManaged] = useState(0);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);

  // ✅ NEW: reconnect/select-location flow states
  const [fetchedLocations, setFetchedLocations] = useState<any[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationsLimit, setLocationsLimit] = useState<number>(1);
  const [savingLocationId, setSavingLocationId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIntegrations() {
      try {
        const res = await fetch("/api/integrations");
        const data = await res.json();
        if (data.success) {
          const {
            googleConnected: connected,
            locationsCount,
            locations: locs,
            gmailConnected: gmConnected,
            locationsLimit: limit,
          } = data.integrations;
          setGoogleConnected(connected);
          setLocationsManaged(locationsCount);
          setLocations(locs || []);
          setGmailConnected(gmConnected || false);
          setLocationsLimit(limit ?? 1);

          let apps = 0;
          let syncs = 0;
          let pending = 0;
          if (connected) apps++;
          if (gmConnected) apps++;
          if (connected && locationsCount > 0) syncs = 1;
          if (!connected) pending++;
          if (!gmConnected) pending++;
          setConnectedApps(apps);
          setActiveSyncs(syncs);
          setPendingSetup(pending);
        }
      } catch (err) {
        console.error("Failed to load integrations", err);
      } finally {
        setLoading(false);
      }
    }
    fetchIntegrations();

    // ✅ NEW: already-selected locations bhi load karo (reconnect flow ke liye)
    getSelectedLocations().then((result) => {
      if (result.success) {
        setLocations(result.locations || []);
      }
    });
  }, []);

  // 🔥 Handle Gmail connection
  const handleConnectGmail = async () => {
    try {
      const res = await fetch("/api/gmail/connect", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setGmailConnected(true);
        setConnectedApps((prev) => prev + 1);
        setPendingSetup((prev) => prev - 1);
      } else {
        alert(data.error || "Failed to connect Gmail");
      }
    } catch (err) {
      alert("Something went wrong while connecting Gmail");
    }
  };

  // ✅ NEW: Fetch Google Business locations
  const handleFetchLocations = async () => {
    setLoadingLocations(true);
    setLocationError(null);
    const result = await getGoogleBusinessLocations();
    if (result.success) {
      setFetchedLocations(result.locations || []);
    } else {
      setLocationError(result.error || "Failed to fetch locations");
    }
    setLoadingLocations(false);
  };

  const isLimitReached = locations.length >= locationsLimit;

  // ✅ NEW: Select a fetched location
  const handleSelectLocation = async (location: any) => {
    if (isLimitReached) {
      setLocationError(`You can only connect ${locationsLimit} location(s) on your current plan.`);
      return;
    }

    setSavingLocationId(location.id);
    setLocationError(null);

    const result = await saveSelectedLocation(location.id, location.title, location.address);

    if (result.success) {
      setLocations((prev) => [...prev, location]);
      setGoogleConnected(true);
      setLocationsManaged(result.locationsUsed ?? locations.length + 1);
    } else {
      setLocationError(result.error || "Failed to save location");
    }

    setSavingLocationId(null);
  };

  // ✅ NEW: Remove a connected location
  const handleRemoveLocation = async (locationId: string) => {
    setSavingLocationId(locationId);
    const result = await removeSelectedLocation(locationId);

    if (result.success) {
      setLocations((prev) => prev.filter((loc) => loc.id !== locationId));
      setLocationsManaged(result.locationsUsed ?? Math.max(0, locations.length - 1));
      if (locations.length - 1 === 0) {
        setGoogleConnected(false);
      }
    } else {
      alert(result.error || "Failed to remove location");
    }
    setSavingLocationId(null);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Integrations
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Connect your favorite platforms and business tools.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Connected Apps
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : connectedApps}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Active Syncs
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : activeSyncs}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Pending Setup
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : pendingSetup}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Settings className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Locations Managed
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : locationsManaged}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRATIONS LIST */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Available Integrations
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Basic plan – connect one Google Business location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* GOOGLE BUSINESS */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:shadow-md transition bg-white dark:bg-zinc-900 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Globe className="w-7 h-7 text-blue-500" />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  googleConnected
                    ? "bg-green-100 text-green-600"
                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {googleConnected ? "Connected" : "Available"}
              </span>
            </div>

            <h3 className="text-lg font-bold text-black dark:text-white mt-5">
              Google Business
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {locations.length > 0
                ? `${locationsManaged} location${locationsManaged > 1 ? "s" : ""} connected · Sync reviews and insights automatically.`
                : "No locations connected yet. Click below to get started."}
            </p>

            {/* ✅ NEW: Fetch + Reconnect buttons */}
            <div className="flex gap-2 mt-5">
              <button
                onClick={handleFetchLocations}
                disabled={loadingLocations}
                className="flex-1 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-500/30 transition disabled:opacity-50"
              >
                {loadingLocations ? "Loading..." : "Fetch Locations"}
              </button>

              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/plans/basic/dashbord/integrations",
                  })
                }
                className="flex-1 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                title="Refresh your Google Business permission if locations stop loading"
              >
                Reconnect Business
              </button>
            </div>

            {locationError?.includes("No Google access token") && (
              <p className="text-xs text-yellow-500 mt-3">
                Your Google Business access expired. Click "Reconnect Business" above to restore it.
              </p>
            )}

            {/* Plan limit indicator */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Locations connected</span>
              <span className={`text-xs font-medium ${isLimitReached ? "text-yellow-500" : "text-black dark:text-white"}`}>
                {locations.length} / {locationsLimit}
              </span>
            </div>

            {locationError && !locationError.includes("No Google access token") && (
              <p className="text-xs text-red-500 mt-2">{locationError}</p>
            )}

            {/* Already selected locations */}
            {locations.length > 0 && (
              <div className="space-y-2 mt-3">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="flex items-center justify-between p-2 rounded-lg border bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/40 text-xs"
                  >
                    <div>
                      <p className="text-black dark:text-white">{loc.title}</p>
                      <p className="text-zinc-500 dark:text-zinc-400">{loc.address}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveLocation(loc.id)}
                      disabled={savingLocationId === loc.id}
                      className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-600/20 dark:text-red-400 dark:hover:bg-red-600/30 disabled:opacity-50"
                      title="Remove location"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Fetched locations list to pick from */}
            {fetchedLocations.length > 0 && (
              <div className="space-y-2 mt-3 max-h-48 overflow-y-auto">
                {fetchedLocations
                  .filter((loc) => !locations.some((sel) => sel.id === loc.id))
                  .map((loc) => (
                    <div
                      key={loc.id}
                      className="flex items-center justify-between p-2 rounded-lg border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-xs"
                    >
                      <div>
                        <p className="text-black dark:text-white">{loc.title}</p>
                        <p className="text-zinc-500 dark:text-zinc-400">{loc.address}</p>
                      </div>
                      <button
                        onClick={() => handleSelectLocation(loc)}
                        disabled={isLimitReached || savingLocationId === loc.id}
                        className={`px-2 py-1 rounded text-[10px] transition ${
                          isLimitReached
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-600 text-white hover:bg-indigo-500"
                        }`}
                      >
                        {savingLocationId === loc.id
                          ? "Saving..."
                          : isLimitReached
                            ? "Limit reached"
                            : "Select"}
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* GMAIL */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:shadow-md transition bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Mail className="w-7 h-7 text-yellow-500" />
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  gmailConnected
                    ? "bg-green-100 text-green-600"
                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {gmailConnected ? "Connected" : "Available"}
              </span>
            </div>

            <h3 className="text-lg font-bold text-black dark:text-white mt-5">
              Gmail Alerts
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              {gmailConnected
                ? "You are connected. Alerts will be sent to your Gmail."
                : "Receive email alerts for low ratings and new reviews."}
            </p>

            <button
              onClick={handleConnectGmail}
              disabled={gmailConnected}
              className={`mt-5 w-full py-3 rounded-2xl font-medium transition ${
                gmailConnected
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-black dark:bg-white dark:text-black text-white hover:opacity-90"
              }`}
            >
              {gmailConnected ? "Already Connected" : "Connect Gmail"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
