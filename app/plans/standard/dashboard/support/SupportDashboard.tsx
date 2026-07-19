// app/plans/standard/dashboard/support/SupportDashboard.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PrioritySupport } from "./PrioritySupport";
import { HelpCenter } from "./HelpCenter";
import { BugReport } from "./BugReport";
import { MyTickets } from "./MyTickets";
import { KnowledgeBase } from "./KnowledgeBase";
import { FAQ } from "./FAQ";
import { QuickActions } from "./QuickActions";
import { ContactSupport } from "./ContactSupport";

export function SupportDashboard() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PrioritySupport />
          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="bug">Report a Bug</TabsTrigger>
              <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="tickets">
              <MyTickets onSelectTicket={setSelectedTicketId} />
            </TabsContent>
            <TabsContent value="bug">
              <BugReport />
            </TabsContent>
            <TabsContent value="kb">
              <KnowledgeBase />
            </TabsContent>
            <TabsContent value="faq">
              <FAQ />
            </TabsContent>
          </Tabs>
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
