import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
        Admin Dashboard
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
        Use the sidebar to manage <strong>Bug Reports</strong>, <strong>Settings</strong> and <strong>Withdrawals</strong>.
      </p>

      {/* Withdraw Info Card */}
      <Link href="/admin/dashboard/withdrawals">
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm p-6 w-full max-w-md hover:shadow-md transition cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Withdraw Info</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
            View and manage user withdrawal requests. Filter by email or month.
          </p>
          <div className="w-full bg-[#7c5cfc] hover:bg-[#6a4ce0] text-white py-2.5 rounded-lg font-medium text-sm transition text-center">
            View Withdrawals →
          </div>
        </div>
      </Link>
    </div>
  );
}
