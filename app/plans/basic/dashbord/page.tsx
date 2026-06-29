"use client";

import Topbar from "./components/Topbar";

import AlertsCard from "./components/AlertsCard";
import UnansweredCard from "./components/UnansweredCard";
import RatingOverview from "./components/RatingOverview";
import AnalyticsChart from "./components/AnalyticsChart";

import KeywordCard from "./components/KeywordCard";
import ResponseTrackingCard from "./components/ResponseTrackingCard";
import PDFReportCard from "./components/PDFReportCard";
import RecentReviewsCard from "./components/RecentReviewsCard";

export default function DashboardPage() {

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      {/* MAIN CONTENT */}

      <div className="p-6">

        {/* TOPBAR */}

        <Topbar />

        {/* PAGE TITLE */}

        <div className="mt-6">

          <h1 className="text-3xl font-bold text-black">
            Dashboard
          </h1>

          <p className="text-zinc-500 mt-1">
            Here's what's happening with your reviews today.
          </p>

        </div>

        {/* TOP 4 CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

          {/* CARD 1 */}

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Reviews Synced
                </p>

                <h2 className="text-4xl font-bold text-black mt-2">
                  100 / 100
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  This Month
                </p>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                💬
              </div>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Google Review Sync
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  Active
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Last synced 2 hours ago
                </p>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
                🔄
              </div>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Average Rating
                </p>

                <h2 className="text-4xl font-bold text-black mt-2">
                  4.6
                </h2>

                <p className="text-yellow-500 text-lg mt-2">
                  ★★★★★
                </p>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl">
                ⭐
              </div>

            </div>

          </div>

          {/* CARD 4 */}

          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">
                  Response Rate
                </p>

                <h2 className="text-4xl font-bold text-black mt-2">
                  85%
                </h2>

                <p className="text-green-600 text-sm mt-2">
                  Good response rate
                </p>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
                📈
              </div>

            </div>

          </div>

        </div>

        {/* 8 SMALL FEATURE CARDS */}

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mt-6">

          {[
            "Low Rating Alerts",
            "Unanswered Tracking",
            "Reply Templates",
            "Response Tracking",
            "Email Alerts",
            "Top 5 Keywords",
            "Monthly PDF Reports",
            "Export CSV / PDF",
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white border border-zinc-200 rounded-2xl p-4 text-center hover:shadow-md transition-all"
            >

              <div className="text-2xl mb-3">
                ✨
              </div>

              <p className="text-sm font-medium text-black leading-snug">
                {item}
              </p>

            </div>

          ))}

        </div>

        {/* MAIN 3 CARDS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <RatingOverview />

          <AlertsCard />

          <UnansweredCard />

        </div>

        {/* ANALYTICS SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <AnalyticsChart />

          <KeywordCard />

          <ResponseTrackingCard />

        </div>

        {/* LAST SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          <RecentReviewsCard />

          <PDFReportCard />

        </div>

      </div>

    </div>

  );

}
