"use client";

export default function ReferEarnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black">
      {children}
    </div>
  );
}
