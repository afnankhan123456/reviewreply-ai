const stats = [
  {
    title: 'Total Clients',
    value: '128',
    growth: '+12%',
  },
  {
    title: 'Total Reviews',
    value: '3,842',
    growth: '+24%',
  },
  {
    title: 'AI Replies',
    value: '2,731',
    growth: '+31%',
  },
  {
    title: 'Revenue',
    value: '$12,430',
    growth: '+18%',
  },
];

const activities = [
  'New review received',
  'AI reply generated',
  'Client account updated',
  'Business connected',
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-[#070b1f] flex-col justify-between p-6">
        <div>
          <div className="text-2xl font-bold mb-10">
            ReviewReply AI
          </div>

          <nav className="space-y-3 text-sm">
            {[
              'Dashboard',
              'Clients',
              'Reviews',
              'AI Replies',
              'Analytics',
              'Billing',
              'Settings',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/5 bg-white/5 hover:bg-violet-600/20 transition-all px-4 py-3 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </nav>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="font-semibold">Admin User</div>
          <div className="text-sm text-zinc-400 mt-1">
            admin@reviewreply.ai
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>
            <p className="text-zinc-400 mt-2">
              Monitor reviews, AI replies and client growth.
            </p>
          </div>

          <div className="w-full md:w-[360px] rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-zinc-400">
            Search clients, reviews...
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111936] to-[#0c1024] p-6 shadow-2xl"
            >
              <div className="text-zinc-400 text-sm mb-3">
                {item.title}
              </div>

              <div className="text-4xl font-bold mb-2">
                {item.value}
              </div>

              <div className="text-emerald-400 text-sm">
                {item.growth} this month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-[#0b1024] p-6 min-h-[350px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">
                Reviews Overview
              </h2>

              <div className="text-sm text-zinc-400">
                This Month
              </div>
            </div>

            <div className="h-[250px] rounded-3xl bg-gradient-to-b from-violet-500/20 to-transparent border border-violet-500/20 flex items-end justify-between px-4 pb-4">
              {[40, 60, 55, 90, 70, 110, 130, 120, 150].map((h, i) => (
                <div
                  key={i}
                  className="w-6 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b1024] p-6">
            <h2 className="text-2xl font-semibold mb-8">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {activities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#0b1024] p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">
                Top Clients
              </h2>

              <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {['Urban Eats', 'Coffee Corner', 'TechFix Solutions'].map((client) => (
                <div
                  key={client}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div>
                    <div className="font-semibold">{client}</div>
                    <div className="text-sm text-zinc-400">
                      Active Business
                    </div>
                  </div>

                  <div className="text-emerald-400">
                    Active
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b1024] p-6">
            <h2 className="text-2xl font-semibold mb-8">
              AI Reply Generator
            </h2>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-zinc-300 mb-5">
              Amazing coffee and great service. Staff was very friendly.
            </div>

            <button className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold shadow-2xl hover:scale-[1.01] transition-all">
              Generate AI Reply
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
