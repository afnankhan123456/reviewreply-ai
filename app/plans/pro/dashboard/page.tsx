"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, LogOut, Settings, HelpCircle } from "lucide-react";
import QuickActionsCustomizer, { QUICK_ACTION_COLORS } from "./quick-actions-customizer";
import { getAutoReplyMode, setAutoReplyMode } from "./ai-reply-center/actions";

/* Reusable wrapper that gives any section the layered iOS liquid-glass surface */
function LiquidCard({
  className = "",
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}) {
  return (
    <div className={`card ${className}`} {...rest}>
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

/* Real din-wise data se dynamic sparkline path banata hai — normalize karke min/max ke hisaab se upar/niche */
function buildSparkPath(values: number[]) {
  const w = 94, h = 30, padY = 3;
  if (!values || values.length === 0) return `M0 ${h / 2} L${w} ${h / 2}`;
  if (values.length === 1) return `M0 ${h / 2} L${w} ${h / 2}`;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  const pts = values.map((v, i) => ({
    x: i * stepX,
    y: padY + (1 - (v - min) / range) * (h - padY * 2),
  }));
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cur = pts[i], next = pts[i + 1];
    d += ` Q${cur.x.toFixed(1)} ${cur.y.toFixed(1)} ${((cur.x + next.x) / 2).toFixed(1)} ${((cur.y + next.y) / 2).toFixed(1)}`;
  }
  const lastPt = pts[pts.length - 1];
  d += ` T${lastPt.x.toFixed(1)} ${lastPt.y.toFixed(1)}`;
  return d;
}

function Spark({ color, values }: { color: string; values: number[] }) {
  const path = buildSparkPath(values);
  return (
    <svg className="spark" viewBox="0 0 94 30" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth={6} opacity={0.25} filter="blur(3px)" />
      <path d={path} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

/* Static spark paths — sirf visual trend line ke liye, values API se aati hain */
const statMeta = [
  {
    key: "totalReviews",
    icon: "purple",
    label: "Total Reviews",
    deltaClass: "green",
    color: "#ae47ff",
    format: (d: any) => d.totalReviews ?? 0,
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5.2 5.25h13.6c1.02 0 1.85.83 1.85 1.85v6.36c0 1.02-.83 1.85-1.85 1.85h-5.98l-2.72 2.27v-2.27H5.2a1.85 1.85 0 0 1-1.85-1.85V7.1c0-1.02.83-1.85 1.85-1.85Z" stroke="#fff" strokeWidth={1.65} strokeLinejoin="round" />
        <circle cx="9" cy="10.48" r=".9" fill="#fff" />
        <circle cx="12" cy="10.48" r=".9" fill="#fff" />
        <circle cx="15" cy="10.48" r=".9" fill="#fff" />
      </svg>
    ),
  },
  {
    key: "avgRating",
    icon: "gold",
    label: "Average Rating",
    deltaClass: "amber",
    color: "#e9b52a",
    format: (d: any) => d.avgRating ?? 0,
    svg: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="m12 3.8 2.1 4.37 4.83.7-3.49 3.39.82 4.8L12 14.8l-4.26 2.26.82-4.8-3.49-3.39 4.83-.7L12 3.8Z" stroke="#fff" strokeWidth={1.45} strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "newReviews",
    icon: "green",
    label: "New Reviews",
    deltaClass: "green",
    color: "#34d399",
    format: (d: any) => d.newReviews ?? 0,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: "responseRate",
    icon: "blue",
    label: "Response Rate",
    deltaClass: "green",
    color: "#4da3ff",
    format: (d: any) => `${d.responseRate ?? 0}%`,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
        <polyline points="9 10 4 15 9 20" />
        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
      </svg>
    ),
  },
  {
    key: "lowRatingCount",
    icon: "red",
    label: "Low Rating Reviews",
    deltaClass: "red",
    color: "#ef5a6f",
    format: (d: any) => d.lowRatingCount ?? 0,
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
];

const quickActions = [
  { label: "Reply to Reviews", sub: "Reply to pending reviews", href: "/plans/pro/dashboard/reviews", defaultColor: "blue", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "AI Reply", sub: "Generate AI replies", href: "/plans/pro/dashboard/ai-reply-center", defaultColor: "purple", icon: <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" fill="currentColor" /> },
  { label: "Analyze Reviews", sub: "Get AI insights", href: "/plans/pro/dashboard/analytics", defaultColor: "green", icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
  { label: "Create Report", sub: "Download reports", href: "/plans/pro/dashboard/reports", defaultColor: "orange", icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></> },
  { label: "Connect Platform", sub: "Add review sources", href: "/plans/pro/dashboard/connect-app", defaultColor: "blue", icon: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></> },
];

const navItems = [
  { label: "Home", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  { label: "Reviews", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "AI Center", icon: <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" fill="currentColor" /> },
  { label: "Analytics", icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
  { label: "Automation", icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> },
  { label: "More", icon: <><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></> },
];

function BottomNav() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [blob, setBlob] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = itemRefs.current[active];
    if (el) setBlob({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div className="bottom-nav mini-glass">
      <div
        className="nav-blob"
        style={{ transform: `translateX(${blob.left}px)`, width: blob.width }}
      ></div>
      {navItems.map((item, i) => (
        <div
          key={item.label}
          ref={(el) => { itemRefs.current[i] = el; }}
          className={`nav-item${i === active ? " active" : ""}`}
          onClick={() => setActive(i)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {item.icon}
          </svg>
          {item.label}
        </div>
      ))}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

export default function Page() {
  const { data: authSession } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [hiddenActions, setHiddenActions] = useState<string[]>([]);
  const [actionOrder, setActionOrder] = useState<string[]>(quickActions.map((a) => a.label));
  const [actionColors, setActionColors] = useState<Record<string, string>>({});
  const [cardStyle, setCardStyle] = useState<"glass" | "solid" | "minimal">("glass");
  const [cardSize, setCardSize] = useState<"compact" | "comfortable">("comfortable");

  useEffect(() => {
    fetchOverview();
    fetchAlerts();
    const saved = localStorage.getItem("hiddenQuickActions");
    if (saved) {
      try { setHiddenActions(JSON.parse(saved)); } catch (e) {}
    }
    const savedOrder = localStorage.getItem("quickActionsOrder");
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        const validLabels = quickActions.map((a) => a.label);
        if (Array.isArray(parsed) && parsed.every((l) => validLabels.includes(l))) setActionOrder(parsed);
      } catch (e) {}
    }
    const savedColors = localStorage.getItem("quickActionsColors");
    if (savedColors) {
      try { setActionColors(JSON.parse(savedColors)); } catch (e) {}
    }
    const savedStyle = localStorage.getItem("quickActionsCardStyle");
    if (savedStyle === "glass" || savedStyle === "solid" || savedStyle === "minimal") setCardStyle(savedStyle);
    const savedSize = localStorage.getItem("quickActionsCardSize");
    if (savedSize === "compact" || savedSize === "comfortable") setCardSize(savedSize);
  }, []);

  /* Profile dropdown ke bahar click hone par band ho jaye */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Modal ka "Save Changes" dabane par hi ye chalta hai — tab tak dashboard untouched rehta hai */
  const applyQuickActionsCustomize = (prefs: {
    order: string[];
    hidden: string[];
    colors: Record<string, string>;
    cardStyle: "glass" | "solid" | "minimal";
    cardSize: "compact" | "comfortable";
  }) => {
    setActionOrder(prefs.order);
    localStorage.setItem("quickActionsOrder", JSON.stringify(prefs.order));
    setHiddenActions(prefs.hidden);
    localStorage.setItem("hiddenQuickActions", JSON.stringify(prefs.hidden));
    setActionColors(prefs.colors);
    localStorage.setItem("quickActionsColors", JSON.stringify(prefs.colors));
    setCardStyle(prefs.cardStyle);
    localStorage.setItem("quickActionsCardStyle", prefs.cardStyle);
    setCardSize(prefs.cardSize);
    localStorage.setItem("quickActionsCardSize", prefs.cardSize);
    setCustomizeOpen(false);
  };

  const visibleActions = actionOrder
    .map((label) => quickActions.find((a) => a.label === label))
    .filter((a): a is typeof quickActions[number] => !!a && !hiddenActions.includes(a.label));

  const getActionColorValue = (label: string) => {
    const override = actionColors[label];
    const action = quickActions.find((a) => a.label === label);
    const colorKey = override && override !== "default" ? override : action?.defaultColor || "purple";
    return QUICK_ACTION_COLORS.find((c) => c.key === colorKey)?.value || "#ae47ff";
  };

  const [autoReplyOn, setAutoReplyOn] = useState(false);
  const [templates, setTemplates] = useState<string[]>([]);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    getAutoReplyMode().then((res: any) => {
      if (res?.success) setAutoReplyOn(res.mode === "auto");
    });
    fetch("/api/standard/ai-reply-center/templates")
      .then((r) => r.json())
      .then((d) => { if (d.success) setTemplates(d.templates); })
      .catch(() => {});
  }, []);

  const handleToggleAutoReply = async () => {
    const newMode = autoReplyOn ? "manual" : "auto";
    setAutoReplyOn(!autoReplyOn); // optimistic
    const res: any = await setAutoReplyMode(newMode);
    if (!res?.success) setAutoReplyOn(autoReplyOn); // revert on failure
  };

  const shuffleTemplate = () => {
    if (templates.length === 0) return;
    setTemplateIdx((i) => (i + 1) % templates.length);
  };

  const handleGenerateReport = async () => {
    setReportLoading(true);
    try {
      window.open("/api/standard/reports/export?format=csv", "_blank");
    } finally {
      setTimeout(() => setReportLoading(false), 1200);
    }
  };

  // ✅ Sentiment insight — existing star breakdown se hi nikala, koi extra API nahi
  const totalForInsight = data?.totalReviews ?? 0;
  const positivePct = data?.starBreakdown
    ? Math.round(((data.starBreakdown.find((s: any) => s.stars === 5)?.count || 0) + (data.starBreakdown.find((s: any) => s.stars === 4)?.count || 0)) / (totalForInsight || 1) * 100)
    : 0;
  const sentimentInsight = totalForInsight > 0
    ? `${positivePct}% reviews positive hain (4-5★)`
    : "Abhi data nahi hai";

  // ✅ Rating tip — response rate ke hisaab se dynamic suggestion
  const ratingTip = (data?.responseRate ?? 0) < 70
    ? "24 ghante ke andar reply karne se rating badh sakti hai"
    : "Aap achha response rate maintain kar rahe ho 👍";

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/pro/dashboard/overview");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError(json.error || "Failed to load dashboard");
      }
    } catch (e) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await fetch("/api/pro/dashboard/alerts");
      const json = await res.json();
      if (json.success) setAlerts(json.alerts || []);
    } catch (e) {
      // alerts optional — dashboard ko block mat karo
    }
  };

  if (loading) {
    return (
      <div className="page-wrap">
        <p style={{ color: "var(--text-dim)", padding: "40px" }}>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrap">
        <p style={{ color: "#ef5a6f", padding: "40px" }}>{error}</p>
      </div>
    );
  }

  const totalReviews = data?.totalReviews ?? 0;
  const starBreakdown = data?.starBreakdown ?? [5, 4, 3, 2, 1].map((stars: number) => ({ stars, count: 0, percent: 0 }));
  const recentReviews = data?.recentReviews ?? [];
  const legendColors: Record<number, string> = {
    5: "var(--purple)",
    4: "var(--blue)",
    3: "#b46cff",
    2: "var(--orange)",
    1: "var(--red)",
  };

  return (
    <div className="page-wrap">
      {/* SVG filter used by every card's .refract layer */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquidWarp" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.025" numOctaves={2} seed={9} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* header */}
      <div className="header-row">
        <div>
          <h1>{getGreeting()}, {data?.userName || "there"}! 🌙</h1>
          <p>Here&apos;s what&apos;s happening with your reviews today.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="profile-wrap" ref={profileRef}>
            <button className="profile-trigger mini-glass" onClick={() => setProfileOpen((v) => !v)}>
              {authSession?.user?.image ? (
                <img src={authSession.user.image} alt="Profile" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-fallback">
                  {(data?.userName || "U").charAt(0).toUpperCase()}
                </div>
              )}
              <ChevronDown size={14} className="profile-chevron" />
            </button>

            {profileOpen && (
              <div className="profile-menu mini-glass">
                <Link href="/plans/pro/dashboard/settings" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                  <Settings size={15} /> Settings
                </Link>
                <Link href="/plans/pro/dashboard/help" className="profile-menu-item" onClick={() => setProfileOpen(false)}>
                  <HelpCircle size={15} /> Help Center
                </Link>
                <button
                  className="profile-menu-item danger"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* stat cards — real KPI Summary data */}
      <div className="stats">
        {statMeta.map((s) => (
          <LiquidCard key={s.label} className="stat-card">
            <div className="stat-head">
              <div className={`icon ${s.icon}`}>{s.svg}</div>
              <p className="title">{s.label}</p>
            </div>
            <p className="value">{s.format(data)}</p>
            <Spark color={s.color} values={data?.trend?.[s.key] ?? []} />
          </LiquidCard>
        ))}
      </div>

      {/* quick actions */}
      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>Quick Actions</h3>
          <div
            className="dropdown mini-glass"
            onClick={() => setCustomizeOpen(true)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
            </svg>
            Customize
          </div>
          {customizeOpen && typeof document !== "undefined" &&
            createPortal(
              <QuickActionsCustomizer
                actions={quickActions}
                order={actionOrder}
                hidden={hiddenActions}
                colors={actionColors}
                cardStyle={cardStyle}
                cardSize={cardSize}
                onSave={applyQuickActionsCustomize}
                onCancel={() => setCustomizeOpen(false)}
              />,
              document.body
            )}
        </div>
        <div className="actions-grid">
          {visibleActions.map((a) => {
            const colorValue = getActionColorValue(a.label);
            return (
              <Link href={a.href} key={a.label} style={{ textDecoration: "none", color: "inherit" }}>
                <LiquidCard
                  className={`action-card style-${cardStyle} size-${cardSize} themed`}
                  style={{ ["--action-color" as any]: colorValue }}
                >
                  <div className="action-icon-badge">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{a.icon}</svg>
                  </div>
                  <b>{a.label}</b>
                  <div className="sub">{a.sub} →</div>
                </LiquidCard>
              </Link>
            );
          })}
        </div>
      </LiquidCard>

      {/* Alerts — low rating reviews jinpe turant dhyan chahiye */}
      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>⚠️ Alerts</h3>
          <span className="link">{alerts.length} needs attention</span>
        </div>
        {alerts.length === 0 ? (
          <p style={{ color: "var(--text-dim)", fontSize: 13 }}>No low-rating alerts right now. 🎉</p>
        ) : (
          <div className="alerts-scroll">
            {alerts.slice(0, 10).map((a) => (
              <div className="review-row" key={a.id}>
                <div className="rev-avatar">⚠️</div>
                <div className="rev-mid">
                  <span className="rev-name">{a.reviewerName}</span>
                  <div className="rev-stars" style={{ color: "var(--red)" }}>
                    {"★".repeat(a.rating)}{"☆".repeat(5 - a.rating)}
                  </div>
                  <div className="rev-text">{a.comment}</div>
                </div>
                <span className="rev-tag tag-negative">{a.source || "Review"}</span>
              </div>
            ))}
          </div>
        )}
      </LiquidCard>

      {/* two column: overview + recent reviews */}
      <div className="two-col">
        <LiquidCard>
          <div className="section-head">
            <h3>Review Overview</h3>
            <div className="dropdown mini-glass">All time
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="6 9 12 15 18 9" /></svg>
            </div>
          </div>
          <div className="donut-wrap">
            <div className="donut"><div className="donut-center"><b>{totalReviews}</b><span>Total Reviews</span></div></div>
            <div className="legend">
              {starBreakdown.map((s: any) => (
                <div className="legend-row" key={s.stars}>
                  <span className="legend-dot" style={{ background: legendColors[s.stars] }}></span>
                  <span className="lbl">{s.stars} Stars</span>
                  <b>{s.count} ({s.percent}%)</b>
                </div>
              ))}
            </div>
          </div>
          <div className="view-analytics"><Link href="/plans/pro/dashboard/analytics" className="link">View all analytics →</Link></div>
        </LiquidCard>

        <LiquidCard>
          <div className="section-head">
            <h3>Recent Activity</h3>
            <Link href="/plans/pro/dashboard/reviews" className="link">View all</Link>
          </div>
          {recentReviews.length === 0 && (
            <p style={{ color: "var(--text-dim)", fontSize: 13 }}>No reviews yet.</p>
          )}
          <div className="alerts-scroll">
            {recentReviews.map((r: any) => (
              <div className="review-row" key={r.id}>
                <div className="rev-avatar">{(r.name || "?").charAt(0).toUpperCase()}</div>
                <div className="rev-mid">
                  <span className="rev-name">{r.name} <span className="rev-time">· {r.time}</span></span>
                  <div className="rev-stars" style={r.stars <= 1 ? { color: "var(--red)" } : undefined}>
                    {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                  </div>
                  <div className="rev-text">{r.text}</div>
                </div>
                <span className={`rev-tag tag-${r.tag}`}>{r.tag[0].toUpperCase() + r.tag.slice(1)}</span>
              </div>
            ))}
          </div>
        </LiquidCard>
      </div>

      {/* AI suggestions — real, actionable insights (Quick Actions se alag, yaha koi navigation nahi) */}
      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>AI Suggestions <span className="pro-tag">PRO</span></h3>
        </div>
        <div className="ai-grid">
          <LiquidCard className="ai-card">
            <div className="ai-head">
              <div className="ai-icon" style={{ background: "rgba(245,166,35,.18)", color: "#f5a623" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 11-14h-7z" /></svg>
              </div>
              <b>Auto Reply</b>
              <label className="toggle-switch" style={{ marginLeft: "auto" }}>
                <input type="checkbox" checked={autoReplyOn} onChange={handleToggleAutoReply} />
                <span className="toggle-track"><span className="toggle-thumb"></span></span>
              </label>
            </div>
            <div className="sub">{autoReplyOn ? "AI khud reply bhej raha hai" : "Turant on karo, click karke"}</div>
          </LiquidCard>

          <LiquidCard className="ai-card" onClick={shuffleTemplate} style={{ cursor: "pointer" }}>
            <div className="ai-head">
              <div className="ai-icon" style={{ background: "rgba(255,255,255,.08)", color: "var(--text-dim)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <b>Template Tip</b>
            </div>
            <div className="sub">{templates[templateIdx] || "Loading..."}</div>
          </LiquidCard>

          <LiquidCard className="ai-card">
            <div className="ai-head">
              <div className="ai-icon" style={{ background: "rgba(174,71,255,.18)", color: "#c78bff" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></svg>
              </div>
              <b>Sentiment</b>
            </div>
            <div className="sub">{sentimentInsight}</div>
          </LiquidCard>

          <LiquidCard className="ai-card" onClick={handleGenerateReport} style={{ cursor: "pointer" }}>
            <div className="ai-head">
              <div className="ai-icon" style={{ background: "rgba(77,163,255,.18)", color: "#4da3ff" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
              </div>
              <b>Report</b>
            </div>
            <div className="sub">{reportLoading ? "Downloading..." : "Click karo, CSV turant download hoga"}</div>
          </LiquidCard>

          <LiquidCard className="ai-card">
            <div className="ai-head">
              <div className="ai-icon" style={{ background: "rgba(52,211,153,.18)", color: "#34d399" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              </div>
              <b>Rating Tip</b>
            </div>
            <div className="sub">{ratingTip}</div>
          </LiquidCard>
        </div>
      </LiquidCard>

      {/* bottom nav — sliding liquid blob behind the active item */}
      <BottomNav />

      <div className="fab">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" /></svg>
      </div>
    </div>
  );
}
