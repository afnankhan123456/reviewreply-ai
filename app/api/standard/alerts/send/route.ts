import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import nodemailer from "nodemailer";

function buildAlertEmail(alertType: string, reviewInfo: any) {
  return `
    <h2>${alertType}</h2>
    <p><strong>Reviewer:</strong> ${reviewInfo.reviewerName}</p>
    <p><strong>Rating:</strong> ${reviewInfo.rating} ⭐</p>
    <p><strong>Comment:</strong> ${reviewInfo.comment}</p>
    <p><strong>Date:</strong> ${reviewInfo.reviewDate}</p>
  `;
}

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (!user.gmailConnected) {
      return NextResponse.json({ success: false, error: "Gmail is not connected" }, { status: 400 });
    }

    const isStandard = user.plan?.startsWith('standard');
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
        user.criticalEmailsSent = 0;
      }
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertMonthlyReset: now },
      });
    }

    const currentCount = isStandard ? (user.criticalEmailsSent ?? 0) : (user.alertEmailsSent ?? 0);
    const limit = isStandard ? (user.criticalEmailsLimit ?? 50) : (user.alertEmailsLimit ?? 100);

    if (currentCount >= limit) {
      return NextResponse.json(
        { success: false, error: `Critical alert limit (${limit}) reached.` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const reviewInfo = {
      reviewerName: body.reviewerName || "Customer",
      rating: body.rating ?? 0,
      comment: body.comment || "",
      reviewDate: body.reviewDate || new Date().toISOString(),
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "🔔 New Low Rating Review Alert",
      html: buildAlertEmail("Low Rating Alert", reviewInfo),
    });

    if (isStandard) {
      await prisma.user.update({
        where: { id: user.id },
        data: { criticalEmailsSent: { increment: 1 } },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertEmailsSent: { increment: 1 } },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Alert email sent successfully",
      remaining: limit - (currentCount + 1),
    });
  } catch (error) {
    console.error("Send alert error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
