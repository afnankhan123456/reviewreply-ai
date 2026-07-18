"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Jab tak session check ho nahi jaata, ya user login nahi hai,
  // tab tak koi bhi dashboard content (sidebar, data, kuch bhi) render nahi hoga.
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* DESKTOP SIDEBAR ONLY */}
      <div className="hidden lg:block relative z-40">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto text-black dark:text-white transition-colors duration-300 relative z-10">
        {children}
      </main>

    </div>
  );
}
