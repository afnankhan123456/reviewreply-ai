"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, PieChart, 
  Star, ThumbsUp, ThumbsDown, Minus, RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any>({
    stats: {
      totalReviews: 0,
      used: 0,
      limit: 5,
      responseRate: 0,
      positive: 0,
      negative: 0,
    },
    daily: [],
    weekly: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const statsRes = await fetch('/api/standard/ai-reply-center/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) {
          setAnalyticsData((prev) => ({ ...prev, stats: statsData.data }));
        }
      }

      const dailyRes = await fetch('/api/standard/analytics/trends/daily');
      if (dailyRes.ok) {
        const dailyData = await dailyRes.json();
        if (dailyData.success) {
          setAnalyticsData((prev) => ({ ...prev, daily: dailyData.data || [] }));
        }
      }

      const weeklyRes = await fetch('/api/standard/analytics/trends/weekly');
      if (weeklyRes.ok) {
        const weeklyData = await weeklyRes.json();
        if (weeklyData.success) {
          setAnalyticsData((prev) => ({ ...prev, weekly: weeklyData.data || [] }));
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${
        theme === "light" ? "text-gray-600" : "text-gray-400"
      }`}>
        Loading analytics data...
      </div>
    );
  }

  const maxDaily = Math.max(...(analyticsData.daily || [0]), 1);
  const maxWeekly = Math.max(...(analyticsData.weekly || [0]), 1);

  const p = analyticsData.stats.positive || 0;
  const n = analyticsData.stats.negative || 0;
  const neutral = 100 - p - n;

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-200";
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-400" : "text-gray-500";
  const buttonBg = theme === "light" ? "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200" : "bg-[#181D27] border-[#2A303C] text-gray-300 hover:text-white";
  const chartTextColor = theme === "light" ? "text-gray-500" : "text-gray-500"; // keeping same for readability
  const progressBg = theme === "light" ? "bg-gray-200" : "bg-[#1F2430]";

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${bgMain} ${textMain}`}>
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Analytics</h1>
          <p className={`text-sm ${textSecondary}`}>Track your review performance with real-time analytics and sentiment insights.</p>
        </div>
        <button 
          className={`flex items-center gap-2 ${buttonBg} border rounded-lg px-3 py-2 text-sm transition-colors`}
          onClick={fetchAnalyticsData}
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Basic Analytics - Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1: Total Reviews */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <BarChart3 size={14} /> Total Reviews
          </div>
          <div className={`text-4xl font-bold ${textPrimary}`}>
            {analyticsData.stats.totalReviews || 0}
          </div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <TrendingUp size={12} /> {analyticsData.stats?.growth?.total || 0}% this month
          </div>
        </div>

        {/* Card 2: Response Rate */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <TrendingUp size={14} /> Response Rate
          </div>
          <div className={`text-4xl font-bold ${textPrimary}`}>{analyticsData.stats.responseRate || 0}%</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <TrendingUp size={12} /> {analyticsData.stats?.growth?.response || 0}% this month
          </div>
        </div>

        {/* Card 3: AI Replies Used */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <ThumbsUp size={14} /> AI Replies Used
          </div>
          <div className={`text-4xl font-bold ${textPrimary}`}>{analyticsData.stats.used || 0}</div>
          <div className="text-[10px] text-yellow-400 flex items-center gap-1">
            <Minus size={12} /> {analyticsData.stats.limit - analyticsData.stats.used || 0} remaining
          </div>
        </div>
      </div>

      {/* Advanced Analytics - Charts & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Daily Trends Chart */}
        <div className={`${bgCard} border rounded-xl p-5`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-sm font-medium ${textPrimary}`}>Daily Review Trends</h3>
            <span className={`text-[10px] ${textMuted}`}>Last 7 days</span>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {analyticsData.daily.map((val: number, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-400 transition-colors"
                  style={{ height: `${(val / maxDaily) * 100}%` }}
                />
                <span className={`text-[9px] ${chartTextColor}`}>Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trends Chart */}
        <div className={`${bgCard} border rounded-xl p-5`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-sm font-medium ${textPrimary}`}>Weekly Review Trends</h3>
            <span className={`text-[10px] ${textMuted}`}>Last 7 weeks</span>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {analyticsData.weekly.map((val: number, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-full bg-purple-500 rounded-t-md hover:bg-purple-400 transition-colors"
                  style={{ height: `${(val / maxWeekly) * 100}%` }}
                />
                <span className={`text-[9px] ${chartTextColor}`}>Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Sentiment Overview - Donut Chart */}
        <div className={`md:col-span-1 ${bgCard} border rounded-xl p-5`}>
          <h3 className={`text-sm font-medium ${textPrimary} mb-3`}>Sentiment Overview</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="3"
                  strokeDasharray={`${neutral}, 100`}
                  strokeDashoffset="0"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                  strokeDasharray={`${p}, 100`}
                  strokeDashoffset={`-${neutral}`}
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeDasharray={`${n}, 100`}
                  strokeDashoffset={`-${neutral + p}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-bold ${textPrimary}`}>
                  {analyticsData.stats.positive || 0}%
                </span>
                <span className={`text-[10px] ${textMuted}`}>Positive</span>
              </div>
            </div>
            <div className="flex justify-between w-full mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`${textSecondary}`}>Positive</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className={`${textSecondary}`}>Neutral</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className={`${textSecondary}`}>Negative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className={`md:col-span-2 ${bgCard} border rounded-xl p-5`}>
          <h3 className={`text-sm font-medium ${textPrimary} mb-3`}>Sentiment Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={textSecondary}>Positive</span>
                <span className={textMuted}>{analyticsData.stats.positive || 0}%</span>
              </div>
              <div className={`w-full ${progressBg} h-2 rounded-full overflow-hidden`}>
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${analyticsData.stats.positive || 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={textSecondary}>Neutral</span>
                <span className={textMuted}>{100 - (analyticsData.stats.positive || 0) - (analyticsData.stats.negative || 0)}%</span>
              </div>
              <div className={`w-full ${progressBg} h-2 rounded-full overflow-hidden`}>
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${100 - (analyticsData.stats.positive || 0) - (analyticsData.stats.negative || 0)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={textSecondary}>Negative</span>
                <span className={textMuted}>{analyticsData.stats.negative || 0}%</span>
              </div>
              <div className={`w-full ${progressBg} h-2 rounded-full overflow-hidden`}>
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${analyticsData.stats.negative || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
