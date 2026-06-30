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
  ];

  return (
    <div className="w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between p-5">
      <div>
        {/* LOGO */}
        <div className="mb-10">
          <img
            src="/ai-logo.png"
            alt="ReviewSync Logo"
            className="h-10 w-auto"
          />
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
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-zinc-100 text-zinc-700"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-blue-600" : "text-zinc-500"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* USER */}
      <div className="bg-zinc-100 rounded-2xl p-4">
        <p className="font-semibold">Business Owner</p>
        <p className="text-sm text-zinc-500">Basic Plan</p>
      </div>
    </div>
  );
}




