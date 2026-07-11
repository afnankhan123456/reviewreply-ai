"use client";

import React from 'react';
import { 
  Search, Bell, User, ChevronDown, Download, MapPin, 
  RefreshCw, MessageSquare, FileText, CheckCircle, TrendingUp, TrendingDown
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14]">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Good Morning, Afnan 👋</h1>
            <p className="text-sm text-gray-400">Here&apos;s what&apos;s happening with your reviews today.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Location Selector */}
          <div className="flex items-center gap-2 bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C] text-sm text-gray-300 cursor-pointer">
            <MapPin size={16} className="text-gray-500" />
            <span>All Locations</span>
            <ChevronDown size={14} className="text-gray-500" />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[#181D27] px-3 py-1.5 rounded-lg border border-[#2A303C]">
            <Search size={16} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search reviews, keywords, users..." 
              className="bg-transparent border-none outline-none text-sm text-gray-300 w-48 placeholder-gray-500"
            />
          </div>

          {/* Icons & Profile */}
          <div className="flex items-center gap-3">
            <button className="p-2 bg-[#181D27] rounded-lg border border-[#2A303C] text-gray-400 hover:text-white">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-2 bg-[#181D27] px-2 py-1 rounded-lg border border-[#2A303C] cursor-pointer">
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                AK
              </div>
              <div className="text-xs text-left hidden sm:block">
                <div className="text-white font-medium leading-none">Afnan Khan</div>
                <div className="text-gray-400 text-[10px]">Admin</div>
              </div>
              <ChevronDown size={14} className="text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="px-3 py-1 bg-[#181D27] border border-[#2A303C] rounded-full text-xs text-gray-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Downtown Branch
        </span>
        <span className="px-3 py-1 bg-[#181D27] border border-[#2A303C] rounded-full text-xs text-gray-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Uptown Branch
        </span>
        <button className="px-3 py-1 border border-dashed border-[#2A303C] rounded-full text-xs text-gray-400 hover:border-gray-300">
          + Add Location
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 bg-[#181D27] px-3 py-1 rounded-lg border border-[#2A303C]">
          <span>📅</span> May 1 – May 31, 2026
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (Stats & Charts) */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard title="Total Reviews" value="1,248" change="+18.6%" trend="up" icon="💬" color="bg-blue-500/20 text-blue-400" />
            <StatCard title="Average Rating" value="4.6" change="-0.3" trend="down" icon="⭐" color="bg-yellow-500/20 text-yellow-400" />
            <StatCard title="New Reviews" value="128" change="+22.4%" trend="up" icon="📨" color="bg-blue-500/20 text-blue-400" />
            <StatCard title="Response Rate" value="76%" change="-2.4%" trend="down" icon="📈" color="bg-green-500/20 text-green-400" />
            <StatCard title="Low Rating Reviews" value="32" change="+9.1%" trend="up" icon="😡" color="bg-red-500/20 text-red-400" />
          </div>

          {/* Middle Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Overview - Chart Placeholder */}
            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-medium">Review Performance Overview</h3>
                <div className="flex gap-2">
                   <span className="text-[10px] bg-[#181D27] text-gray-400 px-2 py-1 rounded border border-[#2A303C]">Last 30 Days</span>
                </div>
              </div>
              {/* Mock Line Chart Placeholder */}
              <div className="h-48 w-full bg-gradient-to-b from-indigo-500/10 to-transparent rounded-lg relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm flex-col gap-2">
                  <span className="text-4xl">📉</span>
                  <span>Chart visualization here</span>
                </div>
                {/* Simulated Lines */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-gray-500">
                  <span>May 1</span><span>May 7</span><span>May 13</span><span>May 19</span><span>May 25</span><span>May 31</span>
                </div>
              </div>
            </div>

            {/* Review Summary - Pie/Donut Chart Placeholder */}
            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
              <h3 className="text-white font-medium mb-4">Review Summary</h3>
              <div className="flex gap-6">
                <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center bg-[#181D27] relative">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">1,248</div>
                    <div className="text-[10px] text-gray-400">Total</div>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-xs">
                   <div className="flex justify-between"><span className="text-green-500">● 5 Stars</span> <span className="text-gray-400">745 (60%)</span></div>
                   <div className="flex justify-between"><span className="text-blue-500">● 4 Stars</span> <span className="text-gray-400">248 (20%)</span></div>
                   <div className="flex justify-between"><span className="text-yellow-500">● 3 Stars</span> <span className="text-gray-400">150 (12%)</span></div>
                   <div className="flex justify-between"><span className="text-orange-500">● 2 Stars</span> <span className="text-gray-400">68 (5%)</span></div>
                   <div className="flex justify-between"><span className="text-red-500">● 1 Star</span> <span className="text-gray-400">37 (3%)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
               <h4 className="text-xs text-gray-400 mb-3">Top Review Keywords</h4>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-gray-300">Service</span><span className="text-gray-500">320</span></div>
                  <div className="w-full bg-[#1F2430] h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full w-[80%]"></div></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-300">Staff</span><span className="text-gray-500">210</span></div>
                  <div className="w-full bg-[#1F2430] h-1.5 rounded-full"><div className="bg-indigo-500 h-1.5 rounded-full w-[50%]"></div></div>
               </div>
               <button className="w-full mt-3 text-[10px] bg-[#1F2430] text-gray-400 py-1 rounded hover:bg-[#2A303C]">View All Keywords</button>
            </div>

            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
              <h4 className="text-xs text-gray-400 mb-2">Sentiment Analysis</h4>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-[6px] border-green-500 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">82%</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                 <span className="text-green-400">Positive 82%</span>
                 <span className="text-yellow-400">Neutral 12%</span>
                 <span className="text-red-400">Negative 6%</span>
              </div>
            </div>

            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
               <h4 className="text-xs text-gray-400 mb-3">Reviews by Source</h4>
               <div className="w-full h-24 flex items-center justify-center relative">
                  {/* Mock Donut */}
                  <div className="w-20 h-20 rounded-full border-[8px] border-blue-500 border-r-gray-700"></div>
                  <span className="absolute text-xs text-gray-400">898</span>
               </div>
               <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                 <span><span className="text-blue-400">●</span> Google 898</span>
                 <span><span className="text-gray-500">●</span> Facebook 210</span>
                 <span><span className="text-gray-600">●</span> Other 140</span>
              </div>
            </div>

            <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 text-center">
               <h4 className="text-xs text-gray-400 mb-3">Response Rate</h4>
               <div className="text-3xl font-bold text-white">76%</div>
               <div className="text-[10px] text-red-400 flex items-center justify-center gap-1 mt-1">
                  <TrendingDown size={12} /> -3.3% vs Apr 1 - Apr 30
               </div>
            </div>
          </div>

          {/* Recent Reviews List */}
          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-medium">Latest Reviews</h3>
              <span className="text-xs text-indigo-400 cursor-pointer hover:underline">View All Reviews →</span>
            </div>
            
            <div className="space-y-4">
              <ReviewItem 
                name="Rohit Sharma" 
                rating={3} 
                time="1 hour ago" 
                text="Very bad experience. Will not come again."
                sentiment="Negative"
                platform="Google"
              />
              <ReviewItem 
                name="Pooja Mehta" 
                rating={5} 
                time="3 hours ago" 
                text="Service was okay but staff was rude."
                sentiment="Neutral"
                platform="Facebook"
              />
              <ReviewItem 
                name="Amit Verma" 
                rating={2} 
                time="5 hours ago" 
                text="Not satisfied with the product quality."
                sentiment="Negative"
                platform="Google"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (AI Actions & Alerts) */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          
          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
             <h3 className="text-white font-medium text-sm mb-4">✨ AI Quick Actions</h3>
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
               />
               <ActionCard 
                 icon={<Send size={18} className="text-green-400" />} 
                 title="Review Request" 
                 desc="Send review requests (SMS, Email, QR)" 
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

          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
             <h3 className="text-white font-medium text-sm mb-4 flex items-center justify-between">
               Alerts & Notifications
               <span className="bg-red-500 text-[10px] text-white px-1.5 py-0.5 rounded-full">2</span>
             </h3>
             <div className="space-y-3">
                <AlertItem 
                  title="Low Rating Alert" 
                  desc="You have 32 new low rating reviews today."
                  time="1 min ago"
                  color="bg-red-500/10"
                />
                <AlertItem 
                  title="Unanswered Reviews" 
                  desc="18 reviews are waiting for your reply."
                  time="25 min ago"
                  color="bg-blue-500/10"
                />
                <AlertItem 
                  title="Review Request Sent" 
                  desc="25 review requests sent successfully."
                  time="1 hour ago"
                  color="bg-green-500/10"
                />
                <AlertItem 
                  title="Weekly Report Ready" 
                  desc="Your weekly performance report is ready."
                  time="2 hours ago"
                  color="bg-purple-500/10"
                />
             </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-[#11141C] border border-[#1F2430] rounded-lg p-3 text-center hover:bg-[#1A1D27] cursor-pointer">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-green-400">📱</div>
              <div className="text-gray-300">QR Code</div>
              <div className="text-gray-500">Generate QR</div>
            </div>
            <div className="bg-[#11141C] border border-[#1F2430] rounded-lg p-3 text-center hover:bg-[#1A1D27] cursor-pointer">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-yellow-400">🔗</div>
              <div className="text-gray-300">Request Link</div>
              <div className="text-gray-500">Copy Link</div>
            </div>
            <div className="bg-[#11141C] border border-[#1F2430] rounded-lg p-3 text-center hover:bg-[#1A1D27] cursor-pointer">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-blue-400">✉️</div>
              <div className="text-gray-300">Email Request</div>
              <div className="text-gray-500">Send Email</div>
            </div>
            <div className="bg-[#11141C] border border-[#1F2430] rounded-lg p-3 text-center hover:bg-[#1A1D27] cursor-pointer">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg mx-auto mb-1 flex items-center justify-center text-purple-400">💬</div>
              <div className="text-gray-300">SMS Request</div>
              <div className="text-gray-500">Send SMS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components ---

function StatCard({ title, value, change, trend, icon, color }: any) {
  return (
    <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">{title}</span>
        <span className={`text-xs px-1.5 py-0.5 rounded ${color}`}>{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className={`flex items-center gap-0.5 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
        <span className="text-gray-500">vs Apr 1 - Apr 30</span>
      </div>
      <div className="w-full h-[2px] bg-[#1F2430] mt-3 rounded-full overflow-hidden">
        <div className={`h-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'} w-[60%]`}></div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc, color }: any) {
  return (
    <div className={`p-3 rounded-lg border ${color} cursor-pointer hover:bg-[#1A1D27] transition-colors flex gap-3 items-start`}>
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-xs font-medium text-white">{title}</div>
        <div className="text-[10px] text-gray-400">{desc}</div>
      </div>
    </div>
  );
}

function AlertItem({ title, desc, time, color }: any) {
  return (
    <div className="flex gap-3 pb-3 border-b border-[#1F2430] last:border-0 last:pb-0">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
        <div className="w-2 h-2 rounded-full bg-current"></div>
      </div>
      <div className="flex-1">
        <div className="text-xs text-white font-medium">{title}</div>
        <div className="text-[10px] text-gray-400 leading-tight">{desc}</div>
        <div className="text-[9px] text-gray-500 mt-0.5">{time}</div>
      </div>
    </div>
  );
}

function ReviewItem({ name, rating, time, text, sentiment, platform }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-[#181D27] rounded-lg border border-[#1F2430]">
      <div className="w-8 h-8 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-xs font-bold">
        {name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
             <span className="text-xs text-white font-medium">{name}</span>
             <span className="text-[10px] text-gray-500 ml-2">{time}</span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${sentiment === 'Negative' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {sentiment}
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">{text}</div>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
           <span>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
           <span className="ml-1 bg-[#1F2430] px-1 rounded text-[9px]">{platform}</span>
        </div>
      </div>
    </div>
  );
}

// Custom Sparkle icon to match image style
function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}
