import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  CheckCircle,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const FEATURE_CHECKLIST = [
  "Connect Google Business Profile",
  "Sync Reviews Automatically",
  "Generate AI Review Replies",
  "Publish Replies",
  "Review Analytics",
  "Sentiment Analysis",
];

const HERO_CONTENT_BLOCKS = [
  {
    icon: Sparkles,
    title: "AI-Powered Platform",
    desc: "ReviewReply AI is an AI-powered Google Business Profile review management platform.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Review Management",
    desc: "Securely connect your Google Business Profile to automatically sync customer reviews.",
  },
  {
    icon: BarChart3,
    title: "Everything In One Dashboard",
    desc: "Generate AI-powered replies, publish them to Google Business Profile, track review analytics, and manage your online reputation — all from one dashboard.",
  },
];

function LoginHero() {
  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>

      {/* ✅ MOBILE HERO */}
      <div className="flex md:hidden min-h-screen flex-col justify-center relative bg-black px-5 py-6">
        <img
          src="/main-ph.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5 mb-2.5">
            <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-11 h-11 object-contain" />
            <h1 className="text-2xl font-black tracking-tight text-white">
              ReviewReply AI
            </h1>
          </div>

          {/* Purpose - Clearly defined here for mobile crawlers/reviewers */}
          <p className="text-[11px] font-semibold text-gray-200 leading-snug max-w-xs mb-1">
            ReviewReply AI is an AI-powered Google Business Profile review management platform
            that helps businesses manage and reply to Google reviews with AI.
          </p>
          <p className="text-[10px] text-gray-400 leading-snug max-w-xs mb-3">
            Securely connect your Google Business Profile, automatically sync customer reviews,
            generate AI-powered replies, publish responses, track ratings, analyze customer
            sentiment, and manage your online reputation — all from one dashboard.
          </p>

          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
            <Sparkles className="w-3 h-3 text-[#ff2d55]" />
            <span className="text-[10px] font-medium text-gray-300">
              AI-Powered Google Business Profile Review Management
            </span>
          </div>
        </div>

        <h2 className="relative z-10 text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 text-center">
          Manage Google Reviews Smarter
        </h2>

        <div className="relative z-10 flex flex-col gap-2 mb-4">
          {HERO_CONTENT_BLOCKS.map((block, i) => {
            const Icon = block.icon;
            return (
              <div key={i} className="flex items-start gap-2.5 border-b border-white/5 last:border-b-0 pb-2 last:pb-0">
                <div className="w-6 h-6 rounded-lg bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-3 h-3 text-[#ff2d55]" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold text-white leading-tight">{block.title}</h3>
                  <p className="text-[10px] text-gray-400 leading-snug mt-0.5">{block.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-2 max-w-sm mx-auto w-full mb-4">
          {FEATURE_CHECKLIST.map((item, i) => (
            <div key={i} className="group flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_-2px_rgba(255,45,85,0.6)] transition-transform group-active:scale-90">
                <CheckCircle className="w-3 h-3 text-[#ff2d55]" />
              </div>
              <span className="text-[10px] text-gray-300 leading-tight">{item}</span>
            </div>
          ))}
        </div>

        {/* Google Data Usage Transparency - Placed here so Google sees it clearly */}
        <div className="relative z-10 bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff2d55]" />
          </div>
          <p className="text-gray-300 text-[10px] leading-snug">
            Google Sign-In is required only to verify your identity, connect your Google Business
            Profile, read reviews, generate AI replies, publish replies, and display analytics.
            Access is granted only after you authorize it, and can be revoked anytime. We never
            access Gmail, Google Drive, Calendar, Contacts, Photos, YouTube, or any unrelated
            Google services. ReviewReply AI only uses the Google Business Profile API.
          </p>
        </div>

        <div
          id="google-signin"
          className="relative z-10 w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-2xl p-5 shadow-[0_0_60px_-20px_rgba(255,45,85,0.4)]"
        >
          <div className="flex justify-center mb-3">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-lg font-extrabold text-center text-white mb-4">
            Welcome <span className="text-[#ff2d55]">Back</span>
          </h2>

          <GoogleSignInButton className="w-full bg-white hover:bg-gray-100 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm" />

          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px bg-white/10 flex-1"></div>
            <p className="text-gray-400 text-[10px] font-medium">OR</p>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button
            type="button"
            className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
          >
            <Mail className="w-4 h-4 text-[#ff2d55]" />
            Continue with Email
          </button>

          <p className="text-gray-500 text-[10px] text-center leading-snug mt-3">
            Secured with Google OAuth
          </p>

          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-white/5">
            <Lock className="w-3.5 h-3.5 text-gray-500" />
            <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
            <Sparkles className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* ✅ DESKTOP HERO */}
      <div className="hidden md:flex min-h-screen flex-col justify-center relative bg-black overflow-hidden px-10 lg:px-20 py-10">
        <img
          src="/main-BG.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid xl:grid-cols-[1.15fr_0.9fr] gap-14 items-center max-w-6xl mx-auto w-full">
          {/* Left Side - Purpose & Branding */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3.5 mb-6">
              <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-[3.3rem] h-[3.3rem] object-contain" />
              <h1 className="text-4xl font-black tracking-tight text-white">
                ReviewReply AI
              </h1>
            </div>

            <p className="text-base font-semibold text-gray-200 leading-relaxed max-w-lg mb-2">
              ReviewReply AI is an AI-powered Google Business Profile review management platform
              that helps businesses manage and reply to Google reviews with AI.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
              Securely connect your Google Business Profile, automatically sync customer reviews,
              generate AI-powered replies, publish responses, track ratings, analyze customer
              sentiment, and manage your online reputation — all from one dashboard.
            </p>
          </div>

          {/* Right Side - Login Card */}
          <div
            id="google-signin-desktop"
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-9 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)] w-full max-w-md justify-self-end"
          >
            <div className="flex justify-center mb-5">
              <div className="relative w-[4.5rem] h-[4.5rem] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
                <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
                <img src="/ai-logo.png" alt="ReviewReply AI Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-center text-white">
              Welcome <span className="text-[#ff2d55]">Back</span>
            </h2>
            <p className="text-gray-300 text-center mt-1 text-xs mb-7">
              Sign in to continue to your dashboard
            </p>

            <GoogleSignInButton className="w-full bg-white hover:bg-gray-100 transition-all py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm" />

            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px bg-white/10 flex-1"></div>
              <p className="text-gray-400 text-xs font-medium">OR</p>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <button
              type="button"
              className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
            >
              <Mail className="w-4 h-4 text-[#ff2d55]" />
              Continue with Email
            </button>

            <p className="text-gray-500 text-[11px] text-center leading-snug mt-4">
              Secured with Google OAuth
            </p>

            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5">
              <Lock className="w-4 h-4 text-gray-500" />
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              <Sparkles className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginUI() {
  return <LoginHero />;
}
