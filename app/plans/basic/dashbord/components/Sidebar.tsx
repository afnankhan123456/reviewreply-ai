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
  Menu,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
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
    <div
      className={`flex bg-white dark:bg-[#111827] border-r border-zinc-200 dark:border-zinc-800 flex-col justify-between p-4 transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >

      <div>

        {/* LOGO + TOGGLE */}
        <div className={`flex items-center mb-10 ${isCollapsed ? "justify-center" : "justify-between"}`}>

          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <img
              src="/ai-logo.png"
              alt="ReviewReply AI Logo"
              className="h-9 w-auto shrink-0"
            />

            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-800 dark:text-white leading-tight">
                  ReviewReply AI
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  AI Powered Review Management
                </span>
              </div>
            )}
          </div>

          {/* ✅ NEW: Toggle button — collapse/expand */}
          <button
            onClick={onToggle}
            className={`p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400 shrink-0 ${
              isCollapsed ? "hidden" : "block"
            }`}
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* ✅ NEW: jab collapsed ho, expand karne ka button alag se dikhega */}
        {isCollapsed && (
          <button
            onClick={onToggle}
            className="w-full flex justify-center p-1.5 mb-6 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
            aria-label="Expand Sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* MENU */}
        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                } ${isCollapsed ? "justify-center px-0" : ""}`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}

        </div>

      </div>

      {/* USER */}
      {!isCollapsed && (
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-4 transition-colors duration-300">
          <p className="font-semibold text-black dark:text-white">
            Business Owner
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Basic Plan
          </p>
        </div>
      )}

    </div>
  );
}
