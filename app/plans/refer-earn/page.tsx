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
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Check
} from "lucide-react";

interface WithdrawalStatus {
  id: string;
  email: string;
  upiId: string;
  name: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

interface BugStatus {
  id: string;
  feature: string;
  issueType: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function ReferEarnPage() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
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

  const [withdrawals, setWithdrawals] = useState<WithdrawalStatus[]>([]);
  const [bugs, setBugs] = useState<BugStatus[]>([]);
  const [statusLoading, setStatusLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusTab, setStatusTab] = useState<"withdrawals" | "bugs">("withdrawals");

  const [selectedMonth, setSelectedMonth] = useState("");

  const months = [
    { value: "0", label: "January" },
    { value: "1", label: "February" },
    { value: "2", label: "March" },
    { value: "3", label: "April" },
    { value: "4", label: "May" },
    { value: "5", label: "June" },
    { value: "6", label: "July" },
    { value: "7", label: "August" },
    { value: "8", label: "September" },
    { value: "9", label: "October" },
    { value: "10", label: "November" },
    { value: "11", label: "December" },
  ];

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

  const fetchStats = async (month?: string) => {
    setStatsLoading(true);
    try {
      let url = "/api/user/stats/monthly";
      if (month) {
        url += `?month=${month}`;
      }
      const res = await fetch(url);
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
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStatuses = async () => {
    setStatusLoading(true);
    try {
      const [withRes, bugRes] = await Promise.all([
        fetch("/api/user/withdrawal-status"),
        fetch("/api/user/bug-status"),
      ]);
      
      const withData = await withRes.json();
      const bugData = await bugRes.json();
      
      if (withData.success) setWithdrawals(withData.withdrawals);
      if (bugData.success) setBugs(bugData.bugs);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    } finally {
      setStatusLoading(false);
    }
  };

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending": return <Clock className="w-4 h-4 text-amber-400" />;
      case "Approved": return <CheckCircle className="w-4 h-4 text-sky-400" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-400" />;
      case "Paid": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "Open": return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "Resolved": return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "Closed": return <XCircle className="w-4 h-4 text-zinc-500" />;
      default: return <Clock className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-zinc-100 px-4 md:px-8 py-8 font-sans relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/afnankhan123456/reviewreply-ai/main/public/ai-logo.png" 
            alt="ReviewReply AI" 
            className="h-9 w-auto object-contain" 
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white">ReviewReply AI</span>
            <span className="text-[10px] text-zinc-500 -mt-0.5">AI Powered Review Management</span>
          </div>
        </div>
        <Link
          href="/plans"
          className="bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/10 px-5 py-2.5 rounded-xl transition font-medium text-zinc-300 text-sm w-fit backdrop-blur-sm"
        >
          ← Back
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-6 relative z-10">

        {/* Referral Link Hero Card */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-[#111318] via-[#14171d] to-[#0d1512] rounded-3xl p-8 overflow-hidden border border-emerald-500/20 shadow-[0_0_60px_-20px_rgba(16,185,129,0.3)] h-[350px]">
            <div className="absolute top-[-60px] right-[-40px] w-[220px] h-[220px] bg-emerald-500/20 rounded-full blur-[70px] pointer-events-none"></div>
            <div className="absolute bottom-[-60px] left-[-40px] w-[180px] h-[180px] bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-4">
                <Sparkles size={12} className="text-emerald-400" />
                <span className="text-[10px] font-semibold tracking-widest text-emerald-300">REFERRAL PROGRAM</span>
              </div>

              <h2 className="text-3xl font-bold mb-2 text-white">Your Referral Link</h2>
              <p className="text-zinc-400 text-sm mb-6">Share your link and earn ₹100 per paid signup</p>

              <div className="flex flex-col md:flex-row gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 mb-6 max-w-lg backdrop-blur-sm">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="flex-1 bg-transparent text-zinc-200 px-4 py-3 outline-none text-sm font-medium placeholder-zinc-600" 
                  placeholder={loading ? "Loading..." : "No referral link available"} 
                />
                <button 
                  onClick={handleCopy} 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              <div className="bg-black/30 rounded-xl p-4 max-w-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-amber-400" />
                    <span className="text-zinc-300 text-sm">Total Earnings</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">₹{statsLoading ? "..." : stats.totalEarnings.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => { setShowStatusModal(true); fetchStatuses(); }}
                className="mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              >
                <Clock className="w-4 h-4" /> View Your Status
              </button>
            </div>
          </div>
        </div>

        {/* Right Column Cards */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          <div className="bg-[#111318] rounded-2xl border border-white/10 p-5 h-[163.5px] flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Withdraw Earnings</h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-1">Fill out the form to withdraw your earnings.</p>
            </div>
            <div>
              <Link 
                href="/plans/refer-earn/withdraw" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition"
              >
                Open Form <ArrowUpRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-zinc-600 mt-1.5">We will verify your request.</p>
            </div>
          </div>

          <div className="bg-[#111318] rounded-2xl border border-white/10 p-5 h-[162.5px] flex flex-col justify-between hover:border-amber-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg">
                  <Bug className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Found a Bug?</h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-1">Report any issues you face on the platform.</p>
            </div>
            <button 
              onClick={() => setShowBugModal(true)} 
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 py-3 rounded-lg font-medium text-sm flex items-center justify-between px-5 transition"
            >
              Report Bug <span className="text-lg">›</span>
            </button>
          </div>
        </div>

        {/* Performance Overview Table */}
        <div className="lg:col-span-3 bg-[#111318] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <h3 className="text-lg font-bold text-white">Performance Overview</h3>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                fetchStats(e.target.value);
              }}
              className="border border-white/10 bg-white/5 rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 outline-none focus:border-emerald-500/50"
            >
              <option value="" className="bg-[#111318]">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value} className="bg-[#111318]">
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-sky-500/10 text-sky-400 text-left p-3 text-sm font-medium rounded-tl-lg border-b border-white/5">
                    <div className="flex items-center gap-2"><MousePointer2 className="w-4 h-4" />Referral Clicks</div>
                  </th>
                  <th className="bg-orange-500/10 text-orange-400 text-left p-3 text-sm font-medium border-b border-white/5">
                    <div className="flex items-center gap-2"><UserPlus className="w-4 h-4" />Google Signups</div>
                  </th>
                  <th className="bg-emerald-500/10 text-emerald-400 text-left p-3 text-sm font-medium border-b border-white/5">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" />Paid Subscriptions</div>
                  </th>
                  <th className="bg-violet-500/10 text-violet-400 text-left p-3 text-sm font-medium border-b border-white/5">
                    <div className="flex items-center gap-2"><Eye className="w-4 h-4" />Conversion Rate</div>
                  </th>
                  <th className="bg-amber-500/10 text-amber-400 text-left p-3 text-sm font-medium rounded-tr-lg border-b border-white/5">
                    <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4" />Total Earnings</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[[stats.referralClicks, stats.googleSignups, stats.paidSubscriptions, `${stats.conversionRate}%`, `₹${stats.totalEarnings.toLocaleString()}`]].map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 text-sm text-zinc-300">{statsLoading ? "..." : row[0].toLocaleString()}</td>
                    <td className="p-4 text-sm text-zinc-300">{statsLoading ? "..." : row[1].toLocaleString()}</td>
                    <td className="p-4 text-sm text-zinc-300">{statsLoading ? "..." : row[2].toLocaleString()}</td>
                    <td className="p-4 text-sm text-zinc-300">{statsLoading ? "..." : row[3]}</td>
                    <td className="p-4 text-sm font-semibold text-amber-400">{statsLoading ? "..." : row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">📋 Your Status</h2>
              <button onClick={() => setShowStatusModal(false)}>
                <X className="w-5 h-5 text-zinc-500 hover:text-zinc-300" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setStatusTab("withdrawals")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusTab === "withdrawals"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                💰 Withdrawals
              </button>
              <button
                onClick={() => setStatusTab("bugs")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  statusTab === "bugs"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                🐛 Bug Reports
              </button>
            </div>

            {statusLoading ? (
              <p className="text-center text-zinc-500 py-8">Loading...</p>
            ) : statusTab === "withdrawals" ? (
              withdrawals.length === 0 ? (
                <p className="text-center text-zinc-500 py-8">No withdrawal requests yet</p>
              ) : (
                <div className="space-y-3">
                  {withdrawals.map((w) => (
                    <div key={w.id} className="border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-zinc-200">{w.name}</p>
                          <p className="text-sm text-zinc-500">{w.upiId}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(w.status)}
                          <span className={`text-sm font-medium ${
                            w.status === "Approved" || w.status === "Paid" ? "text-emerald-400" :
                            w.status === "Rejected" ? "text-red-400" : "text-amber-400"
                          }`}>{w.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 mt-2">
                        {new Date(w.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              )
            ) : (
              bugs.length === 0 ? (
                <p className="text-center text-zinc-500 py-8">No bug reports yet</p>
              ) : (
                <div className="space-y-3">
                  {bugs.map((b) => (
                    <div key={b.id} className="border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-zinc-200">{b.feature}</p>
                          <p className="text-sm text-zinc-500">{b.issueType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(b.status)}
                          <span className={`text-sm font-medium ${
                            b.status === "Resolved" ? "text-emerald-400" :
                            b.status === "Closed" ? "text-zinc-500" : "text-amber-400"
                          }`}>{b.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">{b.description}</p>
                      <p className="text-xs text-zinc-600 mt-2">
                        {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {showBugModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111318] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">🐛 Report a Bug</h2>
              <button onClick={() => setShowBugModal(false)}>
                <X className="w-5 h-5 text-zinc-500 hover:text-zinc-300" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-1">Which feature has the issue? *</label>
              <select 
                value={bugFeature} 
                onChange={(e) => { setBugFeature(e.target.value); if(e.target.value !== "Other") setBugOtherFeature(""); }} 
                className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 text-zinc-200"
              >
                <option value="" className="bg-[#111318]">-- Select feature --</option>
                <option value="Referral System" className="bg-[#111318]">Referral System</option>
                <option value="Dashboard" className="bg-[#111318]">Dashboard</option>
                <option value="Review Management" className="bg-[#111318]">Review Management</option>
                <option value="Login/Auth" className="bg-[#111318]">Login/Auth</option>
                <option value="Payment" className="bg-[#111318]">Payment</option>
                <option value="Other" className="bg-[#111318]">Other</option>
              </select>
              {bugFeature === "Other" && (
                <input 
                  type="text" 
                  value={bugOtherFeature} 
                  onChange={(e) => setBugOtherFeature(e.target.value)} 
                  placeholder="Please specify the feature" 
                  className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 text-zinc-200 placeholder-zinc-600 mt-2" 
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-1">What type of problem is it? *</label>
              <select 
                value={bugIssueType} 
                onChange={(e) => { setBugIssueType(e.target.value); if(e.target.value !== "Other") setBugOtherType(""); }} 
                className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 text-zinc-200"
              >
                <option value="" className="bg-[#111318]">-- Select issue type --</option>
                <option value="Bug" className="bg-[#111318]">Bug</option>
                <option value="UI/UX Issue" className="bg-[#111318]">UI/UX Issue</option>
                <option value="Performance" className="bg-[#111318]">Performance</option>
                <option value="Feature Request" className="bg-[#111318]">Feature Request</option>
                <option value="Other" className="bg-[#111318]">Other</option>
              </select>
              {bugIssueType === "Other" && (
                <input 
                  type="text" 
                  value={bugOtherType} 
                  onChange={(e) => setBugOtherType(e.target.value)} 
                  placeholder="Please specify the issue type" 
                  className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 text-zinc-200 placeholder-zinc-600 mt-2" 
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-300 mb-1">Description *</label>
              <textarea 
                value={bugDescription} 
                onChange={(e) => setBugDescription(e.target.value)} 
                placeholder="Describe the issue..." 
                rows={4} 
                className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-emerald-500/50 text-zinc-200 placeholder-zinc-600 resize-none" 
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowBugModal(false)} 
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-white/5 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleBugSubmit} 
                disabled={bugSubmitting} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 transition"
              >
                {bugSubmitting ? "Sending..." : "Send Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
