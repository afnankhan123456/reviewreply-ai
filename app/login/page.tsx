"use client";

import { signIn } from "next-auth/react";
import {
  ShieldCheck,
  BarChart3,
  Sparkles,
  Brain,
  Star,
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
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-[#bba8ff]/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-[#8ea6ff]/30 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-10">

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-10">

            <img
              src="/ai-logo.png"
              alt="ReviewReply AI"
              className="w-14 h-14 object-contain"
            />

            <h1 className="text-[38px] font-black tracking-tight text-[#111827]">
              ReviewReply{" "}
              <span className="text-[#6c63ff]">
                AI
              </span>
            </h1>
          </div>

          {/* HEADING */}
          <div className="max-w-[650px]">

            <h2 className="text-[82px] leading-[88px] font-black tracking-tight text-[#0f172a]">
              Turn Every Review Into{" "}
              <span className="text-[#6c63ff]">
                Growth
              </span>
            </h2>

            <p className="text-[#5b6475] text-[28px] leading-[44px] mt-8 max-w-[620px]">
              AI-powered review management for modern businesses.
              Generate smart replies, track sentiment and improve
              your online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-3 gap-6 mt-14 max-w-[760px]">

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#f1eeff] flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#6c63ff]" />
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#111827]">
                  AI-Powered Replies
                </h3>

                <p className="text-[#697386] text-[16px] mt-1 leading-7">
                  Generate human-like responses in seconds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#eef3ff] flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-[#5b7cff]" />
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#111827]">
                  Review Analytics
                </h3>

                <p className="text-[#697386] text-[16px] mt-1 leading-7">
                  Track sentiment, ratings and key insights
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#eef0ff] flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#7a6cff]" />
              </div>

              <div>
                <h3 className="text-[22px] font-bold text-[#111827]">
                  Reputation Growth
                </h3>

                <p className="text-[#697386] text-[16px] mt-1 leading-7">
                  Improve ratings and build customer trust
                </p>
              </div>
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="mt-14 max-w-[820px]">

            <div className="bg-white border border-[#ebeef5] rounded-[38px] p-6 shadow-[0_20px_80px_rgba(108,99,255,0.12)]">

              {/* TOP */}
              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <img
                    src="/ai-logo.png"
                    className="w-8 h-8"
                  />

                  <span className="font-bold text-[#111827] text-[18px]">
                    ReviewReply AI
                  </span>
                </div>

                <div className="flex items-center gap-3">

                  <div className="bg-[#f4f6fb] px-4 py-2 rounded-xl text-[13px] text-[#6b7280]">
                    Last 6 Months
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#6c63ff]"></div>

                    <div>
                      <p className="text-[13px] font-bold text-[#111827]">
                        John Doe
                      </p>

                      <p className="text-[11px] text-[#7b8496]">
                        Business Owner
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-[22px] font-bold text-[#111827] mb-5">
                Dashboard Overview
              </h3>

              {/* CARDS */}
              <div className="grid grid-cols-4 gap-4">

                <div className="bg-[#fafbff] rounded-2xl p-5 border border-[#f1f2f6]">
                  <p className="text-[#8b95a7] text-[13px]">
                    Total Reviews
                  </p>

                  <h4 className="text-[34px] font-black text-[#111827] mt-2">
                    1,248
                  </h4>

                  <p className="text-[#22c55e] text-[12px] mt-2">
                    +12.5% this month
                  </p>
                </div>

                <div className="bg-[#fafbff] rounded-2xl p-5 border border-[#f1f2f6]">
                  <p className="text-[#8b95a7] text-[13px]">
                    Average Rating
                  </p>

                  <h4 className="text-[34px] font-black text-[#111827] mt-2">
                    ⭐ 4.6
                  </h4>

                  <p className="text-[#22c55e] text-[12px] mt-2">
                    +0.4 this month
                  </p>
                </div>

                <div className="bg-[#fafbff] rounded-2xl p-5 border border-[#f1f2f6]">
                  <p className="text-[#8b95a7] text-[13px]">
                    AI Replies Sent
                  </p>

                  <h4 className="text-[34px] font-black text-[#111827] mt-2">
                    892
                  </h4>

                  <p className="text-[#22c55e] text-[12px] mt-2">
                    +18.2% this month
                  </p>
                </div>

                <div className="bg-[#fafbff] rounded-2xl p-5 border border-[#f1f2f6]">
                  <p className="text-[#8b95a7] text-[13px]">
                    Response Rate
                  </p>

                  <h4 className="text-[34px] font-black text-[#111827] mt-2">
                    98%
                  </h4>

                  <p className="text-[#22c55e] text-[12px] mt-2">
                    +8.7% this month
                  </p>
                </div>
              </div>

              {/* CHART AREA */}
              <div className="grid grid-cols-2 gap-5 mt-6">

                {/* LINE CHART */}
                <div className="bg-[#fafbff] rounded-3xl p-6 border border-[#f1f2f6] relative h-[260px] overflow-hidden">

                  <h4 className="font-bold text-[#111827] mb-4">
                    Reviews Over Time
                  </h4>

                  {/* SVG LINE */}
                  <svg
                    className="absolute left-0 top-16 w-full h-[180px]"
                    viewBox="0 0 500 180"
                    fill="none"
                  >
                    <path
                      d="M0 140 C80 120,120 50,180 90 C240 130,280 20,340 60 C400 100,440 30,500 10"
                      stroke="#6c63ff"
                      strokeWidth="6"
                      fill="none"
                    />

                    <circle cx="500" cy="10" r="8" fill="#6c63ff" />
                  </svg>
                </div>

                {/* PIE */}
                <div className="bg-[#fafbff] rounded-3xl p-6 border border-[#f1f2f6]">

                  <h4 className="font-bold text-[#111827] mb-6">
                    Sentiment Analysis
                  </h4>

                  <div className="flex items-center justify-center h-[180px]">

                    <div className="w-[150px] h-[150px] rounded-full border-[18px] border-[#22c55e] border-r-[#e5e7eb] border-b-[#ef4444] rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="grid grid-cols-3 gap-5 mt-8 max-w-[820px]">

            <div className="bg-white border border-[#ebeef5] rounded-3xl p-6 shadow-[0_10px_40px_rgba(108,99,255,0.08)]">
              <div className="flex items-center gap-4">

                <Star className="text-[#6c63ff] w-9 h-9" />

                <div>
                  <h3 className="text-[40px] font-black text-[#111827]">
                    10K+
                  </h3>

                  <p className="text-[#697386] text-[15px]">
                    Businesses Trust Us
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#ebeef5] rounded-3xl p-6 shadow-[0_10px_40px_rgba(108,99,255,0.08)]">
              <div className="flex items-center gap-4">

                <Brain className="text-[#6c63ff] w-9 h-9" />

                <div>
                  <h3 className="text-[40px] font-black text-[#111827]">
                    500K+
                  </h3>

                  <p className="text-[#697386] text-[15px]">
                    Reviews Managed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#ebeef5] rounded-3xl p-6 shadow-[0_10px_40px_rgba(108,99,255,0.08)]">
              <div className="flex items-center gap-4">

                <Zap className="text-[#6c63ff] w-9 h-9" />

                <div>
                  <h3 className="text-[40px] font-black text-[#111827]">
                    Instant
                  </h3>

                  <p className="text-[#697386] text-[15px]">
                    AI Reply Generation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8 py-10">

          <div className="w-full max-w-[620px] bg-white border border-[#ebeef5] rounded-[42px] p-10 shadow-[0_20px_80px_rgba(108,99,255,0.12)]">

            {/* TOP LOGO */}
            <div className="flex justify-center mb-10">

              <div className="w-[120px] h-[120px] rounded-[36px] bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] flex items-center justify-center shadow-[0_20px_60px_rgba(108,99,255,0.35)]">

                <img
                  src="/ai-logo.png"
                  alt="logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            {/* TEXT */}
            <h2 className="text-[62px] leading-[70px] font-black text-center text-[#111827]">
              Welcome Back
            </h2>

            <p className="text-[#697386] text-center mt-5 text-[26px] leading-10">
              Sign in to continue to your dashboard
            </p>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full mt-10 bg-white border border-[#ebeef5] hover:scale-[1.01] transition-all duration-300 py-6 rounded-3xl text-[28px] font-bold shadow-[0_10px_40px_rgba(108,99,255,0.08)] flex items-center justify-center gap-5 text-[#111827]"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-10 h-10"
              />

              Continue with Google
            </button>

            {/* SECURE */}
            <div className="flex items-center justify-center gap-6 my-10">

              <div className="h-[1px] bg-[#e5e7eb] flex-1"></div>

              <p className="text-[#697386] text-[22px] font-medium">
                Secure & Fast Login
              </p>

              <div className="h-[1px] bg-[#e5e7eb] flex-1"></div>
            </div>

            {/* BOX */}
            <div className="bg-[#f5f7ff] rounded-3xl p-6 border border-[#eef2ff]">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-[#6c63ff] flex items-center justify-center">
                  <ShieldCheck className="text-white w-7 h-7" />
                </div>

                <p className="text-[#5b6475] text-[18px] leading-8">
                  We use Google secure OAuth to keep your
                  account and data safe.
                </p>
              </div>
            </div>

            {/* BADGES */}
            <div className="grid grid-cols-3 gap-6 mt-10">

              <div className="text-center">

                <div className="w-20 h-20 rounded-3xl bg-[#f2efff] mx-auto flex items-center justify-center">
                  <ShieldCheck className="text-[#6c63ff] w-10 h-10" />
                </div>

                <h4 className="font-bold text-[#111827] text-[22px] mt-5">
                  Secure OAuth
                </h4>

                <p className="text-[#697386] text-[15px] mt-2">
                  Google Protected
                </p>
              </div>

              <div className="text-center">

                <div className="w-20 h-20 rounded-3xl bg-[#eef3ff] mx-auto flex items-center justify-center">
                  <BarChart3 className="text-[#5b7cff] w-10 h-10" />
                </div>

                <h4 className="font-bold text-[#111827] text-[22px] mt-5">
                  GDPR Ready
                </h4>

                <p className="text-[#697386] text-[15px] mt-2">
                  Privacy Compliant
                </p>
              </div>

              <div className="text-center">

                <div className="w-20 h-20 rounded-3xl bg-[#f2efff] mx-auto flex items-center justify-center">
                  <Brain className="text-[#6c63ff] w-10 h-10" />
                </div>

                <h4 className="font-bold text-[#111827] text-[22px] mt-5">
                  AI Powered
                </h4>

                <p className="text-[#697386] text-[15px] mt-2">
                  Smart Automation
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <p className="text-[#697386] text-center text-[16px] leading-8 mt-12">
              By continuing, you agree to our{" "}
              <span className="text-[#6c63ff] font-semibold">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#5b7cff] font-semibold">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
