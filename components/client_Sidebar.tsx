"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientSidebar() {

  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },

    {
      name: "Reviews",
      href: "/reviews",
    },

    {
      name: "Analytics",
      href: "/analytics",
    },

    {
      name: "Business",
      href: "/business",
    },

    {
      name: "Customers",
      href: "/customers",
    },

    {
      name: "Subscription",
      href: "/pricing",
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-[9999] h-screen w-[260px] lg:w-[260px] flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#060b1f] p-5 lg:relative">

      <div>

        <div className="space-y-2">

          {menuItems.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 transition-all cursor-pointer relative z-[10000] ${
                pathname === item.href
                  ? "bg-violet-600/20 border border-violet-500/30 text-black dark:text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>

      <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-4">

        <div className="rounded-2xl px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer transition-all">
          Help Center
        </div>

        <div className="rounded-2xl px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer transition-all">
          Support
        </div>

        <div className="rounded-2xl px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer transition-all">
          Help Logs
        </div>

      </div>

    </aside>
  );
}
