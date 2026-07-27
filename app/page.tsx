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
  QrCode,
  FileBarChart,
  ClipboardCheck,
  ShieldAlert,
  Key,
  Server,
  UserCheck,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Ban,
  Globe,
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
          {/* Purpose statement above the fold: what it does, why Google sign-in, GBP usage, explicit authorization */}
          <p className="text-gray-400 text-sm text-center max-w-sm mt-3 px-2 leading-relaxed">
            ReviewReply AI is an AI-powered Google Business Profile review management platform.
            Securely connect your Google Business Profile to automatically sync customer reviews,
            generate AI-powered replies, respond to customer feedback, monitor ratings, analyze
            sentiment, and manage your online reputation from one dashboard. You sign in with
            Google and explicitly authorize access to your own Business Profile — we never access
            anything without your permission.
          </p>
        </div>

        {/* CTA before the login section */}
        <div className="w-full text-center mb-6">
          <h2 className="text-xl font-extrabold text-white leading-snug">
            Start Managing Your <span className="text-[#ff2d55]">Google Business Profile</span> Reviews with AI
          </h2>
          <div className="flex flex-col gap-3 mt-4">
            
              href="#google-signin"
              className="w-full bg-[#ff2d55] hover:bg-[#ff425f] transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white shadow-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
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
          </div>
        </div>

        <div
          id="google-signin"
          className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-3xl p-6 shadow-[0_0_60px_-20px_rgba(255,45,85,0.4)] mb-6"
        >
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

        {/* Why Google Sign-In is Required — mobile */}
        <div className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
              <Key className="w-4 h-4 text-[#ff2d55]" />
            </div>
            <h3 className="text-lg font-bold text-white">Why Google Sign-In is Required</h3>
          </div>
          <div className="space-y-2.5">
            {[
              "Secure Google OAuth authentication.",
              "Connect your Google Business Profile.",
              "Sync reviews from connected business locations.",
              "Generate AI-powered review replies.",
              "Publish replies back to Google Business Profile.",
              "Access is only granted after user authorization.",
              "No access to Gmail, Contacts, Drive, or unrelated Google data.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#ff2d55] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 leading-relaxed">{text}</span>
              </div>
            ))}
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

      {/* ✅ DESKTOP LAYOUT (md and above) */}
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

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span className="text-xs font-medium text-gray-300">AI-Powered Review Management</span>
            </div>

            {/* Purpose statement above the fold (desktop): what it does, why Google sign-in, GBP usage, explicit authorization */}
            <p className="text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">
              ReviewReply AI is an AI-powered Google Business Profile review management platform.
              Securely connect your Google Business Profile to automatically sync customer reviews,
              generate AI-powered replies, respond to customer feedback, monitor ratings, analyze
              sentiment, and manage your online reputation from one dashboard. You sign in with
              Google and explicitly authorize access to your own Business Profile — nothing is
              accessed without your permission.
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-4">
              Turn Every Review
              <br />
              Into <span className="text-[#ff2d55]">Growth</span>
            </h2>
            <div className="w-14 h-1 bg-[#ff2d55] rounded-full mb-4" />

            <p className="text-gray-400 text-base max-w-lg mb-6">
              Collect, manage, and reply to Google Business Profile reviews across all your locations.
              <br />
              Build trust. Improve reputation. Grow your business.
            </p>

            {/* CTA before the login section (desktop) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h3 className="text-lg font-bold text-white">
                Start Managing Your <span className="text-[#ff2d55]">Google Business Profile</span> Reviews with AI
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              
                href="#google-signin-desktop"
                className="bg-[#ff2d55] hover:bg-[#ff425f] transition-all py-3 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white shadow-sm"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleLogin}
                className="bg-white hover:bg-gray-100 transition-all py-3 px-6 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Continue with Google
              </button>
            </div>

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
            <div className="w-full max-w-md flex flex-col gap-5">
              <div
                id="google-signin-desktop"
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)]"
              >
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

              {/* Why Google Sign-In is Required — desktop, directly below the login card */}
              <div className="bg-black/30 backdrop-blur-md border border-[#ff2d55]/30 rounded-3xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4 text-[#ff2d55]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Why Google Sign-In is Required</h3>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Secure Google OAuth authentication.",
                    "Connect your Google Business Profile.",
                    "Sync reviews from connected business locations.",
                    "Generate AI-powered review replies.",
                    "Publish replies back to Google Business Profile.",
                    "Access is only granted after user authorization.",
                    "No access to Gmail, Contacts, Drive, or unrelated Google data.",
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#ff2d55] shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-300 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
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
   FULL LANDING PAGE SECTIONS — OAuth verification ready
   ================================================================ */

