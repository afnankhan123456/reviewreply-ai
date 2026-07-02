"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  MessageSquareWarning,
  Star,
} from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/alerts");
        const data = await res.json();
        if (data.success) {
          setAlerts(data.alerts || []);
        }
      } catch (err) {
        console.error("Failed to load alerts", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  // Compute real stats from the alerts array
  const lowRatingCount = alerts.length;
  const unansweredCount = alerts.filter((a) => !a.replied).length;
  const negativeCount = lowRatingCount; // All alerts are low rating (rating <= 2)
  const newNotificationsCount = lowRatingCount; // For now, all alerts are "new"

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Alerts
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Monitor important review alerts and customer issues.
        </p>
      </div>

      {/* TOP ALERT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* CARD 1 – Low Rating Alerts */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Low Rating Alerts
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : lowRatingCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        {/* CARD 2 – Unanswered Reviews */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Unanswered Reviews
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : unansweredCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <MessageSquareWarning className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* CARD 3 – Negative Feedback */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Negative Feedback
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : negativeCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* CARD 4 – New Notifications */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                New Notifications
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : newNotificationsCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <BellRing className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ALERTS */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Recent Alerts
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Latest important activities from customer reviews.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {loading ? (
            <p className="text-zinc-500 text-center py-8">Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No alerts found.</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">
                      Low Rating Review Detected
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {alert.reviewerName} left a {alert.rating}-star review
                      {alert.comment ? `: "${alert.comment}"` : "."}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                      {new Date(alert.reviewDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-500/20 text-red-500 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-500/30 transition">
                  View
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
