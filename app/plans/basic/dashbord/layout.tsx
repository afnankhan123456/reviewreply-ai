"use client";

import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0F172A] transition-colors duration-300">

      {/* DESKTOP SIDEBAR ONLY */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto text-black dark:text-white transition-colors duration-300">
        {children}
      </main>

    </div>
  );
}
