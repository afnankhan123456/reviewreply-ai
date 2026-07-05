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
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/30 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-8 lg:px-20 py-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-7 h-7" />
            </div>

            <h1 className="text-3xl font-bold text-black">
              ReviewReply{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                AI
              </span>
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-6xl font-black leading-tight text-black max-w-xl">
            Turn Every Review Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Growth
            </span>
          </h2>

          {/* Description */}
          <p className="text-zinc-600 text-xl mt-8 max-w-xl leading-relaxed">
            AI-powered review management for modern businesses.
            Generate smart replies, track sentiment and improve your
            online reputation — all in one place.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            
            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-5 shadow-xl">
              <Sparkles className="text-purple-600 mb-4 w-8 h-8" />
              <h3 className="font-bold text-black text-lg">
                AI Replies
              </h3>
              <p className="text-zinc-500 text-sm mt-2">
                Human-like smart responses in seconds.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-5 shadow-xl">
              <BarChart3 className="text-blue-600 mb-4 w-8 h-8" />
              <h3 className="font-bold text-black text-lg">
                Analytics
              </h3>
              <p className="text-zinc-500 text-sm mt-2">
                Review insights & rating tracking.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-zinc-200 rounded-3xl p-5 shadow-xl">
              <ShieldCheck className="text-indigo-600 mb-4 w-8 h-8" />
              <h3 className="font-bold text-black text-lg">
                Reputation
              </h3>
              <p className="text-zinc-500 text-sm mt-2">
                Build trust and improve business growth.
              </p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-14">
            <div className="bg-white/80 backdrop-blur-2xl border border-zinc-200 rounded-[40px] shadow-2xl p-6">
              
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-black font-bold text-xl">
                  Dashboard Overview
                </h3>

                <div className="bg-zinc-100 px-4 py-2 rounded-xl text-sm text-zinc-600">
                  Last 6 Months
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-zinc-50 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Total Reviews</p>
                  <h4 className="text-3xl font-bold mt-2 text-black">
                    1,248
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Rating</p>
                  <h4 className="text-3xl font-bold mt-2 text-black">
                    ⭐ 4.6
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">AI Replies</p>
                  <h4 className="text-3xl font-bold mt-2 text-black">
                    892
                  </h4>
                </div>

                <div className="bg-zinc-50 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">Response Rate</p>
                  <h4 className="text-3xl font-bold mt-2 text-black">
                    98%
                  </h4>
                </div>
              </div>

              {/* Fake Chart */}
              <div className="mt-10 bg-gradient-to-r from-purple-500 to-blue-500 h-52 rounded-3xl relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-6 pb-6 gap-4">
                  <div className="bg-white/80 w-10 h-16 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-24 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-32 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-20 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-40 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-28 rounded-xl"></div>
                  <div className="bg-white/80 w-10 h-48 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            
            <div className="bg-white/80 border border-zinc-200 rounded-3xl p-6 text-center shadow-lg">
              <Star className="mx-auto text-purple-600 mb-3" />
              <h3 className="text-3xl font-black text-black">10K+</h3>
              <p className="text-zinc-500 text-sm mt-2">
                Businesses Trust Us
              </p>
            </div>

            <div className="bg-white/80 border border-zinc-200 rounded-3xl p-6 text-center shadow-lg">
              <Brain className="mx-auto text-blue-600 mb-3" />
              <h3 className="text-3xl font-black text-black">500K+</h3>
              <p className="text-zinc-500 text-sm mt-2">
                Reviews Managed
              </p>
            </div>

            <div className="bg-white/80 border border-zinc-200 rounded-3xl p-6 text-center shadow-lg">
              <Zap className="mx-auto text-indigo-600 mb-3" />
              <h3 className="text-3xl font-black text-black">Instant</h3>
              <p className="text-zinc-500 text-sm mt-2">
                AI Reply Generation
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN */}
        <div className="flex items-center justify-center px-8 py-16">
          
          <div className="w-full max-w-xl bg-white/70 backdrop-blur-2xl border border-zinc-200 rounded-[40px] p-10 shadow-2xl">
            
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-[30px] bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
                <Sparkles className="text-white w-12 h-12" />
              </div>
            </div>

            {/* Welcome */}
            <h2 className="text-5xl font-black text-center text-black">
              Welcome Back
            </h2>

            <p className="text-zinc-500 text-center mt-5 text-lg">
              Sign in to continue to your dashboard
            </p>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full mt-10 bg-white border border-zinc-200 hover:scale-[1.02] transition-all duration-300 text-black py-5 rounded-2xl text-xl font-bold shadow-xl flex items-center justify-center gap-4"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-8 h-8"
              />

              Continue with Google
            </button>

            {/* Security Box */}
            <div className="mt-10 bg-zinc-50 border border-zinc-200 rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-purple-600 w-8 h-8" />

                <p className="text-zinc-600 leading-relaxed">
                  We use Google secure OAuth to keep your
                  account and business data safe.
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center">
                  <ShieldCheck className="text-purple-600" />
                </div>

                <h4 className="font-bold mt-4 text-black">
                  Secure
                </h4>

                <p className="text-zinc-500 text-sm mt-1">
                  OAuth Login
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="text-blue-600" />
                </div>

                <h4 className="font-bold mt-4 text-black">
                  GDPR
                </h4>

                <p className="text-zinc-500 text-sm mt-1">
                  Privacy Ready
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <Brain className="text-indigo-600" />
                </div>

                <h4 className="font-bold mt-4 text-black">
                  AI Powered
                </h4>

                <p className="text-zinc-500 text-sm mt-1">
                  Smart Automation
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-zinc-500 text-center text-sm mt-12 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="text-purple-600 font-semibold">
                Terms of Service
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
