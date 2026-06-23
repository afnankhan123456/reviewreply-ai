import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AdminPage() {
  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>

          <p className="text-zinc-400">
            Manage clients, payments, reviews and system controls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-zinc-400 mb-2">Total Clients</h2>
            <p className="text-3xl font-bold">12</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-zinc-400 mb-2">Payments</h2>
            <p className="text-3xl font-bold">$480</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-zinc-400 mb-2">Reviews Processed</h2>
            <p className="text-3xl font-bold">2,480</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-zinc-400 mb-2">API Errors</h2>
            <p className="text-3xl font-bold text-red-500">3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                All Clients
              </h2>

              <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold">
                + Add Client
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl">
                <div>
                  <h3 className="font-semibold">Demo Business</h3>
                  <p className="text-zinc-400 text-sm">demo@gmail.com</p>
                </div>

                <button className="text-red-500">
                  Remove
                </button>
              </div>

              <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-xl">
                <div>
                  <h3 className="font-semibold">Sample Restaurant</h3>
                  <p className="text-zinc-400 text-sm">restaurant@gmail.com</p>
                </div>

                <button className="text-red-500">
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">
              System Control
            </h2>

            <div className="space-y-4">
              <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
                <span>AI Reply System</span>
                <span className="text-green-500">Active</span>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
                <span>Google Reviews API</span>
                <span className="text-green-500">Connected</span>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
                <span>OpenAI API</span>
                <span className="text-yellow-500">Monitoring</span>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
                <span>Server Status</span>
                <span className="text-green-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            API Usage & Errors
          </h2>

          <div className="space-y-4">
            <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
              <span>OpenAI Requests Today</span>
              <span>1,204</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
              <span>Failed Requests</span>
              <span className="text-red-500">3</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl flex items-center justify-between">
              <span>Average Response Time</span>
              <span>1.2s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
