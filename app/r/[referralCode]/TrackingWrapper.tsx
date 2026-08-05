"use client";

import { useEffect } from "react";

export default function TrackingWrapper({ referralCode }: { referralCode: string }) {
  useEffect(() => {
    if (referralCode) {
      // 🔒 Cookie ab yahan se JS se set NAHI hoti — koi bhi document.cookie
      // console mein chala ke apna hi referral code set kar sakta tha.
      // Ab /track route server-side httpOnly cookie set karta hai.
      fetch(`/r/${referralCode}/track`);
    }
  }, [referralCode]);

  return null;
}
