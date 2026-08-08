"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users as UsersIcon,
  CheckCircle,
  XCircle,
  Clock,
  Link2,
  Search,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  subscriptionStatus: string;
  subscriptionEnd: string | null;
  daysLeft: number | null;
  statusLabel: string;
  hasEverPaid: boolean;
  totalPayments: number;
  googleConnected: boolean;
  gmailConnected: boolean;
  syncEnabled: boolean;
  autoReplyMode: string;
  reviewsUsed: number;
  reviewsLimit: number;
  aiRepliesUsed: number;
  aiRepliesLimit: number;
  referralClicks: number;
  referralSignups: number;
  referralPaidConversions: number;
  teamMembersCount: number;
  createdAt: string;
  lastLogin: string;
}

interface Summary {
  total: number;
  activePaid: number;
  expired: number;
  loginOnly: number;
  googleConnected: number;
  usingReferral: number;
}

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setSummary(data.summary);
        }
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || u.statusLabel === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const fmtDate = (d: string | null) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const statusColor = (label: string) => {
    if (label === "Active paid") return "bg-green-50 text-green-700 border-green-200";
    if (label === "Expired") return "bg-red-50 text-red-700 border-red-200";
    if (label === "Login only (never paid)")
      return "bg-gray-100 text-gray-600 border-gray-200";
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          👥 Admin Dashboard — All Users
        </h1>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {[
              { label: "Total Users", value: summary.total, icon: UsersIcon, color: "text-blue-600" },
              { label: "Active Paid", value: summary.activePaid, icon: CheckCircle, color: "text-green-600" },
              { label: "Expired", value: summary.expired, icon: XCircle, color: "text-red-600" },
              { label: "Login Only", value: summary.loginOnly, icon: Clock, color: "text-gray-500" },
              { label: "Google Connected", value: summary.googleConnected, icon: Link2, color: "text-purple-600" },
              { label: "Using Referral", value: summary.usingReferral, icon: UsersIcon, color: "text-indigo-600" },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                  <span className="text-xs text-gray-500">{card.label}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="Active paid">Active Paid</option>
            <option value="Expired">Expired</option>
            <option value="Login only (never paid)">Login Only</option>
            <option value="Paid (inactive)">Paid (Inactive)</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3 font-medium text-gray-600">User</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Plan</th>
                  <th className="text-left p-3 font-medium text-gray-600">Expires</th>
                  <th className="text-left p-3 font-medium text-gray-600">Google</th>
                  <th className="text-left p-3 font-medium text-gray-600">Gmail</th>
                  <th className="text-left p-3 font-medium text-gray-600">Auto-Reply</th>
                  <th className="text-left p-3 font-medium text-gray-600">Reviews Used</th>
                  <th className="text-left p-3 font-medium text-gray-600">AI Replies</th>
                  <th className="text-left p-3 font-medium text-gray-600">Referral</th>
                  <th className="text-left p-3 font-medium text-gray-600">Team</th>
                  <th className="text-left p-3 font-medium text-gray-600">Joined</th>
                  <th className="text-left p-3 font-medium text-gray-600">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={13} className="text-center p-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center p-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-gray-800">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs border ${statusColor(
                            u.statusLabel
                          )}`}
                        >
                          {u.statusLabel}
                        </span>
                      </td>
                      <td className="p-3 capitalize text-gray-700">{u.plan}</td>
                      <td className="p-3 text-gray-600">
                        {fmtDate(u.subscriptionEnd)}
                        {u.daysLeft !== null && u.daysLeft > 0 && (
                          <span className="text-xs text-gray-400 block">
                            {u.daysLeft} days left
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {u.googleConnected ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                      </td>
                      <td className="p-3">
                        {u.gmailConnected ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                      </td>
                      <td className="p-3 capitalize text-gray-600">{u.autoReplyMode}</td>
                      <td className="p-3 text-gray-600">
                        {u.reviewsUsed}/{u.reviewsLimit}
                      </td>
                      <td className="p-3 text-gray-600">
                        {u.aiRepliesUsed}/{u.aiRepliesLimit}
                      </td>
                      <td className="p-3 text-gray-600">
                        {u.referralSignups > 0 || u.referralClicks > 0 ? (
                          <span className="text-xs">
                            {u.referralClicks} clicks / {u.referralSignups} signups /{" "}
                            {u.referralPaidConversions} paid
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="p-3 text-gray-600">{u.teamMembersCount}</td>
                      <td className="p-3 text-gray-500 text-xs">{fmtDate(u.createdAt)}</td>
                      <td className="p-3 text-gray-500 text-xs">{fmtDate(u.lastLogin)}</td>
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
