"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Mail,
  MessageSquare,
  RefreshCw,
  Star,
  TrendingUp,
  Menu,
  X,
  LayoutDashboard,
  Bell,
  BarChart,
  Blocks,
  FileText,
  FileBarChart,
  Download,
  Settings,
  HelpCircle,
  Crown,
} from "lucide-react";
import Topbar from "./components/Topbar";

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

  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  // Mobile scroll lock
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

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
        setMonthlyData(d.monthlyData || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  }

  useEffect(() => {
    loadGoogleBusiness();
    loadDashboardStats();
  }, []);

  // ✅ Menu Items array (Donon sidebars ke liye use hoga)
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Star, label: "Reviews" },
    { icon: Bell, label: "Alerts" },
    { icon: MessageSquare, label: "Unanswered" },
    { icon: BarChart, label: "Analytics" },
    { icon: Blocks, label: "Integrations" },
    { icon: FileText, label: "Template" },
    { icon: FileBarChart, label: "Report" },
    { icon: Download, label: "Export" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-x-hidden flex flex-col lg:flex-row">
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

      {/* ================= LAPTOP PERMANENT SIDEBAR (Sirf LG par dikhega) ================= */}
      <div className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-20 p-4">
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
            R
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
              ReviewReply AI
            </h2>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              AI Powered Review Management
            </p>
          </div>
        </div>

        {/* Laptop Menu Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-2 scrollbar-thin">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                index === 0
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Laptop Upgrade Plan */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Business Owner
              </p>
              <p className="text-xs text-gray-500">Basic Plan</p>
            </div>
            <Crown className="w-4 h-4 text-yellow-500" />
          </div>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            Upgrade Plan
          </button>
        </div>
      </div>


      {/* ================= MOBILE OVERLAY BACKDROP ================= */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR (SIRF PHONE PAR SLIDE HOGA) ================= */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
              R
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                ReviewReply AI
              </h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                AI Powered Review Management
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition ${
                index === 0
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Upgrade Plan */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Business Owner
              </p>
              <p className="text-xs text-gray-500">Basic Plan</p>
            </div>
            <Crown className="w-4 h-4 text-yellow-500" />
          </div>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            Upgrade Plan
          </button>
        </div>
      </div>


      {/* ================= MAIN DASHBOARD CONTENT (Laptop par left margin, Phone par full) ================= */}
      <div className="flex-1 lg:ml-64 relative z-10 w-full">
        <div className="p-3 sm:p-5 lg:p-7">
          
          {/* Topbar (Button iske andar hai) */}
          <div className="mb-2">
            <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
          </div>

          {/* Google Business Locations Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 mt-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Google Business Locations
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Basic Plan supports only 1 location
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="text-gray-900 dark:text-gray-100 font-semibold whitespace-nowrap text-sm">
                  {locations.length} / 1
                </div>
                <button
                  onClick={() => {}}
                  className="bg-black dark:bg-white dark:text-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-normal break-words"
                >
                  Connect Google Business
                </button>
              </div>
            </div>

            {loading && <p className="text-gray-500 dark:text-gray-400 text-sm">Loading locations...</p>}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 sm:p-4 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-3 sm:p-4 rounded-xl mb-4 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4">
              {locations.map((location: any) => (
                <div
                  key={location.name}
                  className="border border-gray-200 dark:border-gray-600 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 w-full sm:w-auto">
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base">
                      {location.title || "Business Location"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate break-words">
                      {location.storefrontAddress?.addressLines?.join(", ") || "No Address"}
                    </p>
                  </div>
                  <button
                    onClick={() => saveLocation(location)}
                    disabled={saving}
                    className="bg-black dark:bg-white dark:text-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                  >
                    {saving ? "Saving..." : "Select"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TOP 4 CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mt-7">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-auto lg:h-[80px] shadow-sm dark:shadow-gray-900/30 flex flex-col sm:flex-row items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 text-center sm:text-left">
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Reviews Synced</p>
                <div className="flex items-baseline gap-1 justify-center sm:justify-start">
                  <h3 className="text-[18px] sm:text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">{reviewsSynced.current}</h3>
                  <span className="text-[11px] sm:text-[13px] text-gray-500 dark:text-gray-400">/{reviewsSynced.total}</span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-tight">This Month</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-auto lg:h-[80px] shadow-sm dark:shadow-gray-900/30 flex flex-col sm:flex-row items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 text-center sm:text-left">
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Google Review Sync</p>
                <h3 className="text-[18px] sm:text-[22px] font-bold text-green-600 dark:text-green-400 leading-none">
                  {syncStatus.active ? "Active" : "Inactive"}
                </h3>
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {syncStatus.lastSynced ? `Last synced ${syncStatus.lastSynced}` : "Not synced yet"}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-auto lg:h-[80px] shadow-sm dark:shadow-gray-900/30 flex flex-col sm:flex-row items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 fill-yellow-500 dark:fill-yellow-400 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 text-center sm:text-left">
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Average Rating</p>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h3 className="text-[18px] sm:text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">
                    {averageRating.toFixed(1)}
                  </h3>
                  <div className="flex gap-0.5">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            i < Math.round(averageRating)
                              ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-auto lg:h-[80px] shadow-sm dark:shadow-gray-900/30 flex flex-col sm:flex-row items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 text-center sm:text-left">
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Response Rate</p>
                <h3 className="text-[18px] sm:text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">
                  {totalReviews ? Math.round((responseTracking.replied / totalReviews) * 100) : 0}%
                </h3>
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                  {totalReviews === 0 ? "No data yet" : "Response tracking active"}
                </p>
              </div>
            </div>
          </div>

          {/* 3 DETAILED CARDS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mt-7">
            <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm dark:shadow-gray-900/30 h-auto min-h-[205px] lg:h-[205px] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100">Rating Overview</h3>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-3 gap-4">
                <div className="relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-full border-[6px] sm:border-[8px] border-orange-400 dark:border-orange-500 flex flex-col items-center justify-center flex-shrink-0">
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">{totalReviews}</h2>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Total Reviews</p>
                </div>
                <div className="flex flex-col gap-2 sm:gap-2.5 w-full sm:w-[140px]">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-medium text-gray-900 dark:text-gray-100 w-3">{star}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: totalReviews ? `${(ratingCounts[index] / totalReviews) * 100}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 w-5 text-right">{ratingCounts[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm dark:shadow-gray-900/30 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100">Review Sentiment</h3>
              </div>
              <div className="flex flex-col justify-center flex-1 mt-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] sm:text-[13px] font-medium text-gray-900 dark:text-gray-100">Positive</span>
                      <span className="text-[11px] sm:text-[13px] font-semibold text-green-600 dark:text-green-400">{sentiment.positive}%</span>
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
                      <span className="text-[11px] sm:text-[13px] font-medium text-gray-900 dark:text-gray-100">Negative</span>
                      <span className="text-[11px] sm:text-[13px] font-semibold text-red-500 dark:text-red-400">{sentiment.negative}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${sentiment.negative}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 text-center">
                  Based on last {totalReviews} reviews
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-4 sm:p-5 shadow-sm dark:shadow-gray-900/30 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100">Unanswered Reviews</h3>
              </div>
              <div className="flex-1 overflow-y-auto mt-4 space-y-3 sm:space-y-4 pr-1 scrollbar-thin">
                {unansweredReviews.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">No unanswered reviews</p>
                ) : (
                  unansweredReviews.map((review, index) => (
                    <div key={index} className="flex items-start justify-between gap-2">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[10px] sm:text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                          {review.initial || "?"}
                        </div>
                        <div>
                          <h4 className="text-[11px] sm:text-[13px] font-semibold text-gray-900 dark:text-gray-100">{review.name}</h4>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{review.text}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                                i < review.rating
                                  ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 ml-1">{review.rating}.0</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RECENT REVIEWS + TOP KEYWORDS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mt-7">
            <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-4 sm:p-5 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[16px] font-semibold text-gray-900 dark:text-gray-100">Recent Reviews</h3>
              </div>
              <div className="flex-1 overflow-y-auto mt-4 space-y-3 sm:space-y-4 pr-1 scrollbar-thin">
                {recentReviews.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">No recent reviews</p>
                ) : (
                  recentReviews.map((review, index) => (
                    <div key={index} className="flex items-start justify-between gap-2">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[10px] sm:text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                          {review.initial || "?"}
                        </div>
                        <div>
                          <h4 className="text-[11px] sm:text-[13px] font-semibold text-gray-900 dark:text-gray-100">{review.name}</h4>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{review.text}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="flex gap-0.5">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                                  i < review.rating
                                    ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                        </div>
                        <span className={`text-[10px] sm:text-[11px] font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${review.statusColor || "bg-gray-100 text-gray-600"}`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-4 sm:p-5 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100">Top Keywords</h3>
              </div>
              <div className="flex-1 overflow-y-auto mt-4 space-y-2 sm:space-y-3 pr-1 scrollbar-thin">
                {topKeywords.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">No keywords yet</p>
                ) : (
                  topKeywords.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[10px] sm:text-[12px] font-semibold text-blue-600 dark:text-blue-400 w-3 sm:w-4">{index + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                          <span className="text-[10px] sm:text-[12px] text-gray-900 dark:text-gray-100">{item.name}</span>
                          <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400">{item.value}</span>
                        </div>
                        <div className="w-full h-1.5 sm:h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: item.width }} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mt-7">
            <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-4 sm:p-5 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Review Analysis</h3>
              <div className="flex items-end justify-between gap-1 flex-1 px-1 sm:px-2 overflow-hidden">
                {monthlyData.length === 0 ? (
                  <div className="w-full text-center text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 self-center">No data</div>
                ) : (
                  monthlyData.map((item, idx) => {
                    const maxVal = Math.max(...monthlyData.map((d: any) => d.count), 1);
                    const barHeight = Math.round((item.count / maxVal) * 100);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-0.5 flex-1">
                        <div
                          className="w-full rounded-t-md bg-blue-500 dark:bg-blue-400"
                          style={{ height: `${barHeight}px` }}
                        />
                        <span className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400">
                          {new Date(item.month + "-01").toLocaleString("en-US", { month: "short" })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-4 sm:p-5 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Monthly History</h3>
              <div className="flex-1 flex items-center justify-center relative">
                {monthlyData.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">No data</p>
                ) : (
                  <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <polyline
                      points={monthlyData
                        .map((item, i) => {
                          const maxVal = Math.max(...monthlyData.map((d: any) => d.count), 1);
                          const x = (i / (monthlyData.length - 1 || 1)) * 200;
                          const y = 80 - (item.count / maxVal) * 70;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      className="stroke-indigo-500 dark:stroke-indigo-300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {monthlyData.map((item, i) => {
                      const maxVal = Math.max(...monthlyData.map((d: any) => d.count), 1);
                      const cx = (i / (monthlyData.length - 1 || 1)) * 200;
                      const cy = 80 - (item.count / maxVal) * 70;
                      return (
                        <circle key={i} cx={cx} cy={cy} r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                      );
                    })}
                    {monthlyData.map((item, i) => (
                      <text
                        key={i}
                        x={(i / (monthlyData.length - 1 || 1)) * 200}
                        y={78}
                        textAnchor="middle"
                        className="fill-gray-400 dark:fill-gray-500"
                        fontSize="5"
                      >
                        {new Date(item.month + "-01").toLocaleString("en-US", { month: "short" })}
                      </text>
                    ))}
                  </svg>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-4 sm:p-5 h-auto min-h-[205px] lg:h-[205px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <h3 className="text-sm sm:text-[16px] font-semibold text-gray-900 dark:text-gray-100">Response Tracking</h3>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-3 flex-1 gap-3">
                <div className="relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-full border-[6px] sm:border-[8px] border-green-500 dark:border-green-400 flex flex-col items-center justify-center flex-shrink-0">
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">{responseTracking.total}</h2>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Total</p>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500" />
                    <div>
                      <p className="text-[10px] sm:text-[12px] font-medium text-gray-900 dark:text-gray-100">Replied</p>
                      <p className="text-[9px] sm:text-[11px] text-gray-500 dark:text-gray-400">
                        {responseTracking.replied} ({responseTracking.total ? Math.round((responseTracking.replied / responseTracking.total) * 100) : 0}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" />
                    <div>
                      <p className="text-[10px] sm:text-[12px] font-medium text-gray-900 dark:text-gray-100">Pending</p>
                      <p className="text-[9px] sm:text-[11px] text-gray-500 dark:text-gray-400">
                        {responseTracking.pending} ({responseTracking.total ? Math.round((responseTracking.pending / responseTracking.total) * 100) : 0}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500" />
                    <div>
                      <p className="text-[10px] sm:text-[12px] font-medium text-gray-900 dark:text-gray-100">No Reply</p>
                      <p className="text-[9px] sm:text-[11px] text-gray-500 dark:text-gray-400">
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
    </div>
  );
}
