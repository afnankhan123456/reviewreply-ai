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
} from "lucide-react";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/plans/basic/pricing",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="grid xl:grid-cols-2 min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between px-6 lg:px-16 py-6">
          {/* LOGO */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src="/ai-logo.png"
              alt="ReviewReply AI"
              className="w-10 h-10 object-contain"
            />
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
              AI-powered review management for modern businesses. Generate smart replies, track
              sentiment and improve your online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Sparkles,
                color: "text-[#7b6dff]",
                title: "AI-Powered Replies",
                desc: "Human-like responses in seconds",
              },
              {
                icon: BarChart3,
                color: "text-[#5b7cff]",
                title: "Review Analytics",
                desc: "Sentiment, ratings, insights",
              },
              {
                icon: ShieldCheck,
                color: "text-[#6c63ff]",
                title: "Reputation Growth",
                desc: "Improve ratings & trust",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
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

          {/* 🚀 TILTED DASHBOARD OVERVIEW CARD */}
          <div className="perspective-[900px] max-w-[900px] mt-4">
            <div className="border border-gray-200 rounded-2xl p-4 shadow-md transition-transform duration-500 transform rotateX(10deg) rotateY(-1deg) [transform-origin:bottom] [transform-style:preserve-3d]">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src="/ai-logo.png" className="w-6 h-6" />
                  <span className="font-bold text-sm text-[#111827]">ReviewReply AI</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="border border-gray-200 px-3 py-1 rounded-lg text-xs font-medium text-[#6b7280] flex items-center gap-1 cursor-pointer">
                    Last 6 Months <span className="text-gray-400">▼</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center text-white text-xs font-bold">
                      JD
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-bold text-[#111827] leading-tight">John Doe</p>
                      <p className="text-[10px] text-[#7b8496]">Business Owner</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#111827] mb-3">Dashboard Overview</h3>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  {
                    label: "Total Reviews",
                    value: "1,248",
                    change: "+12.5%",
                    icon: MessageSquare,
                    color: "text-purple-600",
                  },
                  {
                    label: "Average Rating",
                    value: "⭐ 4.6",
                    change: "+0.4",
                    icon: Star,
                    color: "text-yellow-500",
                  },
                  {
                    label: "AI Replies",
                    value: "892",
                    change: "+18.2%",
                    icon: Zap,
                    color: "text-blue-600",
                  },
                  {
                    label: "Response Rate",
                    value: "98%",
                    change: "+8.7%",
                    icon: CheckCircle,
                    color: "text-green-600",
                  },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-xl p-2 border border-gray-200 relative"
                    >
                      <div className={`absolute top-2 right-2 p-1 rounded-full ${card.color}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <p className="text-[10px] text-[#8b95a7] font-medium">{card.label}</p>
                      <h4 className="text-lg font-extrabold text-[#111827] mt-1">{card.value}</h4>
                      <p className="text-[10px] text-green-500 mt-1 font-semibold">
                        {card.change} this month
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Charts Area */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-2 border border-gray-200 h-32 flex flex-col">
                  <h4 className="text-xs font-bold text-[#111827] mb-2">Reviews Over Time</h4>
                  <div className="flex-1 relative w-full">
                    <svg viewBox="0 0 100 50" className="w-full h-24 absolute bottom-0">
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6c63ff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#6c63ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,40 C20,40 30,20 50,25 C70,30 80,10 100,10"
                        fill="none"
                        stroke="#6c63ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,40 C20,40 30,20 50,25 C70,30 80,10 100,10 V50 H0 Z"
                        fill="url(#lineGradient)"
                      />
                      <circle cx="100" cy="10" r="2" fill="#6c63ff" />
                    </svg>
                    <div className="absolute bottom-0 w-full flex justify-between text-[8px] text-gray-400 px-1">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-2 border border-gray-200 h-32 flex flex-col">
                  <h4 className="text-xs font-bold text-[#111827] mb-2">Sentiment Analysis</h4>
                  <div className="flex-1 flex items-center justify-between px-2">
                    <div
                      className="w-20 h-20 rounded-full relative"
                      style={{
                        background:
                          "conic-gradient(#22c55e 0% 75%, #e5e7eb 75% 90%, #ef4444 90% 100%)",
                      }}
                    >
                      <div className="absolute inset-0 m-2 bg-white rounded-full flex items-center justify-center flex-col border border-gray-200">
                        <span className="text-[8px] font-bold text-[#111827]">89%</span>
                        <span className="text-[6px] text-gray-400">Growth</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-[9px]">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                        <span className="text-gray-600">Positive</span>
                        <span className="text-gray-900 font-bold ml-auto">75%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#e5e7eb]"></div>
                        <span className="text-gray-600">Neutral</span>
                        <span className="text-gray-900 font-bold ml-auto">15%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
                        <span className="text-gray-600">Negative</span>
                        <span className="text-gray-900 font-bold ml-auto">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="grid grid-cols-3 gap-3 max-w-[720px] border border-gray-200 p-4 rounded-2xl shadow-sm">
            {[
              { icon: Users, value: "10K+", label: "Businesses Trust Us" },
              { icon: Star, value: "500K+", label: "Reviews Managed" },
              { icon: Zap, value: "Instant", label: "AI Reply Generation" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="p-2 rounded-xl text-[#6c63ff]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111827]">{item.value}</h3>
                    <p className="text-[10px] text-gray-500 font-medium">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md rounded-3xl p-8 border border-gray-200 shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center shadow-lg">
                <img
                  src="/ai-logo.png"
                  alt="logo"
                  className="w-10 h-10 object-contain filter brightness-0 invert"
                />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-[#111827]">Welcome Back</h2>
            <p className="text-gray-500 text-center mt-2 text-sm">
              Sign in to continue to your dashboard
            </p>

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-white hover:bg-gray-50 border border-gray-200 transition-all py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-3 text-[#111827] shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <p className="text-gray-400 text-xs font-medium">Secure & Fast Login</p>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="rounded-xl p-4 border border-gray-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full text-[#6c63ff] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-gray-500 text-xs leading-5">
                We use Google secure OAuth to keep your account and data safe.
              </p>
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
                    <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-[#6c63ff]">
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
              <span className="text-[#6c63ff] font-semibold cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#5b7cff] font-semibold cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
