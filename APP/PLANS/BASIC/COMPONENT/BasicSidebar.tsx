"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BasicSidebar() {

  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/plans/basic/dashboard",
    },

    {
      name: "Reviews",
      href: "/reviews",
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
      href: "/plans/basic/pricing",
    },
  ];

  return (
    <aside className="w-[260px] hidden lg:flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#060b1f] p-5">

      <div>

        <div className="mb-8">

          <h1 className="text-2xl font-bold">
            Basic Plan
          </h1>

          <p className="text-zinc-500 text-sm mt-1">
            ReviewReply AI
          </p>

        </div>

        <div className="space-y-2">

          {menuItems.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 transition-all ${
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

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">

        <p className="text-sm text-zinc-500">
          Basic subscription active
        </p>

      </div>

    </aside>
  );
}