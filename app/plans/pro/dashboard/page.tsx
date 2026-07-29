"use client";

import React from "react";
import {
  MessageSquare,
  Star,
  MessageCircle,
  Undo2,
  Frown,
  Plus,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  BarChart3,
  FileText,
  Link2,
  ChevronRight,
  Zap,
  Smile,
  TrendingUp,
} from "lucide-react";

/**
 * Pro Dashboard — Home page (UI ONLY)
 * No API calls / no real data yet — static placeholder data so the
 * layout, glass cards and interactions can be reviewed first.
 */

// ---------- Static placeholder data (UI only) ----------

const statCards = [
  {
    label: "Total Reviews",
    value: "1,248",
    delta: "+12% vs last 7 days",
    deltaTone: "up" as const,
    icon: MessageSquare,
    iconTone: "violet" as const,
  },
  {
    label: "Average Rating",
    value: "4.3",
    delta: "-0.3 vs last 7 days",
    deltaTone: "down" as const,
    icon: Star,
    iconTone: "amber" as const,
  },
  {
    label: "New Reviews",
    value: "32",
    delta: "+8% vs last 7 days",
    deltaTone: "up" as const,
    icon: MessageCircle,
    iconTone: "green" as const,
  },
  {
    label: "Response Rate",
    value: "86%",
    delta: "+5% vs last 7 days",
    deltaTone: "up" as const,
    icon: Undo2,
    iconTone: "blue" as const,
  },
  {
    label: "Low Rating Reviews",
    value: "18",
    delta: "-6% vs last 7 days",
    deltaTone: "down" as const,
    icon: Frown,
    iconTone: "rose" as const,
  },
];

const quickActions = [
  { label: "Reply to Reviews", sub: "Reply to pending reviews", icon: MessageSquare },
  { label: "AI Reply", sub: "Generate AI replies", icon: Sparkles },
  { label: "Analytics", sub: "Get AI insights", icon: BarChart3 },
  { label: "Create Report", sub: "Download reports", icon: FileText },
  { label: "Connect Platform", sub: "Add review sources", icon: Link2 },
];

const ratingBreakdown = [
  { label: "5 Stars", count: 620, pct: 50, dot: "bg-emerald-400" },
  { label: "4 Stars", count: 320, pct: 26, dot: "bg-blue-400" },
  { label: "3 Stars", count: 180, pct: 14, dot: "bg-violet-400" },
  { label: "2 Stars", count: 80, pct: 6, dot: "bg-amber-400" },
  { label: "1 Star", count: 48, pct: 4, dot: "bg-rose-400" },
];

const recentReviews = [
  {
    name: "John D.",
    time: "5 min ago",
    stars: 5,
    text: "Great service and amazing support! Highly recommend.",
    status: "Replied" as const,
    source: "G",
  },
  {
    name: "Sarah M.",
    time: "15 min ago",
    stars: 4,
    text: "Good experience overall. The team was helpful.",
    status: "Pending" as const,
    source: "F",
  },
  {
    name: "Michael T.",
    time: "1 hour ago",
    stars: 1,
    text: "Poor communication and slow response time.",
    status: "Negative" as const,
    source: "Y",
  },
  {
    name: "Emily R.",
    time: "2 hours ago",
    stars: 5,
    text: "Excellent product and customer service!",
    status: "Replied" as const,
    source: "G",
  },
];

const aiSuggestions = [
  { label: "Enable Auto Reply", sub: "Automatically reply to common reviews", cta: "Set up", icon: Zap },
  { label: "Create Templates", sub: "Save time with reusable reply templates", cta: "Create now", icon: FileText },
  { label: "Analyze Sentiment", sub: "Understand customer sentiment better", cta: "Analyze", icon: Smile },
  { label: "Generate Report", sub: "Get detailed insights about your reviews", cta: "Generate", icon: BarChart3 },
  { label: "Improve Rating", sub: "Get AI recommendations to improve rating", cta: "Get tips", icon: TrendingUp },
];

// ---------- Small helpers ----------

