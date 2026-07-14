"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, PieChart, 
  Star, ThumbsUp, ThumbsDown, Minus, RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // 1. Real Stats API
      const statsRes = await fetch('/api/standard/ai-reply-center/stats');
      const statsData = await statsRes.json();

      // 2. Real Daily Trends (Last 7 days)
      const dailyRes = await fetch('/api/standard/analytics/trends/daily');
      const dailyData = await dailyRes.json();

      // 3. Real Weekly Trends (Last 7 weeks)
      const weeklyRes = await fetch('/api/standard/analytics/trends/weekly');
      const weeklyData = await weeklyRes.json();

      setAnalyticsData({
        stats: statsData.data,
        daily: dailyData.data || [],
        weekly: weeklyData.data || [],
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center text-gray-400">Loading analytics data...</div>;
  }

  // Max value for chart scaling
  const maxDaily = Math.max(...(analyticsData?.daily || [0]), 1);
  const maxWeekly = Math.max(...(analyticsData?.weekly || [0]), 1);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-400">Track your review performance with real-time analytics and sentiment insights.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* BASIC ANALYTICS - Top Stats Cards */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1: Total Reviews (FIXED: stats.totalReviews) */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
            <BarChart3 size={14} /> Total Reviews
          </div>
          <div className="text-4xl font-bold text-white">
            {analyticsData?.stats?.totalReviews || 0}
          </div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <TrendingUp size={12} /> +12% this month
          </div>
        </div>

        {/* Card 2: Response Rate */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
            <TrendingUp size={14} /> Response Rate
          </div>
          <div className="text-4xl font-bold text-white">{analyticsData?.stats?.responseRate || 0}%</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <TrendingUp size={12} /> +5% this month
          </div>
        </div>

        {/* Card 3: AI Replies Used */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-2">
            <ThumbsUp size={14} /> AI Replies Used
          </div>
          <div className="text-4xl font-bold text-white">{analyticsData?.stats?.used || 0}</div>
          <div className="text-[10px] text-yellow-400 flex items-center gap-1">
            <Minus size={12} /> {analyticsData?.stats?.limit - analyticsData?.stats?.used || 0} remaining
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* ADVANCED ANALYTICS - Charts & Trends (REAL DATA) */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Daily Trends Chart */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-sm font-medium">Daily Review Trends</h3>
            <span className="text-[10px] text-gray-400">Last 7 days</span>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {analyticsData?.daily?.map((val: number, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-400 transition-colors"
                  style={{ height: `${(val / maxDaily) * 100}%` }}
                />
                <span className="text-[9px] text-gray-500">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trends Chart */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-sm font-medium">Weekly Review Trends</h3>
            <span className="text-[10px] text-gray-400">Last 7 weeks</span>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {analyticsData?.weekly?.map((val: number, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div 
                  className="w-full bg-purple-500 rounded-t-md hover:bg-purple-400 transition-colors"
                  style={{ height: `${(val / maxWeekly) * 100}%` }}
                />
                <span className="text-[9px] text-gray-500">Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SENTIMENT ANALYSIS */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Sentiment Overview */}
        <div className="md:col-span-1 bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
          <h3 className="text-white text-sm font-medium mb-3">Sentiment Overview</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-28 h-28 rounded-full border-8 border-green-500 flex items-center justify-center bg-[#181D27] relative">
              <div className="text-center">
                <div className="text-xl font-bold text-white">{analyticsData?.stats?.positive || 0}%</div>
                <div className="text-[10px] text-gray-500">Positive</div>
              </div>
            </div>
            <div className="flex justify-between w-full mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">Positive</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-300">Neutral</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-gray-300">Negative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="md:col-span-2 bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
          <h3 className="text-white text-sm font-medium mb-3">Sentiment Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Positive</span>
                <span className="text-gray-400">{analyticsData?.stats?.positive || 0}%</span>
              </div>
              <div className="w-full bg-[#1F2430] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${analyticsData?.stats?.positive || 0}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Neutral</span>
                <span className="text-gray-400">{100 - (analyticsData?.stats?.positive || 0) - (analyticsData?.stats?.negative || 0)}%</span>
              </div>
              <div className="w-full bg-[#1F2430] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${100 - (analyticsData?.stats?.positive || 0) - (analyticsData?.stats?.negative || 0)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Negative</span>
                <span className="text-gray-400">{analyticsData?.stats?.negative || 0}%</span>
              </div>
              <div className="w-full bg-[#1F2430] h-2 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${analyticsData?.stats?.negative || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
