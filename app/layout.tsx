import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}