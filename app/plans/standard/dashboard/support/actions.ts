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

function mapStatus(dbStatus: string): TicketStatus {
  const normalized = dbStatus.toLowerCase().replace(/\s+/g, "_");
  if (normalized === "open" || normalized === "in_progress" || normalized === "resolved" || normalized === "closed") {
    return normalized;
  }
  return "open";
}

function bugToTicket(bug: {
  id: string;
  feature: string;
  issueType: string;
  description: string;
  status: string;
  createdAt: Date;
}): Ticket {
  return {
    id: bug.id,
    subject: `${bug.feature} — ${bug.issueType}`,
    description: bug.description,
    status: mapStatus(bug.status),
    priority: "medium",
    createdAt: bug.createdAt.toISOString(),
    updatedAt: bug.createdAt.toISOString(),
  };
}

export async function getTickets(): Promise<Ticket[]> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return [];
    }

    const bugs = await prisma.bugReport.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return bugs.map(bugToTicket);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return undefined;
    }

    const bug = await prisma.bugReport.findUnique({ where: { id } });
    if (!bug || bug.userId !== session.user.id) {
      return undefined;
    }

    return bugToTicket(bug);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return undefined;
  }
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
