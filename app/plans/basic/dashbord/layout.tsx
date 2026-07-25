"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  // ✅ NEW: Sidebar collapsed state — Standard plan jaisa hi
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("basicSidebarCollapsed");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("basicSidebarCollapsed", String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* ✅ FIX: ab sirf desktop pe hidden nahi — sabhi screens pe visible, collapse/expand karke */}
      <div className="block relative z-40">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed((prev) => !prev)} />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto text-black dark:text-white transition-colors duration-300 relative z-10 min-w-0">
        {children}
      </main>

    </div>
  );
}
