"use client";

import { useEffect } from "react";

export default function TrackingWrapper({ referralCode }: { referralCode: string }) {
  useEffect(() => {
    if (referralCode) {
      fetch(`/r/${referralCode}/track`);
    }
  }, [referralCode]);

  return null; // Kuch render nahi karta, bas tracking call karta hai
}
