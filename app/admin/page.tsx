import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white transition-all">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            Manage clients, payments, reviews and system controls.
          </p>
        </div>
      </div>
    </div>
  );
}
