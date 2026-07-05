"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bug,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminBugsPage() {
  const router = useRouter();
  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  // Track which ticket is expanded (clicked to see details)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  async function fetchBugs() {
    try {
      const res = await fetch("/api/admin/bugs");
      const data = await res.json();
      if (data.success) {
        setBugs(data.bugs || []);
      } else {
        if (res.status === 401) router.push("/admin");
      }
    } catch (err) {
      console.error("Failed to fetch bug reports", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(id: string) {
    setResolvingId(id);
    try {
      const res = await fetch("/api/admin/bugs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setBugs((prev) =>
          prev.map((bug) =>
            bug.id === id ? { ...bug, status: "Resolved" } : bug
          )
        );
      } else {
        alert(data.error || "Failed to resolve bug");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setResolvingId(null);
    }
  }

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null); // collapse
    } else {
      setExpandedId(id); // expand this one
    }
  };

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
          Click on a ticket to view details and resolve.
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
              onClick={() => toggleExpand(bug.id)}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 transition-colors duration-300 cursor-pointer"
            >
              {/* Summary Row (always visible) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {bug.feature}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    {bug.issueType}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bug.status === "Open"
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    }`}
                  >
                    {bug.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {bug.user?.email || "Unknown user"} ·{" "}
                    {new Date(bug.createdAt).toLocaleString()}
                  </div>
                  {/* Expand/Collapse icon */}
                  {expandedId === bug.id ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </div>

              {/* Expanded details (only when this ticket is selected) */}
              {expandedId === bug.id && (
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm whitespace-pre-wrap">
                    {bug.description}
                  </p>
                  {bug.status === "Open" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // don't collapse when clicking resolve
                        handleResolve(bug.id);
                      }}
                      disabled={resolvingId === bug.id}
                      className="mt-3 px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/40 disabled:opacity-50 transition"
                    >
                      {resolvingId === bug.id ? "Resolving..." : "Mark as Resolved"}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
