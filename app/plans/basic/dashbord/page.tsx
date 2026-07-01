"use client";

import {
  MapPin,
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
    color: "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400",
  },
  {
    title: "Unanswered Tracking",
    icon: MessageSquare,
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-500 dark:text-pink-400",
  },
  {
    title: "Reply Templates",
    icon: Reply,
    color: "bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400",
  },
  {
    title: "Response Tracking",
    icon: RefreshCw,
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400",
  },
  {
    title: "Email Alerts",
    icon: Mail,
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Business Location",
    icon: MapPin,
    color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
    span: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Thin scrollbar styles – light & dark */}
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .dark .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .scrollbar-thin {
          scrollbar-color: #4b5563 transparent;
        }
      `}</style>

      <div className="p-5 lg:p-7">
        <Topbar />

        {/* Google Business Connection Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mt-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Google Business
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect your Google Business Profile
              </p>
            </div>
            <button className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-xl">
              Connect Google Business
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Locations Usage
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Basic Plan supports only 1 business location
                </p>
              </div>
              <div className="text-gray-900 dark:text-gray-100 font-semibold">
                0 / 1
              </div>
            </div>
          </div>
        </div>

        {/* TOP 4 CARDS — height 80px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
          {/* CARD 1 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Reviews Synced</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">100</h3>
                <span className="text-[13px] text-gray-500 dark:text-gray-400">/100</span>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">This Month</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Google Review Sync</p>
              <h3 className="text-[22px] font-bold text-green-600 dark:text-green-400 leading-none">Active</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">Last synced 2 hours ago</p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 fill-yellow-500 dark:fill-yellow-400 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Average Rating</p>
              <div className="flex items-center gap-2">
                <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">4.6</h3>
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < 4
                            ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">Based on 128 reviews</p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[20px] p-3 h-[80px] shadow-sm dark:shadow-gray-900/30 flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Response Rate</p>
              <h3 className="text-[22px] font-bold text-gray-900 dark:text-gray-100 leading-none">85%</h3>
              <p className="text-[10px] text-green-600 dark:text-green-400 leading-tight font-medium">
                Good response rate
              </p>
            </div>
          </div>
        </div>

        {/* 6 SMALL CARDS (Business Location spans 2 columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mt-6">
          {featureCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[18px] h-[80px] p-2 shadow-sm dark:shadow-gray-900/30 hover:shadow-md dark:hover:shadow-gray-800 transition-all flex flex-col items-center justify-center gap-1 overflow-hidden ${
                  item.span ? "xl:col-span-2" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-100 leading-tight text-center px-1 line-clamp-2">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3 DETAILED CARDS — Rating Overview, Positive/Negative Detection, Unanswered Reviews */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Rating Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Rating Overview</h3>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-orange-400 dark:border-orange-500 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">128</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Total Reviews</p>
              </div>
              <div className="flex flex-col gap-2.5 w-[140px]">
                {[
                  { star: 5, width: "80%", color: "bg-green-500", total: 80 },
                  { star: 4, width: "55%", color: "bg-green-400", total: 30 },
                  { star: 3, width: "30%", color: "bg-yellow-400", total: 10 },
                  { star: 2, width: "18%", color: "bg-orange-400", total: 5 },
                  { star: 1, width: "10%", color: "bg-red-400", total: 3 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-gray-900 dark:text-gray-100 w-3">{item.star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: item.width }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Positive & Negative Review Detection */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Review Sentiment</h3>
            </div>
            <div className="flex flex-col justify-center flex-1 mt-2 space-y-4">
              {/* Positive */}
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Positive</span>
                    <span className="text-[13px] font-semibold text-green-600 dark:text-green-400">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>

              {/* Negative */}
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] font-medium text-gray-900 dark:text-gray-100">Negative</span>
                    <span className="text-[13px] font-semibold text-red-500 dark:text-red-400">15%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center">
                Based on last 100 reviews
              </p>
            </div>
          </div>

          {/* Unanswered Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-[20px] border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:shadow-gray-900/30 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Unanswered Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                      G
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">Emily Davis</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        Please improve your service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300" />
                    <Star className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                    <Star className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 ml-2">3.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT REVIEWS + RIGHT COLUMN (Top Keywords) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Recent Reviews */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">Recent Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {[
                { name: "James Anderson", text: "Excellent service! Highly recommended.", rating: 5, status: "Replied", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
                { name: "Linda Martinez", text: "Good experience overall.", rating: 4, status: "Replied", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
                { name: "Robert Taylor", text: "Not satisfied with the support.", rating: 2, status: "Pending", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" },
                { name: "Patricia Brown", text: "Average experience.", rating: 3, status: "Replied", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" },
              ].map((item, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-[12px] font-semibold text-gray-900 dark:text-gray-100">
                      G
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">{item.name}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{item.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < item.rating ? "fill-yellow-400 dark:fill-yellow-300 text-yellow-400 dark:text-yellow-300" : "text-gray-300 dark:text-gray-600"}`} />
                      ))}
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Keywords */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">Top Keywords</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1 scrollbar-thin">
              {[
                { name: "Service", value: "45 (32%)", width: "80%" },
                { name: "Quality", value: "30 (21%)", width: "60%" },
                { name: "Support", value: "25 (18%)", width: "50%" },
                { name: "Experience", value: "20 (14%)", width: "40%" },
                { name: "Product", value: "10 (7%)", width: "25%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[12px] font-semibold text-blue-600 dark:text-blue-400 w-4">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-gray-900 dark:text-gray-100">{item.name}</span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">{item.value}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: item.width }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHARTS ROW: Review Analysis + Monthly History + Response Tracking */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Review Analysis – Simple Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Review Analysis</h3>
            <div className="flex items-end justify-between gap-1 flex-1 px-2">
              {[
                { month: "Jan", value: 35 },
                { month: "Feb", value: 45 },
                { month: "Mar", value: 30 },
                { month: "Apr", value: 60 },
                { month: "May", value: 50 },
                { month: "Jun", value: 70 },
              ].map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-1 flex-1">
                  <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-md relative" style={{ height: `${(item.value / 70) * 100}%` }}>
                    <div className="absolute inset-x-0 top-0 h-full bg-blue-500 dark:bg-blue-400 rounded-t-md opacity-80" style={{ height: `${(item.value / 70) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly History – Simple Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 mb-3">Monthly History</h3>
            <div className="flex-1 flex items-center justify-center relative">
              <svg viewBox="0 0 200 80" className="w-full h-full">
                <polyline
                  points="10,60 40,30 70,50 100,10 130,40 160,25 190,55"
                  fill="none"
                  className="stroke-indigo-500 dark:stroke-indigo-300"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="60" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="40" cy="30" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="70" cy="50" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="100" cy="10" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="130" cy="40" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="160" cy="25" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
                <circle cx="190" cy="55" r="2" className="fill-indigo-500 dark:fill-indigo-300" />
              </svg>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-gray-400 dark:text-gray-500">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          {/* Response Tracking */}
          <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/30 p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">Response Tracking</h3>
            </div>
            <div className="flex items-center justify-between mt-3 flex-1">
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-green-500 dark:border-green-400 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-gray-900 dark:text-gray-100 leading-none">128</h2>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">Replied</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">109 (85%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">Pending</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">19 (15%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div>
                    <p className="text-[12px] font-medium text-gray-900 dark:text-gray-100">No Reply</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">0 (0%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
