"use client";

import { useState, useEffect } from "react";
import { CheckCircle, IndianRupee } from "lucide-react";

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

  const handleMarkPaid = async (referrerId: string) => {
    if (!confirm("Mark as paid and reset earnings to ₹0?")) return;

    try {
      const res = await fetch("/api/admin/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referrerId }),
      });
      const data = await res.json();

      if (data.success) {
        alert("✅ Payment marked as paid!");
        fetchReferrals(); // Refresh table
      }
    } catch (error) {
      console.error("Error marking as paid:", error);
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
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="text-center p-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : referrals.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center p-8 text-gray-500">
                      No referrals yet
                    </td>
                  </tr>
                ) : (
                  referrals.map((ref, idx) => (
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
                      <td className="p-4">
                        {ref.paidSubscriptions > 0 ? (
                          <button
                            onClick={() => handleMarkPaid(ref.referrerEmail)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" /> Mark Paid
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
