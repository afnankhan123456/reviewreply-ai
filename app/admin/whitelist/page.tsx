"use client";

import { useState, useEffect } from "react";
import { IndianRupee, Star } from "lucide-react";

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
  isWhitelisted: boolean;
}

export default function WhitelistPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWhitelistReferrals();
  }, []);

  const fetchWhitelistReferrals = async () => {
    try {
      const res = await fetch("/api/admin/whitelist-referrals");
      const data = await res.json();
      if (data.success) {
        setReferrals(data.referrals);
      }
    } catch (error) {
      console.error("Error fetching whitelist referrals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            ⭐ Whitelist Users
          </h1>
          <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {referrals.length} referrals
          </span>
        </div>

        {/* Referrals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 text-sm font-medium text-gray-600">#</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Type</th>
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
                    <td colSpan={11} className="text-center p-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : referrals.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center p-8 text-gray-500">
                      No whitelisted referrals yet
                    </td>
                  </tr>
                ) : (
                  referrals.map((ref, idx) => (
                    <tr key={ref.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600">{idx + 1}</td>
                      <td className="p-4 text-sm">
                        <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                          <Star className="w-3 h-3" /> Partner
                        </span>
                      </td>
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
    </div>
  );
}
