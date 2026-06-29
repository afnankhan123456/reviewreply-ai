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
    <div className="min-h-screen bg-white">
      <div className="p-5 lg:p-7">

        <Topbar />

        {/* TOP 4 CARDS — height 80px, compact design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">

          {/* CARD 1 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-[#6b7280] leading-tight">Reviews Synced</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-[22px] font-bold text-[#111827] leading-none">100</h3>
                <span className="text-[13px] text-[#6b7280]">/100</span>
              </div>
              <p className="text-[10px] text-[#6b7280] leading-tight">This Month</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-[#6b7280] leading-tight">Google Review Sync</p>
              <h3 className="text-[22px] font-bold text-green-600 leading-none">Active</h3>
              <p className="text-[10px] text-[#6b7280] leading-tight">Last synced 2 hours ago</p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-[#6b7280] leading-tight">Average Rating</p>
              <div className="flex items-center gap-2">
                <h3 className="text-[22px] font-bold text-[#111827] leading-none">4.6</h3>
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-[#6b7280] leading-tight">Based on 128 reviews</p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-3 h-[80px] shadow-sm flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-[#6b7280] leading-tight">Response Rate</p>
              <h3 className="text-[22px] font-bold text-[#111827] leading-none">85%</h3>
              <p className="text-[10px] text-green-600 leading-tight font-medium">Good response rate</p>
            </div>
          </div>

        </div>

        {/* 8 SMALL CARDS — height 80px, content ab andar fit hoga */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mt-6">
          {featureCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#e5e7eb] rounded-[18px] h-[80px] p-2 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-1 overflow-hidden"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-semibold text-[#111827] leading-tight text-center px-1 line-clamp-2">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3 BIG CARDS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          <div className="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]" />
          <div className="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]" />
          <div className="bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]" />
        </div>

        {/* 1 BIG + 2 SMALL */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          <div className="xl:col-span-2 bg-white rounded-[24px] h-[360px] border border-[#e5e7eb]" />
          <div className="flex flex-col gap-6 h-[360px]">
            <div className="bg-white rounded-[24px] h-[170px] border border-[#e5e7eb]" />
            <div className="bg-white rounded-[24px] h-[170px] border border-[#e5e7eb]" />
          </div>
        </div>

        {/* LAST 3 CARDS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7 pb-8">
          <div className="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]" />
          <div className="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]" />
          <div className="bg-white rounded-[24px] h-[340px] border border-[#e5e7eb]" />
        </div>

      </div>
    </div>
  );
}
