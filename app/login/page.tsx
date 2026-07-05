"use client";

import { signIn } from "next-auth/react";
import {
  ShieldCheck,
  BarChart3,
  Sparkles,
  Star,
  Brain,
  Zap,
  MessageSquare,
  CheckCircle,
  Users,
  LayoutDashboard,
  Bell,
  Layers,
  Settings
} from "lucide-react";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/plans/basic/pricing",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#f8faff] font-sans">
      {/* 🌌 Soft Glowing Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] bg-[#7b6dff]/20 blur-[140px] rounded-full" />
        <div className="absolute top-[10%] right-[-50px] w-[500px] h-[500px] bg-[#5b7cff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[30%] w-[700px] h-[400px] bg-[#8ea6ff]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-50px] right-[10%] w-[550px] h-[550px] bg-[#bba8ff]/15 blur-[130px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-6 space-y-6">
          {/* LOGO (Unchanged as requested) */}
          <div className="flex items-center gap-2 mb-2">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#111827]">
              ReviewReply <span className="text-[#6c63ff]">AI</span>
            </h1>
          </div>

          {/* HEADING */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#111827]">
              Turn Every Review Into <span className="text-[#6c63ff]">Growth</span>
            </h2>
            <p className="text-gray-500 text-lg mt-3 max-w-lg">
              AI-powered review management for modern businesses. Generate smart replies,
              track sentiment and improve your online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Sparkles, color: "bg-purple-50 text-[#7b6dff]", title: "AI-Powered Replies", desc: "Human-like responses in seconds" },
              { icon: BarChart3, color: "bg-blue-50 text-[#5b7cff]", title: "Review Analytics", desc: "Sentiment, ratings, insights" },
              { icon: ShieldCheck, color: "bg-indigo-50 text-[#6c63ff]", title: "Reputation Growth", desc: "Improve ratings & trust" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-2 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 leading-4">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🚀 EXACT DASHBOARD CARD WITH SIDEBAR, STATS, & CHARTS */}
          <div className="perspective-[1200px] max-w-[900px] mt-4 w-full">
            
            {/* Main Dashboard Card Container */}
            <div className="bg-white rounded-2xl shadow-[0_25px_70px_-15px_rgba(108,99,255,0.2)] transition-transform duration-500 transform rotateX(3deg) rotateY(-1deg) hover:rotateX(0) hover:rotateY(0) flex flex-row overflow-hidden border border-gray-100">
              
              {/* 1. Sidebar */}
              <div className="w-[180px] flex-shrink-0 p-5 bg-[#fafbff] border-r border-gray-100 hidden lg:flex flex-col gap-4">
                <div className="flex items-center gap-2 px-2 mb-2">
                  <img src="/ai-logo.png" className="w-7 h-7" />
                  <span className="font-bold text-sm text-[#111827] tracking-tight">ReviewReply AI</span>
                </div>
                <div className="flex flex-col gap-1 text-[13px]">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#f1eeff] text-[#6c63ff] font-semibold cursor-pointer"><LayoutDashboard className="w-4 h-4" /> Dashboard</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><MessageSquare className="w-4 h-4" /> Reviews</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><Sparkles className="w-4 h-4" /> AI Reply</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><BarChart3 className="w-4 h-4" /> Analytics</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><Bell className="w-4 h-4" /> Alerts</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><Layers className="w-4 h-4" /> Integrations</div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 cursor-pointer font-medium"><Settings className="w-4 h-4" /> Settings</div>
                </div>
              </div>

              {/* 2. Main Content Area */}
              <div className="flex-1 p-6 bg-white">
                
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-5 border-b border-gray-50 pb-3">
                  <h3 className="text-base font-bold text-[#111827]">Dashboard Overview</h3>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#f4f6fb] px-3 py-1.5 rounded-lg text-xs font-medium text-[#6b7280] flex items-center gap-2 cursor-pointer border border-gray-100">
                      Last 6 Months <span className="text-gray-400 text-[10px]">▼</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center text-white text-[10px] font-bold">JD</div>
                      <div className="hidden sm:block">
                        <p className="text-[11px] font-bold text-[#111827] leading-tight">John Doe</p>
                        <p className="text-[9px] text-[#7b8496]">Business Owner</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. 4 Stats Cards */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Total Reviews", value: "1,248", change: "+12.5% this month", highlight: "text-green-500", icon: null },
                    { label: "Average Rating", value: "4.6", change: "+0.4 this month", highlight: "text-green-500", icon: Star },
                    { label: "AI Replies Sent", value: "892", change: "+18.2% this month", highlight: "text-green-500", icon: null },
                    { label: "Response Rate", value: "98%", change: "+8.7% this month", highlight: "text-green-500", icon: null },
                  ].map((card, i) => (
                    <div key={i} className="bg-[#fafbff] rounded-xl p-4 border border-[#f1f2f6] shadow-sm relative">
                      <p className="text-[10px] font-medium text-[#8b95a7]">{card.label}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {card.icon && <card.icon className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                        <h4 className="text-xl font-extrabold text-[#111827] leading-none">{card.value}</h4>
                      </div>
                      <p className={`text-[10px] ${card.highlight} mt-1.5 font-medium`}>{card.change}</p>
                    </div>
                  ))}
                </div>

                {/* 4. Charts Area */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Reviews Over Time (Line Chart) */}
                  <div className="bg-[#fafbff] rounded-xl p-4 border border-[#f1f2f6] h-[180px] flex flex-col relative">
                    <h4 className="text-xs font-bold text-[#111827] mb-2">Reviews Over Time</h4>
                    <div className="flex-1 relative w-full">
                      <div className="absolute left-0 top-2 bottom-4 flex flex-col justify-between text-[8px] text-gray-400 w-5">
                        <span>200</span><span>150</span><span>100</span><span>50</span>
                      </div>
                      <div className="absolute top-0 bottom-0 right-0 left-6 flex flex-col justify-end">
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                          <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.3"/>
                              <stop offset="100%" stopColor="#6c63ff" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path d="M0,38 C20,38 30,35 40,30 C50,20 60,32 70,28 C80,22 90,12 100,8" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" />
                          <path d="M0,38 C20,38 30,35 40,30 C50,20 60,32 70,28 C80,22 90,12 100,8 V50 H0 Z" fill="url(#lineGradient)" />
                          <circle cx="100" cy="8" r="2.5" fill="#6c63ff" />
                          <rect x="88" y="-6" width="24" height="14" fill="white" rx="2" stroke="#6c63ff" strokeWidth="0.5"/>
                          <text x="92" y="4" fontSize="4.5" fill="#6c63ff" fontWeight="bold">1,248</text>
                        </svg>
                        <div className="flex justify-between text-[8px] text-gray-400 w-full border-t border-gray-200 pt-1.5 px-1">
                          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Analysis (Donut Chart) */}
                  <div className="bg-[#fafbff] rounded-xl p-4 border border-[#f1f2f6] h-[180px] flex flex-col">
                    <h4 className="text-xs font-bold text-[#111827] mb-2">Sentiment Analysis</h4>
                    <div className="flex-1 flex items-center justify-between px-2">
                      <div className="w-20 h-20 rounded-full relative" style={{ background: "conic-gradient(#22c55e 0% 75%, #e5e7eb 75% 90%, #ef4444 90% 100%)" }}>
                        <div className="absolute inset-0 m-1.5 bg-[#fafbff] rounded-full flex flex-col items-center justify-center">
                          <span className="text-[10px] font-bold text-[#111827] leading-tight">89%</span>
                          <span className="text-[7px] text-gray-400">Growth</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 text-[10px] flex-1 pl-4">
                        <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#22c55e]"></div><span className="text-gray-500">Positive</span></div><span className="font-bold text-[#111827]">75%</span></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#e5e7eb]"></div><span className="text-gray-500">Neutral</span></div><span className="font-bold text-[#111827]">15%</span></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ef4444]"></div><span className="text-gray-500">Negative</span></div><span className="font-bold text-[#111827]">10%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🟦 5. BOTTOM LIGHT BLUE LAYER / PILL */}
            <div className="w-full mt-4 bg-[#eef2fa] p-5 rounded-2xl flex justify-around items-center">
              {[
                { icon: Users, value: "10K+", label: "Businesses Trust Us" },
                { icon: Star, value: "500K+", label: "Reviews Managed" },
                { icon: Zap, value: "Instant", label: "AI Reply Generation" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="p-2.5 rounded-full bg-[#e3e7f8] text-[#6c63ff]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#111827]">{item.value}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] border border-gray-100">
            {/* Logo Center (Preserved) */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center shadow-lg">
                <img src="/ai-logo.png" alt="logo" className="w-10 h-10 object-contain filter brightness-0 invert" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-[#111827]">Welcome Back</h2>
            <p className="text-gray-500 text-center mt-2 text-sm">Sign in to continue to your dashboard</p>

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-white hover:bg-gray-50 border border-gray-200 transition-all py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-3 text-[#111827] shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-gray-400 text-xs font-medium">Secure & Fast Login</p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="bg-[#f8fafc] rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#6c63ff] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-gray-500 text-xs leading-5">We use Google secure OAuth to keep your account and data safe.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldCheck, title: "Secure OAuth", desc: "Google Protected" },
                { icon: BarChart3, title: "GDPR Ready", desc: "Privacy Compliant" },
                { icon: Brain, title: "AI Powered", desc: "Smart Automation" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-12 h-12 rounded-2xl bg-indigo-50 text-[#6c63ff] mx-auto flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-xs text-[#111827] mt-2">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-gray-400 text-center text-[10px] mt-8 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="text-[#6c63ff] font-semibold cursor-pointer hover:underline">Terms of Service</span> and{" "}
              <span className="text-[#5b7cff] font-semibold cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
