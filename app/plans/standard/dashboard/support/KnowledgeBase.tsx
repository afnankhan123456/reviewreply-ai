"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const articles = [
  { title: "Getting Started Guide", content: "Learn how to set up your account and configure your first project." },
  { title: "Billing & Invoices", content: "Understand your billing cycle, payment methods, and how to download invoices." },
  { title: "API Reference", content: "Full documentation of our REST API with code examples." },
  { title: "Integrations", content: "Connect with popular tools like Slack, Jira, and GitHub." },
];

export function KnowledgeBase() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (index: string) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 border rounded-lg">
        {articles.map((article, idx) => (
          <div key={idx}>
            <button
              onClick={() => toggleItem(`item-${idx}`)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {article.title}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openItem === `item-${idx}` ? "rotate-180" : ""}`}
              />
            </button>
            {openItem === `item-${idx}` && (
              <div className="px-4 pb-3 text-sm text-gray-500 dark:text-gray-400">
                {article.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
