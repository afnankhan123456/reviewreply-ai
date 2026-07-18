import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "ReviewReply AI",
  description: "AI Review Dashboard",
};

// 🔥 YEH 3 LINES ADD KARO 🔥
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

// Poore app ko dynamic rakhte hain taaki koi bhi page
// (dashboard, admin, pricing, etc.) kabhi cache na ho aur
// har request pe fresh, per-user data serve ho — is se
// ek user ka data/session doosre user ko cached form me
// kabhi nahi dikhega.
export const dynamic = "force-dynamic";

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
