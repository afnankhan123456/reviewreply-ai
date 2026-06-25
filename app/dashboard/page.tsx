"use client";

import ClientSidebar from "../../components/client_Sidebar";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";

export default function DashboardPage() {

  const { data: session } = useSession();

  const userName =
    session?.user?.email
      ?.split("@")[0]
      .replace(/[0-9]/g, "") || "User";

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <ClientSidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Welcome {userName} 👋
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your reviews with AI
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVENUE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              AVG RATING
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              PENDING REPLY
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              RESPONSE RATE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL VIEWS
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVIEW
            </p>

            <h2 className="text-2xl font-bold mb-2">
              --
            </h2>

            <p className="text-zinc-500 text-xs">
              No Data Available
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Reviews
            </h2>

            <div className="flex items-center justify-center h-[250px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Reviews Connected
            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              AI Reply Generator
            </h2>

            <div className="flex items-center justify-center h-[250px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              Connect Reviews To Generate AI Replies
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Business Overview
            </h2>

            <div className="flex items-center justify-center h-[220px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Business Connected
            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="flex items-center justify-center h-[220px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Activity Available
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Review By Rating
            </h2>

            <div className="flex items-center justify-center h-[220px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Rating Data
            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Top Keywords
            </h2>

            <div className="flex items-center justify-center h-[220px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Keywords Available
            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Customer Insights
            </h2>

            <div className="flex items-center justify-center h-[220px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400">
              No Insights Available
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
