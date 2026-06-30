"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/plans/basic/dashbord",
    },
    {
      name: "Reviews",
      href: "/plans/basic/dashbord/reviews",
    },
    {
      name: "Alerts",
      href: "/plans/basic/dashbord/alerts",
    },
    {
      name: "Unanswered",
      href: "/plans/basic/dashbord/unanswered",
    },
    {
      name: "Analytics",
      href: "/plans/basic/dashbord/analytics",
    },
    {
      name: "Settings",
      href: "/plans/basic/dashbord/settings",
    },
    {
      name: "Integrations",
      href: "/plans/basic/dashbord/integrations",
    },
    {
      name: "Template",
      href: "/plans/basic/dashbord/template",
    },
    {
      name: "Report",
      href: "/plans/basic/dashbord/report",
    },
    {
      name: "Export",
      href: "/plans/basic/dashbord/export",
    },
  ];

  return (
    <div className="w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between p-5">
      <div>
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-blue-600 mb-10">ReviewSync</h1>

        {/* MENU */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-xl font-medium transition ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-zinc-100 text-zinc-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
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




