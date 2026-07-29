"use client";

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
  Settings,
  Zap,
  MoreHorizontal,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/plans/pro/dashboard", icon: Home },
  { key: "reviews", label: "Reviews", href: "/plans/pro/dashboard/reviews", icon: Star },
  { key: "ai-center", label: "AI Center", href: "/plans/pro/dashboard/ai-reply-center", icon: Sparkles },
  { key: "settings", label: "Settings", href: "/plans/pro/dashboard/settings", icon: Settings },
  { key: "automation", label: "Automation", href: "/plans/pro/dashboard/automation", icon: Zap },
  { key: "more", label: "More", href: "/plans/pro/dashboard/more", icon: MoreHorizontal },
];

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

  // ✅ Grace check: agar plan abhi-abhi activate hua hai to session (JWT) ko
  // DB se naya plan fetch karne me 1-2 second lag sakte hain. Isliye turant
  // "/plans" par bounce karne ke bajaye, ek baar session refresh karke thoda
  // wait karo — warna newly-upgraded user ko lagta hai "kuch open hi nahi hua".
  const [graceChecked, setGraceChecked] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !hasProAccess && !graceChecked) {
      update().finally(() => {
        setTimeout(() => setGraceChecked(true), 1500);
      });
    }
  }, [status, hasProAccess, graceChecked, update]);

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
    if (status === "authenticated" && !hasProAccess && graceChecked) {
      router.replace("/plans");
    }
  }, [status, hasProAccess, graceChecked, router]);

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    (!hasProAccess && !graceChecked)
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
    <div className="min-h-screen w-full bg-black">
      {/* ---------- Top bar ---------- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/plans/pro/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="hidden sm:block text-white font-semibold tracking-tight">
              ReviewReply AI
            </span>
          </Link>

          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/50 text-sm">
            <Search size={15} />
            <span className="flex-1">Ask AI or type a command...</span>
            <kbd className="text-[10px] border border-white/10 rounded px-1.5 py-0.5">⌘ K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <button className="text-white/60 hover:text-white transition-colors hidden sm:block" aria-label="Rewards">
              <Gift size={19} />
            </button>

            <button className="relative text-white/60 hover:text-white transition-colors" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-violet-500 text-[10px] font-semibold flex items-center justify-center text-white">
                3
              </span>
            </button>

            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-white leading-tight">{orgName}</p>
                  <p className="text-[10px] text-amber-300 leading-tight">Pro Plan</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-amber-400 flex items-center justify-center text-xs font-bold text-white">
                  {orgName?.[0]?.toUpperCase() || "P"}
                </div>
                <ChevronDown size={14} className="text-white/40 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#11141C] shadow-xl overflow-hidden">
                  <Link
                    href="/plans/pro/dashboard/settings"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/plans/pro/dashboard/more/support"
                    className="block px-4 py-2.5 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setProfileOpen(false)}
                  >
                    Support
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-white/5"
                    onClick={() => setProfileOpen(false)}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Page content ---------- */}
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      {/* ---------- Bottom nav (fixed) ---------- */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-2 sm:px-6">
          <div className="grid grid-cols-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                    isActive ? "text-violet-300" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <span className="absolute -mt-[26px] h-1 w-1 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
