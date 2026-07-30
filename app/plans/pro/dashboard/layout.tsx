"use client";

import "./liquid-glass.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Search,
  Bell,
  Gift,
  ChevronDown,
  Home,
  Star,
  Sparkles,
  BarChart3,
  Zap,
  MoreHorizontal,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/plans/pro/dashboard", icon: Home },
  { key: "reviews", label: "Reviews", href: "/plans/pro/dashboard/reviews", icon: Star },
  { key: "ai-center", label: "AI Center", href: "/plans/pro/dashboard/ai-reply-center", icon: Sparkles },
  { key: "analytics", label: "Analytics", href: "/plans/pro/dashboard/analytics", icon: BarChart3 },
  { key: "automation", label: "Automation", href: "/plans/pro/dashboard/automation", icon: Zap },
  { key: "more", label: "More", href: "/plans/pro/dashboard/more", icon: MoreHorizontal },
];

const MAX_GRACE_ATTEMPTS = 5;
const GRACE_INTERVAL_MS = 1000;

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: authSession, status, update } = useSession();

  const plan = (authSession?.user as any)?.plan || "basic";
  const hasProAccess = plan?.startsWith("pro");
  const orgName = (authSession?.user as any)?.name || "Your Business";
  const planLabel = (authSession?.user as any)?.planLabel || "Business Plan";

  const [graceAttempts, setGraceAttempts] = useState(0);
  const [graceExhausted, setGraceExhausted] = useState(false);
  const graceRunning = useRef(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasProAccess &&
      !graceExhausted &&
      !graceRunning.current
    ) {
      graceRunning.current = true;

      const runAttempt = async () => {
        await update();
        graceRunning.current = false;

        setGraceAttempts((prev) => {
          const next = prev + 1;
          if (next >= MAX_GRACE_ATTEMPTS) {
            setGraceExhausted(true);
          }
          return next;
        });
      };

      const timer = setTimeout(runAttempt, GRACE_INTERVAL_MS);
      return () => clearTimeout(timer);
    }
  }, [status, hasProAccess, graceExhausted, graceAttempts, update]);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !hasProAccess && graceExhausted) {
      router.replace("/plans");
    }
  }, [status, hasProAccess, graceExhausted, router]);

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    (!hasProAccess && !graceExhausted)
  ) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-gray-200">
        <p className="text-sm text-gray-400">Checking your session...</p>
      </div>
    );
  }

  if (!hasProAccess) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-gray-200">
        <p className="text-sm text-gray-400">Redirecting...</p>
      </div>
    );
  }

  const activeKey =
    NAV_ITEMS.slice()
      .reverse()
      .find((item) => pathname === item.href || pathname.startsWith(item.href + "/"))?.key ?? "home";

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden">
      {/* ambient background glow — kept very subtle so the page still reads as solid black */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-blue-600/14 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-600/8 blur-[140px]" />
      </div>

      <header className="liquid-glass-static sticky top-0 z-40 border-b border-white/10">
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/plans/pro/dashboard" className="flex items-center gap-2 shrink-0 z-10">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-[0_0_20px_rgba(139,92,246,0.35)] flex items-center justify-center">
              <Sparkles size={17} className="text-white" fill="white" />
            </div>
            <span className="hidden sm:block text-white font-bold tracking-tight text-[15px]">
              ReviewMate
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center px-6">
            <div className="liquid-glass-pill liquid-focus flex w-full max-w-xl items-center gap-2.5 px-4 py-3 text-white/40 text-sm">
              <Search size={16} />
              <span className="flex-1">Ask AI or type a command...</span>
              <kbd className="text-[10px] font-medium text-white/50 border border-white/10 bg-white/5 rounded-md px-1.5 py-0.5">
                ⌘ K
              </kbd>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4 z-10">
            <button className="liquid-focus text-white/60 hover:text-white transition-colors hidden sm:block rounded-lg" aria-label="Rewards">
              <Gift size={19} />
            </button>

            <button className="liquid-focus relative text-white/60 hover:text-white transition-colors rounded-lg" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-violet-500 text-[10px] font-semibold flex items-center justify-center text-white ring-2 ring-black">
                1
              </span>
            </button>

            <div className="liquid-glass-static hidden sm:flex items-center gap-2 rounded-xl pl-3 pr-2 py-1.5">
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white">{orgName}</p>
                <p className="text-[10px] text-emerald-400 font-medium">{planLabel}</p>
              </div>
              <ChevronDown size={14} className="text-white/40" />
            </div>

            <div ref={profileRef} className="relative">
              <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2">
                <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-xs font-bold text-white">
                  AI
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
                </div>
              </button>

              {profileOpen && (
                <div className="liquid-glass-static absolute right-0 mt-2 w-44 rounded-xl shadow-xl overflow-hidden">
                  <Link href="/plans/pro/dashboard/settings" className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5" onClick={() => setProfileOpen(false)}>
                    Settings
                  </Link>
                  <Link href="/plans/pro/dashboard/more/support" className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5" onClick={() => setProfileOpen(false)}>
                    Support
                  </Link>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-white/5" onClick={() => setProfileOpen(false)}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-[calc(100vh-4rem)] pb-28">{children}</main>

      {/* Floating pill bottom dock */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <div className="liquid-glass-pill flex items-center gap-1 px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`liquid-focus flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "liquid-btn-primary text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating action button */}
      <button
        aria-label="Quick action"
        className="liquid-btn-primary liquid-focus fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
      >
        <Sparkles size={20} />
      </button>
    </div>
  );
}
