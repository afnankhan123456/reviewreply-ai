"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  MessageSquare,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Mail,
  Lock,
} from "lucide-react";
import ParticleWave from "./ParticleWave";

function LoginPageContent() {
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    const rawCallback = searchParams.get("callbackUrl");
    const safeCallback =
      rawCallback && rawCallback.startsWith("/") ? rawCallback : "/plans/basic/pricing";

    await signIn("google", {
      callbackUrl: safeCallback,
    });
  };

  return (
    <>
      <style>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="min-h-screen relative bg-black overflow-hidden">
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-30 blur-[80px] pointer-events-none" />
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full border border-[#ff3b5c]/30 pointer-events-none" />

        <ParticleWave />

        <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center px-6 lg:px-16 py-10 order-last xl:order-none">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-[#ff2d55] flex items-center justify-center text-white font-black text-lg">
                R
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                ReviewReply <span className="text-[#ff2d55]">AI</span>
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span className="text-xs font-medium text-gray-300">AI-Powered Review Management</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
              Turn Every Review
              <br />
              Into <span className="text-[#ff2d55]">Growth</span>
            </h2>
            <div className="w-14 h-1 bg-[#ff2d55] rounded-full mb-4" />

            <p className="text-gray-400 text-base max-w-lg mb-8">
              Collect, manage, and reply to reviews across all platforms.
              <br />
              Build trust. Improve reputation. Grow your business.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-10 max-w-xl">
              {[
                {
                  icon: MessageSquare,
                  title: "AI Replies",
                  desc: "Generate human-like replies in seconds.",
                },
                {
                  icon: BarChart3,
                  title: "Smart Analytics",
                  desc: "Track sentiment, ratings & performance.",
                },
                {
                  icon: ShieldCheck,
                  title: "Reputation Growth",
                  desc: "Improve trust and win more customers.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#120608] border border-white/10 rounded-2xl p-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#ff2d55]" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-4">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-4 gap-4 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-sm max-w-2xl">
              {[
                { icon: Users, value: "10K+", label: "Businesses Trust Us" },
                { icon: Star, value: "500K+", label: "Reviews Managed" },
                { icon: TrendingUp, value: "98%", label: "Customer Satisfaction" },
                { icon: Clock, value: "Instant", label: "AI Replies" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#ff2d55]" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight">{item.value}</h3>
                      <p className="text-[10px] text-gray-500 font-medium leading-tight">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - LOGIN CARD */}
          <div className="flex items-center justify-center px-6 py-10 order-first xl:order-none">
            <div className="w-full max-w-md bg-[#0a0505] border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)]">
              <div className="flex justify-center mb-5">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
                  <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
                  <div className="w-14 h-14 rounded-2xl bg-[#ff2d55] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(255,45,85,0.5)]">
                    R
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-center text-white">
                Welcome <span className="text-[#ff2d55]">Back</span>
              </h2>
              <p className="text-gray-500 text-center mt-1 text-sm mb-6">
                Sign in to continue to your dashboard
              </p>

              <button
                onClick={handleLogin}
                className="w-full bg-white hover:bg-gray-100 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Continue with Google
              </button>

              <div className="flex items-center justify-center gap-3 my-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <p className="text-gray-500 text-xs font-medium">OR</p>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <button
                type="button"
                className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
              >
                <Mail className="w-4 h-4 text-[#ff2d55]" />
                Continue with Email
              </button>

              <div className="bg-white/[0.03] rounded-xl p-3 border border-white/10 flex items-start gap-2.5 mt-5">
                <div className="w-8 h-8 rounded-full bg-[#2a0a10] text-[#ff2d55] flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <p className="text-gray-400 text-xs leading-5">
                  We use Google secure OAuth to keep your account and data safe.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Lock, title: "Secure & Safe", desc: "Enterprise-grade protection" },
                  { icon: ShieldCheck, title: "Privacy First", desc: "Your data is never shared" },
                  { icon: Zap, title: "AI Powered", desc: "Smart automation that saves time" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="w-11 h-11 rounded-2xl bg-[#2a0a10] border border-[#ff2d55]/20 text-[#ff2d55] mx-auto flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-[11px] text-white leading-tight">{item.title}</h4>
                      <p className="text-[9px] text-gray-500 mt-1 leading-tight">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
