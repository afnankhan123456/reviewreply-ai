"use client";

import { useState } from "react";
import {
  HelpCircle,
  BookOpen,
  Mail,
  Bug,
  X,
  ArrowLeft,
} from "lucide-react";

export default function HelpCenterPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugDescription, setBugDescription] = useState("");

  const handleBugSubmit = () => {
    if (!bugDescription.trim()) return;
    const subject = encodeURIComponent("Bug Report");
    const body = encodeURIComponent(bugDescription);
    window.location.href = `mailto:bugs@reviewreply.com?subject=${subject}&body=${body}`;
    setShowBugModal(false);
    setBugDescription("");
  };

  // -------- FAQs DATA ----------
  const faqs = [
    {
      q: "How do I connect my Google Business account?",
      a: "Go to Integrations → Google Business → Connect.",
    },
    {
      q: "How many reviews can I sync per month?",
      a: "Basic plan allows up to 100 reviews per month, resetting every 30 days.",
    },
    {
      q: "Can I change my plan later?",
      a: "Yes, you can upgrade from the Pricing page at any time.",
    },
    {
      q: "How do I reply to a review?",
      a: "Use the Reviews or Unanswered page to reply directly.",
    },
    {
      q: "How are email alerts triggered?",
      a: "When a low‑rating review (1‑2 stars) is synced, an alert is sent if Gmail is connected.",
    },
  ];

  // -------- RENDER ----------
  return (
    <div className="p-6 lg:p-8">
      {!activeSection ? (
        /* HOME VIEW (cards) */
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Help Center
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Find answers, documentation, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* FAQs */}
            <div
              onClick={() => setActiveSection("faqs")}
              className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition cursor-pointer"
            >
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
            <div
              onClick={() => setActiveSection("docs")}
              className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition cursor-pointer"
            >
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
            <a
              href="mailto:support@reviewreply.com"
              className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">Contact Support</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Email us at support@reviewreply.com
                  </p>
                </div>
              </div>
            </a>

            {/* Report a Bug */}
            <div
              onClick={() => setShowBugModal(true)}
              className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <Bug className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black dark:text-white">Report a Bug</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Found an issue? Let us know.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* DETAIL VIEW (FAQs or Documentation) */
        <>
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </button>

          {activeSection === "faqs" && (
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white mb-6">FAQs</h1>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-800 border rounded-2xl p-5"
                  >
                    <h3 className="font-semibold text-lg text-black dark:text-white">
                      {faq.q}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "docs" && (
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Documentation</h1>
              <div className="prose dark:prose-invert max-w-none space-y-6">
                <section>
                  <h2 className="text-xl font-semibold">Getting Started</h2>
                  <p>
                    Welcome to ReviewReply AI! This guide will help you set up your account
                    and start managing customer reviews effectively.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">1. Connect Google Business</h2>
                  <p>
                    Go to <strong>Integrations</strong> from the sidebar. Click{" "}
                    <strong>Connect Google Business</strong> and log in with the Google
                    account that manages your business profile. Choose the location you
                    want to link. The basic plan supports one location.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">2. Sync Reviews</h2>
                  <p>
                    Once connected, reviews will be synced automatically every few hours.
                    You can also manually trigger a sync from the <strong>Dashboard</strong>{" "}
                    using the <strong>Manual Sync</strong> button. New reviews will appear
                    under <strong>Reviews</strong> and <strong>Unanswered</strong>.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">3. Reply to Reviews</h2>
                  <p>
                    Navigate to <strong>Reviews</strong> or <strong>Unanswered</strong>.
                    Click <strong>Reply</strong> on any review, write your response, and
                    submit. The review status will update to <em>Replied</em>. You can also
                    use <strong>Templates</strong> to save and reuse common replies.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">4. View Analytics</h2>
                  <p>
                    The <strong>Analytics</strong> page shows key metrics: total reviews,
                    average rating, reply rate, sentiment breakdown, and monthly charts.
                    Use it to track performance over time.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">5. Export Data</h2>
                  <p>
                    Go to <strong>Export</strong> to download reviews as CSV or PDF. The
                    CSV file contains all review details; the PDF provides a formatted
                    report.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">6. Manage Alerts</h2>
                  <p>
                    Enable <strong>Gmail Alerts</strong> from the{" "}
                    <strong>Integrations</strong> page to receive email notifications for
                    low‑rating reviews. The basic plan includes up to 100 alert emails per
                    month.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold">7. Need Help?</h2>
                  <p>
                    If you have any questions, visit the <strong>FAQs</strong> page or
                    contact our support team at{" "}
                    <a
                      href="mailto:support@reviewreply.com"
                      className="text-blue-600 underline"
                    >
                      support@reviewreply.com
                    </a>
                    .
                  </p>
                </section>
              </div>
            </div>
          )}
        </>
      )}

      {/* BUG REPORT MODAL */}
      {showBugModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative">
            <button
              onClick={() => setShowBugModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Report a Bug
            </h2>
            <textarea
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={5}
              className="w-full border border-zinc-200 dark:border-zinc-600 rounded-xl p-3 bg-transparent text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleBugSubmit}
              disabled={!bugDescription.trim()}
              className="mt-4 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition"
            >
              Submit Bug Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
