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

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    const alertsResult = await getLowRatingAlerts();
    const statsResult = await getRatingStats();

    if (alertsResult.success) setLowRatingAlerts(alertsResult.alerts);
    if (statsResult.success) setRatingStats(statsResult.stats);
    setLoading(false);
  };

  const getStars = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-400";
    if (rating >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-gray-950";
  const bgCard = theme === "light" ? "bg-white" : "bg-gray-900";
  const borderCard = theme === "light" ? "border-gray-200" : "border-gray-800";
  const borderRedCard = theme === "light" ? "border-red-200" : "border-red-900/30";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-500" : "text-gray-500";
  const textRedAccent = theme === "light" ? "text-red-600" : "text-red-400";
  const bgRedAccent = theme === "light" ? "bg-red-50" : "bg-red-950/30";
  const bgRedButton = theme === "light" ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-red-600/20 text-red-400 hover:bg-red-600/30";
  const bgGrayButton = theme === "light" ? "bg-gray-200 text-gray-600 hover:bg-gray-300" : "bg-gray-800 text-gray-500 hover:bg-gray-700";

  if (loading) {
    return (
      <div className={`min-h-screen ${bgMain} p-4 md:p-6 flex items-center justify-center`}>
        <p className={textSecondary}>Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgMain} p-4 md:p-6`}>
      
      {/* Header - Bina Search aur Bell ke */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Alerts Center</h1>
          <p className={`${textMuted} text-sm mt-1`}>Monitor & manage all review activities</p>
        </div>
      </div>

      {/* 2 Column Layout - Sirf 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* LEFT COLUMN - Rating Overview */}
        <div className={`${bgCard} ${borderCard} rounded-2xl p-3 h-[280px] flex flex-col`}>
          <div className="flex items-center gap-2 mb-2 flex-shrink-0">
            <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center text-lg">📊</div>
            <div>
              <h2 className={`${textPrimary} font-medium text-sm`}>Rating Overview</h2>
              <span className={`${textMuted} text-xs`}>{ratingStats?.total || 0} total reviews</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
            {ratingStats ? (
              <div className="space-y-2 p-2">
                {/* Average Rating */}
                <div className="text-center mb-3">
                  <span className={`text-3xl font-bold ${textPrimary}`}>{ratingStats.average.toFixed(1)}</span>
                  <div className="text-amber-400 text-sm mt-1">
                    {getStars(Math.round(ratingStats.average))}
                  </div>
                </div>

                {/* Distribution Bars */}
                {ratingStats.distribution.map((item: any) => (
                  <div key={item.stars} className="flex items-center gap-2">
                    <span className={`${textSecondary} text-xs w-6`}>{item.stars}★</span>
                    <div className={`flex-1 h-2 rounded-full overflow-hidden ${theme === "light" ? "bg-gray-200" : "bg-gray-800"}`}>
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span className={`${textMuted} text-xs w-8 text-right`}>{item.percent}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center ${textMuted} text-xs py-6`}>
                No reviews yet.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN - Low Rating Alerts */}
        <div className={`${bgCard} ${borderRedCard} rounded-2xl p-3 h-[280px] flex flex-col relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full -mr-6 -mt-6 blur-xl"></div>
          <div className="relative flex flex-col h-full">
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center text-lg">🚨</div>
                <div>
                  <h2 className={`${textPrimary} font-medium text-sm`}>Low Rating Alerts</h2>
                  <span className={`${textRedAccent} text-xs`}>
                    ⚠ Critical • {lowRatingAlerts.length} alerts
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              {lowRatingAlerts.length > 0 ? (
                lowRatingAlerts.map((alert) => (
                  <div key={alert.id} className={`${bgRedAccent} rounded-xl p-2 border ${theme === "light" ? "border-red-200" : "border-red-900/20"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          theme === "light" ? "bg-red-200 text-red-700" : "bg-red-600/30 text-red-400"
                        }`}>
                          {alert.reviewerName?.charAt(0) || '?'}
                        </div>
                        <span className={`${textPrimary} text-xs font-medium`}>{alert.reviewerName || 'Unknown'}</span>
                      </div>
                      <span className={textRedAccent}>★{alert.rating}</span>
                    </div>
                    <p className={`${textSecondary} text-xs mb-2`}>{alert.comment || 'No comment'}</p>
                    <div className="flex items-center justify-between">
                      <span className={`${textMuted} text-[10px]`}>{alert.source || 'Unknown'} • {new Date(alert.reviewDate).toLocaleDateString()}</span>
                      {canReply && (
                        <div className="flex gap-1">
                          <button className={`px-2 py-0.5 rounded text-[10px] transition ${bgRedButton}`}>Respond</button>
                          <button className={`px-2 py-0.5 rounded text-[10px] transition ${bgGrayButton}`}>🗑</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center ${textMuted} text-xs py-6`}>
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
          background: ${theme === "light" ? "#d1d5db" : "#374151"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === "light" ? "#9ca3af" : "#4b5563"};
        }
      `}</style>
    </div>
  );
}
