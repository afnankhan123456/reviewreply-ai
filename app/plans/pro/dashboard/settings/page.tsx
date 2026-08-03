"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import "../liquid-glass.css";
import { saveGooglePlaceId, getGooglePlaceId } from "./actions";

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

export default function SettingsPage() {
  const { data: authSession } = useSession();
  const isOwner = (authSession?.user as any)?.teamRole === "OWNER";

  const [placeId, setPlaceId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOwner) return;
    (async () => {
      const result = await getGooglePlaceId();
      if (result?.placeId) {
        setPlaceId(result.placeId);
        setIsSaved(true);
      }
    })();
  }, [isOwner]);

  const handleSave = async () => {
    if (!placeId.trim()) {
      setMessage("Please enter a Google Place ID.");
      return;
    }
    setLoading(true);
    setMessage("");
    const result = await saveGooglePlaceId(placeId);
    if (result?.message) {
      setMessage(result.message);
      setIsSaved(true);
    }
    setLoading(false);
  };

  if (!isOwner) {
    return (
      <div className="page-wrap">
        <p style={{ color: "var(--text-dim)", padding: "40px", textAlign: "center" }}>
          Only the account owner can access settings.
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

      <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Back to Dashboard</Link>

      <div className="header-row">
        <div>
          <h1>Settings</h1>
          <p>Manage your business settings</p>
        </div>
      </div>

      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>Google Place ID</h3>
          {isSaved && <span style={{ color: "var(--green)", fontSize: 12, fontWeight: 600 }}>✓ Saved</span>}
        </div>
        <p style={{ color: "var(--text-dim)", fontSize: 12.5, marginBottom: 14 }}>
          Save your Google Business Place ID to connect review syncing.
        </p>
        <textarea
          rows={3}
          value={placeId}
          onChange={(e) => { setPlaceId(e.target.value); setIsSaved(false); setMessage(""); }}
          placeholder="Enter your Google Place ID..."
          style={{
            width: "100%", borderRadius: 12, padding: 12, marginBottom: 12, resize: "none",
            background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)",
            color: "var(--text)", fontSize: 13, outline: "none",
          }}
        />
        <button onClick={handleSave} disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? "Saving..." : "Save"}
        </button>
        {message && <p style={{ color: "var(--green)", fontSize: 12.5, marginTop: 10 }}>{message}</p>}
      </LiquidCard>
    </div>
  );
}
