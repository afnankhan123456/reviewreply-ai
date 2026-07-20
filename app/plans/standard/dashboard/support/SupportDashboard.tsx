"use client";

import { useState, useEffect } from "react";
import { PrioritySupport } from "./PrioritySupport";
import { BugReport } from "./BugReport";
import { MyTickets } from "./MyTickets";
import { KnowledgeBase } from "./KnowledgeBase";
import { FAQ } from "./FAQ";
import { TicketDetails } from "./TicketDetails";

export function SupportDashboard() {
  const [activeTab, setActiveTab] = useState<string>("tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const tabContainerBg = theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700";
  const tabBorder = theme === "light" ? "border-gray-200" : "border-gray-700";
  const tabInactive = theme === "light" ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200";
  const tabActive = "border-b-2 border-blue-500 text-blue-400"; // keep accent
  const contentText = theme === "light" ? "text-gray-700" : "text-gray-200";

  const tabs = [
    { id: "tickets", label: "My Tickets" },
    { id: "bug", label: "Report a Bug" },
    { id: "kb", label: "Knowledge Base" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className={`flex flex-col gap-3 p-3 min-h-screen transition-colors duration-300 ${bgMain}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold tracking-tight ${textPrimary}`}>
          Support Center
        </h1>
      </div>

      {/* First row: two columns */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Left column – Priority Support only */}
        <div className="lg:col-span-2">
          <PrioritySupport />
        </div>

        {/* Right column – Ticket Details only */}
        <div className="space-y-3">
          {selectedTicketId && (
            <TicketDetails
              ticketId={selectedTicketId}
              onClose={() => setSelectedTicketId(null)}
            />
          )}
        </div>
      </div>

      {/* Second row: full-width tabbed section */}
      <div className={`rounded-lg border shadow-sm h-[340px] overflow-y-auto ${tabContainerBg}`}>
        <div className={`flex border-b ${tabBorder}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? tabActive
                  : tabInactive
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`p-4 ${contentText}`}>
          {activeTab === "tickets" && (
            <MyTickets onSelectTicket={setSelectedTicketId} />
          )}
          {activeTab === "bug" && <BugReport />}
          {activeTab === "kb" && <KnowledgeBase />}
          {activeTab === "faq" && <FAQ />}
        </div>
      </div>
    </div>
  );
}
