"use client";

import {
  HelpCircle,
  BookOpen,
  Mail,
  Bug,
} from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Help Center
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Find answers, documentation, and support.
        </p>
      </div>

      {/* HELP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* FAQs */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">FAQs</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Common questions and quick answers.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Documentation</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Step‑by‑step guides to get started.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Mail className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Contact Support</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Email us at{" "}
                <a href="mailto:support@reviewreply.com" className="text-blue-600 underline">
                  support@reviewreply.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Report a Bug */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
              <Bug className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white">Report a Bug</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Found an issue? Let us know via{" "}
                <a href="mailto:bugs@reviewreply.com" className="text-blue-600 underline">
                  bugs@reviewreply.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
