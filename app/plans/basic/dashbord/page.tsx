"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  MessageSquare,
  RefreshCw,
  Star,
  TrendingUp,
  AlertTriangle,
  Reply,
} from "lucide-react";
import Topbar from "./components/Topbar";

const featureCards = [
  {
    title: "Low Rating Alerts",
    icon: AlertTriangle,
    color: "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400",
  },
  {
    title: "Unanswered Tracking",
    icon: MessageSquare,
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-500 dark:text-pink-400",
  },
  {
    title: "Reply Templates",
    icon: Reply,
    color: "bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400",
  },
  {
    title: "Response Tracking",
    icon: RefreshCw,
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400",
  },
  {
    title: "Email Alerts",
    icon: Mail,
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Business Location",
    icon: MapPin,
    color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
    span: true,
  },
];

export default function DashboardPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [reviewsSynced, setReviewsSynced] = useState({ current: 0, total: 100 });
  const [syncStatus, setSyncStatus] = useState({ active: false, lastSynced: "" });
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [sentiment, setSentiment] = useState({ positive: 0, negative: 0 });
  const [unansweredReviews, setUnansweredReviews] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [topKeywords, setTopKeywords] = useState<any[]>([]);
  const [responseTracking, setResponseTracking] = useState({
    total: 0,
    replied: 0,
    pending: 0,
    noReply: 0,
  });

  async function loadGoogleBusiness() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/google-business");
      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Failed to load locations");
        return;
      }
      setLocations(data.locations || []);
    } catch (error) {
      setError("Something went wrong while loading locations");
    } finally {
      setLoading(false);
    }
  }

  async function saveLocation(location: any) {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleLocationId: location.name,
          businessName: location.title,
          address: location.storefrontAddress?.addressLines?.join(", ") || "",
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.error || "Failed to save location");
        return;
      }
      setSuccess("Business location connected successfully");
    } catch (error) {
      setError("Something went wrong while saving location");
    } finally {
      setSaving(false);
    }
  }

  // 🔥 NEW: Fetch dashboard stats from backend
  async function loadDashboardStats() {
    try {
      const response = await fetch("/api/dashboard-stats");
      const data = await response.json();
      if (data.success) {
        const d = data.data;
        setReviewsSynced(d.reviewsSynced);
        setSyncStatus(d.syncStatus);
        setAverageRating(d.averageRating);
        setTotalReviews(d.totalReviews);
        setRatingCounts(d.ratingCounts);
        setSentiment(d.sentiment);
        setUnansweredReviews(d.unansweredReviews);
        setRecentReviews(d.recentReviews);
        setTopKeywords(d.topKeywords);
        setResponseTracking(d.responseTracking);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  }

  useEffect(() => {
    loadGoogleBusiness();
    loadDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Thin scrollbar styles – light & dark */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .scrollbar-thin {
          scrollbar-color: #4b5563 transparent;
        }
      `}</style>

      <div className="p-5 lg:p-7">
        <Topbar />

        {/* Google Business Locations Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mt-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Google Business Locations
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Basic Plan supports only 1 location
              </p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-gray-900 dark:text-gray-100 font-semibold whitespace-nowrap">
                {locations.length} / 1
              </div>
              <button
                onClick={() => {}}
                className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap"
              >
                Connect Google Business
              </button>
            </div>
          </div>

          {loading && <p className="text-gray-500 dark:text-gray-400">Loading locations...</p>}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-4 rounded-xl mb-4">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {locations.map((location: any) => (
              <div
                key={location.name}
                className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {location.title || "Business Location"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {location.storefrontAddress?.addressLines?.join(", ") || "No Address"}
                  </p>
                </div>
                <button
                  onClick={() => saveLocation(location)}
                  disabled={saving}
                  className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                >
                  {saving ? "Saving..." : "Select"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TOP 4 CARDS — height 80px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
          {/* CARD 1 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Reviews Synced</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">{reviewsSynced.current}</h3>
                <span className="text-[13px] text-gray-500 dark:text-gray-400">/{reviewsSynced.total}</span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">This Month</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Google Review Sync</p>
              <h3 className="text-[22px] font-bold text-green-600 dark:text-green-400 leading-none">
                {syncStatus.active ? "Active" : "Inactive"}
              </h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                {syncStatus.lastSynced ? `Last synced ${syncStatus.lastSynced}` : "Not synced yet"}
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 fill-yellow-500 dark:fill-yellow-400 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Average Rating</p>
              <div className="flex items-center gap-2">
                <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">
                  {averageRating.toFixed(1)}
                </h3>
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(averageRating)
                            ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Response Rate</p>
              <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">
                {totalReviews ? Math.round((responseTracking.replied / totalReviews) * 100) : 0}%
              </h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                {totalReviews === 0 ? "No data yet" : "Response tracking active"}
              </p>
            </div>
          </div>
        </div>

        {/* 6 SMALL CARDS (Business Location spans 2 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mt-6">
          {featureCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[18px] h-[80px] p-2 shadow-sm dark:shadow-gray-900/30 hover:shadow-md dark:hover:shadow-gray-800 transition-all flex flex-col items-center justify-center gap-1 overflow-hidden ${
                  item.span ? "xl:col-span-2" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-100 leading-tight text-center px-1 line-clamp-2">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3 DETAILED CARDS — Rating Overview, Positive/Negative Detection, Unanswered Reviews */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Rating Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Rating Overview</h3>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-orange-400 dark:border-orange-500 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">{totalReviews}</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Total Reviews</p>
              </div>
              <div className="flex flex-col gap-2.5 w-[140px]">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-gray-900 dark:text-gray-100 w-3">{star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{
                          width: totalReviews ? `${(ratingCounts[index] / totalReviews) * 100}%` : "0%",
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{ratingCounts[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Positive & Negative Review Detection */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Review Sentiment</h3>
            </div>
            <div className="flex flex-col justify-center flex-1 mt-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Positive</span>
                    <span className="text-[13px] font-semibold text-green-600 dark:text-green-400">{sentiment.positive}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${sentiment.positive}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Negative</span>
                    <span className="text-[13px] font-semibold text-red-500 dark:text-red-400">{sentiment.negative}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${sentiment.negative}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center">
                Based on last {totalReviews} reviews
              </p>
            </div>
          </div>

          {/* Unanswered Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Unanswered Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {unansweredReviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">No unanswered reviews</p>
              ) : (
                unansweredReviews.map((review, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                        {review.initial || "?"}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">{review.name}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{review.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-2">{review.rating}.0</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RECENT REVIEWS + RIGHT COLUMN (Top Keywords) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Recent Reviews */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">Recent Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {recentReviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">No recent reviews</p>
              ) : (
                recentReviews.map((review, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                        {review.initial || "?"}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">{review.name}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{review.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating
                                  ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${review.statusColor || "bg-gray-100 text-gray-600"}`}>
                        {review.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Top Keywords</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1 scrollbar-thin">
              {topKeywords.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">No keywords yet</p>
              ) : (
                topKeywords.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 w-4">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] text-gray-900 dark:text-gray-100">{item.name}</span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.value}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: item.width }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CHARTS ROW: Review Analysis + Monthly History + Response Tracking */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Review Analysis – Simple Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Review Analysis</h3>
            <div className="flex items-end justify-between gap-1 flex-1 px-2">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-0 bg-blue-100 rounded-t-md relative"></div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">No data</span>
              </div>
            </div>
          </div>

          {/* Monthly History – Simple Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Monthly History</h3>
            <div className="flex-1 flex items-center justify-center relative">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Chart data loading...</p>
            </div>
          </div>

          {/* Response Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">Response Tracking</h3>
            </div>
            <div className="flex items-center justify-between mt-3 flex-1">
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-green-500 dark:border-green-400 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">{responseTracking.total}</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">Replied</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {responseTracking.replied} ({responseTracking.total ? Math.round((responseTracking.replied / responseTracking.total) * 100) : 0}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">Pending</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {responseTracking.pending} ({responseTracking.total ? Math.round((responseTracking.pending / responseTracking.total) * 100) : 0}%)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">No Reply</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {responseTracking.noReply} ({responseTracking.total ? Math.round((responseTracking.noReply / responseTracking.total) * 100) : 0}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
