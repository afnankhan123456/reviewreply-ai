"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Star,
  MessageSquare,
  Reply,
} from "lucide-react";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [replyRate, setReplyRate] = useState(0);
  const [growthRate, setGrowthRate] = useState("N/A"); // placeholder
  const [monthlyData, setMonthlyData] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsRes, statsRes] = await Promise.all([
          fetch("/api/analytics"),
          fetch("/api/dashboard-stats"),
        ]);

        const analyticsData = await analyticsRes.json();
        const statsData = await statsRes.json();

        if (analyticsData.success) {
          const { totalReviews: total, averageRating: avg, reviewsPerMonth } = analyticsData.analytics;
          setTotalReviews(total);
          setAverageRating(avg);

          // Convert reviewsPerMonth object to array sorted by month
          const months = Object.entries(reviewsPerMonth || {})
            .map(([month, count]) => ({ month, count: count as number }))
            .sort((a, b) => a.month.localeCompare(b.month));
          setMonthlyData(months);
        }

        if (statsData.success && statsData.data.totalReviews > 0) {
          const { replied, total } = statsData.data.responseTracking;
          setReplyRate(Math.round((replied / total) * 100));
        } else {
          setReplyRate(0);
        }
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Analytics
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Track review performance and customer engagement.
        </p>
      </div>

      {/* TOP ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* CARD 1 – Total Reviews */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Total Reviews
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : totalReviews}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* CARD 2 – Average Rating */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Average Rating
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : averageRating.toFixed(1)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>

        {/* CARD 3 – Reply Rate */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Reply Rate
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : `${replyRate}%`}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Reply className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* CARD 4 – Growth Rate */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Growth Rate
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {growthRate}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Review Growth Analytics
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Monthly review performance overview.
          </p>
        </div>

        <div className="h-[320px] flex items-end justify-between gap-4">
          {monthlyData.length === 0 && !loading ? (
            <p className="text-zinc-500 m-auto">No monthly data yet.</p>
          ) : (
            monthlyData.map((item) => {
              const maxCount = Math.max(...monthlyData.map(d => d.count), 1);
              const heightPercent = (item.count / maxCount) * 100;
              return (
                <div key={item.month} className="flex flex-col items-center gap-3 w-full">
                  <div
                    className="w-full rounded-t-2xl bg-blue-500"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(item.month + "-01").toLocaleString("en-US", { month: "short" })}
                  </span>
                </div>
              );
            })
          )}
          {loading && (
            <p className="text-zinc-500 m-auto">Loading chart...</p>
          )}
        </div>
      </div>

      {/* RECENT PERFORMANCE */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Recent Performance
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Latest review insights and engagement metrics.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Placeholder entries – you can later replace with real events */}
          <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">
                  Total Reviews Collected
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  You have {totalReviews} reviews across all platforms.
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">
              {totalReviews}
            </span>
          </div>

          <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">
                  Average Rating
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Your overall rating is {averageRating.toFixed(1)} out of 5.
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-yellow-600">
              {averageRating.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <Reply className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">
                  Reply Engagement
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  You have replied to {replyRate}% of all reviews.
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">
              {replyRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
