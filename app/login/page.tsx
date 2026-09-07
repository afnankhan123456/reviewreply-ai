import type { Metadata } from "next";
import LoginUI from "@/components/LoginUI";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginUI />;
}
