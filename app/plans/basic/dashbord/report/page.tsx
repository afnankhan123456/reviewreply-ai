"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Star,
  BarChart3,
} from "lucide-react";

export default function ReportPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Stats from fetched reports
  const [totalReports, setTotalReports] = useState(0);
  const [monthlyReports, setMonthlyReports] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [growth, setGrowth] = useState("N/A");

  async function fetchReports() {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      if (data.success) {
        const fetched = data.reports || [];
        setReports(fetched);
        // Calculate stats
        setTotalReports(fetched.length);
        const monthly = fetched.filter((r: any) => r.type === "monthly").length;
        setMonthlyReports(monthly);
        const totalRating = fetched.reduce((sum: number, r: any) => sum + (r.averageRating || 0), 0);
        const avg = fetched.length > 0 ? totalRating / fetched.length : 0;
        setAvgRating(avg);
        // Growth placeholder (can be calculated from previous month)
        setGrowth("+0%");
      }
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/reports", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        // Refresh list after generation
        await fetchReports();
      } else {
        alert(data.error || "Failed to generate report");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const handleView = (report: any) => {
    // For now, show a simple alert with report details; later you can open a modal
    alert(
      `Report: ${report.title}\nRating: ${report.averageRating}\nReviews: ${report.totalReviews}\nDate: ${new Date(report.createdAt).toLocaleDateString()}`
    );
  };

  const handleDownload = (reportId: string) => {
    // Open download link
    window.open(`/api/reports/${reportId}/download`, "_blank");
  };

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Reports
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Generate and download detailed business review reports.
        </p>
      </div>

      {/* TOP REPORT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* CARD 1 – Total Reports */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Reports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : totalReports}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* CARD 2 – Monthly Reports */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Monthly Reports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : monthlyReports}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* CARD 3 – Avg Rating */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Avg Rating</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : avgRating.toFixed(1)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>

        {/* CARD 4 – Performance Growth */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Performance Growth</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {growth}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* REPORT LIST */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Generated Reports
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Access and download your latest business reports.
            </p>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-5 py-3 rounded-2xl bg-black dark:bg-white dark:text-black text-white font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Report"}
          </button>
        </div>

        <div className="space-y-5">
          {loading ? (
            <p className="text-center text-zinc-500 py-8">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">
              No reports yet. Click "Generate Report" to create one.
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">
                      {report.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {report.type === "monthly"
                        ? "Review insights, customer feedback, and analytics summary."
                        : "Custom report"}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                      Generated on{" "}
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleView(report)}
                    className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-medium hover:opacity-90 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
