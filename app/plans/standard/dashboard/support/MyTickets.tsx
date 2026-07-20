"use client";

import { useEffect, useState } from "react";
import { getTickets, type Ticket } from "./actions";

const statusColors: Record<Ticket["status"], string> = {
  open: "bg-blue-900/30 text-blue-300",
  in_progress: "bg-yellow-900/30 text-yellow-300",
  resolved: "bg-green-900/30 text-green-300",
  closed: "bg-gray-700/30 text-gray-400",
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
        <div className="h-12 w-full bg-gray-700 rounded animate-pulse" />
        <div className="h-12 w-full bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">My Tickets ({tickets.length})</h3>
      {tickets.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No tickets yet. Report a bug to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3 hover:bg-gray-700/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-gray-400">
                    BUG-{ticket.id.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      statusColors[ticket.status]
                    }`}
                  >
                    {ticket.status}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-gray-600 px-2.5 py-0.5 text-xs font-semibold text-gray-300 capitalize">
                    {ticket.priority}
                  </span>
                </div>
                <p className="font-medium text-white">{ticket.subject}</p>
                <p className="text-xs text-gray-400">
                  Created {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onSelectTicket(ticket.id)}
                className="text-sm text-blue-400 hover:underline"
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
