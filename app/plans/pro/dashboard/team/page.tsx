"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Users, UserPlus, Trash2, Copy, Check } from "lucide-react";
import "../liquid-glass.css";
import {
  getTeamData,
  inviteTeamMember,
  updateMemberAccess,
  removeTeamMember,
} from "./actions";

function LiquidCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`card ${className}`}>
      <div className="volume"></div>
      <div className="refract"></div>
      <div className="cornerBloom"></div>
      <div className="bodyShade"></div>
      <div className="specular"></div>
      <div className="edgeLight"></div>
      <div className="rim"></div>
      <div className="rightGlow"></div>
      <div className="content">{children}</div>
    </div>
  );
}

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
    const result: any = await getTeamData();
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
    const result: any = await inviteTeamMember(email, accessLevel);
    if (result.success) {
      setEmail("");
      await loadData();
      if (result.inviteLink) {
        navigator.clipboard?.writeText(result.inviteLink);
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
      <div className="page-wrap">
        <p style={{ color: "var(--text-dim)", padding: "40px" }}>Loading team...</p>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="page-wrap">
        <p style={{ color: "var(--text-dim)", padding: "40px", textAlign: "center" }}>
          Only the account owner can manage team members.
        </p>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquidWarp" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.025" numOctaves={2} seed={9} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="header-row">
        <div>
          <h1><Users size={22} /> Team</h1>
          <p>Invite team members to help manage your reviews.</p>
        </div>
      </div>

      {/* Counter */}
      <LiquidCard className="section-card">
        <div className="settings-row" style={{ padding: "2px" }}>
          <span className="settings-row-label">Team Members</span>
          <div className="settings-row-control">
            <span style={{ fontSize: 13, fontWeight: 700 }}>{members.length} / {membersLimit}</span>
          </div>
        </div>
      </LiquidCard>

      {/* Invite form */}
      <LiquidCard className="section-card">
        <div className="section-head"><h3><UserPlus size={16} /> Invite Member</h3></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            type="email"
            placeholder="member@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1, minWidth: 180, padding: "10px 12px", borderRadius: 10,
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)",
              color: "var(--text)", fontSize: 13, outline: "none",
            }}
          />
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as "FULL_ACCESS" | "VIEW_ONLY")}
            className="settings-select"
          >
            <option value="VIEW_ONLY">View Only</option>
            <option value="FULL_ACCESS">Full Access</option>
          </select>
          <button
            onClick={handleInvite}
            disabled={inviting || !email.trim() || members.length >= membersLimit}
            className="btn-primary"
            style={{ opacity: inviting || !email.trim() || members.length >= membersLimit ? 0.5 : 1 }}
          >
            {inviting ? "Inviting..." : "Invite"}
          </button>
        </div>
        {members.length >= membersLimit && (
          <p style={{ fontSize: 12, color: "var(--orange)", marginTop: 10 }}>
            You&apos;ve reached your plan&apos;s team member limit.
          </p>
        )}
        {error && <p style={{ fontSize: 12, color: "var(--red)", marginTop: 10 }}>{error}</p>}
      </LiquidCard>

      {/* Members list */}
      <LiquidCard className="section-card settings-list">
        <div className="section-head"><h3>Members</h3></div>
        {members.length === 0 ? (
          <p style={{ color: "var(--text-dim)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            No team members yet.
          </p>
        ) : (
          members.map((m) => (
            <div key={m.id} className="settings-row">
              <div className="settings-row-icon icon purple" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={14} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{m.email}</div>
                <span
                  style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 700,
                    background: m.status === "ACCEPTED" ? "rgba(52,211,153,.15)" : "rgba(245,166,35,.15)",
                    color: m.status === "ACCEPTED" ? "var(--green)" : "var(--orange)",
                  }}
                >
                  {m.status === "ACCEPTED" ? "Active" : "Pending"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <select
                  value={m.accessLevel}
                  onChange={(e) => handleAccessChange(m.id, e.target.value as "FULL_ACCESS" | "VIEW_ONLY")}
                  className="settings-select"
                  style={{ fontSize: 11.5, padding: "5px 8px" }}
                >
                  <option value="VIEW_ONLY">View Only</option>
                  <option value="FULL_ACCESS">Full Access</option>
                </select>

                {m.status === "PENDING" && m.inviteToken && (
                  <button onClick={() => handleCopyInvite(m.id, m.inviteToken)} className="qa-close" title="Copy invite link">
                    {copiedId === m.id ? <Check size={12} style={{ color: "var(--green)" }} /> : <Copy size={12} />}
                  </button>
                )}

                <button onClick={() => handleRemove(m.id)} className="qa-close" style={{ color: "var(--red)" }} title="Remove member">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </LiquidCard>
    </div>
  );
}