function InfoSection() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Seamless continuation background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_10%,rgba(255,45,85,0.15),transparent_70%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(180,0,60,0.2),transparent_70%),radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(80,0,50,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,45,85,0.1),transparent_60%),radial-gradient(circle_at_30%_80%,rgba(200,0,100,0.15),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />
        <div className="absolute top-1/4 left-0 w-full h-64 opacity-20">
          <div className="absolute top-0 left-[10%] w-96 h-96 rounded-full border border-[#ff2d55]/30 blur-sm" />
          <div className="absolute bottom-0 right-[5%] w-80 h-80 rounded-full border border-[#ff2d55]/20 blur-sm" />
          <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-pink-500/20 blur-sm" />
        </div>
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

      {/* 1. What is ReviewReply AI? — expanded */}
      <section className="px-5 py-16 md:py-24 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            What is <span className="text-[#ff2d55]">ReviewReply AI</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mt-4">
            ReviewReply AI is an AI-powered Google Business Profile review management platform.
            Businesses connect their Google Business Profile, reviews are synchronized
            automatically, AI generates replies, businesses respond to customer feedback, and
            analytics and sentiment insights are available — all from a single dashboard.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Link2, title: "Connect Google Business Profile", desc: "Link your GBP in one click." },
            { icon: RefreshCw, title: "Sync Customer Reviews", desc: "Auto‑sync all reviews across locations." },
            { icon: Sparkles, title: "AI Review Replies", desc: "Generate human‑like replies instantly." },
            { icon: BarChart3, title: "Monitor Ratings", desc: "Track star ratings over time." },
            { icon: TrendingUp, title: "Review Analytics", desc: "Deep insights into customer sentiment." },
            { icon: Smile, title: "Sentiment Analysis", desc: "Understand positive, negative & neutral feedback." },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 hover:border-[#ff2d55]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. How It Works — 6 steps */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How It <span className="text-[#ff2d55]">Works</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: UserCheck, step: "1", title: "Sign in with Google", desc: "Secure one‑click OAuth login." },
            { icon: Link2, step: "2", title: "Authorize GBP Access", desc: "Grant access to your Business Profile." },
            { icon: RefreshCw, step: "3", title: "Sync Reviews", desc: "All reviews appear automatically." },
            { icon: Sparkles, step: "4", title: "Generate AI Replies", desc: "AI drafts smart, on‑brand replies." },
            { icon: Send, step: "5", title: "Publish Replies", desc: "Replies are posted back to Google." },
            { icon: BarChart3, step: "6", title: "Monitor Analytics", desc: "Track ratings and sentiment trends." },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <span className="text-xs font-bold text-[#ff2d55] tracking-widest">STEP {s.step}</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-1">{s.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Full Features Grid */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Everything You <span className="text-[#ff2d55]">Need</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Link2, title: "Google Business Sync" },
            { icon: Sparkles, title: "AI Reply Generator" },
            { icon: BarChart3, title: "Review Dashboard" },
            { icon: TrendingUp, title: "Analytics" },
            { icon: Smile, title: "Sentiment Analysis" },
            { icon: Bell, title: "Email Alerts" },
            { icon: Send, title: "Review Requests" },
            { icon: QrCode, title: "QR Code Generator" },
            { icon: Users, title: "Team Members" },
            { icon: FileBarChart, title: "Reports" },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 hover:border-[#ff2d55]/40 transition-colors text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <h4 className="font-bold text-white text-sm">{f.title}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Why Google Access is Required */}
      <section className="px-5 py-12 md:py-16 max-w-4xl mx-auto relative z-10">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
              <Key className="w-5 h-5 text-[#ff2d55]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Why Google Access is Required</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                ReviewReply AI only requests access to your Google Business Profile after you
                explicitly sign in and authorize our application. We never access any data without
                your permission.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Read business reviews from your connected locations",
              "Synchronize reviews into your dashboard",
              "Generate AI‑powered replies to those reviews",
              "Publish replies back to Google Business Profile",
              "Display analytics and sentiment trends",
              "No access to emails, contacts, or unrelated Google services",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#ff2d55] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why ReviewReply AI Uses Google APIs */}
      <section className="px-5 py-12 md:py-16 max-w-4xl mx-auto relative z-10">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-[#ff2d55]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Why ReviewReply AI Uses Google APIs</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                We integrate with a single, purpose‑built Google API so we can sync and reply to
                your business reviews — nothing more.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Only the Google Business Profile API is used.",
              "Access is requested only after user permission.",
              "Only business review related information is accessed.",
              "No unrelated Google services are accessed.",
              "Users can revoke access anytime.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#ff2d55] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dashboard Preview */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Dashboard <span className="text-[#ff2d55]">Preview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
            <img src="/main-BG.PNG" alt="Dashboard overview" className="w-full h-64 object-cover object-top" />
          </div>
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
            <img src="/main-ph.PNG" alt="Review management" className="w-full h-64 object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 7. Security & Trust — expanded */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Enterprise‑Grade <span className="text-[#ff2d55]">Security</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {[
            { icon: ShieldCheck, title: "Secure Google OAuth" },
            { icon: Lock, title: "Encrypted Communication" },
            { icon: UserCog, title: "User‑Controlled Permissions" },
            { icon: ClipboardCheck, title: "Google API Compliance" },
            { icon: UserCheck, title: "Revoke Access Anytime" },
            { icon: Ban, title: "No Selling of Data" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 text-center hover:border-[#ff2d55]/40 transition-colors">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-[#ff2d55]" />
                </div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FAQ — expanded for OAuth verification */}
      <section className="px-5 py-12 md:py-16 max-w-3xl mx-auto relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Frequently Asked <span className="text-[#ff2d55]">Questions</span>
        </h3>
        <div className="space-y-4">
          {[
            { q: "What is ReviewReply AI?", a: "ReviewReply AI is an AI‑powered Google Business Profile review management platform that helps businesses sync reviews, generate replies, and analyze customer sentiment — all in one place." },
            { q: "Why is Google Sign-In required?", a: "We use Google OAuth to securely verify your identity and connect your Google Business Profile. This lets us sync your reviews and let you reply directly from the platform." },
            { q: "Which Google API is used?", a: "We only use the Google Business Profile API. It is the API that lets us read your reviews and publish replies on your behalf." },
            { q: "Why is Business Profile permission requested?", a: "Business Profile access is what allows ReviewReply AI to pull in your reviews and publish AI‑generated replies back to Google on your behalf." },
            { q: "What data is accessed?", a: "Only business review data from the Google Business Profile locations you connect — nothing from Gmail, Contacts, Drive, or any other Google service." },
            { q: "How do I revoke access?", a: "You can revoke access at any time from your Google Account security settings, or by disconnecting your account directly within ReviewReply AI." },
          ].map((faq, i) => (
            <details key={i} className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-5 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <HelpCircle className="w-5 h-5 text-[#ff2d55] shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer with all required links */}
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
              Contact
            </a>
            <a href="mailto:afnank6789@gmail.com" className="hover:text-[#ff2d55] transition-colors">
              Support
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
