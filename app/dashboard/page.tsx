import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import ReviewCard from "../../components/ReviewCard";
import AnalyticsCard from "../../components/AnalyticsCard";
import ReplyBox from "../../components/ReplyBox";
import SummaryCard from "../../components/SummaryCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#060816] text-white">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 overflow-hidden">
        <Navbar />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <StatCard title="Average Rating" value="4.8" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <StatCard title="Total Reviews" value="248" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <StatCard title="Positive Reviews" value="89%" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <StatCard title="Negative Reviews" value="11%" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 mb-8 overflow-hidden">
          <AnalyticsCard />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-2">
              <ReviewCard
                name="Sarah Johnson"
                review="Amazing service and great support experience."
                status="Positive"
                reply="Thank you for your amazing feedback. We truly appreciate your support."
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-2">
              <ReviewCard
                name="Mike Davis"
                review="The ambience and service quality were really impressive."
                status="Positive"
                reply="We are happy you enjoyed your experience with us."
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
              <ReplyBox />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
              <SummaryCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
