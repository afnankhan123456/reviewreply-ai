"use client";

import { signIn } from "next-auth/react";
import {
  ShieldCheck,
  BarChart3,
  Sparkles,
  Star,
  Brain,
  Zap,
} from "lucide-react";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/plans/basic/pricing",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7fb] relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-[#bba8ff]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] bg-[#8ea6ff]/30 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 lg:px-10 py-6 space-y-6">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#111827]">
              ReviewReply <span className="text-[#6c63ff]">AI</span>
            </h1>
          </div>

          {/* HEADING */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#0f172a]">
              Turn Every Review Into <span className="text-[#6c63ff]">Growth</span>
            </h2>
            <p className="text-[#5b6475] text-lg mt-3 max-w-lg">
              AI-powered review management for modern businesses. Generate smart replies,
              track sentiment and improve your online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES (compact) */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Sparkles, color: "bg-[#f1eeff] text-[#6c63ff]", title: "AI-Powered Replies", desc: "Human-like replies in seconds" },
              { icon: BarChart3, color: "bg-[#eef3ff] text-[#5b7cff]", title: "Review Analytics", desc: "Sentiment, ratings, insights" },
              { icon: ShieldCheck, color: "bg-[#eef0ff] text-[#7a6cff]", title: "Reputation Growth", desc: "Improve ratings & trust" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">{item.title}</h3>
                    <p className="text-xs text-[#697386] mt-0.5 leading-4">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TILTED DASHBOARD PREVIEW */}
          <div className="perspective-[1200px] max-w-[720px]">
            <div className="bg-white border border-[#ebeef5] rounded-2xl p-4 shadow-[0_15px_60px_rgba(108,99,255,0.1)] transition-transform duration-300 transform rotateX(2deg) rotateY(-1deg) hover:rotateX(0) hover:rotateY(0)">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img src="/ai-logo.png" className="w-6 h-6" />
                  <span className="font-bold text-sm text-[#111827]">ReviewReply AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#f4f6fb] px-3 py-1 rounded-lg text-xs text-[#6b7280]">Last 6 Months</div>
                  <div className="flex items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-[#6c63ff]"></div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">John Doe</p>
                      <p className="text-[10px] text-[#7b8496]">Business Owner</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#111827] mb-3">Dashboard Overview</h3>

              {/* Cards */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Total Reviews", value: "1,248", change: "+12.5%" },
                  { label: "Avg Rating", value: "⭐ 4.6", change: "+0.4" },
                  { label: "AI Replies", value: "892", change: "+18.2%" },
                  { label: "Response Rate", value: "98%", change: "+8.7%" },
                ].map((card, i) => (
                  <div key={i} className="bg-[#fafbff] rounded-xl p-3 border border-[#f1f2f6]">
                    <p className="text-[10px] text-[#8b95a7]">{card.label}</p>
                    <h4 className="text-xl font-extrabold text-[#111827] mt-1">{card.value}</h4>
                    <p className="text-[10px] text-green-500 mt-1">{card.change} this month</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {/* Line Chart Placeholder */}
                <div className="bg-[#fafbff] rounded-xl p-3 border border-[#f1f2f6] h-36 flex flex-col">
                  <h4 className="text-xs font-bold text-[#111827] mb-1">Reviews Over Time</h4>
                  <div className="flex-1 flex items-end">
                    {[60, 80, 45, 90, 50, 70, 85, 95].map((val, idx) => (
                      <div key={idx} className="flex-1 mx-[1px] bg-[#6c63ff]/20 rounded-t relative" style={{ height: `${val}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#6c63ff] rounded-t" style={{ height: `${val * 0.8}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Pie placeholder */}
                <div className="bg-[#fafbff] rounded-xl p-3 border border-[#f1f2f6] h-36 flex flex-col items-center justify-center">
                  <h4 className="text-xs font-bold text-[#111827] mb-2">Sentiment</h4>
                  <div className="w-24 h-24 rounded-full border-[10px] border-[#22c55e] border-r-[#e5e7eb] border-b-[#ef4444] rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-[720px]">
            {[
              { icon: Star, value: "10K+", label: "Businesses" },
              { icon: Brain, value: "500K+", label: "Reviews Managed" },
              { icon: Zap, value: "Instant", label: "AI Reply Generation" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-[#ebeef5] rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <Icon className="text-[#6c63ff] w-6 h-6" />
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#111827]">{item.value}</h3>
                    <p className="text-xs text-[#697386]">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md bg-white border border-[#ebeef5] rounded-3xl p-8 shadow-[0_20px_60px_rgba(108,99,255,0.08)]">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center shadow-lg">
                <img src="/ai-logo.png" alt="logo" className="w-12 h-12 object-contain" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center text-[#111827]">Welcome Back</h2>
            <p className="text-[#697386] text-center mt-3 text-base">Sign in to continue to your dashboard</p>

            <button
              onClick={handleLogin}
              className="w-full mt-8 bg-white border border-[#ebeef5] hover:shadow-md transition-all py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 text-[#111827]"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-[#e5e7eb] flex-1"></div>
              <p className="text-[#697386] text-sm font-medium">Secure & Fast Login</p>
              <div className="h-px bg-[#e5e7eb] flex-1"></div>
            </div>

            <div className="bg-[#f5f7ff] rounded-2xl p-4 border border-[#eef2ff] flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6c63ff] flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <p className="text-[#5b6475] text-sm leading-5">We use Google secure OAuth to keep your account and data safe.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldCheck, color: "bg-[#f2efff] text-[#6c63ff]", title: "Secure OAuth", desc: "Google Protected" },
                { icon: BarChart3, color: "bg-[#eef3ff] text-[#5b7cff]", title: "GDPR Ready", desc: "Privacy Compliant" },
                { icon: Brain, color: "bg-[#f2efff] text-[#6c63ff]", title: "AI Powered", desc: "Smart Automation" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} mx-auto flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm text-[#111827] mt-2">{item.title}</h4>
                    <p className="text-xs text-[#697386] mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-[#697386] text-center text-xs mt-6">
              By continuing, you agree to our{" "}
              <span className="text-[#6c63ff] font-semibold">Terms of Service</span> and{" "}
              <span className="text-[#5b7cff] font-semibold">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
