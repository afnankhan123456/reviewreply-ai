"use client";

import { useState } from "react";
import { PrioritySupport } from "./PrioritySupport";
import { HelpCenter } from "./HelpCenter";
import { BugReport } from "./BugReport";
import { MyTickets } from "./MyTickets";
import { KnowledgeBase } from "./KnowledgeBase";
import { FAQ } from "./FAQ";
import { QuickActions } from "./QuickActions";
import { ContactSupport } from "./ContactSupport";
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
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PrioritySupport />

          {/* Simple tab bar */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
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

          <HelpCenter />
        </div>

        <div className="space-y-6">
          <ContactSupport />
          {selectedTicketId && (
            <TicketDetails
              ticketId={selectedTicketId}
              onClose={() => setSelectedTicketId(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