const iconToneClasses: Record<string, string> = {
  violet: "bg-violet-500/20 text-violet-300",
  amber: "bg-amber-500/20 text-amber-300",
  green: "bg-emerald-500/20 text-emerald-300",
  blue: "bg-blue-500/20 text-blue-300",
  rose: "bg-rose-500/20 text-rose-300",
};

const statusClasses: Record<string, string> = {
  Replied: "bg-emerald-500/20 text-emerald-300",
  Pending: "bg-amber-500/20 text-amber-300",
  Negative: "bg-rose-500/20 text-rose-300",
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/10"}
        />
      ))}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
}

export default function ProDashboardHomePage() {
  return (
    <div
      className="min-h-full w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/main-BG.webp')" }}
    >
      {/* dark overlay so glass cards stay readable */}
      <div className="min-h-full w-full bg-black/45 backdrop-brightness-90">
        <div className="mx-auto max-w-[1400px] px-6 py-8 pb-28 lg:pb-10 text-white">
          {/* Greeting + New Action */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                {getGreeting()}, aiengineer! <span>🌙</span>
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Here&apos;s what&apos;s happening with your reviews today.
              </p>
            </div>

            <button className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-2.5 text-sm font-medium shadow-lg shadow-violet-900/30 w-fit">
              <Plus size={16} />
              New Action
              <ChevronDown size={14} className="opacity-70" />
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <GlassCard key={card.label} className="p-4">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${iconToneClasses[card.iconTone]}`}>
                    <Icon size={17} />
                  </div>
                  <p className="text-white/60 text-xs mb-1">{card.label}</p>
                  <p className="text-2xl font-bold mb-1">{card.value}</p>
                  <p className={`text-[11px] font-medium ${card.deltaTone === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                    {card.delta}
                  </p>
                </GlassCard>
              );
            })}
          </div>

          {/* Quick Actions */}
          <GlassCard className="p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Quick Actions</h2>
              <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors rounded-lg border border-white/15 px-3 py-1.5">
                <SlidersHorizontal size={13} />
                Customize
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    className="text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4"
                  >
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                      <Icon size={15} />
                    </div>
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-[11px] text-white/50 mt-0.5">{a.sub}</p>
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Review Overview + Recent Reviews */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Review Overview */}
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">Review Overview</h2>
                <button className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white border border-white/15 rounded-lg px-3 py-1.5">
                  Last 7 days
                  <ChevronDown size={13} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Donut (static SVG, purely decorative) */}
                <div className="relative h-40 w-40 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="50 50" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="26 74" strokeDashoffset="-50" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray="14 86" strokeDashoffset="-76" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6 94" strokeDashoffset="-90" />
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fb7185" strokeWidth="3" strokeDasharray="4 96" strokeDashoffset="-96" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">1,248</span>
                    <span className="text-[11px] text-white/60">Total Reviews</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 w-full space-y-2.5">
                  {ratingBreakdown.map((r) => (
                    <div key={r.label} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-white/80">
                        <span className={`h-2 w-2 rounded-full ${r.dot}`} />
                        {r.label}
                      </span>
                      <span className="text-white/60">
                        {r.count} ({r.pct}%)
                      </span>
                    </div>
                  ))}
                  <button className="flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200 pt-1">
                    View all analytics
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Recent Reviews */}
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Recent Reviews</h2>
                <button className="text-xs text-violet-300 hover:text-violet-200">View all</button>
              </div>

              <div className="space-y-4">
                {recentReviews.map((r, i) => (
                  <div
                    key={r.name + i}
                    className={`flex items-start gap-3 ${i !== recentReviews.length - 1 ? "pb-4 border-b border-white/10" : ""}`}
                  >
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold shrink-0">
                      {r.source}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{r.name}</p>
                        <span className="text-[11px] text-white/40 shrink-0">{r.time}</span>
                      </div>
                      <Stars count={r.stars} />
                      <p className="text-xs text-white/60 mt-1 line-clamp-1">{r.text}</p>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusClasses[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* AI Suggestions */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-semibold">AI Suggestions</h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-200">
                PRO
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {aiSuggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                      <Icon size={15} />
                    </div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-[11px] text-white/50 mt-0.5 mb-2">{s.sub}</p>
                    <button className="flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200">
                      {s.cta}
                      <ChevronRight size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
