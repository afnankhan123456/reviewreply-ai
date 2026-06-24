export default function Sidebar() {
  return (
    <aside className="w-[260px] hidden lg:flex flex-col justify-between border-r border-zinc-800 bg-white dark:bg-[#060b1f] p-5">

      <div>
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-violet-600" />

          <div>
            <div className="font-bold text-lg">
              ReviewReply AI
            </div>

            <div className="text-xs text-zinc-500">
              Dashboard
            </div>
          </div>
        </div>

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
