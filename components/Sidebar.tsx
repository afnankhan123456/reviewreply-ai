export default function Sidebar() {
  return (
    <aside className="w-[260px] hidden lg:flex flex-col justify-between border-r border-zinc-800 bg-white dark:bg-[#060b1f] p-5">

      <div>

        <div className="space-y-2">
          {[
            "Dashboard",
            "Clients",
            "Reviews",
            "AI Replies",
            "Analytics",
            "Team",
            "Billing",
            "Integrations",
            "Settings",
          ].map((item, index) => (
            <div
              key={item}
              className={`rounded-2xl px-4 py-3 transition-all cursor-pointer ${
                index === 0
                  ? "bg-violet-600/20 border border-violet-500/30 text-white"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}


