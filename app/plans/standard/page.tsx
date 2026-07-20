"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Star, BarChart3, MessageSquare, TrendingUp, 
  ArrowRight, RefreshCw, ThumbsUp, AlertCircle 
} from 'lucide-react';

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    unansweredCount: 0,
    recentReviews: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/standard/dashboard/overview');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to load overview:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-200";
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-500" : "text-gray-500";
  const pillPositive = "bg-green-500/20 text-green-400 border border-green-500/30";
  const pillWarning = "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
  const pillDanger = "bg-red-500/20 text-red-400 border border-red-500/30";
  const linkColor = "text-indigo-400 hover:text-indigo-300";

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${bgMain} ${textSecondary}`}>
        <RefreshCw className="animate-spin mr-2" size={18} />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${bgMain} ${textMain}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Dashboard</h1>
          <p className={`text-sm ${textSecondary}`}>Overview of your review performance</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${
            theme === "light" 
              ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
              : "bg-[#181D27] hover:bg-[#2A303C] text-gray-300"
          }`}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Reviews */}
        <div className={`${bgCard} border rounded-xl p-4`}>
          <div className={`flex items-center gap-2 text-xs ${textSecondary} mb-2`}>
            <MessageSquare size={14} /> Total Reviews
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>{stats.totalReviews}</div>
          <p className={`text-[10px] ${textMuted} mt-1`}>All time collected</p>
        </div>

        {/* Average Rating */}
        <div className={`${bgCard} border rounded-xl p-4`}>
          <div className={`flex items-center gap-2 text-xs ${textSecondary} mb-2`}>
            <Star size={14} /> Average Rating
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>
            {stats.averageRating?.toFixed(1) || '0.0'}
          </div>
          <div className="text-[10px] text-yellow-400 mt-1 flex items-center gap-1">
            <TrendingUp size={10} /> Across all sources
          </div>
        </div>

        {/* Response Rate */}
        <div className={`${bgCard} border rounded-xl p-4`}>
          <div className={`flex items-center gap-2 text-xs ${textSecondary} mb-2`}>
            <ThumbsUp size={14} /> Response Rate
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>{stats.responseRate}%</div>
          <p className={`text-[10px] ${textMuted} mt-1`}>Replied reviews</p>
        </div>

        {/* Unanswered */}
        <div className={`${bgCard} border rounded-xl p-4`}>
          <div className={`flex items-center gap-2 text-xs ${textSecondary} mb-2`}>
            <AlertCircle size={14} /> Unanswered
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>{stats.unansweredCount}</div>
          <p className="text-[10px] text-red-400 mt-1">Needs attention</p>
        </div>
      </div>

      {/* Recent Reviews + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reviews */}
        <div className={`lg:col-span-2 ${bgCard} border rounded-xl p-5`}>
          <h3 className={`font-medium ${textPrimary} mb-4`}>Recent Reviews</h3>
          {stats.recentReviews.length === 0 ? (
            <p className={`text-sm ${textMuted} text-center py-6`}>No reviews yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentReviews.map((review: any, index: number) => (
                <div key={index} className={`flex items-start justify-between p-3 rounded-lg ${
                  theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-[#181D27] border border-[#2A303C]"
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${textPrimary}`}>{review.reviewerName}</span>
                      <span className="text-yellow-500 text-xs">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className={`text-xs ${textSecondary} mt-1 line-clamp-2`}>{review.comment}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    review.sentiment === 'Positive' ? pillPositive :
                    review.sentiment === 'Negative' ? pillDanger : pillWarning
                  }`}>
                    {review.sentiment}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link 
            href="/plans/standard/dashboard/reviews" 
            className={`inline-flex items-center gap-1 mt-4 text-sm ${linkColor}`}
          >
            View all reviews <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick Links / Activity Summary */}
        <div className={`${bgCard} border rounded-xl p-5`}>
          <h3 className={`font-medium ${textPrimary} mb-4`}>Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              href="/plans/standard/dashboard/ai-reply-center" 
              className={`block p-3 rounded-lg transition-colors ${
                theme === "light" ? "bg-gray-50 hover:bg-gray-100" : "bg-[#181D27] hover:bg-[#2A303C]"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-indigo-400" />
                <span className={`text-sm ${textPrimary}`}>AI Reply Center</span>
              </div>
              <p className={`text-xs ${textMuted} mt-1`}>Auto‑generate review replies</p>
            </Link>
            <Link 
              href="/plans/standard/dashboard/reports" 
              className={`block p-3 rounded-lg transition-colors ${
                theme === "light" ? "bg-gray-50 hover:bg-gray-100" : "bg-[#181D27] hover:bg-[#2A303C]"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-purple-400" />
                <span className={`text-sm ${textPrimary}`}>Reports</span>
              </div>
              <p className={`text-xs ${textMuted} mt-1`}>Download performance PDF/CSV</p>
            </Link>
            <Link 
              href="/plans/standard/dashboard/connect-app" 
              className={`block p-3 rounded-lg transition-colors ${
                theme === "light" ? "bg-gray-50 hover:bg-gray-100" : "bg-[#181D27] hover:bg-[#2A303C]"
              }`}
            >
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-green-400" />
                <span className={`text-sm ${textPrimary}`}>Connect Apps</span>
              </div>
              <p className={`text-xs ${textMuted} mt-1`}>Gmail, Google Business</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
