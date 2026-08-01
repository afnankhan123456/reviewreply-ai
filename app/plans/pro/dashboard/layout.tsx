import type { Metadata } from "next";
import "./liquid-glass.css";

export const metadata: Metadata = {
  title: "Liquid Glass iOS Stats",
  description: "iOS-style liquid glass stat cards dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
