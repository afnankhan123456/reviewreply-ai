import AdminNavbar from "../../components/admin/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b1220]">
      <AdminNavbar />
      <div>{children}</div>
    </div>
  );
}
