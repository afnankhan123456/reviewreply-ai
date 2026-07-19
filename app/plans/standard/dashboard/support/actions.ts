"use server";

import { revalidatePath } from "next/cache";

// ---------- Types ----------
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}

// ---------- Mock Database ----------
let tickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Cannot access billing page",
    description: "Getting 403 error when trying to view invoices.",
    status: "open",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "TKT-002",
    subject: "Feature request: Dark mode",
    description: "Please add dark mode support to the dashboard.",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ---------- Server Actions ----------

export async function getTickets(): Promise<Ticket[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tickets;
}

export async function getTicketById(
  id: string
): Promise<Ticket | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return tickets.find((t) => t.id === id);
}

export async function createTicket(
  formData: FormData
): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const priority = (formData.get("priority") as TicketPriority) || "medium";

  if (!subject || !description) {
    return { success: false, message: "Subject and description are required." };
  }

  const newTicket: Ticket = {
    id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
    subject,
    description,
    status: "open",
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tickets.push(newTicket);
  revalidatePath("/plans/standard/dashboard/support");
  return { success: true, message: "Ticket created successfully.", ticket: newTicket };
}

export async function submitBugReport(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const title = formData.get("title") as string;
  const steps = formData.get("steps") as string;
  const severity = formData.get("severity") as string;

  if (!title || !steps) {
    return { success: false, message: "Title and steps to reproduce are required." };
  }

  // In a real app you'd store this in a DB, integrate with Sentry, etc.
  console.log("Bug reported:", { title, steps, severity });
  await new Promise((resolve) => setTimeout(resolve, 800));
  revalidatePath("/plans/standard/dashboard/support");
  return { success: true, message: "Bug report submitted. Thank you!" };
}

export async function sendContactMessage(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { success: false, message: "Email and message are required." };
  }

  // Simulate sending email
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: "Message sent. We'll get back to you soon." };
}
