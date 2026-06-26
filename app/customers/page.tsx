"use client";

import ClientSidebar from "../../components/client_Sidebar";
import Navbar from "../../components/Navbar";

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <ClientSidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            Customers Dashboard
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400">
            Manage and monitor customer activity
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold">
              1,284
            </h2>

            <p className="text-green-500 text-sm mt-2">
              +32 new users
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Active Clients
            </p>

            <h2 className="text-3xl font-bold">
              894
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Highly active
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              Customer Retention
            </p>

            <h2 className="text-3xl font-bold">
              74%
            </h2>

            <p className="text-green-500 text-sm mt-2">
              Strong loyalty
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">
              VIP Customers
            </p>

            <h2 className="text-3xl font-bold">
              84
            </h2>

            <p className="text-yellow-500 text-sm mt-2">
              Premium clients
            </p>
          </div>

        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">

          <h2 className="text-2xl font-bold mb-6">
            Recent Customers
          </h2>

          <div className="space-y-4">

            <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
              <div>
                <p className="font-semibold">
                  Sarah Johnson
                </p>

                <p className="text-sm text-zinc-500">
                  sarah@gmail.com
                </p>
              </div>

              <span className="text-green-500">
                Active
              </span>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
              <div>
                <p className="font-semibold">
                  Michael Lee
                </p>

                <p className="text-sm text-zinc-500">
                  michael@gmail.com
                </p>
              </div>

              <span className="text-yellow-500">
                Pending
              </span>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-4 flex justify-between">
              <div>
                <p className="font-semibold">
                  Emma Watson
                </p>

                <p className="text-sm text-zinc-500">
                  emma@gmail.com
                </p>
              </div>

              <span className="text-green-500">
                Active
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}