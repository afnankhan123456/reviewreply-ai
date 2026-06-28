"use client";

import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ReviewDashboard from "./components/ReviewDashboard";
import AlertsCard from "./components/AlertsCard";
import UnansweredCard from "./components/UnansweredCard";
import RatingOverview from "./components/RatingOverview";
import DetectionCard from "./components/DetectionCard";
import AnalyticsChart from "./components/AnalyticsChart";

export default function DashboardPage() {
  return (
    <div>

      {/* TOPBAR */}

      <Topbar />

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <StatCard
          title="Reviews Synced"
          value="100/100"
          subtitle="This Month"
        />

        <StatCard
          title="Google Review Sync"
          value="Active"
          subtitle="Last synced 2 hours ago"
        />

        <StatCard
          title="Business Location"
          value="1"
          subtitle="Connected"
        />

      </div>

      {/* MIDDLE SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <ReviewDashboard />

        <AlertsCard />

        <UnansweredCard />

      </div>

      {/* BOTTOM SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <RatingOverview />

        <DetectionCard />

        <AnalyticsChart />

      </div>

    </div>
  );
}
