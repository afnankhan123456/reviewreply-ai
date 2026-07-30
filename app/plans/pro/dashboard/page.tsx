import {
  MessageSquare,
  Star,
  MessageCircle,
  CornerUpLeft,
  AlertCircle,
} from "lucide-react";

type Trend = "up" | "down";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend: Trend;
  trendLabel: string;
  sparklineColor: string;
  sparklinePoints: string;
}

function Sparkline({ color, points }: { color: string; points: string }) {
  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className="w-full h-8 mt-3"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  trend,
  trendLabel,
  sparklineColor,
  sparklinePoints,
}: StatCardProps) {
  const trendColor = trend === "up" ? "text-emerald-400" : "text-rose-400";
  const trendArrow = trend === "up" ? "↑" : "↓";

  return (
    <div className="liquid-glass liquid-focus flex flex-col p-6 min-w-[210px]">
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${iconBg}`}
      >
        {icon}
      </div>

      <span className="text-sm text-white/60 leading-none">{label}</span>
      <span className="text-3xl font-semibold tracking-tight mt-2 leading-none">
        {value}
      </span>

      <span className={`text-xs mt-2 font-medium ${trendColor}`}>
        {trendArrow} {trendLabel}
      </span>

      <Sparkline color={sparklineColor} points={sparklinePoints} />
    </div>
  );
}

export default function DashboardPage() {
  const stats: StatCardProps[] = [
    {
      icon: <MessageSquare className="w-5 h-5 text-violet-300" />,
      iconBg: "bg-violet-500/20",
      label: "Total Reviews",
      value: "1,248",
      trend: "up",
      trendLabel: "12% vs last 7 days",
      sparklineColor: "#a78bfa",
      sparklinePoints: "0,26 15,24 30,22 45,18 60,20 75,10 100,4",
    },
    {
      icon: <Star className="w-5 h-5 text-amber-300" />,
      iconBg: "bg-amber-500/20",
      label: "Average Rating",
      value: "4.3",
      trend: "down",
      trendLabel: "0.3 vs last 7 days",
      sparklineColor: "#fbbf24",
      sparklinePoints: "0,6 20,10 40,14 60,18 80,24 100,28",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-emerald-300" />,
      iconBg: "bg-emerald-500/20",
      label: "New Reviews",
      value: "32",
      trend: "up",
      trendLabel: "8% vs last 7 days",
      sparklineColor: "#34d399",
      sparklinePoints: "0,26 20,22 35,24 50,14 65,18 80,8 100,6",
    },
    {
      icon: <CornerUpLeft className="w-5 h-5 text-blue-300" />,
      iconBg: "bg-blue-500/20",
      label: "Response Rate",
      value: "86%",
      trend: "up",
      trendLabel: "5% vs last 7 days",
      sparklineColor: "#60a5fa",
      sparklinePoints: "0,24 20,25 40,20 60,16 80,12 100,4",
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-rose-300" />,
      iconBg: "bg-rose-500/20",
      label: "Low Rating Reviews",
      value: "18",
      trend: "down",
      trendLabel: "6% vs last 7 days",
      sparklineColor: "#fb7185",
      sparklinePoints: "0,10 20,14 40,12 60,18 80,22 100,26",
    },
  ];

  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-white/50 text-sm mt-1">
          Here&apos;s how your reviews are performing this week.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>
    </main>
  );
}
