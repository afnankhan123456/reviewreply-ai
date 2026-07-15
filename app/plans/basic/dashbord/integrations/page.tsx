"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  Mail,
  Link2,
  CheckCircle2,
  Settings,
} from "lucide-react";

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [connectedApps, setConnectedApps] = useState(0);
  const [activeSyncs, setActiveSyncs] = useState(0);
  const [pendingSetup, setPendingSetup] = useState(0);
  const [locationsManaged, setLocationsManaged] = useState(0);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);

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
          } = data.integrations;
          setGoogleConnected(connected);
          setLocationsManaged(locationsCount);
          setLocations(locs || []);
          setGmailConnected(gmConnected || false);

          // Update stats dynamically
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
  }, []);

  // 🔥 Handle Gmail connection
  const handleConnectGmail = async () => {
    try {
      const res = await fetch("/api/gmail/connect", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        // Update local state so UI changes immediately
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
        {/* CARD 1 – Connected Apps */}
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

        {/* CARD 2 – Active Syncs */}
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

        {/* CARD 3 – Pending Setup */}
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

        {/* CARD 4 – Locations Managed */}
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
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:shadow-md transition bg-white dark:bg-zinc-900">
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

            <button className="mt-5 w-full py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-500/30 transition">
              {googleConnected ? "Manage Your Location" : "Connect Google Business"}
            </button>
          </div>

          {/* GMAIL (with onClick fix) */}
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
