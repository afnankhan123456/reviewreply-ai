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
    desc: "Apni Google Business Profile ko connect karke saari reviews ek jagah dekho aur manage karo.",
  },
  {
    icon: Sparkles,
    title: "AI Review Replies",
    desc: "Har review ke liye AI se professional, human-like reply seconds me generate karo.",
  },
  {
    icon: BarChart3,
    title: "Review Analytics",
    desc: "Ratings, trends aur performance ka detailed analytics dashboard.",
  },
  {
    icon: Smile,
    title: "Sentiment Analysis",
    desc: "Har review ka sentiment (positive/negative/neutral) automatically detect karo.",
  },
  {
    icon: Bell,
    title: "Email Alerts",
    desc: "Nayi review aane par turant email alert paao — kuch bhi miss nahi hoga.",
  },
  {
    icon: UserCog,
    title: "Team Management",
    desc: "Apni team ko invite karo aur unke saath reviews ka kaam share karo.",
  },
];

const howItWorks = [
  {
    icon: Link2,
    step: "1",
    title: "Connect",
    desc: "Apna Google Business Profile secure OAuth ke through connect karo.",
  },
  {
    icon: RefreshCw,
    step: "2",
    title: "Sync",
    desc: "Tumhari saari reviews automatically sync ho kar dashboard me aa jaati hain.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Generate Reply",
    desc: "AI ek click me smart, relevant reply generate kar deta hai.",
  },
  {
    icon: Send,
    step: "4",
    title: "Publish",
    desc: "Reply review kar ke seedha Google Business Profile par publish kar do.",
  },
];

function InfoSection() {
  return (
    <div className="bg-black text-white">
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>

      {/* App Name + Short Description */}
      <section className="px-5 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img src="/ai-logo.png" alt="ReviewReply AI" className="w-16 h-16 object-contain mb-4" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            ReviewReply <span className="text-[#ff2d55]">AI</span>
          </h2>
        </div>
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          ReviewReply AI ek AI-powered tool hai jo businesses ko unki Google reviews
          manage karne aur unpar smart, professional replies generate karne me madad karta hai.
        </p>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mt-4">
          Detailed purpose: ReviewReply AI aapke Google Business Profile ki reviews ko sync
          karta hai, unka sentiment analyze karta hai, aur AI ki madad se relevant reply
          generate karke aapka time bachata hai — taaki aap apne customers se behtar tareeke
          se judh sakein aur apni online reputation grow kar sakein.
        </p>
      </section>

      {/* Main Features */}
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto">
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
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto">
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
      <section className="px-5 py-12 md:py-16 max-w-6xl mx-auto">
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
      <section className="px-5 py-12 md:py-16 max-w-4xl mx-auto">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#ff2d55]" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Google Data Usage</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Google Business Profile data sirf reviews sync karne aur AI replies generate
              karne ke liye use hota hai. Hum aapka data kisi third party ko bechte nahi
              hain, aur ise sirf isi app ki functionality provide karne ke liye use karte hain.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-10">
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
            {/* TODO: apna asli support email yahan daalo */}
            <a href="mailto:support@reviewreplyai.com" className="hover:text-[#ff2d55] transition-colors">
              support@reviewreplyai.com
            </a>
          </div># DEV NOTE: is placeholder email ko apne asli support email se replace karna
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
