"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTicketById, type Ticket } from "./actions";
import { X } from "lucide-react";

export function TicketDetails({
  ticketId,
  onClose,
}: {
  ticketId: string;
  onClose: () => void;
}) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTicketById(ticketId)
      .then((data) => setTicket(data ?? null))
      .finally(() => setLoading(false));
  }, [ticketId]);

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!ticket) {
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Ticket Not Found</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The requested ticket could not be found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            {ticket.id}
            <Badge variant="outline">{ticket.priority}</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {ticket.subject}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <span className="text-sm font-medium">Status: </span>
          <Badge className="capitalize">{ticket.status.replace("_", " ")}</Badge>
        </div>
        <div>
          <span className="text-sm font-medium">Description:</span>
          <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          Created: {new Date(ticket.createdAt).toLocaleString()}
          <br />
          Last updated: {new Date(ticket.updatedAt).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
