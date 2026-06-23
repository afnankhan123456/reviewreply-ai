import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import AnalyticsCard from "../../components/AnalyticsCard";
import ReviewCard from "../../components/ReviewCard";
import ReplyBox from "../../components/ReplyBox";
import SummaryCard from "../../components/SummaryCard";

export default function AdminPage() {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400">
            Manage clients, reviews, analytics and AI replies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Clients" value="12" />
          <StatCard title="Reviews Processed" value="2,480" />
          <StatCard title="AI Replies Sent" value="1,920" />
          <StatCard title="Monthly Revenue" value="$480" />
        </div>

        <div className="mb-8">
          <AnalyticsCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <ReviewCard
              name="Demo Client"
              review="Customers are happy with support and delivery speed."
              status="Positive"
              reply="Thanks for the amazing feedback. We appreciate your support."
            />

            <ReviewCard
              name="Sample Business"
              review="Service quality was good but delivery timing can improve."
              status="Mixed"
              reply="Thank you for your feedback. We are improving delivery speed."
            />
          </div>

          <div className="space-y-8">
            <ReplyBox />
            <SummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
