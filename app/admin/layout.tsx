"use client";

import "../../app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bug,
  Settings,
  Users,
  Star,
  IndianRupee,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bug Reports",
      href: "/admin/bugs",
      icon: Bug,
    },
    {
      name: "Referral Users Info",
      href: "/admin/referrals",
      icon: Users,
    },
    {
      name: "Whitelist Users",
      href: "/admin/whitelist",
      icon: Star,
    },
    {
      name: "Withdrawals",
      href: "/admin/dashboard/withdrawals",
      icon: IndianRupee,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex">
      {/* SIDEBAR */}
      <div className="w-[260px] bg-white dark:bg-[#111827] border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-5 transition-colors duration-300">
        <div>
          {/* LOGO / BRAND */}
          <div className="flex items-center gap-3 mb-10">
            <img
              src="/ai-logo.png"
              alt="ReviewReply Admin"
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-800 dark:text-white leading-tight">
                Admin Panel
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                ReviewReply AI
              </span>
            </div>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
