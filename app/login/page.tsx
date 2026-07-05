"use client";

import { signIn } from "next-auth/react";
import {
  ShieldCheck,
  BarChart3,
  Sparkles,
  Star,
  Brain,
  Zap,
  MessageCircle,
} from "lucide-react";

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/plans/basic/pricing",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafbff] text-[#13213a]">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#d9d4ff]/40 blur-[110px]" />
        <div className="absolute right-[-80px] top-[-60px] h-[420px] w-[420px] rounded-full bg-[#e6ecff]/70 blur-[120px]" />
        <div className="absolute bottom-[-120px] left-[18%] h-[360px] w-[720px] rounded-full bg-[#7b6dff]/20 blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[8%] h-[300px] w-[300px] rounded-full bg-[#5b7cff]/25 blur-[120px]" />
        <div className="absolute left-[52%] top-[18%] h-7 w-7 rotate-45 bg-white/90 blur-[1px] [clip-path:polygon(50%_0%,60%_40%,100%_50%,60%_60%,50%_100%,40%_60%,0%_50%,40%_40%)]" />
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0">
        <svg
          viewBox="0 0 1440 220"
          className="block h-auto w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#7b6dff"
            fillOpacity="0.12"
            d="M0,140L48,128C96,116,192,92,288,101.3C384,111,480,149,576,160C672,171,768,149,864,138.7C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path
            fill="#5b7cff"
            fillOpacity="0.08"
            d="M0,176L48,165.3C96,155,192,133,288,133.3C384,133,480,155,576,160C672,165,768,155,864,149.3C960,144,1056,144,1152,160C1248,176,1344,208,1392,224L1440,240L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 grid min-h-screen xl:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center px-6 py-8 lg:px-10">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <img
              src="/ai-logo.png"
              alt="ReviewReply AI"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-[26px] font-extrabold tracking-tight text-[#15203a]">
              ReviewReply <span className="text-[#5b7cff]">AI</span>
            </h1>
          </div>

          {/* Hero */}
          <div className="max-w-[660px]">
            <h2 className="max-w-[600px] text-[58px] font-extrabold leading-[0.98] tracking-tight text-[#13213a] lg:text-[74px]">
              Turn Every Review
              <br />
              Into{" "}
              <span className="bg-gradient-to-r from-[#4f78ff] to-[#6d63ff] bg-clip-text text-transparent">
                Growth
              </span>
            </h2>

            <p className="mt-7 max-w-[560px] text-[19px] leading-8 text-[#51607d]">
              AI-powered review management for modern businesses.
              <br />
              Generate smart replies, track sentiment and improve your
              <br />
              online reputation — all in one place.
            </p>
          </div>

          {/* Feature row */}
          <div className="mt-12 grid max-w-[720px] gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Replies",
                desc: "Generate human-like\nresponses in seconds",
              },
              {
                icon: BarChart3,
                title: "Review Analytics",
                desc: "Track sentiment, ratings\nand key insights",
              },
              {
                icon: ShieldCheck,
                title: "Reputation Growth",
                desc: "Improve ratings and build\ncustomer trust",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#6f63ff] shadow-[0_6px_24px_rgba(111,99,255,0.10)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-extrabold text-[#15203a]">
                      {item.title}
                    </h3>
                    <p className="mt-1 whitespace-pre-line text-[14px] leading-6 text-[#5f6f8c]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dashboard preview */}
          <div className="mt-12 max-w-[760px]">
            <div
              className="rounded-[26px] border border-white bg-white p-4 shadow-[0_18px_60px_rgba(87,101,255,0.16)]"
              style={{
                transform: "perspective(1400px) rotateX(3deg) rotateY(-10deg)",
                transformOrigin: "center",
              }}
            >
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/ai-logo.png"
                    alt="ReviewReply AI"
                    className="h-6 w-6 object-contain"
                  />
                  <span className="text-sm font-bold text-[#1b2540]">
                    ReviewReply AI
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#f7f8fc] px-3 py-1.5 text-xs font-medium text-[#7a849b]">
                    Last 6 Months
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[url('https://i.pravatar.cc/100?img=12')] bg-cover bg-center" />
                    <div>
                      <div className="text-xs font-bold text-[#1b2540]">
                        John Doe
                      </div>
                      <div className="text-[10px] text-[#7d879f]">
                        Business Owner
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 text-[15px] font-semibold text-[#1b2540]">
                Dashboard Overview
              </h3>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Total Reviews", value: "1,248", change: "+12.5%" },
                  { label: "Average Rating", value: "⭐ 4.6", change: "+0.4" },
                  { label: "AI Replies Sent", value: "892", change: "+18.2%" },
                  { label: "Response Rate", value: "98%", change: "+8.7%" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#eef1f7] bg-[#fafbff] p-3"
                  >
                    <p className="text-[10px] text-[#8c95aa]">{card.label}</p>
                    <h4 className="mt-1 text-[26px] font-extrabold leading-none text-[#16233f]">
                      {card.value}
                    </h4>
                    <p className="mt-2 text-[10px] text-[#44b46a]">
                      {card.change} this month
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex h-[162px] flex-col rounded-2xl border border-[#eef1f7] bg-[#fafbff] p-3">
                  <h4 className="text-xs font-bold text-[#1b2540]">
                    Reviews Over Time
                  </h4>
                  <div className="mt-auto flex h-[110px] items-end gap-2">
                    {[18, 26, 22, 34, 29, 40, 36, 52, 48, 58].map((h, idx) => (
                      <div key={idx} className="flex-1">
                        <div
                          className="mx-auto w-full rounded-t-full bg-[#6f63ff]"
                          style={{ height: `${h}px`, opacity: 0.18 + idx * 0.04 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex h-[162px] flex-col items-center justify-center rounded-2xl border border-[#eef1f7] bg-[#fafbff] p-3">
                  <h4 className="mb-2 text-xs font-bold text-[#1b2540]">
                    Sentiment Analysis
                  </h4>
                  <div className="relative h-24 w-24 rounded-full border-[10px] border-[#52d6b0] border-r-[#d9dde8] border-b-[#5b7cff] rotate-45">
                    <div className="absolute inset-0 flex -rotate-45 items-center justify-center">
                      <span className="text-center text-[11px] font-bold leading-4 text-[#6d63ff]">
                        AI
                        <br />
                        Score
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex w-full items-center justify-end gap-4 text-[12px]">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#52d6b0]" />
                      <span className="text-[#7a849b]">Positive 75%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#d6d9e3]" />
                      <span className="text-[#7a849b]">Neutral 15%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-[#ff5a5f]" />
                      <span className="text-[#7a849b]">Negative 10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="mt-10 grid max-w-[760px] grid-cols-3 gap-4 rounded-[22px] bg-white/70 p-5 shadow-[0_12px_35px_rgba(111,99,255,0.10)] backdrop-blur-md">
            {[
              { icon: Star, value: "10K+", label: "Businesses Trust Us" },
              { icon: Star, value: "500K+", label: "Reviews Managed" },
              { icon: Zap, value: "Instant", label: "AI Reply Generation" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-[#6f63ff]" />
                  <div>
                    <h3 className="text-[34px] font-extrabold leading-none text-[#15203a]">
                      {item.value}
                    </h3>
                    <p className="mt-1 text-sm text-[#5f6f8c]">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-[560px] rounded-[34px] border border-[#edf0fb] bg-white/75 p-10 shadow-[0_22px_70px_rgba(86,96,170,0.12)] backdrop-blur-xl">
            <div className="mb-8 flex justify-center">
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-[28px] bg-gradient-to-br from-[#7b6dff] to-[#5b7cff] shadow-[0_16px_36px_rgba(91,124,255,0.28)]">
                <img
                  src="/ai-logo.png"
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>

            <h2 className="text-center text-[38px] font-extrabold tracking-tight text-[#15203a]">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-[18px] text-[#5f6f8c]">
              Sign in to continue to your dashboard
            </p>

            <button
              onClick={handleLogin}
              className="mt-10 flex w-full items-center justify-center gap-4 rounded-[18px] border border-[#eef1f8] bg-white py-4 text-[20px] font-bold text-[#15203a] shadow-[0_10px_30px_rgba(44,62,103,0.08)] transition hover:scale-[0.99] hover:bg-[#fbfcff]"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-7 w-7"
              />
              Continue with Google
            </button>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e9edf7]" />
              <p className="text-[16px] font-medium text-[#5f6f8c]">
                Secure & Fast Login
              </p>
              <div className="h-px flex-1 bg-[#e9edf7]" />
            </div>

            <div className="rounded-[18px] bg-[#eef3ff] px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6f63ff]">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <p className="text-[16px] leading-7 text-[#44526f]">
                  We use Google secure OAuth to keep your account and data safe.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure OAuth",
                  desc: "Google Protected",
                },
                {
                  icon: BarChart3,
                  title: "GDPR Ready",
                  desc: "Privacy Compliant",
                },
                {
                  icon: Brain,
                  title: "AI Powered",
                  desc: "Smart Automation",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#eef3ff] text-[#6f63ff] shadow-[0_8px_22px_rgba(87,101,255,0.08)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h4 className="mt-3 text-[16px] font-bold text-[#1b2540]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[14px] text-[#5f6f8c]">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-10 text-center text-[14px] leading-7 text-[#6f7b92]">
              By continuing, you agree to our{" "}
              <span className="font-semibold text-[#4f78ff]">Terms of Service</span>{" "}
              and{" "}
              <span className="font-semibold text-[#4f78ff]">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
