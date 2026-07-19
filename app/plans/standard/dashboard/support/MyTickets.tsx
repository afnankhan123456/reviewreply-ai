// app/plans/standard/dashboard/support/MyTickets.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTickets, type Ticket } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariant: Record<Ticket["status"], "default" | "secondary" | "outline" | "destructive"> = {
  open: "default",
  in_progress: "secondary",
  resolved: "outline",
  closed: "destructive",
};

export function MyTickets({ onSelectTicket }: { onSelectTicket: (id: string) => void }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets ({tickets.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tickets.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No tickets yet. Create one to get started.
          </p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/30 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                  <Badge variant={statusVariant[ticket.status]} className="capitalize">
                    {ticket.status.replace("_", " ")}
                  </Badge>
                  <Badge variant="outline">{ticket.priority}</Badge>
                </div>
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">
                  Created {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onSelectTicket(ticket.id)}>
                View
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
