import {
  Globe,
  Mail,
  MessageSquare,
  Link2,
  CheckCircle2,
  Settings,
} from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Integrations</h1>
        <p className="text-zinc-500 mt-2">
          Connect your favorite platforms and business tools.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* CARD 1 */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Connected Apps</p>
              <h2 className="text-3xl font-bold text-black mt-2">6</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Link2 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Active Syncs</p>
              <h2 className="text-3xl font-bold text-black mt-2">4</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Pending Setup</p>
              <h2 className="text-3xl font-bold text-black mt-2">2</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Settings className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* CARD 4 */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Connected Platforms</p>
              <h2 className="text-3xl font-bold text-black mt-2">8</h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRATIONS LIST */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black">
            Available Integrations
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Connect external services to automate review management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* GOOGLE */}
          <div className="border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition bg-white">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <Globe className="w-7 h-7 text-blue-500" />
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
                Connected
              </span>
            </div>
            <h3 className="text-lg font-bold text-black mt-5">
              Google Business
            </h3>
            <p className="text-sm text-zinc-500 mt-2">
              Sync Google reviews and business insights automatically.
            </p>
            <button className="mt-5 w-full py-3 rounded-2xl bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition">
              Manage Connection
            </button>
          </div>

          {/* EMAIL */}
          <div className="border border-zinc-200 rounded-3xl p-5 hover:shadow-md transition bg-white">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
                <Mail className="w-7 h-7 text-yellow-500" />
              </div>
              <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-medium">
                Not Connected
              </span>
            </div>
            <h3 className="text-lg font-bold text-black mt-5">
              Gmail Alerts
            </h3>
            <p className="text-sm text-zinc-500 mt-2">
              Receive instant email alerts for low ratings and reviews.
            </p>
            <button className="mt-5 w-full py-3 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition">
              Connect Gmail
            </button>
          </div>

          {/* WhatsApp card removed as requested */}
        </div>
      </div>
    </div>
  );
}
