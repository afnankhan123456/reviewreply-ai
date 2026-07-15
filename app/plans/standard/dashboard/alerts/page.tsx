"use client";

import Link from "next/link";

export default function AlertsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Review Alerts Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your review notifications and alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* New Review Email Alerts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="text-3xl mb-3">📧</div>
          <h2 className="text-lg font-semibold text-gray-900">New Review Email Alerts</h2>
          <p className="text-sm text-gray-600 mt-1">Get notified when new reviews are posted</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">● Active</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">3 new</span>
          </div>
        </div>

        {/* Email Review Requests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="text-3xl mb-3">📨</div>
          <h2 className="text-lg font-semibold text-gray-900">Email Review Requests</h2>
          <p className="text-sm text-gray-600 mt-1">Send automated review request emails</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">● Active</span>
            <span className="text-sm text-gray-500">24h after purchase</span>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="text-3xl mb-3">🔔</div>
          <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
          <p className="text-sm text-gray-600 mt-1">Manage all notification preferences</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-yellow-600 font-medium">● Custom</span>
            <span className="text-sm text-gray-500">2 enabled</span>
          </div>
        </div>

        {/* Low Rating Alerts */}
        <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm bg-red-50">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-900">Low Rating Alerts</h2>
          <p className="text-sm text-gray-600 mt-1">Alerts for negative reviews</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-red-600 font-medium">● 2 need attention</span>
            <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">Alert</span>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="text-3xl mb-3">📊</div>
          <h2 className="text-lg font-semibold text-gray-900">Rating Overview</h2>
          <p className="text-sm text-gray-600 mt-1">View rating statistics and trends</p>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">⭐ 4.2</span>
              <span className="text-sm text-green-600">↑ 12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
