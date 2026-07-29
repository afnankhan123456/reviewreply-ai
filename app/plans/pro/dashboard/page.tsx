"use client";

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
  Sparkles,
  BarChart3,
  FileText,
  Link2,
  ChevronRight,
  Zap,
  TrendingUp,
} from "lucide-react";

function StatCard({
  icon: Icon,
  iconBg,
  label,
  value,
  change,
  changeColor,
}: {
  icon: any;
  iconBg: string;
  label: string;
  value: string;
  change: string;
  changeColor: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon size={18} />
      </div>
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <p className={`text-xs ${changeColor}`}>{change}</p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-4 text-left">
      <div className="h-9 w-9 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate">{title}</p>
        <p className="text-xs text-white/50 truncate">{subtitle}</p>
      </div>
    </button>
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
  },
  {
    name: "Sarah M.",
    time: "15 min ago",
    stars: 4,
    text: "Good experience overall. The team was helpful.",
    status: "Pending",
    statusColor: "bg-amber-500/15 text-amber-400",
  },
  {
    name: "Michael T.",
    time: "1 hour ago",
    stars: 1,
    text: "Poor communication and slow response time.",
    status: "Negative",
    statusColor: "bg-rose-500/15 text-rose-400",
  },
  {
    name: "Emily R.",
    time: "2 hours ago",
    stars: 5,
    text: "Excellent product and customer service!",
    status: "Replied",
    statusColor: "bg-emerald-500/15 text-emerald-400",
  },
];

const AI_SUGGESTIONS = [
  { icon: Zap, title: "Enable Auto Reply", desc: "Automatically reply to common reviews", cta: "Set up" },
  { icon: FileText, title: "Create Templates", desc: "Save time with reusable reply templates", cta: "Create now" },
  { icon: MessageCircle, title: "Analyze Sentiment", desc: "Understand customer sentiment better", cta: "Analyze" },
  { icon: BarChart3, title: "Generate Report", desc: "Get detailed insights about your reviews", cta: "Generate" },
  { icon: TrendingUp, title: "Improve Rating", desc: "Get AI recommendations to improve rating", cta: "Get tips" },
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
        <button className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors px-4 py-2.5 text-sm font-semibold text-white self-start sm:self-auto">
          <Plus size={16} />
          New Action
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
        />
        <StatCard
          icon={Star}
          iconBg="bg-amber-500/20 text-amber-300"
          label="Average Rating"
          value="4.3"
          change="↓ 0.3 vs last 7 days"
          changeColor="text-amber-400"
        />
        <StatCard
          icon={MessageCircle}
          iconBg="bg-emerald-500/20 text-emerald-300"
          label="New Reviews"
          value="32"
          change="↑ 8% vs last 7 days"
          changeColor="text-emerald-400"
        />
        <StatCard
          icon={Reply}
          iconBg="bg-blue-500/20 text-blue-300"
          label="Response Rate"
          value="86%"
          change="↑ 5% vs last 7 days"
          changeColor="text-emerald-400"
        />
        <StatCard
          icon={Frown}
          iconBg="bg-rose-500/20 text-rose-300"
          label="Low Rating Reviews"
          value="18"
          change="↓ 6% vs last 7 days"
          changeColor="text-rose-400"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Quick Actions</h2>
          <button className="text-xs text-white/50 hover:text-white/80 transition-colors">
            Customize
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickAction icon={MessageSquare} title="Reply to Reviews" subtitle="Reply to pending reviews" />
          <QuickAction icon={Sparkles} title="AI Reply" subtitle="Generate AI replies" />
          <QuickAction icon={BarChart3} title="Analyze Reviews" subtitle="Get AI insights" />
          <QuickAction icon={FileText} title="Create Report" subtitle="Download reports" />
          <QuickAction icon={Link2} title="Connect Platform" subtitle="Add review sources" />
        </div>
      </div>

      {/* Review Overview + Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Review Overview (donut) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-white">Review Overview</h2>
            <button className="text-xs rounded-lg border border-white/10 px-3 py-1.5 text-white/60">
              Last 7 days
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div
              className="relative h-40 w-40 rounded-full shrink-0"
              style={{
                background: `conic-gradient(
                  #34d399 0% 50%,
                  #60a5fa 50% 76%,
                  #a78bfa 76% 90%,
                  #fbbf24 90% 96%,
                  #fb7185 96% 100%
                )`,
              }}
            >
              <div className="absolute inset-3 rounded-full bg-[#141821] flex flex-col items-center justify-center">
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
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recent Reviews</h2>
            <button className="text-xs text-violet-300 hover:text-violet-200">View all</button>
          </div>

          <div className="space-y-4">
            {RECENT_REVIEWS.map((review) => (
              <div key={review.name} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  {review.name[0]}
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
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-white">AI Suggestions</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-violet-500 text-white">
            PRO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {AI_SUGGESTIONS.map((s) => (
            <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="h-9 w-9 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center mb-3">
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
