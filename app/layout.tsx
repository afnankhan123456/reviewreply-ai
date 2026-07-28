import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// 🚨 GOOGLE VERIFICATION FIX: Name must match exactly "ReviewReply AI"
export const metadata: Metadata = {
  title: 'ReviewReply AI', 
  description: 'ReviewReply AI connects securely to your Google Business Profile to fetch customer reviews and automate AI-powered replies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
