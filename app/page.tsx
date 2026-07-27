import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Mail,
  CheckCircle,
  RefreshCw,
  Smile,
  Bell,
  UserCog,
  Link2,
  Send,
  QrCode,
  FileBarChart,
  ClipboardCheck,
  UserCheck,
  HelpCircle,
  Ban,
  Globe,
  BarChart3,
  TrendingUp,
  Users,
  Key,
  X,
} from "lucide-react";

/* ================================================================
   SHARED CONTENT
   ================================================================ */

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

/* ================================================================
   ABOVE-THE-FOLD HERO + SIGN-IN
   ================================================================ */

function LoginHero() {
  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>

      {/* ✅ MOBILE HERO (below md) — everything visible without scrolling */}
      <div
        className="flex md:hidden min-h-screen flex-col justify-center relative bg-black bg-no-repeat bg-cover bg-top px-5 py-6"
        style={{ backgroundImage: "url('/main-ph.PNG')" }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5 mb-2.5">
            <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-11 h-11 object-contain" />
            <h1 className="text-2xl font-black tracking-tight text-white">
              ReviewReply <span className="text-[#ff2d55]">AI</span>
            </h1>
          </div>

          <p className="text-[11px] font-semibold text-gray-200 leading-snug max-w-xs mb-1">
            ReviewReply AI is an AI-powered Google Business Profile review management platform.
          </p>
          <p className="text-[10px] text-gray-400 leading-snug max-w-xs mb-3">
            It helps businesses securely connect their Google Business Profile, automatically sync
            customer reviews, generate AI-powered replies, publish responses, track ratings,
            analyze customer sentiment, and manage online reputation from one dashboard.
          </p>

          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
            <Sparkles className="w-3 h-3 text-[#ff2d55]" />
            <span className="text-[10px] font-medium text-gray-300">
              AI-Powered Google Business Profile Review Management
            </span>
          </div>
        </div>

        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 text-center">
          Manage Google Reviews Smarter
        </h2>

        <div className="flex flex-col gap-2 mb-4">
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

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 max-w-sm mx-auto w-full mb-4">
          {FEATURE_CHECKLIST.map((item, i) => (
            <div key={i} className="group flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_-2px_rgba(255,45,85,0.6)] transition-transform group-active:scale-90">
                <CheckCircle className="w-3 h-3 text-[#ff2d55]" />
              </div>
              <span className="text-[10px] text-gray-300 leading-tight">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2 mb-4">
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
          className="w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-2xl p-5 shadow-[0_0_60px_-20px_rgba(255,45,85,0.4)]"
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

      {/* ✅ DESKTOP HERO (md and above) — everything visible without scrolling */}
      <div
        className="hidden md:flex min-h-screen flex-col justify-center relative bg-black overflow-hidden bg-no-repeat bg-cover bg-bottom px-10 lg:px-20 py-10"
        style={{ backgroundImage: "url('/main-BG.PNG')" }}
      >
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid xl:grid-cols-[1.15fr_0.9fr] gap-14 items-center max-w-6xl mx-auto w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-3.5 mb-5">
              <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-[3.3rem] h-[3.3rem] object-contain" />
              <h1 className="text-4xl font-black tracking-tight text-white">
                ReviewReply <span className="text-[#ff2d55]">AI</span>
              </h1>
            </div>

            <p className="text-sm font-semibold text-gray-200 leading-relaxed max-w-lg mb-1.5">
              ReviewReply AI is an AI-powered Google Business Profile review management platform.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-lg mb-5">
              It helps businesses securely connect their Google Business Profile, automatically
              sync customer reviews, generate AI-powered replies, publish responses, track
              ratings, analyze customer sentiment, and manage online reputation from one
              dashboard.
            </p>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#ff2d55]" />
              <span className="text-xs font-medium text-gray-300">
                AI-Powered Google Business Profile Review Management
              </span>
            </div>

            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Manage Google Reviews Smarter
            </h2>

            <div className="flex flex-col gap-3.5 mb-7 max-w-lg">
              {HERO_CONTENT_BLOCKS.map((block, i) => {
                const Icon = block.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 border-b border-white/5 last:border-b-0 pb-3.5 last:pb-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#ff2d55]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{block.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mt-1">{block.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 max-w-md">
              {FEATURE_CHECKLIST.map((item, i) => (
                <div key={i} className="group flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_-2px_rgba(255,45,85,0.6)] transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle className="w-3.5 h-3.5 text-[#ff2d55]" />
                  </div>
                  <span className="text-xs text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-start gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#ff2d55]" />
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Google Sign-In is required only to verify your identity, connect your Google
                Business Profile, read reviews, generate AI replies, publish replies, and display
                analytics. Access is granted only after you authorize it, and can be revoked
                anytime. We never access Gmail, Google Drive, Calendar, Contacts, Photos,
                YouTube, or any unrelated Google services. ReviewReply AI only uses the Google
                Business Profile API.
              </p>
            </div>
          </div>

          <div
            id="google-signin-desktop"
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-9 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)] w-full max-w-md justify-self-end"
          >
            <div className="flex justify-center mb-5">
              <div className="relative w-[4.5rem] h-[4.5rem] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
                <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
                <img src="/ai-logo.png" alt="logo" className="w-12 h-12 object-contain" />
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

export function LoginUI() {
  return <LoginHero />;
}

/* ================================================================
   BELOW-THE-FOLD SECTIONS — OAuth verification ready
   (UNCHANGED — approved content)
   ================================================================ */

function InfoSection() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_10%,rgba(255,45,85,0.15),transparent_70%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(180,0,60,0.2),transparent_70%),radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(80,0,50,0.25),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* SECTION 1 — How ReviewReply AI Works (vertical timeline) */}
      <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-14">
          How <span className="text-[#ff2d55]">ReviewReply AI</span> Works
        </h2>

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#ff2d55]/60 via-[#ff2d55]/20 to-transparent" />

          {[
            { title: "Sign in with Google", desc: "Authenticate securely with your Google account using OAuth." },
            { title: "Connect Google Business Profile", desc: "Authorize ReviewReply AI to access the business locations you choose." },
            { title: "Sync Reviews", desc: "Customer reviews from your connected locations are pulled in automatically." },
            { title: "Generate AI Replies", desc: "AI drafts on-brand, human-like responses to each review." },
            { title: "Publish Replies", desc: "Approved replies are posted back to your Google Business Profile." },
            { title: "Track Analytics", desc: "Monitor ratings, sentiment, and reputation trends over time." },
          ].map((step, idx) => (
            <div key={idx} className="relative pb-10 last:pb-0">
              <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0d0d0d] border border-[#ff2d55]/50 flex items-center justify-center text-xs md:text-sm font-bold text-[#ff2d55]">
                {idx + 1}
              </div>
              <h3 className="text-base md:text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed max-w-lg">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — Google Business Profile Integration (horizontal workflow) */}
      <section className="px-5 py-12 md:py-20 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">
          Google Business Profile <span className="text-[#ff2d55]">Integration</span>
        </h2>
        <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12">
          A single, purpose-built flow connects your Business Profile to ReviewReply AI.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2 mb-14">
          {[
            { icon: Key, label: "Google OAuth" },
            { icon: Link2, label: "Business Profile" },
            { icon: RefreshCw, label: "Sync Reviews" },
            { icon: Sparkles, label: "Generate AI Replies" },
            { icon: Send, label: "Publish Replies" },
            { icon: BarChart3, label: "Analytics Dashboard" },
          ].map((step, idx, arr) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex md:flex-1 items-center gap-2 w-full md:w-auto">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#0d0d0d] border border-[#ff2d55]/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#ff2d55]" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-tight">{step.label}</span>
                </div>
                {idx !== arr.length - 1 && (
                  <span className="text-[#ff2d55]/50 text-xl rotate-90 md:rotate-0 shrink-0">→</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Google access is required to securely verify your identity and link your Business Profile.",
            "Only Business Profile permissions needed to read and reply to reviews are requested.",
            "Only business review data from the locations you connect is accessed.",
            "Access is granted only after you explicitly authorize your account.",
            "You can revoke ReviewReply AI's access at any time from your Google Account settings.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#ff2d55] shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300 leading-relaxed">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Features (large premium glassmorphism cards) */}
      <section className="px-5 py-12 md:py-20 max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-14">
          Everything You <span className="text-[#ff2d55]">Need</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "AI Reply Generator", desc: "Human-like, on-brand replies generated in seconds." },
            { icon: BarChart3, title: "Review Dashboard", desc: "All your reviews across every location in one view." },
            { icon: Link2, title: "Google Business Profile Sync", desc: "Reviews stay automatically synced with Google." },
            { icon: TrendingUp, title: "Review Analytics", desc: "Track rating trends and performance over time." },
            { icon: Smile, title: "Sentiment Analysis", desc: "Understand positive, negative, and neutral feedback." },
            { icon: Bell, title: "Email Alerts", desc: "Get notified the moment a new review comes in." },
            { icon: Send, title: "Review Requests", desc: "Invite happy customers to leave a review." },
            { icon: QrCode, title: "QR Code Generator", desc: "Print-ready codes that link straight to your review page." },
            { icon: Users, title: "Team Members", desc: "Collaborate with your team on replies and reports." },
            { icon: FileBarChart, title: "Reports", desc: "Exportable summaries of reputation performance." },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:border-[#ff2d55]/50 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#ff2d55]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — Security & Privacy (premium trust panel) */}
      <section className="px-5 py-12 md:py-20 max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <ShieldCheck className="w-7 h-7 text-[#ff2d55]" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Security &amp; <span className="text-[#ff2d55]">Privacy</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: "Secure Google OAuth" },
              { icon: ShieldCheck, title: "Encrypted Communication" },
              { icon: ClipboardCheck, title: "Google API Compliance" },
              { icon: UserCog, title: "User Controlled Permissions" },
              { icon: UserCheck, title: "Disconnect Anytime" },
              { icon: Ban, title: "No Selling of Data" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2a0a10] border border-[#ff2d55]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#ff2d55]" />
                  </div>
                  <h4 className="font-semibold text-white text-sm leading-tight">{item.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Why ReviewReply AI Uses Google APIs */}
      <section className="px-5 py-12 md:py-20 max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">
          Why ReviewReply AI Uses <span className="text-[#ff2d55]">Google APIs</span>
        </h2>
        <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12">
          Only the Google Business Profile API is used — nothing more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Globe className="w-5 h-5 text-[#ff2d55]" />
              <h3 className="font-bold text-white">Google access is used only for</h3>
            </div>
            <div className="space-y-3">
              {[
                "Reading reviews",
                "Syncing reviews",
                "Generating replies",
                "Publishing replies",
                "Analytics",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#ff2d55] shrink-0" />
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Ban className="w-5 h-5 text-[#ff2d55]" />
              <h3 className="font-bold text-white">We do NOT access</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Gmail", "Google Drive", "Calendar", "Contacts", "Photos", "YouTube"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <X className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-sm text-gray-400">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQ (accordion) */}
      <section className="px-5 py-12 md:py-20 max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          Frequently Asked <span className="text-[#ff2d55]">Questions</span>
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "Why is Google Sign-In required?",
              a: "Google Sign-In securely verifies your identity and lets you authorize ReviewReply AI to connect to your own Google Business Profile.",
            },
            {
              q: "Which Google API is used?",
              a: "ReviewReply AI only uses the Google Business Profile API to read reviews and publish replies on your behalf.",
            },
            {
              q: "What Google data is accessed?",
              a: "Only business review data from the Business Profile locations you choose to connect. We never access Gmail, Drive, Calendar, Contacts, Photos, or YouTube.",
            },
            {
              q: "Can I disconnect my account?",
              a: "Yes. You can disconnect ReviewReply AI at any time from your Google Account security settings or from within the app.",
            },
            {
              q: "How secure is my data?",
              a: "All communication uses secure, encrypted connections, and access is strictly limited to the permissions you explicitly authorize.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 group"
            >
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                <HelpCircle className="w-5 h-5 text-[#ff2d55] shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
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
