"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LoginUI from "@/components/LoginUI";
import {
  ShieldCheck,
  Sparkles,
  Lock,
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
  Ban,
  BarChart3,
  TrendingUp,
  Users,
  Key,
  CheckCircle,
  Globe,
  HelpCircle,
  X,
} from "lucide-react";

// 👇 Yahan apni nayi support mail daalo (sirf yahin badalni hai)
const SUPPORT_EMAIL = "yahan-apni-nayi-mail@example.com";
const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("ReviewReply AI Support")}`;

/* ================================================================
   Helpers — scroll par "likha" hua dikhne wala text (TypeText)
   ================================================================ */

// stagger: neighbouring cards ek ke baad ek animate hote hain
const st = (i: number) => ({ "--i": i } as React.CSSProperties);

// title type hone ke baad description start ho
const after = (t: string) => Math.round(Math.min(30, 1800 / Math.max(t.length, 1)) * t.length) + 150;

function TypeText({
  text,
  delay = 0,
  speed = 30,
  maxMs = 1800,
  inline = false,
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  maxMs?: number;
  inline?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const per = Math.max(6, Math.min(speed, maxMs / Math.max(text.length, 1)));
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(iv);
            return c;
          }
          return c + 1;
        });
      }, per);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const typing = started && count < text.length;

  return (
    <span ref={ref} className={`${inline ? "inline-block" : "block"} relative ${className}`}>
      <span className="opacity-0">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {typing && <i className="tw-caret" />}
      </span>
    </span>
  );
}

/* ================================================================
   BELOW-THE-FOLD SECTIONS — OAuth verification ready
   (UNCHANGED — approved content)
   ================================================================ */

function InfoSection() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_10%,rgba(212,175,55,0.15),transparent_70%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(184,134,11,0.2),transparent_70%),radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(138,109,26,0.25),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <style>{`
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* SECTION 1 — How ReviewReply AI Works (vertical timeline) */}
      <section className="px-5 py-16 md:py-24 max-w-4xl mx-auto relative z-10">
        <h2 className="h2fx rv text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-14">
          How <span className="text-[#d4af37]">ReviewReply AI</span> Works
        </h2>

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#d4af37]/60 via-[#d4af37]/20 to-transparent" />

          {[
            { title: "Sign in with Google", desc: "Authenticate securely with your Google account using OAuth." },
            { title: "Connect Google Business Profile", desc: "Authorize ReviewReply AI to access the business locations you choose." },
            { title: "Sync Reviews", desc: "Customer reviews from your connected locations are pulled in automatically." },
            { title: "Generate AI Replies", desc: "AI drafts on-brand, human-like responses to each review." },
            { title: "Publish Replies", desc: "Approved replies are posted back to your Google Business Profile." },
            { title: "Track Analytics", desc: "Monitor ratings, sentiment, and reputation trends over time." },
          ].map((step, idx) => (
            <div key={idx} style={st(idx)} className="rv relative pb-10 last:pb-0">
              <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0d0d0d] ring border border-[#d4af37]/50 flex items-center justify-center text-xs md:text-sm font-bold text-[#d4af37]">
                {idx + 1}
              </div>
              <h3 className="text-base md:text-lg font-bold text-white"><TypeText text={step.title} /></h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed max-w-lg"><TypeText text={step.desc} delay={after(step.title)} speed={14} /></p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — Google Business Profile Integration (horizontal workflow) */}
      <section className="px-5 py-12 md:py-20 max-w-6xl mx-auto relative z-10">
        <h2 className="h2fx rv text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">
          Google Business Profile <span className="text-[#d4af37]">Integration</span>
        </h2>
        <p className="rv text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12">
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
              <div key={idx} style={st(idx)} className="rv flex md:flex-1 items-center gap-2 w-full md:w-auto">
                <div className="flex flex-col items-center text-center gap-2 flex-1">
                  <div className="gold-icon-wrap w-14 h-14 rounded-2xl bg-[#0d0d0d] border border-[#d4af37]/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <span className="block w-full text-xs font-semibold text-white leading-tight"><TypeText text={step.label} /></span>
                </div>
                {idx !== arr.length - 1 && (
                  <span className="text-[#d4af37]/50 text-xl rotate-90 md:rotate-0 shrink-0">→</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="rv bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Google access is required to securely verify your identity and link your Business Profile.",
            "Only Business Profile permissions needed to read and reply to reviews are requested.",
            "Only business review data from the locations you connect is accessed.",
            "Access is granted only after you explicitly authorize your account.",
            "You can revoke ReviewReply AI's access at any time from your Google Account settings.",
          ].map((text, i) => (
            <div key={i} style={st(i)} className="rv flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <span className="flex-1 text-sm text-gray-300 leading-relaxed"><TypeText text={text} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Features (large premium glassmorphism cards) */}
      <section className="px-5 py-12 md:py-20 max-w-6xl mx-auto relative z-10">
        <h2 className="h2fx rv text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-14">
          Everything You <span className="text-[#d4af37]">Need</span>
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
                style={st(idx)}
                className="pcard rv group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:border-[#d4af37]/50 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="gold-icon-wrap w-14 h-14 rounded-2xl bg-[#1a1408] border border-[#d4af37]/30 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#d4af37]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5"><TypeText text={f.title} /></h3>
                <p className="text-sm text-gray-400 leading-relaxed"><TypeText text={f.desc} delay={after(f.title)} speed={14} /></p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — Security & Privacy (premium trust panel) */}
      <section className="px-5 py-12 md:py-20 max-w-5xl mx-auto relative z-10">
        <div className="rv bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <ShieldCheck className="w-7 h-7 text-[#d4af37]" />
            <h2 className="rv text-2xl md:text-3xl font-extrabold text-white">
              Security &amp; <span className="text-[#d4af37]">Privacy</span>
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
                <div key={idx} style={st(idx)} className="rv flex flex-col items-center text-center gap-3">
                  <div className="gold-icon-wrap w-12 h-12 rounded-full bg-[#1a1408] border border-[#d4af37]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <h4 className="w-full font-semibold text-white text-sm leading-tight"><TypeText text={item.title} /></h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Why ReviewReply AI Uses Google APIs */}
      <section className="px-5 py-12 md:py-20 max-w-5xl mx-auto relative z-10">
        <h2 className="h2fx rv text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">
          Why ReviewReply AI Uses <span className="text-[#d4af37]">Google APIs</span>
        </h2>
        <p className="rv text-gray-400 text-sm text-center max-w-2xl mx-auto mb-12">
          Only the Google Business Profile API is used — nothing more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={st(0)} className="pcard rv bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Globe className="w-5 h-5 text-[#d4af37]" />
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
                <div key={i} style={st(i)} className="rv flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span className="flex-1 text-sm text-gray-300"><TypeText text={text} /></span>
                </div>
              ))}
            </div>
          </div>

          <div style={st(1)} className="pcard rv bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Ban className="w-5 h-5 text-[#d4af37]" />
              <h3 className="font-bold text-white">We do NOT access</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Gmail", "Google Drive", "Calendar", "Contacts", "Photos", "YouTube"].map((text, i) => (
                <div key={i} style={st(i)} className="rv flex items-center gap-2">
                  <X className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="flex-1 text-sm text-gray-400"><TypeText text={text} /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQ (accordion) */}
      <section className="px-5 py-12 md:py-20 max-w-3xl mx-auto relative z-10">
        <h2 className="h2fx rv text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          Frequently Asked <span className="text-[#d4af37]">Questions</span>
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
              style={st(i)}
              className="pcard rv faq bg-white/[0.03] border border-white/10 rounded-2xl p-5 group"
            >
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="flex-1 font-semibold text-white text-sm pr-4"><TypeText text={faq.q} /></span>
                <HelpCircle className="w-5 h-5 text-[#d4af37] shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed"><TypeText text={faq.a} speed={12} /></p>
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
            <Link href="/legal/privacy-policy" className="hover:text-[#d4af37] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-[#d4af37] transition-colors">
              Terms of Service
            </Link>
            <a href={SUPPORT_MAILTO} className="hover:text-[#d4af37] transition-colors">
              Contact
            </a>
            <a href={SUPPORT_MAILTO} className="hover:text-[#d4af37] transition-colors">
              Support
            </a>
            <a
              href="https://www.linkedin.com/in/afnan-khan-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors"
            >
              LinkedIn
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
