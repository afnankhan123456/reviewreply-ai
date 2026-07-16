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

    // Gmail connected hona zaroori hai
    if (!user.gmailConnected) {
      return NextResponse.json({ success: false, error: "Gmail is not connected" }, { status: 400 });
    }

    // Monthly limit check + reset agar 30 din ho gaye ho
    let currentAlertCount = user.alertEmailsSent ?? 0;
    const alertLimit = user.alertEmailsLimit ?? 100;
    const now = new Date();

    if (user.alertMonthlyReset) {
      const daysSinceReset = Math.floor(
        (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceReset >= 30) {
        await prisma.user.update({
          where: { id: user.id },
          data: { alertEmailsSent: 0, alertMonthlyReset: now },
        });
        currentAlertCount = 0;
      }
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertMonthlyReset: now },
      });
    }

    if (currentAlertCount >= alertLimit) {
      return NextResponse.json(
        { success: false, error: `Monthly alert limit (${alertLimit}) reached.` },
        { status: 429 }
      );
    }

    // Request body se real review data lo (dummy nahi)
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

    await prisma.user.update({
      where: { id: user.id },
      data: { alertEmailsSent: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      message: "Alert email sent successfully",
      remaining: alertLimit - (currentAlertCount + 1),
    });
  } catch (error) {
    console.error("Send alert error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
