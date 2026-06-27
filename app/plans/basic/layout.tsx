"use client";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white">

      <main className="p-8">
        {children}
      </main>

    </div>
  );
}



