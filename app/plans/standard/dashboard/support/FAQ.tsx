"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "How do I reset my password?", answer: "Go to Settings → Security and click 'Change Password'." },
  { question: "Can I upgrade my plan later?", answer: "Yes, you can upgrade anytime from the Billing page." },
  { question: "Where can I find my API key?", answer: "Navigate to Developer Settings → API Keys." },
  { question: "Do you offer refunds?", answer: "We offer a 14‑day money‑back guarantee on all plans." },
  { question: "What's the difference between Basic and Standard plans?", answer: "Basic plan supports 1 business location. Standard plan supports up to 2 business locations and lets you invite up to 2 team members." },
  { question: "How many business locations can I connect on the Standard plan?", answer: "You can connect up to 2 Google Business locations on the Standard plan." },
  { question: "How do I add a team member?", answer: "Go to the Team page (Owner access only), enter your team member's email, choose their access level, and click Invite. They'll receive a link to accept and join." },
  { question: "What's the difference between 'View Only' and 'Full Access' team members?", answer: "View Only members can see reviews, alerts, and analytics but cannot reply, download reports, add tags, or send review requests. Full Access members can do all of that, but only the account Owner can manage Team, Settings, and Connect App." },
  { question: "How many team members can I add?", answer: "Up to 2 team members on the Standard plan." },
  { question: "Can I remove a team member later?", answer: "Yes, anytime from the Team page. Their access is revoked automatically within a few seconds." },
  { question: "How do I download reports?", answer: "Go to the Reports page to download Weekly or Monthly reports in PDF or CSV format. You can also view your last 6 months of history." },
  { question: "How do Tags & Categories work?", answer: "Reviews are automatically categorized by tags. Click any tag to see all reviews under it. You can add or remove tags manually too." },
  { question: "How do I send a review request to a customer?", answer: "Go to the Requests page, enter the customer's name and email, and we'll send them a review request email with your Google review link (if you've saved your Google Place ID in Settings)." },
  { question: "Where do I add my Google Place ID?", answer: "Go to Settings and paste your Google Place ID — this is used to generate the review link in customer request emails." },
  { question: "How do low-rating alerts work?", answer: "Whenever a review with a rating of 2 stars or below comes in, it automatically shows up in your Alerts page so you can respond quickly." },
  { question: "How do I connect my Google Business account?", answer: "Go to Connect App (Owner access only), click 'Fetch Locations,' and select the location(s) you want to connect." },
  { question: "How does the AI Reply Center work?", answer: "The AI Reply Center automatically works 24/7. It generates professional, ready-to-use replies for your reviews every hour. You can review and edit the replies before sending them to your customers." },
  { question: "I found a bug — how do I report it?", answer: "Go to Support → Report a Bug, select the feature and issue type, describe the problem, and submit. Our team will review it and respond." },
  { question: "How can I check the status of a bug I reported?", answer: "Go to Support → My Tickets to see the status of all your submitted reports." },
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
