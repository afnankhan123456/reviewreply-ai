"use client";

import { useEffect } from "react";

export default function TrackingWrapper({ referralCode }: { referralCode: string }) {
  useEffect(() => {
    console.log("🔴 Component Rendered");
    if (referralCode) {
      // ✅ Set cookie with the correct name (email, not code)
      document.cookie = `referrerEmail=${referralCode}; path=/; max-age=86400`;
      // ✅ Track impression
      fetch(`/r/${referralCode}/track`);
    }
  }, [referralCode]);

  return null;
}
