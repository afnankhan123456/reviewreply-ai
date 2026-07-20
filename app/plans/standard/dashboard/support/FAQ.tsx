"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How do I reset my password?", answer: "Go to Settings → Security and click 'Change Password'." },
  { question: "Can I upgrade my plan later?", answer: "Yes, you can upgrade anytime from the Billing page." },
  { question: "Where can I find my API key?", answer: "Navigate to Developer Settings → API Keys." },
  { question: "Do you offer refunds?", answer: "We offer a 14‑day money‑back guarantee on all plans." },
];

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (index: string) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Frequently Asked Questions</h3>
      <div className="divide-y divide-gray-700 border border-gray-700 rounded-lg">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              onClick={() => toggleItem(`faq-${idx}`)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white hover:bg-gray-700/50 transition-colors"
            >
              {faq.question}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${openItem === `faq-${idx}` ? "rotate-180" : ""}`}
              />
            </button>
            {openItem === `faq-${idx}` && (
              <div className="px-4 pb-3 text-sm text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
