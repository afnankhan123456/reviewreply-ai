"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export type TicketStatus = "open" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}

// BugReport (database) ke record ko Ticket shape me convert karta hai
function toTicket(bug: any): Ticket {
  return {
    id: bug.id,
    subject: bug.feature,
    description: bug.description,
    status: bug.status === "Resolved" ? "resolved" : "open",
    priority: (bug.issueType as TicketPriority) || "medium",
    createdAt: bug.createdAt.toISOString(),
    updatedAt: bug.createdAt.toISOString(),
  };
}

// Logged-in user ke apne saare tickets/bug-reports laata hai (real DB se)
export async function getTickets(): Promise<Ticket[]> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const bugs = await prisma.bugReport.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return bugs.map(toTicket);
}

// Ek specific ticket ka detail laata hai — sirf agar wo isi user ka ho
export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return undefined;

  const bug = await prisma.bugReport.findUnique({ where: { id } });
  if (!bug || bug.userId !== session.user.id) return undefined;

  return toTicket(bug);
}

// Naya ticket create karta hai (future me agar UI se "New Ticket" button add ho)
export async function createTicket(
  formData: FormData
): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const priority = (formData.get("priority") as TicketPriority) || "medium";

  if (!subject || !description) {
    return { success: false, message: "Subject and description are required." };
  }

  const bug = await prisma.bugReport.create({
    data: {
      userId: session.user.id,
      feature: subject,
      issueType: priority,
      description,
      status: "Open",
    },
  });

  revalidatePath("/plans/standard/dashboard/support");
  return { success: true, message: "Ticket created successfully.", ticket: toTicket(bug) };
}

// Bug report ko REAL database me save karta hai — feature/issueType/description
// (Basic plan wale flow jaisa hi: dropdown + "Other" ke case me custom value)
export async function submitBugReport(
  feature: string,
  issueType: string,
  description: string
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in." };
  }

  if (!feature.trim() || !issueType.trim() || !description.trim()) {
    return { success: false, message: "Please fill all required fields." };
  }

  await prisma.bugReport.create({
    data: {
      userId: session.user.id,
      feature: feature.trim(),
      issueType: issueType.trim(),
      description: description.trim(),
      status: "Open",
    },
  });

  revalidatePath("/plans/standard/dashboard/support");
  return { success: true, message: "Bug report submitted successfully. Thank you!" };
}

export async function sendContactMessage(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { success: false, message: "Email and message are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: "Message sent. We'll get back to you soon." };
}
