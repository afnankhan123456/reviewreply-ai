"use client";

import Navbar from "../../../../components/Navbar";

import BasicStats from "../component/BasicStats";
import BasicReviews from "../component/BasicReviews";

export default function BasicDashboardPage() {
  return (
    <div className="p-8">

      <Navbar />

      <div className="mb-8">

        <h1 className="text-4xl font-bold mb-2">
          Basic Dashboard
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your reviews with essential tools
        </p>

      </div>

      <BasicStats />

      <BasicReviews />

    </div>
  );
}
