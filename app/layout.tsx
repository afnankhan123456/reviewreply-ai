import "./globals.css";
import Providers from "../components/Providers";

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}