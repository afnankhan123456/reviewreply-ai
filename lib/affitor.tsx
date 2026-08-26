'use client';

import Script from 'next/script';

export default function AffitorTracker() {
  return (
    <Script
      src="https://api.affitor.com/js/affitor-tracker.js"
      data-affitor-program-id="1064"
      data-affitor-debug="false"
      strategy="afterInteractive"
    />
  );
}
