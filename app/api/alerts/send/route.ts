import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import nodemailer from "nodemailer";

// Email template helper
function buildAlertEmail(alertType: string, reviewInfo: any) {
  // Simple example – you can customize later
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

    // Monthly reset logic (30 days)
    if (user.alertMonthlyReset) {
      const daysSinceReset = Math.floor((now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceReset >= 30) {
        // Reset counter
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
      // First time, set reset date
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

    // ============  SEND EMAIL (example alert) ============
    // In real scenario you'd fetch latest low rating or new review from DB.
    // Here we just send a test email.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465
      auth: {
        user: process.env.GMAIL_USER,       // your business Gmail
        pass: process.env.GMAIL_APP_PASSWORD, // app password
      },
    });

    // Example dummy review for test
    const dummyReview = {
      reviewerName: "Test Customer",
      rating: 2,
      comment: "Test low rating alert",
      reviewDate: new Date().toISOString(),
    };

    const mailOptions = {
      from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
      to: user.email, // send to user's email
      subject: "🔔 New Low Rating Review Alert",
      html: buildAlertEmail("Low Rating Alert", dummyReview),
    };

    await transporter.sendMail(mailOptions);

    // Increment sent count
    await prisma.user.update({
      where: { id: user.id },
      data: {
        alertEmailsSent: { increment: 1 },
      },
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
