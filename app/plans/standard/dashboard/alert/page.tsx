"use client";

import { useState } from "react";

export default function AlertsDashboard() {
  const [activeTab, setActiveTab] = useState("new-reviews");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [reviewRequests, setReviewRequests] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [ratingThreshold, setRatingThreshold] = useState("3");

  const tabs = [
    { id: "new-reviews", label: "New Review Email Alerts", icon: "📧" },
    { id: "review-requests", label: "Email Review Requests", icon: "📨" },
    { id: "notifications", label: "Email Notifications", icon: "🔔" },
    { id: "low-rating", label: "Low Rating Alerts", icon: "⚠️" },
    { id: "overview", label: "Rating Overview", icon: "📊" },
  ];

  const newReviews = [
    { id: 1, customer: "John Doe", rating: 2, comment: "Service was slow, but food was okay.", date: "2024-01-15", status: "unread", source: "Google" },
    { id: 2, customer: "Jane Smith", rating: 5, comment: "Amazing experience! Will come back again.", date: "2024-01-14", status: "read", source: "Yelp" },
    { id: 3, customer: "Mike Johnson", rating: 1, comment: "Terrible customer service. Very disappointed.", date: "2024-01-14", status: "unread", source: "Facebook" },
  ];

  const lowRatingAlerts = [
    { id: 1, customer: "Sarah Wilson", rating: 1, comment: "Worst experience ever!", date: "2 hours ago", platform: "Google" },
    { id: 2, customer: "Tom Brown", rating: 2, comment: "Not worth the price", date: "5 hours ago", platform: "Yelp" },
  ];

  const ratingStats = {
    total: 245,
    average: 4.2,
    distribution: [
      { stars: 5, count: 150, percentage: 61 },
      { stars: 4, count: 50, percentage: 20 },
      { stars: 3, count: 20, percentage: 8 },
      { stars: 2, count: 15, percentage: 6 },
      { stars: 1, count: 10, percentage: 4 },
    ],
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 4) return "bg-green-50 border-green-200";
    if (rating >= 3) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Review Alerts Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your review notifications and alerts</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            ⚙️ Settings
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + New Alert Rule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-white text-blue-600 border border-b-white border-gray-200 -mb-[2px]"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        
        {/* New Review Email Alerts */}
        {activeTab === "new-reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-xl font-semibold">New Review Email Alerts</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {newReviews.filter(r => r.status === "unread").length} unread
              </span>
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Instant Email Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified immediately when new reviews are posted</p>
                </div>
              </div>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative w-12 h-6 rounded-full transition ${
                  emailAlerts ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition transform ${
                    emailAlerts ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            {/* Reviews Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Customer</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Rating</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Review</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Source</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Date</th>
                    <th className="pb-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newReviews.map((review) => (
                    <tr key={review.id} className="border-b border-gray-100">
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.status === "unread" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-900">{review.customer}</td>
                      <td className="py-3">
                        <span className={`font-medium ${getRatingColor(review.rating)}`}>
                          ⭐ {review.rating}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 max-w-xs truncate">{review.comment}</td>
                      <td className="py-3 text-gray-600">{review.source}</td>
                      <td className="py-3 text-gray-600">{review.date}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">👁️</button>
                          <button className="p-1 hover:bg-gray-100 rounded">✏️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Review Requests */}
        {activeTab === "review-requests" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Email Review Requests</h2>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📨</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Automated Review Requests</h3>
                  <p className="text-sm text-gray-600">Send automated emails to customers requesting reviews</p>
                </div>
              </div>
              <button
                onClick={() => setReviewRequests(!reviewRequests)}
                className={`relative w-12 h-6 rounded-full transition ${
                  reviewRequests ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition transform ${
                    reviewRequests ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Send Request After</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="1">1 hour after purchase</option>
                  <option value="24">24 hours after purchase</option>
                  <option value="48">48 hours after purchase</option>
                  <option value="72">3 days after purchase</option>
                  <option value="168">1 week after purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="standard">Standard Template</option>
                  <option value="friendly">Friendly Template</option>
                  <option value="professional">Professional Template</option>
                  <option value="casual">Casual Template</option>
                </select>
              </div>

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Preview & Test Email
              </button>
            </div>
          </div>
        )}

        {/* Email Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Email Notifications Settings</h2>

            {[
              { icon: "🔔", title: "Push Notifications", desc: "Receive push notifications for new reviews", key: "push" },
              { icon: "📧", title: "Email Digest", desc: "Weekly summary of all reviews and ratings", key: "digest" },
              { icon: "⚠️", title: "Alert Notifications", desc: "Get notified for critical reviews", key: "alert" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (item.key === "push") setPushNotifications(!pushNotifications);
                    if (item.key === "digest") setWeeklyDigest(!weeklyDigest);
                    if (item.key === "alert") setEmailAlerts(!emailAlerts);
                  }}
                  className={`relative w-12 h-6 rounded-full transition ${
                    (item.key === "push" && pushNotifications) ||
                    (item.key === "digest" && weeklyDigest) ||
                    (item.key === "alert" && emailAlerts)
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition transform ${
                      (item.key === "push" && pushNotifications) ||
                      (item.key === "digest" && weeklyDigest) ||
                      (item.key === "alert" && emailAlerts)
                        ? "translate-x-6"
                        : ""
                    }`}
                  />
                </button>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                defaultValue="admin@example.com"
              />
            </div>
          </div>
        )}

        {/* Low Rating Alerts */}
        {activeTab === "low-rating" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Low Rating Alerts</h2>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h3 className="font-semibold text-red-700">Critical Alerts</h3>
                  <p className="text-sm text-red-600">{lowRatingAlerts.length} low rating reviews need attention</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                View All Alerts
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold</label>
              <select
                value={ratingThreshold}
                onChange={(e) => setRatingThreshold(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1">1 Star & Below</option>
                <option value="2">2 Stars & Below</option>
                <option value="3">3 Stars & Below</option>
                <option value="4">4 Stars & Below</option>
              </select>
            </div>

            <div className="space-y-4">
              {lowRatingAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
                          ⭐ {alert.rating}
                        </span>
                        <span className="font-semibold text-gray-900">{alert.customer}</span>
                        <span className="text-sm text-gray-600">on {alert.platform}</span>
                      </div>
                      <p className="text-sm text-gray-700">{alert.comment}</p>
                      <p className="text-xs text-gray-500">{alert.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition">
                        Respond
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded transition">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rating Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Rating Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Reviews", value: ratingStats.total, change: "+20 from last month", icon: "💬", color: "bg-blue-50" },
                { label: "Average Rating", value: ratingStats.average, change: "↑ +12% this month", icon: "⭐", color: "bg-green-50" },
                { label: "Response Rate", value: "92%", change: "↑ +5% from last month", icon: "📨", color: "bg-purple-50" },
                { label: "Active Alerts", value: "3", change: "2 need attention", icon: "🔔", color: "bg-orange-50" },
              ].map((stat, index) => (
                <div key={index} className={`p-4 rounded-lg border border-gray-200 ${stat.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Rating Distribution */}
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {ratingStats.distribution.map((item) => (
                  <div key={item.stars} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{item.stars} ⭐</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.count} reviews</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
