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
    <div className="min-h-screen overflow-hidden bg-white relative">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-purple-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-300/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-10">

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/ai-logo.png"
              alt="ReviewReply AI"
              className="w-12 h-12 object-contain"
            />

            <h1 className="text-2xl font-bold text-black">
              ReviewReply{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                AI
              </span>
            </h1>
          </div>

          {/* HEADING */}
          <div className="max-w-[580px]">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-black">
              Turn Every Review Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Growth
              </span>
            </h2>

            <p className="text-zinc-600 text-lg mt-6 leading-relaxed">
              AI-powered review management for modern businesses.
              Generate smart replies, track sentiment and improve your
              online reputation — all in one place.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-4 mt-10">

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-md">
              <Sparkles className="text-purple-600 mb-3 w-6 h-6" />

              <h3 className="font-bold text-black text-base">
                AI Replies
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                Human-like responses in seconds.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-md">
              <BarChart3 className="text-blue-600 mb-3 w-6 h-6" />

              <h3 className="font-bold text-black text-base">
                Analytics
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                Review insights & tracking.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-md">
              <ShieldCheck className="text-indigo-600 mb-3 w-6 h-6" />

              <h3 className="font-bold text-black text-base">
                Reputation
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                Build customer trust faster.
              </p>
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="mt-10">

            <div className="bg-white border border-zinc-200 rounded-[30px] shadow-xl p-5">

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-black font-bold text-lg">
                  Dashboard Overview
                </h3>

                <div className="bg-zinc-100 px-3 py-1 rounded-lg text-xs text-zinc-600">
                  Last 6 Months
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                <div className="bg-zinc-50 rounded-xl p-3">
                  <p className="text-zinc-500 text-xs">
                    Total Reviews
                  </p>

                  <h4 className="text-xl font-bold mt-1 text-black">
                    1,248
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-xl p-3">
                  <p className="text-zinc-500 text-xs">
                    Rating
                  </p>

                  <h4 className="text-xl font-bold mt-1 text-black">
                    ⭐ 4.6
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-xl p-3">
                  <p className="text-zinc-500 text-xs">
                    AI Replies
                  </p>

                  <h4 className="text-xl font-bold mt-1 text-black">
                    892
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-xl p-3">
                  <p className="text-zinc-500 text-xs">
                    Response Rate
                  </p>

                  <h4 className="text-xl font-bold mt-1 text-black">
                    98%
                  </h4>
                </div>
              </div>

              {/* CHART */}
              <div className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500 h-32 rounded-2xl relative overflow-hidden">

                <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-4 pb-4 gap-3">

                  <div className="bg-white/80 w-7 h-10 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-16 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-20 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-12 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-24 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-16 rounded-lg"></div>
                  <div className="bg-white/80 w-7 h-28 rounded-lg"></div>

                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM STATS */}
          <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center shadow-md">
              <Star className="mx-auto text-purple-600 mb-2 w-5 h-5" />

              <h3 className="text-xl font-black text-black">
                10K+
              </h3>

              <p className="text-zinc-500 text-xs mt-1">
                Businesses
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center shadow-md">
              <Brain className="mx-auto text-blue-600 mb-2 w-5 h-5" />

              <h3 className="text-xl font-black text-black">
                500K+
              </h3>

              <p className="text-zinc-500 text-xs mt-1">
                Reviews
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center shadow-md">
              <Zap className="mx-auto text-indigo-600 mb-2 w-5 h-5" />

              <h3 className="text-xl font-black text-black">
                Instant
              </h3>

              <p className="text-zinc-500 text-xs mt-1">
                AI Replies
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN */}
        <div className="flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-[35px] p-8 shadow-2xl">

            {/* LOGIN LOGO */}
            <div className="flex justify-center mb-6">
              <img
                src="/ai-logo.png"
                alt="ReviewReply AI"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* TEXT */}
            <h2 className="text-3xl font-black text-center text-black">
              Welcome Back
            </h2>

            <p className="text-zinc-500 text-center mt-3 text-base">
              Sign in to continue to your dashboard
            </p>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full mt-8 bg-white border border-zinc-200 hover:scale-[1.02] transition-all duration-300 text-black py-3 rounded-2xl text-base font-bold shadow-lg flex items-center justify-center gap-3"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />

              Continue with Google
            </button>

            {/* SECURITY */}
            <div className="mt-8 bg-zinc-50 border border-zinc-200 rounded-2xl p-4">

              <div className="flex items-start gap-3">
                <ShieldCheck className="text-purple-600 w-6 h-6 mt-1" />

                <p className="text-zinc-600 text-sm leading-relaxed">
                  We use secure Google OAuth to keep your account
                  and business data safe.
                </p>
              </div>
            </div>

            {/* BADGES */}
            <div className="grid grid-cols-3 gap-3 mt-8">

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 flex items-center justify-center">
                  <ShieldCheck className="text-purple-600 w-5 h-5" />
                </div>

                <h4 className="font-bold mt-2 text-black text-sm">
                  Secure
                </h4>

                <p className="text-zinc-500 text-xs mt-1">
                  OAuth
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="text-blue-600 w-5 h-5" />
                </div>

                <h4 className="font-bold mt-2 text-black text-sm">
                  GDPR
                </h4>

                <p className="text-zinc-500 text-xs mt-1">
                  Privacy
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Brain className="text-indigo-600 w-5 h-5" />
                </div>

                <h4 className="font-bold mt-2 text-black text-sm">
                  AI
                </h4>

                <p className="text-zinc-500 text-xs mt-1">
                  Powered
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <p className="text-zinc-500 text-center text-xs mt-8 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="text-purple-600 font-semibold">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-blue-600 font-semibold">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
