import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ FIX (Bug #6): Admin panel ab middleware ke alawa khud bhi
  // server-side check karta hai — defense-in-depth. Agar kabhi
  // middleware config galti se badal jaye, tab bhi ye layout
  // non-admin ko andar nahi ghusne dega.
  const session: any = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/plans");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
