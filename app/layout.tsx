import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "ReviewReply AI",
  description: "AI Review Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}