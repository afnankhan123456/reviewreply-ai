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
            Manage and grow your business reviews with AI
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVENUE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              $4,820
            </h2>

            <p className="text-green-500 text-xs">
              +18% this month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              AVG RATING
            </p>

            <h2 className="text-2xl font-bold mb-2">
              4.7 ★
            </h2>

            <p className="text-green-500 text-xs">
              Excellent customer feedback
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              PENDING REPLY
            </p>

            <h2 className="text-2xl font-bold mb-2">
              12
            </h2>

            <p className="text-yellow-500 text-xs">
              Needs quick response
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              RESPONSE RATE
            </p>

            <h2 className="text-2xl font-bold mb-2">
              92%
            </h2>

            <p className="text-green-500 text-xs">
              Faster than last month
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL VIEWS
            </p>

            <h2 className="text-2xl font-bold mb-2">
              18.2K
            </h2>

            <p className="text-green-500 text-xs">
              +25% profile visibility
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              TOTAL REVIEW
            </p>

            <h2 className="text-2xl font-bold mb-2">
              248
            </h2>

            <p className="text-green-500 text-xs">
              +32 new reviews
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Reviews
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-semibold mb-2">
                  ⭐⭐⭐⭐⭐ Sarah Johnson
                </p>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Amazing customer service and very fast delivery.
                </p>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm">
                    Thank you for your kind feedback! We're happy you enjoyed our service.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-semibold mb-2">
                  ⭐⭐⭐⭐ Michael Lee
                </p>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Great quality but delivery was slightly late.
                </p>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm">
                    Thanks for your feedback. We’re improving delivery times for a better experience.
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              AI Reply Generator
            </h2>

            <div className="space-y-4">

              <textarea
                className="w-full h-[120px] rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 outline-none resize-none"
                defaultValue="The food quality was excellent and staff was very friendly."
              />

              <button className="w-full bg-violet-600 hover:bg-violet-700 transition-all rounded-2xl py-3 font-semibold text-white">
                Generate AI Reply
              </button>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">

                <p className="text-sm">
                  Thank you for your wonderful review! We're delighted you enjoyed the food and our friendly staff. We look forward to serving you again soon.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Business Overview
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Total Customers</span>
                <span className="font-bold">
                  1,284
                </span>
              </div>

              <div className="flex justify-between">
                <span>Positive Reviews</span>
                <span className="font-bold text-green-500">
                  82%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Negative Reviews</span>
                <span className="font-bold text-red-500">
                  18%
                </span>
              </div>

              <div className="flex justify-between">
                <span>Customer Retention</span>
                <span className="font-bold">
                  74%
                </span>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  AI replied to 8 reviews
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  2 minutes ago
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  3 new customer reviews received
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  10 minutes ago
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="font-medium">
                  Business profile performance increased
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  1 hour ago
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Review By Rating
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>⭐⭐⭐⭐⭐</span>
                <span>164 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐⭐⭐</span>
                <span>52 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐⭐</span>
                <span>21 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐⭐</span>
                <span>7 Reviews</span>
              </div>

              <div className="flex justify-between">
                <span>⭐</span>
                <span>4 Reviews</span>
              </div>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Top Keywords
            </h2>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 rounded-full bg-violet-600/20 text-violet-500">
                Fast Service
              </span>

              <span className="px-4 py-2 rounded-full bg-green-600/20 text-green-500">
                Friendly Staff
              </span>

              <span className="px-4 py-2 rounded-full bg-blue-600/20 text-blue-500">
                Quality Product
              </span>

              <span className="px-4 py-2 rounded-full bg-yellow-600/20 text-yellow-500">
                Delivery
              </span>

            </div>

          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-bold mb-6">
              Customer Insights
            </h2>

            <div className="space-y-4">

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="text-sm">
                  Customers love your fast response time and friendly support.
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="text-sm">
                  Most complaints are related to delayed deliveries.
                </p>
              </div>

              <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4">
                <p className="text-sm">
                  Positive reviews increased by 18% this month.
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-center text-sm text-zinc-500">

          <div className="flex items-center justify-center gap-6 mb-3 flex-wrap">

            <a
              href="/legal/privacy-policy"
              className="hover:text-violet-500 transition-all"
            >
              Privacy Policy
            </a>

            <a
              href="/legal/terms"
              className="hover:text-violet-500 transition-all"
            >
              Terms & Conditions
            </a>

            <a
              href="/legal/disclaimer"
              className="hover:text-violet-500 transition-all"
            >
              Disclaimer
            </a>

          </div>

          <p>
            © 2026 ReviewReply AI. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}
