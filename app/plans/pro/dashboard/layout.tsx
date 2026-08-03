"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./liquid-glass.css";
import ThemeProvider from "./ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: authSession, status } = useSession();
  const router = useRouter();

  const plan = (authSession?.user as any)?.plan || "basic";
  const hasProAccess = plan?.startsWith("pro");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && !hasProAccess) {
      router.replace("/plans");
    }
  }, [status, hasProAccess, router]);

  if (status === "loading" || status === "unauthenticated" || !hasProAccess) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-gray-200">
        <p className="text-sm text-gray-400">Checking your session...</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
