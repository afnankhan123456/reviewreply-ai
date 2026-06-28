"use client";

import "./globals.css";
import Providers from "../components/Providers";

import { useEffect, useState } from "react";

export const metadata = {
  title: "ReviewReply AI",
  description: "AI Review Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {

      document.documentElement.classList.add("dark");

    } else {

      document.documentElement.classList.remove("dark");

    }

    setMounted(true);

  }, []);

  if (!mounted) return null;

  return (

    <html lang="en">

      <body className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white transition duration-300">

        <Providers>
          {children}
        </Providers>

      </body>

    </html>

  );
}
