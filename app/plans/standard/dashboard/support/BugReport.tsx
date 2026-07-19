"use client";

import { useState, useTransition } from "react";
import { submitBugReport } from "./actions";

export function BugReport() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFeedback(null);
    startTransition(async () => {
      const result = await submitBugReport(formData);
      setFeedback({ type: result.success ? "success" : "error", message: result.message });
      if (result.success) {
        e.currentTarget.reset();
      }
    });
  }

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-1">Report a Bug</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Found something not working? Let us know and we'll fix it.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Bug title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Dashboard crashes on mobile"
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="steps" className="block text-sm font-medium mb-1">
            Steps to reproduce
          </label>
          <textarea
            id="steps"
            name="steps"
            required
            rows={4}
            placeholder="Describe what you did..."
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="severity" className="block text-sm font-medium mb-1">
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            defaultValue="medium"
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="low">Low – Cosmetic issue</option>
            <option value="medium">Medium – Workaround exists</option>
            <option value="high">High – Blocking workflow</option>
            <option value="critical">Critical – System down</option>
          </select>
        </div>
        {feedback && (
          <div
            className={`p-3 rounded-md text-sm ${
              feedback.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
            }`}
          >
            {feedback.message}
          </div>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Submitting..." : "Submit Bug Report"}
        </button>
      </form>
    </div>
  );
}
