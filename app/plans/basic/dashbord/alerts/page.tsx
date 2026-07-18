"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BellRing,
  MessageSquareWarning,
  Star,
  X,
  Menu,
} from "lucide-react";

import Topbar from "../components/Topbar";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

  // ✅ MOBILE TOPBAR SIDEBAR STATE
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const lowRatingCount = alerts.length;
  const unansweredCount = alerts.filter((a) => !a.replied).length;
  const negativeCount = lowRatingCount;
  const newNotificationsCount = lowRatingCount;

  return (
    <div className="p-6 lg:p-8">

      {/* ✅ MOBILE TOPBAR ONLY */}
      <div className="block lg:hidden mb-6">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

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

        {/* SCROLLABLE LIST WRAPPER — isi se page lamba hona band hoga */}
        <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">

          {loading ? (
            <p className="text-zinc-500 text-center py-8">
              Loading alerts...
            </p>
          ) : alerts.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">
              No alerts found.
            </p>
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

                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-500/20 text-red-500 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-500/30 transition"
                >
                  View
                </button>

              </div>

            ))
          )}

        </div>

      </div>

      {/* VIEW MODAL */}
      {selectedAlert && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl relative">

            <button
              onClick={() => setSelectedAlert(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Alert Details
            </h2>

            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">

              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedAlert.reviewerName || "Anonymous"}
              </p>

              <p>
                <span className="font-medium">Rating:</span>{" "}
                {selectedAlert.rating} ⭐
              </p>

              <p>
                <span className="font-medium">Comment:</span>{" "}
                {selectedAlert.comment || "No comment"}
              </p>

              {selectedAlert.reviewReply && (
                <p>
                  <span className="font-medium">Reply:</span>{" "}
                  {selectedAlert.reviewReply}
                </p>
              )}

              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(selectedAlert.reviewDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}
