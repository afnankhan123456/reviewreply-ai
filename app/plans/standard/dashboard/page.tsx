"use client";

import { useState } from "react";
import StatCards from "./components/StatCards";
import ReviewPerformanceChart from "./components/ReviewPerformanceChart";
import QuickActions from "./components/QuickActions";
import LatestReviews from "./components/LatestReviews";
import ReviewSummary from "./components/ReviewSummary";
import AlertsPanel from "./components/AlertsPanel";
import KeywordsPanel from "./components/KeywordsPanel";
import SentimentPanel from "./components/SentimentPanel";
import SourcePanel from "./components/SourcePanel";
import { dashboardStats, performanceData } from "./data";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content Area */}
      <div className="p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">
              Welcome back! Here's what's happening with your reviews.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {["24h", "7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stat Cards */}
        <StatCards stats={dashboardStats} />

        {/* Charts & Quick Actions Row */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ReviewPerformanceChart data={performanceData} />
          </div>
          <QuickActions />
        </div>

        {/* Review Summary & Alerts */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ReviewSummary />
          <AlertsPanel />
        </div>

        {/* Keywords, Sentiment, Source */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <KeywordsPanel />
          <SentimentPanel />
          <SourcePanel />
        </div>

        {/* Latest Reviews Table */}
        <div className="mt-6">
          <LatestReviews />
        </div>
      </div>
    </div>
  );
}
