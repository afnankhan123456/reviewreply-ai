```tsx
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import ReviewCard from "../../components/ReviewCard";
import AnalyticsCard from "../../components/AnalyticsCard";
import ReplyBox from "../../components/ReplyBox";
import SummaryCard from "../../components/SummaryCard";

export default function DashboardPage() {
  return (
    <div className="flex bg-black min-h-screen">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 p-8">

        <Navbar />

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Average Rating"
            value="4.8"
          />

          <StatCard
            title="Total Reviews"
            value="248"
          />

          <StatCard
            title="Positive"
            value="89%"
          />

          <StatCard
            title="Negative"
            value="11%"
          />

        </div>

        {/* Analytics */}

        <div className="mb-8">
          <AnalyticsCard />
        </div>

        {/* Bottom Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Reviews */}

          <div className="space-y-5">

            <ReviewCard
              name="Demo Customer"
              review="Amazing service and quick response!"
              status="Positive"
              reply="Thank you for your feedback! We appreciate your support."
            />

            <ReviewCard
              name="Sample Client"
              review="Delivery was slightly slow but quality was great."
              status="Mixed"
              reply="Thank you for your honest feedback. We’ll improve our delivery speed."
            />

          </div>

          {/* AI Tools */}

          <div className="space-y-8">

            <ReplyBox />

            <SummaryCard />

          </div>

        </div>

      </div>

    </div>
  );
}
```




