"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  ChevronRight,
  RefreshCw,
  Smile,
  Bell,
  UserCog,
  Link2,
  UploadCloud,
  FileText,
  Send,
} from "lucide-react";

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

      {/* ✅ MOBILE LAYOUT (below md) */}
      <div
        className="block md:hidden min-h-screen relative bg-black bg-no-repeat bg-cover bg-top px-5 py-8"
        style={{ backgroundImage: "url('/main-ph.PNG')" }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <img src="/ai-logo.png" alt="ReviewReply AI" className="w-20 h-20 object-contain mb-3" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            ReviewReply <span className="text-[#ff2d55]">AI</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mt-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
            <span className="text-xs font-medium text-gray-300">AI-Powered Review Management</span>
          </div>
        </div>

        <div className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-3xl p-6 shadow-[0_0_60px_-20px_rgba(255,45,85,0.4)] mb-6">
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
              <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
              <img src="/ai-logo.png" alt="logo" className="w-14 h-14 object-contain" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-center text-white">
            Welcome <span className="text-[#ff2d55]">Back</span>
          </h2>
          <p className="text-gray-300 text-center mt-1 text-sm mb-6">
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
            <p className="text-gray-300 text-xs font-medium">OR</p>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button
            type="button"
            className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
          >
            <Mail className="w-4 h-4 text-[#ff2d55]" />
            Continue with Email
          </button>

          <div className="bg-white/[0.05] rounded-xl p-3 border border-white/10 flex items-start gap-2.5 mt-5">
            <div className="w-8 h-8 rounded-full bg-[#2a0a10] text-[#ff2d55] flex items-center justify-center shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <p className="text-gray-300 text-xs leading-5">
              We use Google secure OAuth to keep your account and data safe.
            </p>
          </div>
        </div>

        <div className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/20 rounded-3xl p-2 mb-6">
          {[
            { icon: ShieldCheck, title: "Secure & Safe", desc: "Enterprise-grade protection for your data." },
            { icon: Lock, title: "Privacy First", desc: "Your data is never shared with anyone." },
            { icon: Zap, title: "AI Powered", desc: "Smart automation that saves you time." },
          ].map((item, idx, arr) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 px-3 py-4 ${
                  idx !== arr.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 text-[#ff2d55] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#ff2d55]/60 shrink-0" />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-2 bg-black/40 backdrop-blur-md border border-[#ff2d55]/20 rounded-3xl p-4">
          {[
            { icon: Users, value: "10K+", label: "Businesses Trust Us" },
            { icon: Star, value: "500K+", label: "Reviews Managed" },
            { icon: TrendingUp, value: "98%", label: "Customer Satisfaction" },
            { icon: Clock, value: "Instant", label: "AI Replies" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                <Icon className="w-4 h-4 text-[#ff2d55]" />
                <h3 className="text-sm font-extrabold text-white leading-tight">{item.value}</h3>
                <p className="text-[9px] text-gray-400 font-medium leading-tight">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ DESKTOP LAYOUT (md and above) — unchanged */}
      <div
        className="hidden md:block min-h-screen relative bg-black overflow-hidden bg-no-repeat bg-cover bg-bottom"
        style={{ backgroundImage: "url('/main-BG.PNG')" }}
      >
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-30 blur-[80px] pointer-events-none" />
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full border border-[#ff3b5c]/30 pointer-events-none" />

        <div className="relative z-10 grid xl:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center px-6 lg:px-16 py-10 order-last xl:order-none">
            <div className="flex items-center gap-3 mb-8">
              <img src="/ai-logo.png" alt="ReviewReply AI" className="w-14 h-14 object-contain" />
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
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

          <div className="flex items-center justify-center px-6 py-10 order-first xl:order-none">
            <div className="w-full max-w-md bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)]">
              <div className="flex justify-center mb-5">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
                  <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
                  <img src="/ai-logo.png" alt="logo" className="w-14 h-14 object-contain" />
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-center text-white">
                Welcome <span className="text-[#ff2d55]">Back</span>
              </h2>
              <p className="text-gray-300 text-center mt-1 text-sm mb-6">
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
                <p className="text-gray-300 text-xs font-medium">OR</p>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <button
                type="button"
                className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
              >
                <Mail className="w-4 h-4 text-[#ff2d55]" />
                Continue with Email
              </button>

              <div className="bg-white/[0.05] rounded-xl p-3 border border-white/10 flex items-start gap-2.5 mt-5">
                <div className="w-8 h-8 rounded-full bg-[#2a0a10] text-[#ff2d55] flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <p className="text-gray-300 text-xs leading-5">
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
                      <p className="text-[9px] text-gray-300 mt-1 leading-tight">{item.desc}</p>
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

export function LoginUI() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}

/* ================================================================
   NAYA CONTENT — sirf homepage (/) ke liye, /login isko touch nahi karta
   Ye section OAuth verification requirements ke liye add kiya gaya hai
   ================================================================ */

const features = [
  {
    icon: Link2,
    title: "Google Business Profile Sync",
    desc: "Connect your Google Business Profile to view and manage all your reviews in one place.",
  },
  {
    icon: Sparkles,
    title: "AI Review Replies",
    desc: "Generate professional, human-like replies for every review in seconds using AI.",
  },
  {
    icon: BarChart3,
    title: "Review Analytics",
    desc: "A detailed analytics dashboard for ratings, trends, and performance.",
  },
  {
    icon: Smile,
    title: "Sentiment Analysis",
    desc: "Automatically detect the sentiment (positive/negative/neutral) of every review.",
  },
  {
    icon: Bell,
    title: "Email Alerts",
    desc: "Get instant email alerts when a new review comes in — never miss anything.",
  },
  {
    icon: UserCog,
    title: "Team Management",
    desc: "Invite your team and share review management tasks with them.",
  },
];

const howItWorks = [
  {
    icon: Link2,
    step: "1",
    title: "Connect",
    desc: "Connect your Google Business Profile using secure OAuth.",
  },
  {
    icon: RefreshCw,
    step: "2",
    title: "Sync",
    desc: "All your reviews sync automatically and appear on the dashboard.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Generate Reply",
    desc: "AI generates a smart, relevant reply with just one click.",
  },
  {
    icon: Send,
    step: "4",
    title: "Publish",
    desc: "Review the reply and publish it directly to your Google Business Profile.",
  },
];

function InfoSection() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Seamless continuation background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Soft glow gradients — same colour palette as hero */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_10%,rgba(255,45,85,0.15),transparent_70%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(180,0,60,0.2),transparent_70%),radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(80,0,50,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,45,85,0.1),transparent_60%),radial-gradient(circle_at_30%_80%,rgba(200,0,100,0.15),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 to-transparent" />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />

        {/* Faint curved neon lines */}
        <div className="absolute top-1/4 left-0 w-full h-64 opacity-20">
          <div className="absolute top-0 left-[10%] w-96 h-96 rounded-full border border-[#ff2d55]/30 blur-sm" />
          <div className="absolute bottom-0 right-[5%] w-80 h-80 rounded-full border border-[#ff2d55]/20 blur-sm" />
          <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-pink-500/20 blur-sm" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#ff2d55]/20"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatParticle ${Math.random() * 6 + 4}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Actual content — same as before, now readable over the enhanced background */}
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
      `}</style>

      {/* App Name + Short Description */}
      <section className="px-5 py-16 md:py-24 text-center max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-6">
          <img src="/ai-logo.png" alt="ReviewReply AI" className="w-16 h-16 object-contain mb-4" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            ReviewReply <span className="text-[#ff2d55]">AI</span>
          </h2>
        </div>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          ReviewReply AI is an AI-powered tool that helps businesses manage their Google reviews and generate smart, professional replies to them.
        </p>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4">
          Detailed purpose: ReviewReply AI syncs your Google Business Profile reviews, analyzes their sentiment, and uses AI to generate relevant replies — saving you time so you can connect better with your customers and grow your online reputation.
        </p>
      </section>

      {/* Main Features */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Main <span className="text-[#ff2d55]">Features</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 hover:border-[#ff2d55]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{f.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How It <span className="text-[#ff2d55]">Works</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {howItWorks.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <span className="text-xs font-bold text-[#ff2d55] tracking-widest">STEP {s.step}</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-1">{s.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                {idx !== howItWorks.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-[#ff2d55]/50" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Screenshots / Dashboard Preview */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Dashboard <span className="text-[#ff2d55]">Preview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* TODO: In dono images ki jagah apne actual dashboard screenshots daalo (public/ folder me) */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
            <img
              src="/main-BG.PNG"
              alt="ReviewReply AI dashboard preview"
              className="w-full h-64 object-cover object-top"
            />
          </div>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
            <img
              src="/main-ph.PNG"
              alt="ReviewReply AI review management preview"
              className="w-full h-64 object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Google Data Usage */}
      <section className="px-5 py-12 md:py-16 max-w-4xl mx-auto relative z-10">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#ff2d55]" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Google Data Usage</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Google Business Profile data is used solely to sync reviews and generate AI replies. We do not sell your data to any third party, and it is only used to provide the functionality of this app.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-8 h-8 object-contain" />
            <span className="font-bold text-white">ReviewReply AI</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/legal/privacy-policy" className="hover:text-[#ff2d55] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-[#ff2d55] transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:afnank6789@gmail.com" className="hover:text-[#ff2d55] transition-colors">
              afnank6789@gmail.com
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()} ReviewReply AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <LoginUI />
      <InfoSection />
    </>
  );
}
