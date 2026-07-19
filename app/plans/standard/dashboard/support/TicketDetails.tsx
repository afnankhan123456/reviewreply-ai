"use client";

import { useEffect, useState } from "react";
import { getTicketById, type Ticket } from "./actions";
import { X } from "lucide-react";

export function TicketDetails({ ticketId, onClose }: { ticketId: string; onClose: () => void }) {
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
      <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Ticket Not Found</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The requested ticket could not be found.
        </p>
      </div>
    );
  }

  const statusColor = {
    open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  }[ticket.status];

  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 shadow-sm p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm text-gray-500 dark:text-gray-400">{ticket.id}</span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {ticket.priority}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ticket.subject}</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium">Status: </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor}`}>
            {ticket.status.replace("_", " ")}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium">Description:</span>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{ticket.description}</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created: {new Date(ticket.createdAt).toLocaleString()}
          <br />
          Last updated: {new Date(ticket.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
