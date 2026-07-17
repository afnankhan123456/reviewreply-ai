import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Monthly reset check (user/marketing pool)
    const now = new Date();
    if (user.alertMonthlyReset) {
      const daysSinceReset = Math.floor(
        (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceReset >= 30) {
        await prisma.user.update({
          where: { id: user.id },
          data: { alertEmailsSent: 0, criticalEmailsSent: 0, alertMonthlyReset: now },
        });
        user.alertEmailsSent = 0;
      }
    }

    const alertLimit = user.alertEmailsLimit ?? 100;
    const alertUsed = user.alertEmailsSent ?? 0;

    if (alertUsed >= alertLimit) {
      return NextResponse.json(
        { success: false, error: `Monthly email limit (${alertLimit}) reached.` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { customerName, customerEmail, sendAfterHours, template } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: "customerName and customerEmail are required" },
        { status: 400 }
      );
    }

    const hours = Number(sendAfterHours) || 24;
    const scheduledAt = new Date(Date.now() + hours * 60 * 60 * 1000);

    const reviewRequest = await prisma.reviewRequest.create({
      data: {
        userId: session.user.id,
        customerName,
        customerEmail,
        template: template || "standard",
        sendAfterHours: hours,
        scheduledAt,
      },
    });

    // Slot turant reserve kar lo (create time pe hi count)
    await prisma.user.update({
      where: { id: user.id },
      data: { alertEmailsSent: { increment: 1 } },
    });

    return NextResponse.json({ success: true, reviewRequest });
  } catch (error) {
    console.error("Create review request error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
