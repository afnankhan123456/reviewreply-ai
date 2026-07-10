export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
        Admin Dashboard
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
        Use the sidebar to manage <strong>Bug Reports</strong>, <strong>Settings</strong> and <strong>Withdrawals</strong>.
      </p>
    </div>
  );
}
