export default function ClientSidebar() {
  return (
    <aside className="w-[260px] hidden lg:flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#060b1f] p-5">

      <div>

        <div className="space-y-2">
          {[
            "Dashboard",
            "Reviews",
            "AI Replies",
            "Analytics",
            "Business",
            "Customers",
            "Subscription",
            "Billing",
            "Settings",
          ].map((item, index) => (
            <div
              key={item}
              className={`rounded-2xl px-4 py-3 transition-all cursor-pointer ${
                index === 0
                  ? "bg-violet-600/20 border border-violet-500/30 text-black dark:text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5"
              }`}
            >
              {item}
            </div>
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