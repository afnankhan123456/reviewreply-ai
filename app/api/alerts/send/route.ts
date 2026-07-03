import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";      // ✅ fixed path
import { getToken } from "next-auth/jwt";
import nodemailer from "nodemailer";

// Email template helper
function buildAlertEmail(alertType: string, reviewInfo: any) {
  return `
    <h2>${alertType}</h2>
    <p><strong>Reviewer:</strong> ${reviewInfo.reviewerName}</p>
    <p><strong>Rating:</strong> ${reviewInfo.rating} ⭐</p>
    <p><strong>Comment:</strong> ${reviewInfo.comment}</p>
    <p><strong>Date:</strong> ${reviewInfo.reviewDate}</p>
  `;
}

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Check Gmail connection
    if (!user.gmailConnected) {
      return NextResponse.json({ success: false, error: "Gmail is not connected" }, { status: 400 });
    }

    // Check monthly limit and reset if needed
    let currentAlertCount = user.alertEmailsSent ?? 0;
    const alertLimit = user.alertEmailsLimit ?? 100;
    const now = new Date();

    if (user.alertMonthlyReset) {
      const daysSinceReset = Math.floor((now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceReset >= 30) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            alertEmailsSent: 0,
            alertMonthlyReset: now,
          },
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
      return NextResponse.json({
        success: false,
        error: `Monthly alert limit (${alertLimit}) reached.`,
      }, { status: 429 });
    }

    // ============ SEND EMAIL ============
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const dummyReview = {
      reviewerName: "Test Customer",
      rating: 2,
      comment: "Test low rating alert",
      reviewDate: new Date().toISOString(),
    };

    const mailOptions = {
      from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "🔔 New Low Rating Review Alert",
      html: buildAlertEmail("Low Rating Alert", dummyReview),
    };

    await transporter.sendMail(mailOptions);

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
