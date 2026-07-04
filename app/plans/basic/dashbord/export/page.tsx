"use client";

import { useEffect, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function ExportPage() {
  const [stats, setStats] = useState({
    totalExports: 0,
    csvExports: 0,
    pdfExports: 0,
    successRate: 0,
  });
  const [recentExports, setRecentExports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, recentRes] = await Promise.all([
          fetch("/api/exports/stats"),
          fetch("/api/exports/recent"),
        ]);
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.stats);

        const recentData = await recentRes.json();
        if (recentData.success) setRecentExports(recentData.exports || []);
      } catch (err) {
        console.error("Failed to load export data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleExportCSV = () => {
    window.open("/api/exports/csv", "_blank");
  };

  const handleExportPDF = () => {
    window.open("/api/exports/pdf", "_blank");
  };

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">Export</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Export reviews, analytics, and business reports.
        </p>
      </div>

      {/* TOP EXPORT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Exports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : stats.totalExports}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">CSV Exports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : stats.csvExports}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">PDF Reports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : stats.pdfExports}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Successful Exports</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {stats.successRate}%
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* EXPORT OPTIONS */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-black dark:text-white">Export Options</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Download customer reviews and analytics in multiple formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* CSV EXPORT */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:shadow-md transition bg-white dark:bg-zinc-900">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mt-5">Export CSV</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Download all customer reviews in CSV format.
            </p>
            <button
              onClick={handleExportCSV}
              className="mt-5 w-full py-3 rounded-2xl bg-black dark:bg-white dark:text-black text-white font-medium hover:opacity-90 transition"
            >
              Export CSV
            </button>
          </div>

          {/* PDF EXPORT */}
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:shadow-md transition bg-white dark:bg-zinc-900">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FileText className="w-7 h-7 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold text-black dark:text-white mt-5">Export PDF</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Generate detailed analytics reports in PDF format.
            </p>
            <button
              onClick={handleExportPDF}
              className="mt-5 w-full py-3 rounded-2xl bg-black dark:bg-white dark:text-black text-white font-medium hover:opacity-90 transition"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* RECENT EXPORTS */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">Recent Exports</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Recently generated export files and reports.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {loading ? (
            <p className="text-center text-zinc-500 py-4">Loading...</p>
          ) : recentExports.length === 0 ? (
            <p className="text-center text-zinc-500 py-4">No exports yet. Generate one above.</p>
          ) : (
            recentExports.map((exp) => (
              <div
                key={exp.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Clock3 className="w-7 h-7 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">{exp.fileName}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {exp.type.toUpperCase()} export of customer reviews.
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                      Generated {new Date(exp.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (exp.type === "csv") handleExportCSV();
                    else if (exp.type === "pdf") handleExportPDF();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-sm font-medium hover:opacity-90 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
