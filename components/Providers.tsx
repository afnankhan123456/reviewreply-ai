"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      refetchInterval={15}       // har 15 second me session ko background me fresh check karega
      refetchOnWindowFocus={true} // tab pe wapas aane par bhi turant fresh check karega
    >
      {children}
    </SessionProvider>
  );
}
