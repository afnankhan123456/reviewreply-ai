"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bug,
} from "lucide-react";

export default function AdminBugsPage() {
  const router = useRouter();
  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBugs() {
      try {
        const res = await fetch("/api/admin/bugs");
        const data = await res.json();
        if (data.success) {
          setBugs(data.bugs || []);
        } else {
          // If unauthorized or error, redirect to admin dashboard
          if (res.status === 401) router.push("/admin");
        }
      } catch (err) {
        console.error("Failed to fetch bug reports", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBugs();
  }, [router]);

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.push("/admin")}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Bug Reports
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          View all bug reports submitted by users.
        </p>
      </div>

      {/* BUG LIST */}
      {loading ? (
        <p className="text-zinc-500 text-center py-8">Loading bug reports...</p>
      ) : bugs.length === 0 ? (
        <div className="text-center py-12">
          <Bug className="mx-auto h-12 w-12 text-zinc-400" />
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">No bug reports yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bugs.map((bug) => (
            <div
              key={bug.id}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {bug.feature}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    {bug.issueType}
                  </span>
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {bug.user?.email || "Unknown user"} ·{" "}
                  {new Date(bug.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm whitespace-pre-wrap">
                {bug.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
