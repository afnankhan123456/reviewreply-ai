"use client";

export default function AlertsDashboard() {
  // ✅ Dummy data hata diya — real DB se connect hoga
  const newReviews: any[] = [];
  const lowRatingAlerts: any[] = [];
  const ratingStats: any = {};

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
      
      {/* Header - Bina Search aur Bell ke */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts Center</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor & manage all review activities</p>
        </div>
      </div>

      {/* 2 Column Layout - Small Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* LEFT COLUMN - New Review Email Alerts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 h-[280px] flex flex-col">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-lg">📧</div>
              <div>
                <h2 className="text-white font-medium text-sm">New Review Email Alerts</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-xs">Active</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-medium border border-blue-600/30">3 New</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
            {newReviews.length === 0 && (
              <div className="text-center text-gray-500 text-xs py-6">
                No new reviews yet.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - Low Rating Alerts */}
        <div className="bg-gray-900 border border-red-900/30 rounded-2xl p-3 h-[280px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full -mr-6 -mt-6 blur-xl"></div>
          <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center text-lg">🚨</div>
                <div>
                  <h2 className="text-white font-medium text-sm">Low Rating Alerts</h2>
                  <span className="text-red-400 text-xs">⚠ Critical • 2 alerts</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              {lowRatingAlerts.length === 0 && (
                <div className="text-center text-gray-500 text-xs py-6">
                  No low rating alerts yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
}
