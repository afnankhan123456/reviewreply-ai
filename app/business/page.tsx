"use client";

import ClientSidebar from "../../components/client_Sidebar";
import Navbar from "../../components/Navbar";

export default function BusinessPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <ClientSidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Business Dashboard
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400">
            Monitor business growth and performance
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Total Branches
            </p>

            <h2 className="text-3xl font-bold">
              12
            </h2>

            <p className="text-green-500 text-sm mt-2">
              +2 this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Monthly Revenue
            </p>

            <h2 className="text-3xl font-bold">
              $48.2K
            </h2>

            <p className="text-green-500 text-sm mt-2">
              +18% growth
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Google Rating
            </p>

            <h2 className="text-3xl font-bold">
              4.8 ?
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Excellent reviews
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Active Campaigns
            </p>

            <h2 className="text-3xl font-bold">
              24
            </h2>

            <p className="text-yellow-500 text-sm mt-2">
              Running campaigns
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

            <h2 className="text-2xl font-bold mb-6">
              Branch Locations
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
                <span>New York Branch</span>
                <span className="text-green-500">
                  Active
                </span>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
                <span>Dubai Branch</span>
                <span className="text-green-500">
                  Active
                </span>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
                <span>London Branch</span>
                <span className="text-yellow-500">
                  Maintenance
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

            <h2 className="text-2xl font-bold mb-6">
              Business Insights
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Customer engagement increased by 22% this month.
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Most positive feedback comes from fast support responses.
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                Revenue growth is highest in Dubai branch.
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}