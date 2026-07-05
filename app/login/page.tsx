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
    <div className="min-h-screen overflow-hidden relative bg-[#0b0d1a]">
      {/* 🌌 Aurora Mesh Gradient Background (multiple soft glowing blobs) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-[#7b6dff]/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-50px] w-[400px] h-[400px] bg-[#5b7cff]/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[30%] w-[600px] h-[300px] bg-[#8ea6ff]/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-50px] right-[10%] w-[450px] h-[450px] bg-[#bba8ff]/20 blur-[120px] rounded-full" />
      </div>

      {/* 🌊 Glowing wave layers at the bottom (SVG for a modern SaaS feel) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#wave1)"
            fillOpacity="0.15"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="url(#wave2)"
            fillOpacity="0.1"
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,181.3C672,181,768,139,864,133.3C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7b6dff" />
              <stop offset="100%" stopColor="#5b7cff" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8ea6ff" />
              <stop offset="100%" stopColor="#bba8ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 lg:px-10 py-6 space-y-6 text-white">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-10 h-10 object-contain" />
            <h1 className="text-2xl font-extrabold tracking-tight">
              ReviewReply <span className="text-[#6c63ff]">AI</span>
            </h1>
          </div>

          {/* HEADING */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Turn Every Review Into <span className="text-[#6c63ff]">Growth</span>
            </h2>
            <p className="text-white/60 text-lg mt-3 max-w-lg">
              AI-powered review management for modern businesses. Generate smart replies,
              track sentiment and improve your online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Sparkles, color: "bg-[#f1eeff]/10 text-[#b4a7ff]", title: "AI-Powered Replies", desc: "Human-like replies in seconds" },
              { icon: BarChart3, color: "bg-[#eef3ff]/10 text-[#8ea6ff]", title: "Review Analytics", desc: "Sentiment, ratings, insights" },
              { icon: ShieldCheck, color: "bg-[#eef0ff]/10 text-[#9b8eff]", title: "Reputation Growth", desc: "Improve ratings & trust" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5 leading-4">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TILTED DASHBOARD PREVIEW */}
          <div className="perspective-[1200px] max-w-[720px]">
            <div className="bg-white border border-white/10 rounded-2xl p-4 shadow-[0_15px_60px_rgba(108,99,255,0.2)] transition-transform duration-300 transform rotateX(2deg) rotateY(-1deg) hover:rotateX(0) hover:rotateY(0)">
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
                <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 shadow-sm text-white">
                  <Icon className="text-[#6c63ff] w-6 h-6" />
                  <div>
                    <h3 className="text-2xl font-extrabold">{item.value}</h3>
                    <p className="text-xs text-white/50">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-white">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center shadow-lg">
                <img src="/ai-logo.png" alt="logo" className="w-12 h-12 object-contain" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-center">Welcome Back</h2>
            <p className="text-white/60 text-center mt-3 text-base">Sign in to continue to your dashboard</p>

            <button
              onClick={handleLogin}
              className="w-full mt-8 bg-white hover:bg-white/90 transition-all py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 text-[#111827] shadow-lg"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-white/20 flex-1"></div>
              <p className="text-white/50 text-sm font-medium">Secure & Fast Login</p>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6c63ff] flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <p className="text-white/70 text-sm leading-5">We use Google secure OAuth to keep your account and data safe.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldCheck, color: "bg-white/10 text-[#b4a7ff]", title: "Secure OAuth", desc: "Google Protected" },
                { icon: BarChart3, color: "bg-white/10 text-[#8ea6ff]", title: "GDPR Ready", desc: "Privacy Compliant" },
                { icon: Brain, color: "bg-white/10 text-[#9b8eff]", title: "AI Powered", desc: "Smart Automation" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} mx-auto flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm mt-2">{item.title}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-white/50 text-center text-xs mt-6">
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
