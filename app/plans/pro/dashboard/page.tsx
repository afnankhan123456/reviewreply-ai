"use client";

import "./liquid-glass.css";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import {
  MessageSquare,
  Star,
  MessageCircle,
  Reply,
  Frown,
  Plus,
  ChevronDown,
  Sparkles,
  BarChart3,
  FileText,
  Link2,
  ChevronRight,
  Zap,
  TrendingUp,
  Smile,
} from "lucide-react";

function MiniTrendChart({ color, points }: { color: string; points: number[] }) {
  const width = 72;
  const height = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
    </svg>
  );
}

function StatCard({
  icon: Icon,
  iconBg,
  label,
  value,
  change,
  changeColor,
  trend,
  trendColor,
}: {
  icon: any;
  iconBg: string;
  label: string;
  value: string;
  change: string;
  changeColor: string;
  trend: number[];
  trendColor: string;
}) {
  return (
    <div className="liquid-glass rounded-2xl p-5">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon size={18} />
      </div>
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          <p className={`text-xs ${changeColor}`}>{change}</p>
        </div>
        <MiniTrendChart color={trendColor} points={trend} />
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
}: {
  icon: any;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="liquid-btn-secondary liquid-focus group flex items-center gap-3 rounded-xl p-4 text-left">
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white truncate">{title}</p>
        <p className="text-xs text-white/50 truncate">{subtitle}</p>
      </div>
      <ChevronRight size={14} className="text-white/30 group-hover:text-white/60 transition-colors shrink-0" />
    </button>
  );
}

