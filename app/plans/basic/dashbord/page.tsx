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

    <div className="min-h-screen bg-white">

      {/* MAIN CONTENT */}

      <div className="p-6">

        {/* TOPBAR */}

        <Topbar />

        {/* PAGE TITLE */}

        <div className="mt-5">

          <h1 className="text-[34px] font-bold text-black">
            Dashboard
          </h1>

          <p className="text-zinc-500 text-[15px] mt-1">
            Here's what's happening with your reviews today.
          </p>

        </div>

        {/* TOP 4 CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">

          {/* CARD 1 */}

          <div className="bg-white border border-zinc-200 rounded-[28px] px-6 py-5 h-[165px] shadow-sm">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-zinc-500 text-[15px]">
                  Reviews Synced
                </p>

                <h2 className="text-[48px] leading-[52px] font-bold text-black mt-3">
                  100
                </h2>

                <h2 className="text-[48px] leading-[52px] font-bold text-black">
                  / 100
                </h2>

                <p className="text-zinc-500 text-[15px] mt-3">
                  This Month
                </p>

              </div>

              <div className="w-[64px] h-[64px] rounded-[22px] bg-blue-100 flex items-center justify-center text-[34px]">
                💬
              </div>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="bg-white border border-zinc-200 rounded-[28px] px-6 py-5 h-[165px] shadow-sm">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-zinc-500 text-[15px]">
                  Google Review Sync
                </p>

                <h2 className="text-[42px] leading-[46px] font-bold text-green-600 mt-3">
                  Active
                </h2>

                <p className="text-zinc-500 text-[15px] mt-3 leading-6">
                  Last synced 2 hours ago
                </p>

              </div>

              <div className="w-[64px] h-[64px] rounded-[22px] bg-green-100 flex items-center justify-center text-[34px]">
                🔄
              </div>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="bg-white border border-zinc-200 rounded-[28px] px-6 py-5 h-[165px] shadow-sm">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-zinc-500 text-[15px]">
                  Average Rating
                </p>

                <h2 className="text-[48px] leading-[52px] font-bold text-black mt-3">
                  4.6
                </h2>

                <p className="text-yellow-500 text-[22px] mt-2">
                  ★★★★★
                </p>

                <p className="text-zinc-500 text-[14px] mt-2">
                  Based on 128 reviews
                </p>

              </div>

              <div className="w-[64px] h-[64px] rounded-[22px] bg-yellow-100 flex items-center justify-center text-[34px]">
                ⭐
              </div>

            </div>

          </div>

          {/* CARD 4 */}

          <div className="bg-white border border-zinc-200 rounded-[28px] px-6 py-5 h-[165px] shadow-sm">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-zinc-500 text-[15px]">
                  Response Rate
                </p>

                <h2 className="text-[48px] leading-[52px] font-bold text-black mt-3">
                  85%
                </h2>

                <p className="text-green-600 text-[15px] mt-3 leading-6">
                  Good response rate
                </p>

              </div>

              <div className="w-[64px] h-[64px] rounded-[22px] bg-purple-100 flex items-center justify-center text-[34px]">
                📈
              </div>

            </div>

          </div>

        </div>

        {/* SMALL FEATURE CARDS */}

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
              className="bg-white border border-zinc-200 rounded-[24px] px-4 py-5 min-h-[120px] shadow-sm hover:shadow-md transition-all"
            >

              <div className="w-[52px] h-[52px] rounded-[18px] bg-zinc-100 flex items-center justify-center text-[24px] mb-4">
                ✨
              </div>

              <p className="text-[14px] font-semibold text-black leading-6">
                {item}
              </p>

            </div>

          ))}

        </div>

        {/* MIDDLE SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

          <RatingOverview />

          <AlertsCard />

          <UnansweredCard />

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

          <AnalyticsChart />

          <KeywordCard />

          <ResponseTrackingCard />

        </div>

        {/* LAST SECTION */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-7">

          <RecentReviewsCard />

          <PDFReportCard />

        </div>

      </div>

    </div>

  );

}
