"use client";

import BasicSidebar from "./components/BasicSidebar";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <BasicSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}