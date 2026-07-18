"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLowRatingAlerts, getRatingStats } from "./actions";

export default function AlertsDashboard() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || 'OWNER';
  const canReply = teamRole !== 'VIEW_ONLY';

  const [lowRatingAlerts, setLowRatingAlerts] = useState<any[]>([]);
  const [ratingStats, setRatingStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const alertsResult = await getLowRatingAlerts();
      const statsResult = await getRatingStats();

      if (alertsResult.success) {
        setLowRatingAlerts(alertsResult.alerts);
      }
      if (statsResult.success) {
        setRatingStats(statsResult.stats);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-4 md:p-6 flex items-center justify-center">
        <p className="text-gray-400">Loading alerts...</p>
      </div>
    );
  }

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

      {/* 2 Column Layout - Sirf 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* LEFT COLUMN - Rating Overview */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-3 h-[280px] flex flex-col">
          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
            <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center text-lg">📊</div>
            <div>
              <h2 className="text-white font-medium text-sm">Rating Overview</h2>
              <span className="text-gray-500 text-xs">{ratingStats?.total || 0} total reviews</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
            {ratingStats ? (
              <div className="space-y-2 p-2">
                {/* Average Rating */}
                <div className="text-center mb-3">
                  <span className="text-3xl font-bold text-white">{ratingStats.average.toFixed(1)}</span>
                  <div className="text-amber-400 text-sm mt-1">
                    {getStars(Math.round(ratingStats.average))}
                  </div>
                </div>

                {/* Distribution Bars */}
                {ratingStats.distribution.map((item: any) => (
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
            ) : (
              <div className="text-center text-gray-500 text-xs py-6">
                No reviews yet.
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
                  <span className="text-red-400 text-xs">
                    ⚠ Critical • {lowRatingAlerts.length} alerts
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              {lowRatingAlerts.length > 0 ? (
                lowRatingAlerts.map((alert) => (
                  <div key={alert.id} className="bg-red-950/30 rounded-xl p-2 border border-red-900/20">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-600/30 rounded-full flex items-center justify-center text-xs font-bold text-red-400">
                          {alert.reviewerName?.charAt(0) || '?'}
                        </div>
                        <span className="text-white text-xs font-medium">{alert.reviewerName || 'Unknown'}</span>
                      </div>
                      <span className="text-red-400 text-xs">★{alert.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{alert.comment || 'No comment'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-[10px]">{alert.source || 'Unknown'} • {new Date(alert.reviewDate).toLocaleDateString()}</span>
                      {canReply && (
                        <div className="flex gap-1">
                          <button className="px-2 py-0.5 bg-red-600/20 text-red-400 rounded text-[10px] hover:bg-red-600/30 transition">Respond</button>
                          <button className="px-2 py-0.5 bg-gray-800 text-gray-500 rounded text-[10px] hover:bg-gray-700 transition">🗑</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
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
