"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, MapPin, Sun, Moon, Palette, Globe, Type, Bold, ChevronRight } from "lucide-react";
import "../liquid-glass.css";
import { saveGooglePlaceId, getGooglePlaceId } from "./actions";
import { useDashboardTheme } from "../ThemeProvider";

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

function SettingsRow({
  icon,
  iconClass,
  label,
  children,
  onClick,
}: {
  icon: ReactNode;
  iconClass: string;
  label: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="settings-row" onClick={onClick}>
      <div className={`icon ${iconClass} settings-row-icon`}>{icon}</div>
      <span className="settings-row-label">{label}</span>
      <div className="settings-row-control">{children}</div>
    </div>
  );
}

const ACCENT_PRESETS = ["#ae47ff", "#4da3ff", "#34d399", "#f5a623", "#ef5a6f", "#ff2d95"];

export default function SettingsPage() {
  const { data: authSession } = useSession();
  const isOwner = (authSession?.user as any)?.teamRole === "OWNER";

  const {
    themeMode, accentColor, fontSize, fontWeight, language,
    setThemeMode, setAccentColor, setFontSize, setFontWeight, setLanguage,
    t,
  } = useDashboardTheme();

  const [placeId, setPlaceId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placeIdOpen, setPlaceIdOpen] = useState(false);

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

      <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
        <ArrowLeft size={14} /> {t("backToDashboard")}
      </Link>

      <div className="header-row">
        <div>
          <h1>{t("settingsTitle")}</h1>
          <p>{t("settingsSubtitle")}</p>
        </div>
      </div>

      {/* ============ APPEARANCE ============ */}
      <LiquidCard className="section-card settings-list">
        <div className="section-head"><h3>{t("appearanceTitle")}</h3></div>

        <SettingsRow icon={themeMode === "dark" ? <Moon size={14} /> : <Sun size={14} />} iconClass="purple" label={t("mode")}>
          <div className="segmented">
            <button className={themeMode === "dark" ? "active" : ""} onClick={() => setThemeMode("dark")}>{t("dark")}</button>
            <button className={themeMode === "light" ? "active" : ""} onClick={() => setThemeMode("light")}>{t("light")}</button>
          </div>
        </SettingsRow>

        <SettingsRow icon={<Palette size={14} />} iconClass="gold" label={t("accentColor")}>
          <div className="swatch-row">
            {ACCENT_PRESETS.map((c) => (
              <button
                key={c}
                className={`swatch-btn ${accentColor === c ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setAccentColor(c)}
              />
            ))}
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="swatch-custom"
              title="Custom color"
            />
          </div>
        </SettingsRow>

        <SettingsRow icon={<Globe size={14} />} iconClass="blue" label={t("language")}>
          <select className="settings-select" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </SettingsRow>

        <SettingsRow icon={<Type size={14} />} iconClass="green" label={t("fontSize")}>
          <div className="segmented">
            <button className={fontSize === "sm" ? "active" : ""} onClick={() => setFontSize("sm")}>{t("small")}</button>
            <button className={fontSize === "md" ? "active" : ""} onClick={() => setFontSize("md")}>{t("medium")}</button>
            <button className={fontSize === "lg" ? "active" : ""} onClick={() => setFontSize("lg")}>{t("large")}</button>
          </div>
        </SettingsRow>

        <SettingsRow icon={<Bold size={14} />} iconClass="red" label={t("fontWeight")}>
          <div className="segmented">
            <button className={fontWeight === "normal" ? "active" : ""} onClick={() => setFontWeight("normal")}>{t("normal")}</button>
            <button className={fontWeight === "bold" ? "active" : ""} onClick={() => setFontWeight("bold")}>{t("bold")}</button>
          </div>
        </SettingsRow>
      </LiquidCard>

      {/* ============ GOOGLE PLACE ID ============ */}
      <LiquidCard className="section-card settings-list">
        <div className="section-head"><h3>{t("googlePlaceIdTitle")}</h3></div>

        <SettingsRow
          icon={<MapPin size={14} />}
          iconClass="purple"
          label={t("googlePlaceIdTitle")}
          onClick={() => setPlaceIdOpen((v) => !v)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isSaved && <span style={{ color: "var(--green)", fontSize: 11, fontWeight: 600 }}>✓ {t("saved")}</span>}
            <ChevronRight size={14} style={{ transform: placeIdOpen ? "rotate(90deg)" : "none", transition: "transform .2s ease" }} />
          </div>
        </SettingsRow>

        {placeIdOpen && (
          <div style={{ padding: "4px 2px 16px" }}>
            <p style={{ color: "var(--text-dim)", fontSize: 12.5, marginBottom: 14 }}>{t("googlePlaceIdDesc")}</p>
            <textarea
              rows={3}
              value={placeId}
              onChange={(e) => { setPlaceId(e.target.value); setIsSaved(false); setMessage(""); }}
              placeholder={t("googlePlaceIdPlaceholder")}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 12, resize: "vertical",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)",
                color: "var(--text)", fontSize: 13, marginBottom: 10,
              }}
            />
            {message && (
              <p style={{ fontSize: 12, color: isSaved ? "var(--green)" : "var(--red)", marginBottom: 10 }}>{message}</p>
            )}
            <button className="btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? t("saving") : t("save")}
            </button>
          </div>
        )}
      </LiquidCard>
    </div>
  );
}
