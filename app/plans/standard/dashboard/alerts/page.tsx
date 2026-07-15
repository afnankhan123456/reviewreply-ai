"use client";

export default function AlertsDashboard() {
  const newReviews = [
    { id: 1, customer: "John D.", rating: 2, comment: "Slow service, food was okay.", source: "Google", time: "2h ago" },
    { id: 2, customer: "Jane S.", rating: 5, comment: "Amazing! Will come back again.", source: "Yelp", time: "5h ago" },
    { id: 3, customer: "Mike J.", rating: 1, comment: "Terrible. Very disappointed.", source: "Facebook", time: "8h ago" },
  ];

  const lowRatingAlerts = [
    { id: 1, customer: "Sarah W.", rating: 1, comment: "Worst experience!", platform: "Google", time: "1h ago" },
    { id: 2, customer: "Tom B.", rating: 2, comment: "Not worth it", platform: "Yelp", time: "3h ago" },
  ];

  const ratingStats = {
    average: 4.2,
    total: 245,
    distribution: [
      { stars: 5, count: 150, percent: 61 },
      { stars: 4, count: 50, percent: 20 },
      { stars: 3, count: 20, percent: 8 },
      { stars: 2, count: 15, percent: 6 },
      { stars: 1, count: 10, percent: 4 },
    ],
  };

  const getStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
            <h1 className="text-2xl font-bold text-white">Alerts Center</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1 ml-7">Monitor & manage all review activities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full border border-gray-700 text-sm w-48 pl-10 focus:outline-none focus:border-indigo-500"
            />
            <span className="absolute left-3 top-2 text-gray-500 text-sm">🔍</span>
          </div>
          <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 relative hover:bg-gray-700 transition">
            🔔
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
          </button>
        </div>
      </div>

      {/* 3-Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN - New Review Alerts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* New Review Email Alerts */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-xl">📧</div>
                <div>
                  <h2 className="text-white font-semibold">New Review Email Alerts</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-xs">Active</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium border border-blue-600/30">3 New</span>
            </div>

            {/* Review List */}
            <div className="space-y-2">
              {newReviews.map((review) => (
                <div key={review.id} className="bg-gray-800/50 rounded-xl p-3 flex items-center justify-between group hover:bg-gray-800 transition border border-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {review.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">{review.customer}</span>
                        <span className={`text-xs ${getRatingColor(review.rating)}`}>
                          {getStars(review.rating)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5">{review.comment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-xs">{review.source}</span>
                    <span className="text-gray-600 text-xs">{review.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Review Requests */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-xl">📨</div>
              <div>
                <h2 className="text-white font-semibold">Email Review Requests</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span className="text-purple-400 text-xs">Scheduled</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Send After</label>
                <select className="w-full bg-gray-800 text-gray-300 p-2.5 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500">
                  <option>24 hours after purchase</option>
                  <option>48 hours after purchase</option>
                  <option>72 hours after purchase</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Template</label>
                <select className="w-full bg-gray-800 text-gray-300 p-2.5 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500">
                  <option>Standard Template</option>
                  <option>Friendly Template</option>
                  <option>Professional Template</option>
                </select>
              </div>
            </div>
            <button className="w-full mt-3 py-2.5 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-600/30 transition border border-purple-600/30">
              Preview & Test Email
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - Rating Overview + Low Rating Alerts */}
        <div className="space-y-6">
          
          {/* Rating Overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center text-xl">📊</div>
              <div>
                <h2 className="text-white font-semibold">Rating Overview</h2>
                <span className="text-gray-500 text-xs">{ratingStats.total} total reviews</span>
              </div>
            </div>

            {/* Big Rating */}
            <div className="text-center mb-4">
              <span className="text-5xl font-bold text-white">{ratingStats.average}</span>
              <div className="text-amber-400 text-lg mt-1">★★★★☆</div>
              <span className="text-green-400 text-xs">↑ 12% vs last month</span>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-2">
              {ratingStats.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-6">{item.stars}★</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-500 text-xs w-8 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Rating Alerts */}
          <div className="bg-gray-900 border border-red-900/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-xl">🚨</div>
                  <div>
                    <h2 className="text-white font-semibold">Low Rating Alerts</h2>
                    <span className="text-red-400 text-xs">⚠ Critical • 2 alerts</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {lowRatingAlerts.map((alert) => (
                  <div key={alert.id} className="bg-red-950/30 rounded-xl p-3 border border-red-900/20">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-red-600/30 rounded-full flex items-center justify-center text-xs font-bold text-red-400">
                          {alert.customer.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{alert.customer}</span>
                      </div>
                      <span className="text-red-400 text-xs">★{alert.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{alert.comment}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-xs">{alert.platform} • {alert.time}</span>
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs hover:bg-red-600/30 transition">Respond</button>
                        <button className="px-2 py-1 bg-gray-800 text-gray-500 rounded text-xs hover:bg-gray-700 transition">🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM - Notification Settings (Full Width) */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-xl">🔔</div>
          <div>
            <h2 className="text-white font-semibold">Notification Settings</h2>
            <span className="text-gray-500 text-xs">Manage how you receive alerts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            { icon: "📱", title: "Push Notifications", desc: "Mobile & browser alerts", active: true },
            { icon: "📧", title: "Email Digest", desc: "Weekly summary report", active: false },
            { icon: "🚨", title: "Alert Notifications", desc: "Critical review alerts", active: true },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between border border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
              <button className={`relative w-11 h-6 rounded-full transition ${item.active ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${item.active ? 'left-5' : 'left-0.5'}`}></span>
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="text-gray-400 text-xs mb-1 block">Notification Email</label>
          <input 
            type="email" 
            defaultValue="admin@example.com"
            className="w-full md:w-80 bg-gray-800 text-gray-300 p-2.5 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

    </div>
  );
}
