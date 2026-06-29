"use client";

import {
  Download,
  FileText,
  Hash,
  Mail,
  MessageSquare,
  RefreshCw,
  Star,
  TrendingUp,
  AlertTriangle,
  Reply,
} from "lucide-react";

import Topbar from "./components/Topbar";

import AlertsCard from "./components/AlertsCard";
import UnansweredCard from "./components/UnansweredCard";
import RatingOverview from "./components/RatingOverview";

import AnalyticsChart from "./components/AnalyticsChart";
import KeywordCard from "./components/KeywordCard";
import ResponseTrackingCard from "./components/ResponseTrackingCard";

import PDFReportCard from "./components/PDFReportCard";
import RecentReviewsCard from "./components/RecentReviewsCard";
import ExtraCard from "./components/ExtraCard";

const featureCards = [
  {
    title: "Low Rating Alerts",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-500",
  },
  {
    title: "Unanswered Tracking",
    icon: MessageSquare,
    color: "bg-pink-100 text-pink-500",
  },
  {
    title: "Reply Templates",
    icon: Reply,
    color: "bg-violet-100 text-violet-500",
  },
  {
    title: "Response Tracking",
    icon: RefreshCw,
    color: "bg-cyan-100 text-cyan-500",
  },
  {
    title: "Email Alerts",
    icon: Mail,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Top 5 Keywords",
    icon: Hash,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Monthly PDF Reports",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Export CSV / PDF",
    icon: Download,
    color: "bg-blue-100 text-blue-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <div className="p-5 lg:p-7">

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE TITLE */}
        <div className="mt-5">
          <h1 className="text-[34px] font-bold text-[#111827]">
            Dashboard
          </h1>

          <p className="text-[#6b7280] text-[15px] mt-1">
            Here's what's happening with your reviews today.
          </p>
        </div>

        {/* ================================================= */}
        {/* TOP 4 BIG CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 mt-7">

          {/* CARD 1 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[26px] p-6 h-[180px] shadow-sm hover:shadow-md transition-all relative overflow-hidden">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[#6b7280] text-[15px]">
                  Reviews Synced
                </p>

                <div className="flex items-end gap-2 mt-4">

                  <h2 className="text-[42px] font-bold text-[#111827] leading-none">
                    100
                  </h2>

                  <span className="text-[24px] text-[#6b7280] mb-1">
                    /100
                  </span>

                </div>

                <p className="text-[#6b7280] text-[14px] mt-4">
                  This Month
                </p>
              </div>

              <div className="w-[62px] h-[62px] rounded-[20px] bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[26px] p-6 h-[180px] shadow-sm hover:shadow-md transition-all">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[#6b7280] text-[15px]">
                  Google Review Sync
                </p>

                <h2 className="text-[38px] font-bold text-green-600 mt-4">
                  Active
                </h2>

                <p className="text-[#6b7280] text-[14px] mt-4">
                  Last synced 2 hours ago
                </p>
              </div>

              <div className="w-[62px] h-[62px] rounded-[20px] bg-green-100 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[26px] p-6 h-[180px] shadow-sm hover:shadow-md transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[#6b7280] text-[15px]">
                  Average Rating
                </p>

                <h2 className="text-[42px] font-bold text-[#111827] mt-4 leading-none">
                  4.6
                </h2>

                <div className="flex gap-1 mt-3">

                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}

                </div>

                <p className="text-[#6b7280] text-[14px] mt-3">
                  Based on 128 reviews
                </p>

              </div>

              <div className="w-[62px] h-[62px] rounded-[20px] bg-yellow-100 flex items-center justify-center">
                <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
              </div>

            </div>

          </div>

          {/* CARD 4 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[26px] p-6 h-[180px] shadow-sm hover:shadow-md transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[#6b7280] text-[15px]">
                  Response Rate
                </p>

                <h2 className="text-[42px] font-bold text-[#111827] mt-4 leading-none">
                  85%
                </h2>

                <p className="text-green-600 text-[15px] mt-4 font-medium">
                  Good response rate
                </p>

              </div>

              <div className="w-[62px] h-[62px] rounded-[20px] bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* 8 SMALL CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4 mt-6">

          {featureCards.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-white border border-[#e5e7eb] rounded-[22px] h-[120px] px-4 py-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >

                <div
                  className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center ${item.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <p className="text-[13px] font-semibold text-[#111827] leading-5 mt-3">
                  {item.title}
                </p>

              </div>

            );

          })}

        </div>

        {/* ================================================= */}
        {/* 3 BIG SAME CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

          <div className="h-[360px]">
            <RatingOverview />
          </div>

          <div className="h-[360px]">
            <AlertsCard />
          </div>

          <div className="h-[360px]">
            <UnansweredCard />
          </div>

        </div>

        {/* ================================================= */}
        {/* 1 BIG + 2 SMALL */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">

          {/* BIG CARD */}
          <div className="xl:col-span-2 h-[360px]">
            <AnalyticsChart />
          </div>

          {/* RIGHT SMALL CARDS */}
          <div className="flex flex-col gap-6 h-[360px]">

            <div className="h-[170px]">
              <KeywordCard />
            </div>

            <div className="h-[170px]">
              <ResponseTrackingCard />
            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* LAST 3 SAME CARDS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7 pb-8">

          <div className="h-[340px]">
            <RecentReviewsCard />
          </div>

          <div className="h-[340px]">
            <PDFReportCard />
          </div>

          <div className="h-[340px]">
            <ExtraCard />
          </div>

        </div>

      </div>
    </div>
  );
}
