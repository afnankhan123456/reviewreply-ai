"use client";

import { useEffect } from "react";

export default function TrackingWrapper({ referralCode }: { referralCode: string }) {
  useEffect(() => {
    if (referralCode) {
      // ✅ Set cookie with the correct name
      document.cookie = `referralCode=${referralCode}; path=/; max-age=86400`;
      // ✅ Track impression
      fetch(`/r/${referralCode}/track`);
    }
  }, [referralCode]);

  return null;
}
