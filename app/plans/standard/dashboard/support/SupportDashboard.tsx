"use client";

import { useState } from "react";
import { PrioritySupport } from "./PrioritySupport";
import { HelpCenter } from "./HelpCenter";
import { BugReport } from "./BugReport";
import { MyTickets } from "./MyTickets";
import { KnowledgeBase } from "./KnowledgeBase";
import { FAQ } from "./FAQ";
import { TicketDetails } from "./TicketDetails";

export function SupportDashboard() {
  const [activeTab, setActiveTab] = useState<string>("tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const tabs = [
    { id: "tickets", label: "My Tickets" },
    { id: "bug", label: "Report a Bug" },
    { id: "kb", label: "Knowledge Base" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
      </div>

      {/* First row: two columns */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Left column – Priority Support only */}
        <div className="lg:col-span-2">
          <PrioritySupport />
        </div>

        {/* Right column – Help Center + optional Ticket Details */}
        <div className="space-y-3">
          <HelpCenter />
          {selectedTicketId && (
            <TicketDetails
              ticketId={selectedTicketId}
              onClose={() => setSelectedTicketId(null)}
            />
          )}
        </div>
      </div>

      {/* Second row: full‑width tabbed section – height now 320px */}
      <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm h-[340px] overflow-y-auto">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === "tickets" && <MyTickets onSelectTicket={setSelectedTicketId} />}
          {activeTab === "bug" && <BugReport />}
          {activeTab === "kb" && <KnowledgeBase />}
          {activeTab === "faq" && <FAQ />}
        </div>
      </div>
    </div>
  );
}
