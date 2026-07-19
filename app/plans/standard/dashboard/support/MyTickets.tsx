"use client";

import { useEffect, useState } from "react";
import { getTickets, type Ticket } from "./actions";

const statusColors: Record<Ticket["status"], string> = {
  open: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
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
      <div className="space-y-3">
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">My Tickets ({tickets.length})</h3>
      {tickets.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
          No tickets yet. Create one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {ticket.id}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      statusColors[ticket.status]
                    }`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {ticket.priority}
                  </span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onSelectTicket(ticket.id)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
