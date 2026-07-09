"use client";

import { useState, useEffect } from "react";
import { CheckCircle, IndianRupee, RefreshCw, Filter } from "lucide-react";

interface Referral {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referrerCode: string;
  referredUserName: string;
  referredUserEmail: string;
  signupDate: string;
  hasSubscription: boolean;
  plan: string;
  commission: number;
  paidSubscriptions: number;
  totalEarnings: number;
}

export default function AdminReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 👇 New states
  const [filter, setFilter] = useState<"all" | "subscribed" | "not-subscribed">("all");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const res = await fetch("/api/admin/referrals");
      const data = await res.json();
      if (data.success) {
        setReferrals(data.referrals);
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Filter logic
  const filteredReferrals = referrals.filter((r) => {
    if (filter === "subscribed") return r.hasSubscription;
    if (filter === "not-subscribed") return !r.hasSubscription;
    return true; // "all"
  });

  // 👇 Reset earnings function
  const handleResetEarnings = async () => {
    if (!resetEmail.trim()) {
      alert("Please enter referrer email");
      return;
    }

    if (!confirm(`Reset earnings for ${resetEmail}?`)) return;

    setResetting(true);
    try {
      const res = await fetch("/api/admin/reset-earnings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        alert(`✅ Earnings reset for ${resetEmail}!`);
        setResetEmail("");
        setShowResetModal(false);
        fetchReferrals();
      } else {
        alert(data.error || "Failed to reset earnings");
      }
    } catch (error) {
      console.error("Error resetting earnings:", error);
      alert("Error resetting earnings");
    } finally {
      setResetting(false);
    }
  };

  // Calculate pending commissions
  const pendingReferrals = referrals.filter(
    (r) => r.hasSubscription && r.paidSubscriptions > 0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🔗 Referral Tracking
        </h1>

        {/* 👇 Filter & Reset Buttons */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          {/* Filter */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="text-sm font-medium text-gray-700 bg-transparent outline-none"
            >
              <option value="all">All Referrals</option>
              <option value="subscribed">✅ Subscribed</option>
              <option value="not-subscribed">❌ Not Subscribed</option>
            </select>
          </div>

          {/* Reset Earnings Button */}
          <button
            onClick={() => setShowResetModal(true)}
            className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" /> Reset User Earnings
          </button>
        </div>

        {/* Pending Commissions Alert */}
        {pendingReferrals.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Pending Commissions: {pendingReferrals.length}
            </h2>
            <div className="flex flex-wrap gap-2">
              {pendingReferrals.map((r) => (
                <span
                  key={r.id}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                >
                  {r.referrerName} - ₹{r.totalEarnings}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Referrals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 text-sm font-medium text-gray-600">#</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Referrer</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Referrer Email</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Referred User</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Signup Email</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Subscription</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Plan</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Commission</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="text-center p-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center p-8 text-gray-500">
                      No referrals found
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((ref, idx) => (
                    <tr key={ref.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600">{idx + 1}</td>
                      <td className="p-4 text-sm font-medium text-gray-800">
                        {ref.referrerName}
                      </td>
                      <td className="p-4 text-sm text-gray-600">{ref.referrerEmail}</td>
                      <td className="p-4 text-sm text-gray-800">{ref.referredUserName}</td>
                      <td className="p-4 text-sm text-gray-600">{ref.referredUserEmail}</td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(ref.signupDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="p-4 text-sm">
                        {ref.hasSubscription ? (
                          <span className="text-green-600 font-medium">✅ Yes</span>
                        ) : (
                          <span className="text-gray-400">❌ No</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600 capitalize">{ref.plan}</td>
                      <td className="p-4 text-sm font-medium">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {ref.commission}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-semibold text-yellow-600">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {ref.totalEarnings.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 👇 Reset Earnings Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Reset User Earnings</h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter referrer email to reset their earnings to ₹0
            </p>
            
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter referrer email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-4 outline-none focus:border-blue-500"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowResetModal(false);
                  setResetEmail("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetEarnings}
                disabled={resetting}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                {resetting ? "Resetting..." : "Reset Earnings"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
