import GoogleSignInButton from "@/app/components/GoogleSignInButton";

function LoginHero() {
  return (
    <>
      {/* ✅ MOBILE HERO */}
      <div className="flex md:hidden h-[100dvh] flex-col justify-center relative bg-black px-5 py-4 overflow-hidden">
        <img
          src="/main-ph.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <GoogleSignInButton className="absolute top-3 right-3 z-20 bg-white text-[#111827] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
          Get Started
        </GoogleSignInButton>

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
      </div>

      {/* ✅ DESKTOP HERO */}
      <div className="hidden md:flex h-[100dvh] flex-col justify-center relative bg-black overflow-hidden px-10 lg:px-20 py-6">
        <img
          src="/main-BG.webp"
          alt="ReviewReply AI Background"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute -top-40 right-[-200px] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#ff2d55] via-[#c81e3a] to-transparent opacity-20 blur-[80px] pointer-events-none" />

        <GoogleSignInButton className="absolute top-6 right-10 lg:right-20 z-20 bg-white hover:bg-gray-100 transition-all text-[#111827] text-sm font-bold px-5 py-2.5 rounded-full shadow-sm">
          Get Started
        </GoogleSignInButton>

        <div className="relative z-10 max-w-3xl">
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
        </div>
      </div>
    </>
  );
}

export default function LoginUI() {
  return <LoginHero />;
}
