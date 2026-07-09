"use client";

import { useEffect } from "react";

export default function TrackingWrapper({ referralCode }: { referralCode: string }) {
  useEffect(() => {
    console.log("🔴 Component Rendered");
    if (referralCode) {
      document.cookie = `referrerCode=${referralCode}; path=/; max-age=86400`;
      fetch(`/r/${referralCode}/track`);
    }
  }, [referralCode]);

  return null;
}
