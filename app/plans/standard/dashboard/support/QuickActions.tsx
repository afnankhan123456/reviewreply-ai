"use client";

import { useState, useRef, useEffect } from "react";
import { PlusCircle, Bug, MessageSquare, BookOpen, ChevronDown } from "lucide-react";

export function QuickActions() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <PlusCircle className="h-4 w-4" />
        Quick Actions
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white dark:bg-gray-900 shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                document.getElementById("ticket-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <PlusCircle className="h-4 w-4" />
              New Ticket
            </button>
            <button
              onClick={() => {
                setOpen(false);
                document.getElementById("bug-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bug className="h-4 w-4" />
              Report a Bug
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <MessageSquare className="h-4 w-4" />
              Live Chat
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BookOpen className="h-4 w-4" />
              Knowledge Base
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
