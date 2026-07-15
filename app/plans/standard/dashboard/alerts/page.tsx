"use client";

import Link from "next/link";

export default function AlertsDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Review Alerts</h1>
          <p className="text-gray-400 mt-1">Manage your review notifications and alerts</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:bg-gray-700 transition text-sm">
            Settings
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
            + New Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: New Review Email Alerts - Gradient Style */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-2xl">
                📧
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <h2 className="text-lg font-semibold text-white">New Review Email Alerts</h2>
            <p className="text-gray-400 text-sm mt-2">Instant notifications when customers post new reviews</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium border border-blue-600/30">
                3 New
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Email Review Requests - Glass Effect */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-2xl">
                📨
              </div>
              <div className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-md text-xs border border-purple-600/30">
                Auto
              </div>
            </div>
            <h2 className="text-lg font-semibold text-white">Email Review Requests</h2>
            <p className="text-gray-400 text-sm mt-2">Automated emails to request customer reviews</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span className="text-purple-400 text-sm font-medium">Scheduled</span>
              </div>
              <span className="text-gray-500 text-sm">Every 24h</span>
            </div>
          </div>
        </div>

        {/* Card 3: Email Notifications - Bordered Style */}
        <div className="bg-gray-900 border-2 border-indigo-500/30 rounded-2xl p-6 hover:border-indigo-500/60 transition">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-2xl">
              🔔
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900"></div>
              <div className="w-6 h-6 bg-indigo-600 rounded-full border-2 border-gray-900"></div>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-white">Email Notifications</h2>
          <p className="text-gray-400 text-sm mt-2">Control all notification channels & preferences</p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              <span className="text-yellow-400 text-sm font-medium">Custom</span>
            </div>
            <span className="text-gray-400 text-sm">2 of 5 active</span>
          </div>
        </div>

        {/* Card 4: Low Rating Alerts - Dark Red Theme */}
        <div className="bg-gray-900 rounded-2xl p-6 border-l-4 border-red-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-2xl">
                ⚠️
              </div>
              <span className="animate-pulse px-2 py-1 bg-red-600/20 text-red-400 rounded-md text-xs font-medium border border-red-600/30">
                Critical
              </span>
            </div>
            <h2 className="text-lg font-semibold text-white">Low Rating Alerts</h2>
            <p className="text-gray-400 text-sm mt-2">Priority alerts for negative customer feedback</p>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 text-sm font-medium flex items-center gap-1">
                  <span>🔴</span> 2 Need Attention
                </span>
                <span className="text-gray-500 text-xs">Threshold: &lt; 3★</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Rating Overview - Stats Style */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center text-2xl">
              📊
            </div>
          </div>
          <h2 className="text-lg font-semibold text-white">Rating Overview</h2>
          <p className="text-gray-400 text-sm mt-2">Comprehensive rating analytics & insights</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">4.2</span>
              <div className="flex items-center gap-1 text-amber-400">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span className="text-gray-600">⭐</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-medium">↑ 12%</span>
              <span className="text-gray-600 text-xs">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 6: Quick Actions - Minimal Style */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-dashed border-gray-700 flex flex-col items-center justify-center text-center h-full">
          <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-2xl mb-3">
            ⚡
          </div>
          <h3 className="text-white font-semibold">Quick Actions</h3>
          <p className="text-gray-500 text-sm mt-1 mb-4">Manage all alerts from one place</p>
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition text-sm border border-gray-700 w-full">
            View All Alerts →
          </button>
        </div>

      </div>
    </div>
  );
}
