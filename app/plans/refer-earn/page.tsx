"use client";

import { 
  Eye, 
  MousePointer2, 
  Users, 
  Bug, 
  Copy, 
  Bell, 
  UserCircle2, 
  Calendar 
} from "lucide-react";

export default function ReferEarnPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-black px-6 py-6 font-sans">

      {/* TOP HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 text-white p-1.5 rounded-lg font-bold text-xl">R</div>
          <span className="text-2xl font-bold tracking-tight">ReferSync</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#fbfbfb]"></span>
          </div>
          <div className="w-9 h-9 bg-red-400 rounded-full flex items-center justify-center text-white font-bold">
            R
          </div>
        </div>
      </div>

      {/* MAIN GRID CONTAINER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN (2/3 Width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* 1. REFERRAL LINK CARD (GRADIENT BLUE) */}
          <div className="bg-gradient-to-br from-[#6f8dfc] via-[#708bfd] to-[#a48aff] rounded-2xl p-8 text-white relative overflow-hidden shadow-md">
            <h2 className="text-3xl font-semibold mb-2">Referral Link</h2>
            <p className="text-blue-100 text-sm mb-8">Share your link and earn rewards</p>

            <div className="flex flex-col md:flex-row gap-0 bg-white rounded-lg p-1.5 mb-8 shadow-md max-w-lg">
              <input
                type="text"
                defaultValue="https://refersync.app/r/RAHUL123"
                readOnly
                className="flex-1 bg-transparent text-gray-800 px-4 py-3 outline-none text-sm font-medium"
              />
              <button className="bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-5 py-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition">
                <Copy className="w-4 h-4" /> Copy Link
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-blue-100 text-xs font-medium mr-2">Share via</span>
              {/* Social Icons */}
              <div className="w-10 h-10 bg-[#25d366] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">W</div>
              <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">T</div>
              <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">f</div>
              <div className="w-10 h-10 bg-[#1da1f2] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">Tw</div>
              <div className="w-10 h-10 bg-white text-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">✉</div>
            </div>
          </div>

          {/* 2. MIDDLE STATS ROW (3 CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Impression */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Impression</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">12,450</span>
                {/* Blue Sparkline */}
                <svg viewBox="0 0 100 30" className="w-20 h-8">
                  <path d="M0,25 C20,20 30,25 50,22 C70,18 80,15 100,5" fill="none" stroke="#3b82f6" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Card 2: Click Rate */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <MousePointer2 className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm text-gray-500">Click Rate</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">8.45%</span>
                {/* Orange Sparkline */}
                <svg viewBox="0 0 100 30" className="w-20 h-8">
                  <path d="M0,25 C20,25 30,15 50,18 C70,20 80,10 100,12" fill="none" stroke="#f97316" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Card 3: Total Subscription */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-50 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Total Subscription</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">245</span>
                {/* Green Sparkline */}
                <svg viewBox="0 0 100 30" className="w-20 h-8">
                  <path d="M0,20 C20,22 30,18 50,20 C70,25 80,15 100,5" fill="none" stroke="#22c55e" strokeWidth="2" />
                </svg>
              </div>
            </div>

          </div>

          {/* 3. PERFORMANCE OVERVIEW TABLE */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="text-gray-800">📊</div> {/* Or use a chart icon */}
                <h3 className="text-lg font-bold text-gray-800">Performance Overview</h3>
              </div>
              <button className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> This Month <span className="text-gray-400 text-xs">▼</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-blue-50/80 text-blue-600 text-left p-3 text-sm font-medium rounded-tl-lg border-b border-gray-100">
                      <div className="flex items-center gap-2"><Eye className="w-4 h-4" /> Impression</div>
                    </th>
                    <th className="bg-orange-50/80 text-orange-600 text-left p-3 text-sm font-medium border-b border-gray-100">
                      <div className="flex items-center gap-2"><MousePointer2 className="w-4 h-4" /> Click Rate</div>
                    </th>
                    <th className="bg-green-50/80 text-green-600 text-left p-3 text-sm font-medium rounded-tr-lg border-b border-gray-100">
                      <div className="flex items-center gap-2"><Users className="w-4 h-4" /> Total Subscription</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    [12450, "8.45%", 245],
                    [9870, "7.32%", 187],
                    [7650, "6.91%", 154],
                    [6320, "5.48%", 123],
                    [5210, "4.99%", 98],
                  ].map((row, idx) => (
                    <tr key={idx} className={idx !== 4 ? "border-b border-gray-100" : ""}>
                      <td className="p-4 text-sm text-gray-600">{row[0].toLocaleString()}</td>
                      <td className="p-4 text-sm text-gray-600">{row[1]}</td>
                      <td className="p-4 text-sm text-gray-600">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3 Width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">

          {/* 1. WITHDRAW YOUR EARNINGS */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <div className="w-5 h-5 border-2 border-purple-600 rounded-md bg-white"></div> {/* Simple box svg style */}
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Withdraw Your Earnings</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Fill out the Google Form below when you want to withdraw your earnings.
            </p>
            <button className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition">
              Open Google Form <span className="text-sm">↗</span>
            </button>
            <p className="text-xs text-gray-400 mt-4">
              We will verify and process your withdrawal request.
            </p>
          </div>

          {/* 2. FOUND A BUG? */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Bug className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">Found a Bug?</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Help us improve by reporting any issues you face on the platform.
            </p>
            <button className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-between px-6 transition">
              Report Bug <span className="text-lg">›</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
