"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

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

export async function getTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return tickets;
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return tickets.find((t) => t.id === id);
}

export async function createTicket(formData: FormData): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
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
  feature: string,
  issueType: string,
  description: string
): Promise<{ success: boolean; message: string }> {
  if (!feature || !issueType || !description) {
    return { success: false, message: "Feature, issue type and description are required." };
  }

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.bugReport.create({
      data: {
        userId: session.user.id,
        feature,
        issueType,
        description,
      },
    });

    revalidatePath("/plans/standard/dashboard/support");
    return { success: true, message: "Bug report submitted. Thank you!" };
  } catch (error) {
    console.error("Error submitting bug report:", error);
    return { success: false, message: "Failed to submit bug report." };
  }
}

export async function sendContactMessage(formData: FormData): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { success: false, message: "Email and message are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: "Message sent. We'll get back to you soon." };
}

export async function getArticles() {
  try {
    const articles = await prisma.knowledgeArticle.findMany({
      orderBy: { title: "asc" },
    });
    return { success: true, articles };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { success: false, articles: [] };
  }
}

export async function submitArticleFeedback(articleId: string, helpful: boolean) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.articleFeedback.upsert({
      where: {
        articleId_userId: {
          articleId,
          userId: session.user.id,
        },
      },
      update: { helpful },
      create: {
        articleId,
        userId: session.user.id,
        helpful,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return { success: false, error: "Failed to submit feedback" };
  }
}
