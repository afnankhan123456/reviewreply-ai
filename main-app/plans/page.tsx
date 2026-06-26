"use client";

import Navbar from "../../../../components/Navbar";

import BasicStats from "../component/BasicStats";
import BasicReviews from "../component/BasicReviews";
import BasicAnalytics from "../component/BasicAnalytics";
import BasicReplyGenerator from "../component/BasicReplyGenerator";
import BasicReviewHistory from "../component/BasicReviewHistory";
import BasicBusinessLocation from "../component/BasicBusinessLocation";
import BasicTemplates from "../component/BasicTemplates";
import BasicCustomerInsights from "../component/BasicCustomerInsights";
import BasicSupport from "../component/BasicSupport";
import BasicActivity from "../component/BasicActivity";

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

