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

// Updated feature cards: removed Top 5 Keywords, kept Business Location (will span 2 columns)
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
    title: "Business Location",
    icon: MapPin,
    color: "bg-teal-100 text-teal-600",
    // This card will span 2 columns
    span: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Thin scrollbar styles */}
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
      `}</style>

      <div className="p-5 lg:p-7">
        {/* Topbar now only shows Date Range — Business Location card removed from Topbar */}
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
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
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
              <p className="text-[10px] text-green-600 leading-tight font-medium">
                Good response rate
              </p>
            </div>
          </div>
        </div>

        {/* 6 SMALL CARDS — height 80px (using xl:grid-cols-7, Business Location spans 2) */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mt-6">
          {featureCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white border border-[#e5e7eb] rounded-[18px] h-[80px] p-2 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-1 overflow-hidden ${
                  item.span ? "xl:col-span-2" : ""
                }`}
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

        {/* 3 DETAILED CARDS — Rating Overview, Low Rating Alerts, Unanswered Reviews */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Rating Overview – fixed 205px, no scroll */}
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] p-5 shadow-sm h-[205px] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-[#111827]">Rating Overview</h3>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-orange-400 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-[#111827] leading-none">128</h2>
                <p className="text-[10px] text-[#6b7280]">Total Reviews</p>
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
                    <span className="text-[11px] font-medium text-[#111827] w-3">{item.star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: item.width }}
                      />
                    </div>
                    <span className="text-[10px] text-[#6b7280]">{item.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Rating Alerts – 205px, sticky header, scrollable list */}
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] p-5 shadow-sm h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-[#111827]">Low Rating Alerts</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-[12px] font-semibold">
                      G
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#111827]">John Doe</h4>
                      <p className="text-[11px] text-[#6b7280] mt-1">Need improvement.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    <Star className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                    <span className="text-[11px] text-[#6b7280] ml-2">2.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unanswered Reviews – 205px, sticky header, scrollable list */}
          <div className="bg-white rounded-[20px] border border-[#e5e7eb] p-5 shadow-sm h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-[#111827]">Unanswered Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center text-[12px] font-semibold">
                      G
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#111827]">Emily Davis</h4>
                      <p className="text-[11px] text-[#6b7280] mt-1">
                        Please improve your service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                    <Star className="w-3.5 h-3.5 text-gray-300" />
                    <span className="text-[11px] text-[#6b7280] ml-2">3.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT REVIEWS + RIGHT COLUMN (Top Keywords) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* LEFT BIG CARD — Recent Reviews (sticky header, scrollable list, 205px) */}
          <div className="xl:col-span-2 bg-white rounded-[24px] border border-[#e5e7eb] shadow-sm p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-[#111827]">Recent Reviews</h3>
            </div>
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {[
                {
                  name: "James Anderson",
                  text: "Excellent service! Highly recommended.",
                  rating: 5,
                  status: "Replied",
                  color: "bg-green-100 text-green-700",
                },
                {
                  name: "Linda Martinez",
                  text: "Good experience overall.",
                  rating: 4,
                  status: "Replied",
                  color: "bg-green-100 text-green-700",
                },
                {
                  name: "Robert Taylor",
                  text: "Not satisfied with the support.",
                  rating: 2,
                  status: "Pending",
                  color: "bg-yellow-100 text-yellow-700",
                },
                {
                  name: "Patricia Brown",
                  text: "Average experience.",
                  rating: 3,
                  status: "Replied",
                  color: "bg-green-100 text-green-700",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[12px] font-semibold">
                      G
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#111827]">{item.name}</h4>
                      <p className="text-[11px] text-[#6b7280] mt-1">{item.text}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2 py-1 rounded-md ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN – Top Keywords (unchanged, still here as separate card) */}
          <div className="bg-white rounded-[24px] border border-[#e5e7eb] shadow-sm p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[15px] font-semibold text-[#111827]">Top Keywords</h3>
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
                  <span className="text-[12px] font-semibold text-blue-600 w-4">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-[#111827]">{item.name}</span>
                      <span className="text-[11px] text-[#6b7280]">{item.value}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: item.width }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEW FULL-WIDTH ROW: Review Analysis, Monthly History, Response Tracking */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7">
          {/* Review Analysis */}
          <div className="bg-white rounded-[24px] h-[205px] border border-[#e5e7eb] shadow-sm flex items-center justify-center">
            <h3 className="text-[17px] font-semibold text-[#111827]">Review Analysis</h3>
          </div>

          {/* Monthly History */}
          <div className="bg-white rounded-[24px] h-[205px] border border-[#e5e7eb] shadow-sm flex items-center justify-center">
            <h3 className="text-[17px] font-semibold text-[#111827]">Monthly History</h3>
          </div>

          {/* Response Tracking – 205px, wider layout */}
          <div className="bg-white rounded-[24px] border border-[#e5e7eb] shadow-sm p-5 h-[205px] flex flex-col">
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="text-[16px] font-semibold text-[#111827]">Response Tracking</h3>
            </div>
            <div className="flex items-center justify-between mt-3 flex-1">
              {/* Circle */}
              <div className="relative w-[90px] h-[90px] rounded-full border-[8px] border-green-500 flex flex-col items-center justify-center">
                <h2 className="text-[26px] font-bold text-[#111827] leading-none">128</h2>
                <p className="text-[10px] text-[#6b7280]">Total</p>
              </div>
              {/* Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div>
                    <p className="text-[12px] font-medium text-[#111827]">Replied</p>
                    <p className="text-[11px] text-[#6b7280]">109 (85%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div>
                    <p className="text-[12px] font-medium text-[#111827]">Pending</p>
                    <p className="text-[11px] text-[#6b7280]">19 (15%)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div>
                    <p className="text-[12px] font-medium text-[#111827]">No Reply</p>
                    <p className="text-[11px] text-[#6b7280]">0 (0%)</p>
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
