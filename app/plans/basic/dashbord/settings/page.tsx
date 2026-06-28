export default function SettingsPage() {
  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="space-y-6">

        {/* GOOGLE CONNECTION */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Google Business Connection
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Connect your Google Business Profile
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
            Connect
          </button>
        </div>

        {/* EMAIL NOTIFICATIONS */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Email Notifications
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Receive important email updates
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" />
        </div>

        {/* REVIEW ALERTS */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              New Review Alerts
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Get alerts when new reviews arrive
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" />
        </div>

        {/* AUTO REPLY */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">
                Auto Reply
              </h2>

              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>

            <p className="text-sm text-zinc-500 mt-1">
              Automatically reply to customer reviews
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" disabled />
        </div>

        {/* REVIEW SYNC */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Review Sync Frequency
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Choose how often reviews sync
            </p>
          </div>

          <select className="border rounded-xl px-4 py-2">
            <option>Every 1 Hour</option>
            <option>Every 6 Hours</option>
            <option>Every 12 Hours</option>
            <option>Daily</option>
          </select>
        </div>

        {/* DARK MODE */}

        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Dark / Light Mode
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Change dashboard appearance
            </p>
          </div>

          <button className="bg-zinc-900 text-white px-5 py-2 rounded-xl">
            Toggle Mode
          </button>
        </div>

      </div>

    </div>

  );
}





