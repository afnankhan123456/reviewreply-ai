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
      <div className="flex-1 flex items-center justify-center bg-[#0B0E14] text-gray-400">
        Loading team...
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0B0E14] text-center p-6">
        <Users size={40} className="text-gray-600 mb-3" />
        <h2 className="text-white text-lg font-medium">Access Denied</h2>
        <p className="text-gray-400 text-sm mt-1">
          Only the account owner can manage team members.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users size={22} /> Team
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Invite team members to help manage your reviews.
        </p>
      </header>

      {/* Counter */}
      <div className="flex items-center justify-between mb-4 bg-[#11141C] border border-[#1F2430] rounded-xl px-4 py-3">
        <span className="text-sm text-gray-400">Team Members</span>
        <span className="text-sm font-medium text-white">
          {members.length} / {membersLimit}
        </span>
      </div>

      {/* Invite form */}
      <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5 mb-6">
        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
          <UserPlus size={16} /> Invite Member
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="member@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as "FULL_ACCESS" | "VIEW_ONLY")}
            className="bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
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
          <p className="text-xs text-yellow-400 mt-2">
            You&apos;ve reached your plan&apos;s team member limit.
          </p>
        )}
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>

      {/* Members list */}
      <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
        <h3 className="text-white font-medium mb-4">Members</h3>
        {members.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No team members yet.
          </p>
        ) : (
          <div className="space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-[#1F2430] rounded-lg p-3"
              >
                <div>
                  <p className="text-sm text-white">{m.email}</p>
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
                    className="bg-[#181D27] border border-[#2A303C] rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="VIEW_ONLY">View Only</option>
                    <option value="FULL_ACCESS">Full Access</option>
                  </select>

                  {m.status === "PENDING" && m.inviteToken && (
                    <button
                      onClick={() => handleCopyInvite(m.id, m.inviteToken)}
                      className="p-1.5 rounded bg-[#181D27] border border-[#2A303C] text-gray-400 hover:text-white"
                      title="Copy invite link"
                    >
                      {copiedId === m.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(m.id)}
                    className="p-1.5 rounded bg-red-600/20 text-red-400 hover:bg-red-600/30"
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
