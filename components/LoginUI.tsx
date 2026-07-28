import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { ShieldCheck, Sparkles, Lock, Mail } from "lucide-react";

function LoginHero() {
  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}</style>

      {/* ✅ MOBILE HERO — everything fits in one screen, no scroll */}
      <div className="flex md:hidden h-[100dvh] flex-col justify-center relative bg-black px-5 py-4 overflow-hidden">
        <img
          src="/main-ph.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        
          href="#google-signin"
          className="absolute top-3 right-3 z-20 bg-white text-[#111827] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm"
        >
          Get Started
        </a>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-9 h-9 object-contain" />
            <h1 className="text-xl font-black tracking-tight text-white">
              ReviewReply AI
            </h1>
          </div>

          <p className="text-[11px] font-semibold text-gray-200 leading-snug max-w-xs">
            ReviewReply AI is an AI-powered Google Business Profile review management platform
            that helps businesses manage and reply to Google reviews with AI.
          </p>
        </div>

        {/* Google API compliance — compact, always visible */}
        <div className="relative z-10 bg-white/[0.05] backdrop-blur-md rounded-lg p-2.5 border border-white/10 flex items-start gap-2 mt-3 max-w-sm mx-auto w-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ff2d55] shrink-0 mt-0.5" />
          <p className="text-gray-300 text-[9px] leading-snug">
            Google Sign-In is used only to verify your identity and access your Business Profile
            to read reviews and publish replies. We never access Gmail, Drive, Calendar, Contacts,
            or any other Google service. You can revoke access anytime from your Google Account
            settings.
          </p>
        </div>

        <div
          id="google-signin"
          className="relative z-10 w-full bg-black/40 backdrop-blur-md border border-[#ff2d55]/30 rounded-2xl p-4 mt-3 shadow-[0_0_60px_-20px_rgba(255,45,85,0.4)]"
        >
          <div className="flex justify-center mb-2">
            <img src="/ai-logo.png" alt="ReviewReply AI" className="w-8 h-8 object-contain" />
          </div>
          <h2 className="text-base font-extrabold text-center text-white mb-3">
            Welcome <span className="text-[#ff2d55]">Back</span>
          </h2>

          <GoogleSignInButton className="w-full bg-white hover:bg-gray-100 transition-all py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm" />

          <div className="flex items-center justify-center gap-3 my-2.5">
            <div className="h-px bg-white/10 flex-1"></div>
            <p className="text-gray-400 text-[10px] font-medium">OR</p>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <button
            type="button"
            className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
          >
            <Mail className="w-4 h-4 text-[#ff2d55]" />
            Continue with Email
          </button>

          <p className="text-gray-500 text-[9px] text-center leading-snug mt-2">
            Secured with Google OAuth
          </p>

          <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-white/5">
            <Lock className="w-3 h-3 text-gray-500" />
            <ShieldCheck className="w-3 h-3 text-gray-500" />
            <Sparkles className="w-3 h-3 text-gray-500" />
          </div>
        </div>
      </div>

      {/* ✅ DESKTOP HERO — everything fits in one screen, no scroll */}
      <div className="hidden md:flex h-[100dvh] flex-col justify-center relative bg-black overflow-hidden px-10 lg:px-20 py-6">
        <img
          src="/main-BG.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        
          href="#google-signin-desktop"
          className="absolute top-6 right-10 lg:right-20 z-20 bg-white hover:bg-gray-100 transition-all text-[#111827] text-sm font-bold px-5 py-2.5 rounded-full shadow-sm"
        >
          Get Started
        </a>

        <div className="relative z-10 grid xl:grid-cols-[1.15fr_0.9fr] gap-10 items-center max-w-6xl mx-auto w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src="/ai-logo.png" alt="ReviewReply AI logo" className="w-11 h-11 object-contain" />
              <h1 className="text-3xl font-black tracking-tight text-white">
                ReviewReply AI
              </h1>
            </div>

            <p className="text-base font-semibold text-gray-200 leading-relaxed max-w-lg mb-2">
              ReviewReply AI is an AI-powered Google Business Profile review management platform
              that helps businesses manage and reply to Google reviews with AI.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-lg mb-4">
              Securely connect your Google Business Profile, automatically sync customer reviews,
              generate AI-powered replies, publish responses, and manage your online reputation —
              all from one dashboard.
            </p>

            {/* Google API compliance — compact, always visible */}
            <div className="bg-white/[0.05] backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-start gap-3 max-w-lg">
              <ShieldCheck className="w-4 h-4 text-[#ff2d55] shrink-0 mt-0.5" />
              <p className="text-gray-300 text-xs leading-relaxed">
                Google Sign-In is used only to verify your identity and access your Business
                Profile to read reviews and publish replies. We never access Gmail, Drive,
                Calendar, Contacts, or any other Google service. You can revoke access anytime
                from your Google Account settings.
              </p>
            </div>
          </div>

          <div
            id="google-signin-desktop"
            className="bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-7 shadow-[0_0_80px_-20px_rgba(255,45,85,0.3)] w-full max-w-md justify-self-end"
          >
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#ff2d55]/20" />
                <div className="absolute inset-2 rounded-full border border-[#ff2d55]/10" />
                <img src="/ai-logo.png" alt="ReviewReply AI Logo" className="w-10 h-10 object-contain" />
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-center text-white">
              Welcome <span className="text-[#ff2d55]">Back</span>
            </h2>
            <p className="text-gray-300 text-center mt-1 text-xs mb-5">
              Sign in to continue to your dashboard
            </p>

            <GoogleSignInButton className="w-full bg-white hover:bg-gray-100 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-[#111827] shadow-sm" />

            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px bg-white/10 flex-1"></div>
              <p className="text-gray-400 text-xs font-medium">OR</p>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <button
              type="button"
              className="w-full bg-transparent hover:bg-white/5 border border-[#ff2d55]/40 transition-all py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white"
            >
              <Mail className="w-4 h-4 text-[#ff2d55]" />
              Continue with Email
            </button>

            <p className="text-gray-500 text-[11px] text-center leading-snug mt-3">
              Secured with Google OAuth
            </p>

            <div className="flex items-center justify-center gap-5 mt-3 pt-3 border-t border-white/5">
              <Lock className="w-3.5 h-3.5 text-gray-500" />
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              <Sparkles className="w-3.5 h-3.5 text-gray-500" />
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
