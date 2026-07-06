"use client";

export default function ReferEarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen text-white">
      {children}
    </div>
  );
}
