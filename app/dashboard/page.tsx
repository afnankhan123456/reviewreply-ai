export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#050816] text-white">
      <aside className="w-[260px] hidden lg:flex flex-col justify-between border-r border-white/10 bg-[#060b1f] p-5">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-violet-600" />
            <div>
              <div className="font-bold text-lg">ReviewReply AI</div>
              <div className="text-xs text-zinc-500">Admin Panel</div>
            </div>
          </div>

          <div className="space-y-2">
            {['Dashboard','Clients','Reviews','AI Replies','Analytics','Team','Billing','Integrations','Settings'].map((item,index)=>(
              <div key={item} className={`rounded-2xl px-4 py-3 transition-all cursor-pointer ${index===0 ? 'bg-violet-600/20 border border-violet-500/30 text-white' : 'text-zinc-400 hover:bg-white/5'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-glow rounded-3xl p-4">
          <div className="font-semibold">Admin User</div>
          <div className="text-sm text-zinc-400">admin@reviewreply.ai</div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Welcome back, Admin 👋</p>
          </div>

          <div className="card-glow rounded-2xl px-5 py-3 text-zinc-500 w-full lg:w-[420px]">
            Search clients, reviews, or anything...
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            ['TOTAL CLIENTS','128'],
            ['TOTAL REVIEWS','3,842'],
            ['AI REPLIES GENERATED','2,731'],
            ['MONTHLY REVENUE','$12,430'],
          ].map((item)=>(
            <div key={item[0]} className="card-glow rounded-3xl p-6">
              <div className="text-xs text-zinc-500 mb-4">{item[0]}</div>
              <div className="text-4xl font-bold">{item[1]}</div>
              <div className="text-emerald-400 text-sm mt-3">↑ 24% this month</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 card-glow rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Reviews Overview</h2>
              <div className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-400">This Month</div>
            </div>

            <div className="relative h-[300px] rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-b from-violet-500/10 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent_70%)]" />

              <svg viewBox="0 0 800 300" className="absolute inset-0 h-full w-full">
                <path d="M0 240 C120 140 220 180 320 120 C420 60 520 180 620 120 C700 80 760 60 800 20" fill="none" stroke="#8b5cf6" strokeWidth="5" />
              </svg>
            </div>
          </div>

          <div className="card-glow rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <div className="text-sm text-zinc-500">View All</div>
            </div>

            <div className="space-y-4">
              {['New client added','AI reply generated','New review received','Client updated'].map((item)=>(
                <div key={item} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <div className="font-medium">{item}</div>
                  <div className="text-xs text-zinc-500 mt-1">2 min ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 card-glow rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Top Clients</h2>
              <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {['Urban Eats','TechFix Solutions','Coffee Corner','AutoCare Clinic'].map((item)=>(
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
                  <div>
                    <div className="font-semibold">{item}</div>
                    <div className="text-sm text-zinc-500">Active Business</div>
                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">Active</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glow rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-6">AI Replies Usage</h2>

            <div className="flex items-center justify-center">
              <div className="h-52 w-52 rounded-full border-[18px] border-violet-500/20 border-t-violet-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">2,731</div>
                  <div className="text-zinc-500 text-sm mt-1">Replies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
