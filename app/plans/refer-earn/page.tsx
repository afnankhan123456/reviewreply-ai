"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Eye, 
  MousePointer2, 
  Users, 
  Bug, 
  Copy, 
  Calendar,
  Wallet
} from "lucide-react";

export default function ReferEarnPage() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New state for stats
  const [stats, setStats] = useState({
    impressions: 0,
    clicks: 0,
    subscriptions: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch referral code from API on page load
  useEffect(() => {
    async function fetchReferralCode() {
      try {
        const res = await fetch("/api/user/referral");
        const data = await res.json();

        if (res.ok && data.success) {
          setReferralCode(data.referralCode);
        } else {
          setError(data.error || "Failed to load referral code");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchReferralCode();
  }, []);

  // Fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/user/stats/monthly");
        const data = await res.json();

        if (res.ok && data.success) {
          setStats({
            impressions: data.impressions || 0,
            clicks: data.clicks || 0,
            subscriptions: data.subscriptions || 0
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setStatsLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Construct the full referral link
  const referralLink = referralCode ? `https://reviewreply-ai-pi.vercel.app/r/${referralCode}` : "";

  // Copy link function
  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-black px-6 py-6 font-sans">

      {/* TOP HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/afnankhan123456/reviewreply-ai/main/public/ai-logo.png" 
            alt="ReviewReply AI" 
            className="h-10 w-auto object-contain" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">ReviewReply AI</span>
            <span className="text-[10px] text-gray-500 -mt-0.5">AI Powered Review Management</span>
          </div>
        </div>
        <Link
          href="/plans"
          className="bg-white border border-gray-200 hover:border-indigo-400 px-5 py-2.5 rounded-2xl shadow-sm transition font-medium text-gray-700 w-fit"
        >
          Back
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-6">

        {/* ================= ROW 1 ================= */}
        
        {/* LEFT CARD */}
        <div className="lg:col-span-2 pr-[2px]">
          <div className="relative bg-gradient-to-br from-[#4f46e5] via-[#6f8dfc] to-[#a48aff] rounded-2xl p-8 text-white overflow-hidden shadow-md h-[350px]">
            
            {/* Glow Effect Layers */}
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#c084fc] rounded-full blur-[60px] opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#818cf8] rounded-full blur-[50px] opacity-40 pointer-events-none"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold mb-2">Referral Link</h2>
              <p className="text-blue-100 text-sm mb-6">Share your link and earn rewards</p>

              <div className="flex flex-col md:flex-row gap-0 bg-white rounded-lg p-1.5 mb-6 shadow-md max-w-lg">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-transparent text-gray-800 px-4 py-3 outline-none text-sm font-medium"
                  placeholder={loading ? "Loading..." : "No referral link available"}
                />
                <button 
                  onClick={handleCopy}
                  className="bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-5 py-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition"
                >
                  <Copy className="w-4 h-4" /> Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1 -ml-[2px] flex flex-col gap-6 h-full">
          
          {/* CARD 1: Withdraw */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[163.5px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Wallet className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800">Withdraw Your Earnings</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-1">
                Fill out the Google Form below to withdraw your earnings.
              </p>
            </div>
            <div>
              <button className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition">
                Open Google Form <span className="text-sm">↗</span>
              </button>
              <p className="text-[10px] text-gray-400 mt-0">
                We will verify your request.
              </p>
            </div>
          </div>

          {/* CARD 2: Found a Bug */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[162.5px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-purple-50 p-2 rounded-lg">
                  <Bug className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800">Found a Bug?</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-1">
                Report any issues you face on the platform.
              </p>
            </div>
            <button className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-between px-6 transition">
              Report Bug <span className="text-lg">›</span>
            </button>
          </div>

        </div>
        {/* ================= ROW 1 END ================= */}


        {/* ================= ROW 2 (TABLE ONLY) ================= */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="text-gray-800">📊</div>
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
                  [stats.impressions, stats.clicks, stats.subscriptions]
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "Loading..." : row[0].toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "Loading..." : row[1].toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "Loading..." : row[2].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* ================= ROW 2 END ================= */}

      </div>
    </div>
  );
}