function PlatformBadge({ platform }: { platform: "google" | "facebook" | "other" }) {
  if (platform === "google") {
    return (
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white flex items-center justify-center text-[9px] font-bold text-blue-500 ring-2 ring-[#0b0d12]">
        G
      </div>
    );
  }
  if (platform === "facebook") {
    return (
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-[#0b0d12]">
        f
      </div>
    );
  }
  return (
    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-[#0b0d12]">
      ★
    </div>
  );
}

const RATING_BREAKDOWN = [
  { label: "5 Stars", count: 620, pct: 50, color: "bg-emerald-400" },
  { label: "4 Stars", count: 320, pct: 26, color: "bg-blue-400" },
  { label: "3 Stars", count: 180, pct: 14, color: "bg-violet-400" },
  { label: "2 Stars", count: 80, pct: 6, color: "bg-amber-400" },
  { label: "1 Star", count: 48, pct: 4, color: "bg-rose-400" },
];

const RECENT_REVIEWS = [
  {
    name: "John D.",
    time: "5 min ago",
    stars: 5,
    text: "Great service and amazing support! Highly recommend.",
    status: "Replied",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    platform: "google" as const,
  },
  {
    name: "Sarah M.",
    time: "15 min ago",
    stars: 4,
    text: "Good experience overall. The team was helpful.",
    status: "Pending",
    statusColor: "bg-amber-500/15 text-amber-400",
    platform: "facebook" as const,
  },
  {
    name: "Michael T.",
    time: "1 hour ago",
    stars: 1,
    text: "Poor communication and slow response time.",
    status: "Negative",
    statusColor: "bg-rose-500/15 text-rose-400",
    platform: "other" as const,
  },
  {
    name: "Emily R.",
    time: "2 hours ago",
    stars: 5,
    text: "Excellent product and customer service!",
    status: "Replied",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    platform: "google" as const,
  },
];

const AI_SUGGESTIONS = [
  {
    icon: Zap,
    title: "Enable Auto Reply",
    desc: "Automatically reply to common reviews",
    cta: "Set up",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-300",
  },
  {
    icon: FileText,
    title: "Create Templates",
    desc: "Save time with reusable reply templates",
    cta: "Create now",
    iconBg: "bg-white/10",
    iconColor: "text-white/80",
  },
  {
    icon: Smile,
    title: "Analyze Sentiment",
    desc: "Understand customer sentiment better",
    cta: "Analyze",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-300",
  },
  {
    icon: BarChart3,
    title: "Generate Report",
    desc: "Get detailed insights about your reviews",
    cta: "Generate",
    iconBg: "bg-white/10",
    iconColor: "text-white/80",
  },
  {
    icon: TrendingUp,
    title: "Improve Rating",
    desc: "Get AI recommendations to improve rating",
    cta: "Get tips",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-300",
  },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const { data: authSession } = useSession();

  const orgName = (authSession?.user as any)?.name || "there";
  const totalReviews = 1248;

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Good Night, {orgName}! <span>🌙</span>
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Here's what's happening with your reviews today.
          </p>
        </div>
        <button className="liquid-btn-primary liquid-focus inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white self-start sm:self-auto">
          <Plus size={16} />
          New Action
          <ChevronDown size={14} className="ml-0.5" />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          icon={MessageSquare}
          iconBg="bg-violet-500/20 text-violet-300"
          label="Total Reviews"
          value="1,248"
          change="↑ 12% vs last 7 days"
          changeColor="text-emerald-400"
          trend={[4, 6, 5, 8, 7, 9, 11]}
          trendColor="#a78bfa"
        />
        <StatCard
          icon={Star}
          iconBg="bg-amber-500/20 text-amber-300"
          label="Average Rating"
          value="4.3"
          change="↓ 0.3 vs last 7 days"
          changeColor="text-amber-400"
          trend={[9, 8, 8, 7, 6, 6, 5]}
          trendColor="#fbbf24"
        />
        <StatCard
          icon={MessageCircle}
          iconBg="bg-emerald-500/20 text-emerald-300"
          label="New Reviews"
          value="32"
          change="↑ 8% vs last 7 days"
          changeColor="text-emerald-400"
          trend={[3, 5, 4, 6, 7, 6, 8]}
          trendColor="#34d399"
        />
        <StatCard
          icon={Reply}
          iconBg="bg-blue-500/20 text-blue-300"
          label="Response Rate"
          value="86%"
          change="↑ 5% vs last 7 days"
          changeColor="text-emerald-400"
          trend={[5, 6, 6, 7, 8, 8, 9]}
          trendColor="#60a5fa"
        />
        <StatCard
          icon={Frown}
          iconBg="bg-rose-500/20 text-rose-300"
          label="Low Rating Reviews"
          value="18"
          change="↓ 6% vs last 7 days"
          changeColor="text-rose-400"
          trend={[9, 8, 8, 7, 6, 5, 4]}
          trendColor="#fb7185"
        />
      </div>

      {/* Quick Actions */}
      <div className="liquid-glass-static rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Quick Actions</h2>
          <button className="text-xs text-white/50 hover:text-white/80 transition-colors">
            Customize
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickAction
            icon={MessageSquare}
            iconBg="bg-violet-500/20"
            iconColor="text-violet-300"
            title="Reply to Reviews"
            subtitle="Reply to pending reviews"
          />
          <QuickAction
            icon={Sparkles}
            iconBg="bg-white/10"
            iconColor="text-violet-300"
            title="AI Reply"
            subtitle="Generate AI replies"
          />
          <QuickAction
            icon={BarChart3}
            iconBg="bg-white/10"
            iconColor="text-white/80"
            title="Analyze Reviews"
            subtitle="Get AI insights"
          />
          <QuickAction
            icon={FileText}
            iconBg="bg-white/10"
            iconColor="text-white/80"
            title="Create Report"
            subtitle="Download reports"
          />
          <QuickAction
            icon={Link2}
            iconBg="bg-white/10"
            iconColor="text-white/80"
            title="Connect Platform"
            subtitle="Add review sources"
          />
        </div>
      </div>

      {/* Review Overview + Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Review Overview (donut) */}
        <div className="liquid-glass-static rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-white">Review Overview</h2>
            <button className="liquid-btn-secondary liquid-focus text-xs rounded-lg px-3 py-1.5 text-white/60 inline-flex items-center gap-1">
              Last 7 days <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div
              className="relative h-40 w-40 rounded-full shrink-0"
              style={{
                background: `conic-gradient(
                  #34d399 0%,
                  #60a5fa 50%,
                  #a78bfa 76%,
                  #fbbf24 90%,
                  #fb7185 96%,
                  #34d399 100%
                )`,
              }}
            >
              <div className="absolute inset-3 rounded-full bg-black flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">{totalReviews.toLocaleString()}</span>
                <span className="text-[11px] text-white/50">Total Reviews</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-2.5">
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <span className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
                    {r.label}
                  </div>
                  <span className="text-white/80 font-medium">
                    {r.count} ({r.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-5 text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1">
            View all analytics <ChevronRight size={14} />
          </button>
        </div>

        {/* Recent Reviews */}
        <div className="liquid-glass-static rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Reviews</h2>
            <button className="text-xs text-violet-300 hover:text-violet-200">View all</button>
          </div>

          <div className="space-y-4">
            {RECENT_REVIEWS.map((review) => (
              <div key={review.name} className="flex items-start gap-3">
                <div className="relative h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  {review.name[0]}
                  <PlatformBadge platform={review.platform} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${review.statusColor}`}>
                      {review.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-white/40">{review.time}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < review.stars ? "fill-amber-400 text-amber-400" : "text-white/20"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mt-1 truncate">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="liquid-glass-static rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-white">AI Suggestions</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-500 text-white">
            PRO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {AI_SUGGESTIONS.map((s) => (
            <div key={s.title} className="liquid-glass rounded-xl p-4">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${s.iconBg} ${s.iconColor}`}>
                <s.icon size={16} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
              <p className="text-xs text-white/50 mb-3">{s.desc}</p>
              <button className="text-xs text-violet-300 hover:text-violet-200 inline-flex items-center gap-1">
                {s.cta} <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
