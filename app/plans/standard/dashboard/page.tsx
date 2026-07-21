"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ChevronDown, RefreshCw, FileText, Send, XCircle, QrCode, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Theme state – default dark, localStorage se read
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, [pathname]);

  useEffect(() => {
    fetch('/api/standard/dashboard/overview')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to load dashboard');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLight = theme === "light";
  const bgMain = isLight ? "bg-gray-50" : "bg-[#0B0E14]";
  const bgCard = isLight ? "bg-white" : "bg-[#11141C]";
  const bgInner = isLight ? "bg-gray-100" : "bg-[#181D27]";
  const borderCard = isLight ? "border-gray-200" : "border-[#1F2430]";
  const borderInner = isLight ? "border-gray-300" : "border-[#2A303C]";
  const textPrimary = isLight ? "text-gray-900" : "text-white";
  const textSecondary = isLight ? "text-gray-500" : "text-gray-400";
  const textMuted = isLight ? "text-gray-400" : "text-gray-500";

  if (loading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${bgMain} ${textSecondary}`}>
        Loading dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`flex-1 flex items-center justify-center ${bgMain} text-red-400 text-sm`}>
        {error || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${bgMain}`}>
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{getGreeting()}, {data.userName}</h1>
            <p className={`text-sm ${textSecondary}`}>Here&apos;s what&apos;s happening with your reviews today.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className={`flex items-center gap-2 ${bgInner} px-2 py-1 rounded-lg border ${borderInner} hover:border-gray-500 transition-colors`}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {data.userName?.charAt(0).toUpperCase()}
                </div>
              )}
              <ChevronDown size={14} className="text-gray-500" />
            </button>

            {profileOpen && (
              <div className={`absolute right-0 mt-2 w-40 ${bgCard} border ${borderInner} rounded-lg shadow-lg overflow-hidden z-50`}>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (Stats & Charts) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Total Reviews" value={data.totalReviews} icon="💬" color="bg-blue-500/20 text-blue-400" theme={theme} />
            <StatCard title="Average Rating" value={data.avgRating} icon="⭐" color="bg-yellow-500/20 text-yellow-400" theme={theme} />
            <StatCard title="New Reviews" value={data.newReviews} icon="📨" color="bg-blue-500/20 text-blue-400" theme={theme} />
            <StatCard title="Response Rate" value={`${data.responseRate}%`} icon="📈" color="bg-green-500/20 text-green-400" theme={theme} />
            <StatCard title="Low Rating Reviews" value={data.lowRatingCount} icon="😡" color="bg-red-500/20 text-red-400" theme={theme} />
          </div>

          {/* Middle Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${bgCard} border ${borderCard} rounded-xl p-5`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-medium ${textPrimary}`}>Review Performance Overview</h3>
                <span className={`text-[10px] ${bgInner} ${textSecondary} px-2 py-1 rounded border ${borderInner}`}>Last 30 Days</span>
              </div>
              <div className="h-48 w-full">
                {data.dailyTrend.every((d: any) => d.count === 0) ? (
                  <div className={`h-full flex items-center justify-center text-sm ${textMuted}`}>
                    No reviews in the last 30 days yet.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.dailyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#E5E7EB" : "#1F2430"} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B7280' }} interval={4} />
                      <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: isLight ? '#fff' : '#11141C', border: `1px solid ${isLight ? '#E5E7EB' : '#2A303C'}`, fontSize: 12 }}
                        labelStyle={{ color: isLight ? '#111' : '#fff' }}
                      />
                      <Line type="monotone" dataKey="count" stroke="#6366F1" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className={`${bgCard} border ${borderCard} rounded-xl p-5`}>
              <h3 className={`font-medium mb-4 ${textPrimary}`}>Review Summary</h3>
              <div className="flex gap-6">
                <div className={`w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center ${bgInner} relative`}>
                  <div className="text-center">
                    <div className={`text-xl font-bold ${textPrimary}`}>{data.totalReviews}</div>
                    <div className={`text-[10px] ${textSecondary}`}>Total</div>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-xs">
                  {data.starBreakdown.map((s: any) => (
                    <div key={s.stars} className="flex justify-between">
                      <span className={isLight ? "text-gray-700" : "text-gray-300"}>{s.stars} Stars</span>
                      <span className={textSecondary}>{s.count} ({s.percent}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${bgCard} border ${borderCard} rounded-xl p-4`}>
               <h4 className={`text-xs mb-3 ${textSecondary}`}>Top Tags</h4>
               <div className="space-y-2">
                  {data.topTags.length === 0 && (
                    <div className={`text-[10px] ${textMuted}`}>No tags yet</div>
                  )}
                  {data.topTags.slice(0, 5).map((t: any) => (
                    <div key={t.tag}>
                      <div className="flex justify-between text-xs">
                        <span className={isLight ? "text-gray-700" : "text-gray-300"}>{t.tag}</span>
                        <span className={textSecondary}>{t.count}</span>
                      </div>
                      <div className={`w-full ${bgInner} h-1.5 rounded-full`}>
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(100, (t.count / data.totalReviews) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className={`${bgCard} border ${borderCard} rounded-xl p-4 flex flex-col justify-between`}>
              <h4 className={`text-xs mb-2 ${textSecondary}`}>Sentiment Analysis</h4>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-[6px] border-green-500 flex items-center justify-center">
                  <span className={`text-xl font-bold ${textPrimary}`}>{data.sentiment.positivePercent}%</span>
                </div>
              </div>
              <div className={`flex justify-between text-[10px] mt-2 ${textSecondary}`}>
                 <span className="text-green-400">Positive {data.sentiment.positivePercent}%</span>
                 <span className="text-yellow-400">Neutral {data.sentiment.neutralPercent}%</span>
                 <span className="text-red-400">Negative {data.sentiment.negativePercent}%</span>
              </div>
            </div>

            <div className={`${bgCard} border ${borderCard} rounded-xl p-4`}>
               <h4 className={`text-xs mb-3 ${textSecondary}`}>Reviews by Source</h4>
               <div className={`space-y-1 text-[11px] ${textSecondary}`}>
                 {data.sourceBreakdown.length === 0 && <div className={`text-[10px] ${textMuted}`}>No data yet</div>}
                 {data.sourceBreakdown.map((s: any) => (
                   <div key={s.source} className="flex justify-between">
                     <span>{s.source}</span>
                     <span>{s.count}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className={`${bgCard} border ${borderCard} rounded-xl p-4 text-center`}>
               <h4 className={`text-xs mb-3 ${textSecondary}`}>Response Rate</h4>
               <div className={`text-3xl font-bold ${textPrimary}`}>{data.responseRate}%</div>
            </div>
          </div>

          {/* Recent Reviews List */}
          <div className={`${bgCard} border ${borderCard} rounded-xl p-5`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-medium ${textPrimary}`}>Latest Reviews</h3>
              <span className="text-xs text-indigo-400 cursor-pointer hover:underline">View All Reviews →</span>
            </div>
            
            <div className="space-y-4">
              {data.latestReviews.length === 0 && (
                <div className={`text-sm text-center py-4 ${textMuted}`}>No reviews yet.</div>
              )}
              {data.latestReviews.map((r: any) => (
                <ReviewItem
                  key={r.id}
                  name={r.reviewerName}
                  rating={r.rating}
                  text={r.comment || 'No comment'}
                  sentiment={r.rating >= 4 ? 'Positive' : r.rating === 3 ? 'Neutral' : 'Negative'}
                  platform={r.source || 'Other'}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (AI Actions & Alerts) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className={`${bgCard} border ${borderCard} rounded-xl p-4`}>
             <h3 className={`font-medium text-sm mb-4 ${textPrimary}`}>✨ AI Quick Actions</h3>
             <div className="space-y-3">
               <ActionCard 
                 icon={<SparklesIcon />} 
                 title="Generate AI Reply" 
                 desc="Create smart replies in seconds" 
                 color="bg-blue-500/10 border-blue-500/20"
               />
               <ActionCard 
                 icon={<RefreshCw size={18} className="text-yellow-400" />} 
                 title="Auto-Reply Rules" 
                 desc="Set rules for 5★, 4★, 3★, 2★, 1★" 
                 color="bg-yellow-500/10 border-yellow-500/20"
                 notBuilt
               />
               <ActionCard 
                 icon={<Send size={18} className="text-green-400" />} 
                 title="Review Request" 
                 desc="Send review requests via Email" 
                 color="bg-green-500/10 border-green-500/20"
               />
               <ActionCard 
                 icon={<FileText size={18} className="text-purple-400" />} 
                 title="Review Summary Report" 
                 desc="Download weekly/monthly report" 
                 color="bg-purple-500/10 border-purple-500/20"
               />
             </div>
             <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                View All AI Tools →
             </button>
          </div>

          <div className={`${bgCard} border ${borderCard} rounded-xl p-4`}>
             <h3 className={`font-medium text-sm mb-4 flex items-center justify-between ${textPrimary}`}>
               Alerts & Notifications
               <XCircle size={14} className="text-red-500" />
             </h3>
             <div className={`text-[10px] ${textMuted}`}>Not built yet — coming soon.</div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            
              href="https://free-ai-tools-for-pdf-image-file.onrender.com/qr-generator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${bgCard} border ${borderCard} rounded-lg p-3 text-center relative hover:opacity-80 transition-opacity block`}
            >
              <ExternalLink size={10} className="absolute top-1 right-1 text-gray-500" />
              <div className="w-8 h-8 bg-green-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-green-400">
                <QrCode size={16} />
              </div>
              <div className={isLight ? "text-gray-700" : "text-gray-300"}>QR Code</div>
              <div className={textMuted}>Generate QR</div>
            </a>
            <div className={`${bgCard} border ${borderCard} rounded-lg p-3 text-center relative`}>
              <XCircle size={12} className="absolute top-1 right-1 text-red-500" />
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-yellow-400">🔗</div>
              <div className={isLight ? "text-gray-700" : "text-gray-300"}>Request Link</div>
              <div className={textMuted}>Copy Link</div>
            </div>
            <div className={`${bgCard} border ${borderCard} rounded-lg p-3 text-center relative`}>
              <XCircle size={12} className="absolute top-1 right-1 text-red-500" />
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-blue-400">✉️</div>
              <div className={isLight ? "text-gray-700" : "text-gray-300"}>Email Request</div>
              <div className={textMuted}>Send Email</div>
            </div>
            <div className={`${bgCard} border ${borderCard} rounded-lg p-3 text-center relative`}>
              <XCircle size={12} className="absolute top-1 right-1 text-red-500" />
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-purple-400">💬</div>
              <div className={isLight ? "text-gray-700" : "text-gray-300"}>SMS Request</div>
              <div className={textMuted}>Send SMS</div>
            </div>
          </div>

          {/* Top 20 Review Keywords */}
          <div className={`${bgCard} border ${borderCard} rounded-xl p-4`}>
            <h3 className={`font-medium text-sm mb-3 ${textPrimary}`}>Top 20 Review Keywords</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {data.topTags.length === 0 && (
                <div className={`text-[10px] ${textMuted}`}>No keywords yet</div>
              )}
              {data.topTags.map((t: any) => (
                <div key={t.tag} className="flex items-center justify-between text-xs">
                  <span className={isLight ? "text-gray-700" : "text-gray-300"}>{t.tag}</span>
                  <span className={`px-1.5 py-0.5 rounded ${bgInner} ${textSecondary}`}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---

function StatCard({ title, value, icon, color, theme }: any) {
  const isLight = theme === "light";
  return (
    <div className={`${isLight ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]"} border rounded-xl p-4`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>{title}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${color}`}>{icon}</span>
      </div>
      <div className={`text-2xl font-bold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>{value}</div>
    </div>
  );
}

function ActionCard({ icon, title, desc, color, notBuilt }: any) {
  return (
    <div className={`p-3 rounded-lg border ${color} cursor-pointer hover:bg-[#1A1D27] transition-colors flex gap-3 items-start relative`}>
      {notBuilt && <XCircle size={12} className="absolute top-1 right-1 text-red-500" />}
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-xs font-medium text-white">{title}</div>
        <div className="text-[10px] text-gray-400">{desc}</div>
      </div>
    </div>
  );
}

function ReviewItem({ name, rating, text, sentiment, platform, theme }: any) {
  const isLight = theme === "light";
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#181D27] border-[#1F2430]"}`}>
      <div className="w-8 h-8 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-xs font-bold">
        {name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
             <span className={`text-xs font-medium ${isLight ? "text-gray-900" : "text-white"}`}>{name}</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${sentiment === 'Negative' ? 'bg-red-500/20 text-red-400' : sentiment === 'Positive' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {sentiment}
          </span>
        </div>
        <div className={`text-xs mt-1 ${isLight ? "text-gray-600" : "text-gray-400"}`}>{text}</div>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
           <span>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
           <span className={`ml-1 px-1 rounded text-[9px] ${isLight ? "bg-gray-200" : "bg-[#1F2430]"}`}>{platform}</span>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}
