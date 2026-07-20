"use client";

import { useState, useTransition } from "react";
import { submitBugReport } from "./actions";

const FEATURE_OPTIONS = [
  "Overview",
  "Reviews",
  "AI Reply Center",
  "Analytics",
  "Reports",
  "Tags & Categories",
  "Requests",
  "Alerts",
  "Connect App",
  "Competitors",
  "Team",
  "Settings",
  "Other",
];

const ISSUE_TYPE_OPTIONS = [
  "UI / Design glitch",
  "Data not loading",
  "Button not working",
  "Wrong data shown",
  "Sync issue",
  "Email alert issue",
  "Other",
];

export function BugReport() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [feature, setFeature] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [issueType, setIssueType] = useState("");
  const [customIssueType, setCustomIssueType] = useState("");
  const [description, setDescription] = useState("");

  const finalFeature = feature === "Other" ? customFeature.trim() : feature;
  const finalIssueType = issueType === "Other" ? customIssueType.trim() : issueType;

  const canSubmit =
    !!finalFeature &&
    !!finalIssueType &&
    !!description.trim() &&
    !(feature === "Other" && !customFeature.trim()) &&
    !(issueType === "Other" && !customIssueType.trim());

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setFeedback(null);
    startTransition(async () => {
      const result = await submitBugReport(finalFeature, finalIssueType, description);
      setFeedback({ type: result.success ? "success" : "error", message: result.message });
      if (result.success) {
        setFeature("");
        setCustomFeature("");
        setIssueType("");
        setCustomIssueType("");
        setDescription("");
      }
    });
  }

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-1">Report a Bug</h3>
      <p className="text-sm text-gray-400 mb-4">
        Found something not working? Let us know and we'll fix it.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Feature dropdown */}
        <div>
          <label htmlFor="feature" className="block text-sm font-medium text-gray-300 mb-1">
            Which feature has the issue?
          </label>
          <select
            id="feature"
            value={feature}
            onChange={(e) => {
              setFeature(e.target.value);
              if (e.target.value !== "Other") setCustomFeature("");
            }}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select feature --</option>
            {FEATURE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {feature === "Other" && (
          <input
            type="text"
            placeholder="Enter feature name"
            value={customFeature}
            onChange={(e) => setCustomFeature(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-900 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Issue type dropdown */}
        <div>
          <label htmlFor="issueType" className="block text-sm font-medium text-gray-300 mb-1">
            What type of problem is it?
          </label>
          <select
            id="issueType"
            value={issueType}
            onChange={(e) => {
              setIssueType(e.target.value);
              if (e.target.value !== "Other") setCustomIssueType("");
            }}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select issue type --</option>
            {ISSUE_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {issueType === "Other" && (
          <input
            type="text"
            placeholder="Enter problem type"
            value={customIssueType}
            onChange={(e) => setCustomIssueType(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-900 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-900 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-md text-sm ${
              feedback.type === "success"
                ? "bg-green-900/30 text-green-300 border border-green-700"
                : "bg-red-900/30 text-red-300 border border-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !canSubmit}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Submitting..." : "Submit Bug Report"}
        </button>
      </form>
    </div>
  );
}
