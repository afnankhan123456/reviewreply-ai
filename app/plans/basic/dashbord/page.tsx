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

      {/* FEATURES SECTION */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-6">

        <h2 className="text-2xl font-bold text-white mb-5">
          Basic Plan Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-zinc-300 text-[14px]">

          <div>✓ 1 Business Location</div>

          <div>✓ Low Rating Alerts</div>

          <div>✓ 100 Review Sync</div>

          <div>✓ Monthly PDF Reports</div>

          <div>✓ Google Review Sync</div>

          <div>✓ Reply Templates</div>

          <div>✓ Review Dashboard</div>

          <div>✓ Response Tracking</div>

          <div>✓ Email Alerts</div>

          <div>✓ Top 5 Keywords</div>

          <div>✓ Unanswered Tracking</div>

          <div>✓ Search & Filter</div>

          <div>✓ Rating Overview</div>

          <div>✓ 30 Day History</div>

          <div>✓ Review Analytics</div>

          <div>✓ Export CSV/PDF</div>

        </div>

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
