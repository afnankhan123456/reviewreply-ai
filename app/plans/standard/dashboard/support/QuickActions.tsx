"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Bug, MessageSquare, BookOpen } from "lucide-react";
import { useState } from "react";

export function QuickActions() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => document.getElementById("ticket-form")?.scrollIntoView({ behavior: "smooth" })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Ticket
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => document.getElementById("bug-form")?.scrollIntoView({ behavior: "smooth" })}>
          <Bug className="mr-2 h-4 w-4" />
          Report a Bug
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Live Chat
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookOpen className="mr-2 h-4 w-4" />
          Knowledge Base
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
