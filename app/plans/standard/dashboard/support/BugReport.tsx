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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Report a Bug</h3>
        <p className="text-sm text-muted-foreground">
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          >
            {isPending ? "Submitting..." : "Submit Bug Report"}
          </button>
        </form>
      </div>
    </div>
  );
}
