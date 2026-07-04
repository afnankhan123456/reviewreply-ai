"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Star,
  Bell,
  MessageCircle,
  BarChart3,
  Settings,
  Blocks,
  FileText,
  FileBarChart,
  Download,
  HelpCircle,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/plans/basic/dashbord",
      icon: LayoutDashboard,
    },
    {
      name: "Reviews",
      href: "/plans/basic/dashbord/reviews",
      icon: Star,
    },
    {
      name: "Alerts",
      href: "/plans/basic/dashbord/alerts",
      icon: Bell,
    },
    {
      name: "Unanswered",
      href: "/plans/basic/dashbord/unanswered",
      icon: MessageCircle,
    },
    {
      name: "Analytics",
      href: "/plans/basic/dashbord/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/plans/basic/dashbord/settings",
      icon: Settings,
    },
    {
      name: "Integrations",
      href: "/plans/basic/dashbord/integrations",
      icon: Blocks,
    },
    {
      name: "Template",
      href: "/plans/basic/dashbord/template",
      icon: FileText,
    },
    {
      name: "Report",
      href: "/plans/basic/dashbord/report",
      icon: FileBarChart,
    },
    {
      name: "Export",
      href: "/plans/basic/dashbord/export",
      icon: Download,
    },
    {
      name: "Help Center",
      href: "/plans/basic/dashbord/help",
      icon: HelpCircle,
    },
  ];

  return (
    <div className="w-[260px] bg-white dark:bg-[#111827] border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-5 transition-colors duration-300">

      <div>

        {/* LOGO + BRAND TEXT */}

        <div className="flex items-center gap-3 mb-10">

          <img
            src="/ai-logo.png"
            alt="ReviewReply AI Logo"
            className="h-10 w-auto"
          />

          <div className="flex flex-col">

            <span className="text-sm font-semibold text-zinc-800 dark:text-white leading-tight">
              ReviewReply AI
            </span>

            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
              AI Powered Review Management
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

      {/* USER */}

      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-4 transition-colors duration-300">

        <p className="font-semibold text-black dark:text-white">
          Business Owner
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Basic Plan
        </p>

      </div>

    </div>
  );
}
