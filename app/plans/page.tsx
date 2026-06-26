"use client";

import Navbar from "./basic/component/Navbar";

import BasicStats from "./basic/component/BasicStats";
import BasicReviews from "./basic/component/BasicReviews";
import BasicAnalytics from "./basic/component/BasicAnalytics";
import BasicReplyGenerator from "./basic/component/BasicReplyGenerator";
import BasicReviewHistory from "./basic/component/BasicReviewHistory";
import BasicBusinessLocation from "./basic/component/BasicBusinessLocation";
import BasicTemplates from "./basic/component/BasicTemplates";
import BasicCustomerInsights from "./basic/component/BasicCustomerInsights";
import BasicSupport from "./basic/component/BasicSupport";
import BasicActivity from "./basic/component/BasicActivity";

export default function PlansPage() {
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
