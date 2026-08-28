import "./globals.css";
import Script from "next/script";
import Providers from "../components/Providers";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReviewReply AI",
  url: "https://www.reviewreply-ai.in",
  logo: "https://www.reviewreply-ai.in/ai-logo.png",
  founder: {
    "@type": "Person",
    name: "Afnan Khan",
    jobTitle: "Founder",
    description:
      "Data scientist with deep expertise in machine learning and AI systems.",
    sameAs: ["https://www.linkedin.com/in/afnan-khan-byte/"],
  },
};

export const metadata = {
  metadataBase: new URL("https://www.reviewreply-ai.in"),
  title: "ReviewReply AI",
  applicationName: "ReviewReply AI",
  description:
    "ReviewReply AI is an AI-powered Google Business Profile review management platform. It helps businesses securely connect their Google Business Profile, automatically sync customer reviews, generate AI-powered replies, publish responses, monitor ratings, analyze customer sentiment, and manage online reputation from one dashboard. Google Sign-In is used only to verify identity, connect Business Profile, read reviews, generate AI replies, and publish responses. We never access Gmail, Drive, Calendar, Contacts, Photos, or YouTube.",
  keywords: [
    "ReviewReply AI",
    "Google Business Profile",
    "Google Reviews",
    "AI Review Replies",
    "Review Management",
    "Google Business Reviews",
    "AI Review Generator",
    "Customer Reviews",
    "Online Reputation",
    "Reputation Management",
  ],
  authors: [{ name: "ReviewReply AI" }],
  creator: "ReviewReply AI",
  publisher: "ReviewReply AI",
  category: "Business",
  verification: {
    google: "mLuWg9q3JVkzCcLhRQhEqye5XCK4C5lVRizxsF7Hs_c",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "ReviewReply AI",
    description:
      "ReviewReply AI is an AI-powered Google Business Profile review management platform. Securely connect your Google Business Profile, sync reviews, generate AI replies, publish responses, track ratings, and manage reputation.",
    url: "https://www.reviewreply-ai.in",
    siteName: "ReviewReply AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReviewReply AI",
    description:
      "ReviewReply AI is an AI-powered Google Business Profile review management platform. Securely connect your Google Business Profile, sync reviews, generate AI replies, publish responses, track ratings, and manage reputation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.reviewreply-ai.in",
  },
  manifest: "/manifest.json",
};
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};
export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Organization + Founder structured data */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Shown AI conversion tracking pixel */}
        <script
          defer
          src="https://shown.io/metrics/nW3oNDM20a"
          type="text/javascript"
        ></script>
        {/* Affitor Tracking */}
        <Script
          src="https://api.affitor.com/js/affitor-tracker.js"
          data-affitor-program-id="1064"
          data-affitor-debug="false"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js'); }",
          }}
        />
      </body>
    </html>
  );
}
