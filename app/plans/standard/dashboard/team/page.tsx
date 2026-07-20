"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, Trash2, Copy, Check } from "lucide-react";
import {
  getTeamData,
  inviteTeamMember,
  updateMemberAccess,
  removeTeamMember,
} from "./actions";

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [membersLimit, setMembersLimit] = useState(2);

  const [email, setEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState<"FULL_ACCESS" | "VIEW_ONLY">("VIEW_ONLY");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-200";
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const bgSubCard = theme === "light" ? "bg-gray-50 border-gray-200" : "bg-[#181D27] border-[#2A303C]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-500" : "text-gray-500";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500" : "bg-[#181D27] border-[#2A303C] text-white placeholder-gray-500 focus:border-indigo-500";
  const selectBg = theme === "light" ? "bg-white border-gray-300 text-gray-900 focus:border-indigo-500" : "bg-[#181D27] border-[#2A303C] text-white focus:border-indigo-500";
  const memberCardBorder = theme === "light" ? "border-gray-200" : "border-[#1F2430]";
  const copyButtonBg = theme === "light" ? "bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900" : "bg-[#181D27] border-[#2A303C] text-gray-400 hover:text-white";
  const trashButtonBg = theme === "light" ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-red-600/20 text-red-400 hover:bg-red-600/30";
  const warningText = "text-yellow-400"; // keep accent

  const loadData = async () => {
    setLoading(true);
    const result = await getTeamData();
    if (result.success) {
      setMembers(result.members || []);
      setMembersLimit(result.membersLimit ?? 2);
      setAccessDenied(false);
    } else {
      setAccessDenied(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInvite = async () => {
    setError(null);
    setInviting(true);
    const result = await inviteTeamMember(email, accessLevel);
    if (result.success) {
      setEmail("");
      await loadData();
      if (result.inviteLink) {
        navigator.clipboard?.writeText(result.inviteLink);
        setError(null);
      }
    } else {
      setError(result.error || "Failed to invite team member");
    }
    setInviting(false);
  };

  const handleAccessChange = async (memberId: string, newLevel: "FULL_ACCESS" | "VIEW_ONLY") => {
    await updateMemberAccess(memberId, newLevel);
    loadData();
  };

  const handleRemove = async (memberId: string) => {
    await removeTeamMember(memberId);
    loadData();
  };

  const handleCopyInvite = (memberId: string, inviteToken: string) => {
    const link = `${window.location.origin}/api/team/accept?token=${inviteToken}`;
    navigator.clipboard?.writeText(link);
    setCopiedId(memberId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${bgMain} ${textSecondary}`}>
        Loading team...
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center ${bgMain} text-center p-6`}>
        <Users size={40} className="text-gray-600 mb-3" />
        <h2 className={`text-lg font-medium ${textPrimary}`}>Access Denied</h2>
        <p className={`text-sm ${textSecondary} mt-1`}>
          Only the account owner can manage team members.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${bgMain} ${textMain}`}>
      <header className="mb-8">
        <h1 className={`text-2xl font-bold ${textPrimary} flex items-center gap-2`}>
          <Users size={22} /> Team
        </h1>
        <p className={`text-sm ${textSecondary} mt-1`}>
          Invite team members to help manage your reviews.
        </p>
      </header>

      {/* Counter */}
      <div className={`flex items-center justify-between mb-4 ${bgCard} border rounded-xl px-4 py-3`}>
        <span className={`text-sm ${textSecondary}`}>Team Members</span>
        <span className={`text-sm font-medium ${textPrimary}`}>
          {members.length} / {membersLimit}
        </span>
      </div>

      {/* Invite form */}
      <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
        <h3 className={`font-medium ${textPrimary} mb-3 flex items-center gap-2`}>
          <UserPlus size={16} /> Invite Member
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="member@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 border rounded-lg px-3 py-2 text-sm outline-none ${inputBg}`}
          />
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as "FULL_ACCESS" | "VIEW_ONLY")}
            className={`border rounded-lg px-3 py-2 text-sm outline-none ${selectBg}`}
          >
            <option value="VIEW_ONLY">View Only</option>
            <option value="FULL_ACCESS">Full Access</option>
          </select>
          <button
            onClick={handleInvite}
            disabled={inviting || !email.trim() || members.length >= membersLimit}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm px-4 py-2 rounded-lg transition"
          >
            {inviting ? "Inviting..." : "Invite"}
          </button>
        </div>
        {members.length >= membersLimit && (
          <p className={`text-xs ${warningText} mt-2`}>
            You&apos;ve reached your plan&apos;s team member limit.
          </p>
        )}
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>

      {/* Members list */}
      <div className={`${bgCard} border rounded-xl p-5`}>
        <h3 className={`font-medium ${textPrimary} mb-4`}>Members</h3>
        {members.length === 0 ? (
          <p className={`text-sm text-center py-6 ${textMuted}`}>
            No team members yet.
          </p>
        ) : (
          <div className="space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border rounded-lg p-3 ${memberCardBorder}`}
              >
                <div>
                  <p className={`text-sm ${textPrimary}`}>{m.email}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      m.status === "ACCEPTED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {m.status === "ACCEPTED" ? "Active" : "Pending"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={m.accessLevel}
                    onChange={(e) => handleAccessChange(m.id, e.target.value as "FULL_ACCESS" | "VIEW_ONLY")}
                    className={`border rounded-lg px-2 py-1 text-xs outline-none ${selectBg}`}
                  >
                    <option value="VIEW_ONLY">View Only</option>
                    <option value="FULL_ACCESS">Full Access</option>
                  </select>

                  {m.status === "PENDING" && m.inviteToken && (
                    <button
                      onClick={() => handleCopyInvite(m.id, m.inviteToken)}
                      className={`p-1.5 rounded border ${copyButtonBg}`}
                      title="Copy invite link"
                    >
                      {copiedId === m.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(m.id)}
                    className={`p-1.5 rounded ${trashButtonBg}`}
                    title="Remove member"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
