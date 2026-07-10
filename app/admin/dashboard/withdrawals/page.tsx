"use client";

import { useState, useEffect } from "react";
import { Search, Filter, IndianRupee } from "lucide-react";

interface Withdrawal {
  _id: string;
  email: string;
  upiId: string;
  name: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

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
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async (email?: string, month?: string) => {
    setLoading(true);
    try {
      let url = "/api/admin/withdrawals";
      const params = new URLSearchParams();
      
      if (email) params.append("email", email);
      if (month !== undefined && month !== "") params.append("month", month);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setWithdrawals(data.withdrawals);
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailFilter = () => {
    fetchWithdrawals(emailFilter, monthFilter);
  };

  const handleMonthFilter = (month: string) => {
    setMonthFilter(month);
    fetchWithdrawals(emailFilter, month);
  };

  const clearFilters = () => {
    setEmailFilter("");
    setMonthFilter("");
    fetchWithdrawals();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-blue-100 text-blue-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user withdrawal requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-end gap-4">
          {/* Email Filter */}
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Search by Email</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Search email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-purple-500"
                  onKeyDown={(e) => e.key === "Enter" && handleEmailFilter()}
                />
              </div>
              <button
                onClick={handleEmailFilter}
                className="bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Month Filter */}
          <div className="min-w-[180px]">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Filter by Month</label>
            <select
              value={monthFilter}
              onChange={(e) => handleMonthFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline pb-2.5"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">UPI ID</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : withdrawals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-gray-500">
                    No withdrawal requests found
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-700">{withdrawal.email}</td>
                    <td className="p-4 text-sm text-gray-700 font-medium">{withdrawal.name}</td>
                    <td className="p-4 text-sm text-gray-700">{withdrawal.upiId}</td>
                    <td className="p-4 text-sm text-gray-700">{withdrawal.phoneNumber}</td>
                    <td className="p-4 text-sm text-gray-700">
                      {new Date(withdrawal.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                        {withdrawal.status}
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
  );
}
