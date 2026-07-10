"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Eye, 
  MousePointer2, 
  Users, 
  UserPlus,
  Bug, 
  Copy, 
  Calendar,
  Wallet,
  IndianRupee,
  X
} from "lucide-react";

export default function ReferEarnPage() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState({
    referralClicks: 0,
    googleSignups: 0,
    paidSubscriptions: 0,
    conversionRate: 0,
    totalEarnings: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  const [showBugModal, setShowBugModal] = useState(false);
  const [bugFeature, setBugFeature] = useState("");
  const [bugIssueType, setBugIssueType] = useState("");
  const [bugOtherFeature, setBugOtherFeature] = useState("");
  const [bugOtherType, setBugOtherType] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugSubmitting, setBugSubmitting] = useState(false);

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

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/user/stats/monthly");
        const data = await res.json();
        if (res.ok && data.success) {
          setStats({
            referralClicks: data.referralClicks || 0,
            googleSignups: data.googleSignups || 0,
            paidSubscriptions: data.paidSubscriptions || 0,
            conversionRate: data.conversionRate || 0,
            totalEarnings: (data.paidSubscriptions || 0) * 100,
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

  const handleBugSubmit = async () => {
    const finalFeature = bugFeature === "Other" ? bugOtherFeature : bugFeature;
    const finalIssueType = bugIssueType === "Other" ? bugOtherType : bugIssueType;

    if (!bugFeature || !bugIssueType || !bugDescription.trim()) {
      alert("Please fill all required fields");
      return;
    }
    if (bugFeature === "Other" && !bugOtherFeature.trim()) {
      alert("Please specify the feature");
      return;
    }
    if (bugIssueType === "Other" && !bugOtherType.trim()) {
      alert("Please specify the issue type");
      return;
    }

    setBugSubmitting(true);
    try {
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          feature: finalFeature,
          issueType: finalIssueType,
          description: bugDescription 
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Bug reported successfully!");
        setShowBugModal(false);
        setBugFeature("");
        setBugIssueType("");
        setBugOtherFeature("");
        setBugOtherType("");
        setBugDescription("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error submitting bug report");
    } finally {
      setBugSubmitting(false);
    }
  };

  const referralLink = referralCode ? `https://reviewreply-ai-pi.vercel.app/r/${referralCode}` : "";

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-black px-6 py-6 font-sans">

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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-6">

        <div className="lg:col-span-2 pr-[2px]">
          <div className="relative bg-gradient-to-br from-[#4f46e5] via-[#6f8dfc] to-[#a48aff] rounded-2xl p-8 text-white overflow-hidden shadow-md h-[350px]">
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#c084fc] rounded-full blur-[60px] opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] bg-[#818cf8] rounded-full blur-[50px] opacity-40 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-semibold mb-2">Referral Link</h2>
              <p className="text-blue-100 text-sm mb-6">Share your link and earn rewards</p>
              <div className="flex flex-col md:flex-row gap-0 bg-white rounded-lg p-1.5 mb-6 shadow-md max-w-lg">
                <input type="text" value={referralLink} readOnly className="flex-1 bg-transparent text-gray-800 px-4 py-3 outline-none text-sm font-medium" placeholder={loading ? "Loading..." : "No referral link available"} />
                <button onClick={handleCopy} className="bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-5 py-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition"><Copy className="w-4 h-4" /> Copy Link</button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-lg border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><IndianRupee className="w-5 h-5 text-yellow-300" /><span className="text-white/90 text-sm">Total Earnings</span></div>
                  <span className="text-2xl font-bold text-yellow-300">₹{statsLoading ? "..." : stats.totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 -ml-[2px] flex flex-col gap-6 h-full">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[163.5px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1"><div className="bg-purple-50 p-2 rounded-lg"><Wallet className="w-5 h-5 text-purple-600" /></div><h3 className="font-semibold text-lg text-gray-800">Withdraw Your Earnings</h3></div>
              <p className="text-xs text-gray-500 leading-relaxed mb-1">Fill out the form to withdraw your earnings.</p>
            </div>
            <div>
              <Link href="/plans/refer-earn/withdraw" className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition">
                Open Form <span className="text-sm">↗</span>
              </Link>
              <p className="text-[10px] text-gray-400 mt-0">We will verify your request.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[162.5px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1"><div className="bg-purple-50 p-2 rounded-lg"><Bug className="w-5 h-5 text-purple-600" /></div><h3 className="font-semibold text-lg text-gray-800">Found a Bug?</h3></div>
              <p className="text-xs text-gray-500 leading-relaxed mb-1">Report any issues you face on the platform.</p>
            </div>
            <button onClick={() => setShowBugModal(true)} className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-between px-6 transition">Report Bug <span className="text-lg">›</span></button>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2"><div className="text-gray-800">📊</div><h3 className="text-lg font-bold text-gray-800">Performance Overview</h3></div>
            <button className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-600 flex items-center gap-2"><Calendar className="w-4 h-4" /> This Month <span className="text-gray-400 text-xs">▼</span></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-blue-50/80 text-blue-600 text-left p-3 text-sm font-medium rounded-tl-lg border-b border-gray-100"><div className="flex items-center gap-2"><MousePointer2 className="w-4 h-4" />Referral Clicks</div></th>
                  <th className="bg-orange-50/80 text-orange-600 text-left p-3 text-sm font-medium border-b border-gray-100"><div className="flex items-center gap-2"><UserPlus className="w-4 h-4" />Google Signups</div></th>
                  <th className="bg-green-50/80 text-green-600 text-left p-3 text-sm font-medium border-b border-gray-100"><div className="flex items-center gap-2"><Users className="w-4 h-4" />Paid Subscriptions</div></th>
                  <th className="bg-purple-50/80 text-purple-600 text-left p-3 text-sm font-medium border-b border-gray-100"><div className="flex items-center gap-2"><Eye className="w-4 h-4" />Conversion Rate</div></th>
                  <th className="bg-yellow-50/80 text-yellow-600 text-left p-3 text-sm font-medium rounded-tr-lg border-b border-gray-100"><div className="flex items-center gap-2"><IndianRupee className="w-4 h-4" />Total Earnings</div></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[[stats.referralClicks, stats.googleSignups, stats.paidSubscriptions, `${stats.conversionRate}%`, `₹${stats.totalEarnings.toLocaleString()}`]].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "..." : row[0].toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "..." : row[1].toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "..." : row[2].toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-600">{statsLoading ? "..." : row[3]}</td>
                    <td className="p-4 text-sm font-semibold text-yellow-600">{statsLoading ? "..." : row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showBugModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">🐛 Report a Bug</h2>
              <button onClick={() => setShowBugModal(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Which feature has the issue? *</label>
              <select value={bugFeature} onChange={(e) => { setBugFeature(e.target.value); if(e.target.value !== "Other") setBugOtherFeature(""); }} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500">
                <option value="">-- Select feature --</option>
                <option value="Referral System">Referral System</option>
                <option value="Dashboard">Dashboard</option>
                <option value="Review Management">Review Management</option>
                <option value="Login/Auth">Login/Auth</option>
                <option value="Payment">Payment</option>
                <option value="Other">Other</option>
              </select>
              {bugFeature === "Other" && (
                <input type="text" value={bugOtherFeature} onChange={(e) => setBugOtherFeature(e.target.value)} placeholder="Please specify the feature" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500 mt-2" />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">What type of problem is it? *</label>
              <select value={bugIssueType} onChange={(e) => { setBugIssueType(e.target.value); if(e.target.value !== "Other") setBugOtherType(""); }} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500">
                <option value="">-- Select issue type --</option>
                <option value="Bug">Bug</option>
                <option value="UI/UX Issue">UI/UX Issue</option>
                <option value="Performance">Performance</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
              {bugIssueType === "Other" && (
                <input type="text" value={bugOtherType} onChange={(e) => setBugOtherType(e.target.value)} placeholder="Please specify the issue type" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500 mt-2" />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea value={bugDescription} onChange={(e) => setBugDescription(e.target.value)} placeholder="Describe the issue..." rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500 resize-none" />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowBugModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleBugSubmit} disabled={bugSubmitting} className="bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50">{bugSubmitting ? "Sending..." : "Send Report"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



