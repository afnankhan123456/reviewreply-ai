"use client";

import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ReviewDashboard from "./components/ReviewDashboard";
import AlertsCard from "./components/AlertsCard";
import UnansweredCard from "./components/UnansweredCard";
import RatingOverview from "./components/RatingOverview";
import AnalyticsChart from "./components/AnalyticsChart";

export default function DashboardPage() {

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-6">

      {/* TOPBAR */}

      <Topbar />

      {/* PAGE TITLE */}

      <div className="mt-6 mb-6">

        <h1 className="text-3xl font-bold text-black">
          Dashboard
        </h1>

        <p className="text-zinc-500 mt-1">
          Monitor reviews, alerts, analytics & customer responses
        </p>

      </div>

      {/* TOP STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Reviews Synced
              </p>

              <h2 className="text-4xl font-bold text-black mt-2">
                100
              </h2>

              <p className="text-green-600 text-sm mt-2">
                Active This Month
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              💬
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Google Sync
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                Active
              </h2>

              <p className="text-zinc-500 text-sm mt-2">
                Last sync 2h ago
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
              🔄
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Avg Rating
              </p>

              <h2 className="text-4xl font-bold text-black mt-2">
                4.6
              </h2>

              <p className="text-yellow-500 text-sm mt-2">
                ★★★★★
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl">
              ⭐
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-sm">
                Response Rate
              </p>

              <h2 className="text-4xl font-bold text-black mt-2">
                85%
              </h2>

              <p className="text-green-600 text-sm mt-2">
                Good Performance
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
              📈
            </div>

          </div>

        </div>

      </div>

      {/* FEATURE CARDS */}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">

        {[
          "1 Business Location",
          "Low Rating Alerts",
          "100 Review Sync",
          "Monthly PDF Reports",
          "Google Review Sync",
          "Reply Templates",
          "Review Dashboard",
          "Response Tracking",
          "Email Alerts",
          "Top 5 Keywords",
          "Unanswered Tracking",
          "Search & Filter",
          "Rating Overview",
          "30 Day History",
          "Review Analytics",
          "Export CSV/PDF",
        ].map((feature, index) => (

          <div
            key={index}
            className="bg-white border border-zinc-200 rounded-3xl p-5 hover:shadow-lg transition-all"
          >

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-4">
              ✨
            </div>

            <h3 className="text-black font-semibold text-lg">
              {feature}
            </h3>

            <p className="text-zinc-500 text-sm mt-2">
              Fully integrated feature inside your dashboard
            </p>

          </div>

        ))}

      </div>

      {/* MAIN SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <ReviewDashboard />

        <AlertsCard />

        <UnansweredCard />

      </div>

      {/* BOTTOM SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <RatingOverview />

        <DetectionCard />

        <AnalyticsChart />

      </div>

    </div>

  );

}
