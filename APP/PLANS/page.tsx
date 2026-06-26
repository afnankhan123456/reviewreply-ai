"use client";

import Navbar from "../../../../components/Navbar";

import BasicStats from "../components/BasicStats";
import BasicReviews from "../components/BasicReviews";
import BasicAnalytics from "../components/BasicAnalytics";
import BasicReplyGenerator from "../components/BasicReplyGenerator";
import BasicReviewHistory from "../components/BasicReviewHistory";
import BasicBusinessLocation from "../components/BasicBusinessLocation";
import BasicTemplates from "../components/BasicTemplates";
import BasicCustomerInsights from "../components/BasicCustomerInsights";
import BasicSupport from "../components/BasicSupport";
import BasicActivity from "../components/BasicActivity";

export default function BasicDashboardPage() {
  return (
    <div>

      <Navbar />

      <div className="mb-8 mt-6">

        <h1 className="text-4xl font-bold mb-2">
          Basic Dashboard
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400">
          Manage your reviews with essential business tools
        </p>

      </div>

      <BasicStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        <BasicReviews />

        <BasicReplyGenerator />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        <BasicAnalytics />

        <BasicBusinessLocation />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        <BasicReviewHistory />

        <BasicTemplates />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        <BasicCustomerInsights />

        <BasicActivity />

      </div>

      <BasicSupport />

    </div>
  );
}