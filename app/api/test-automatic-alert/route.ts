import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";   // ✅ 3 levels up (app/api/test-automatic-alert/ → root)
import { getToken } from "next-auth/jwt";
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

export async function GET(req: any) {
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
      include: { businessLocations: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const locationId = user.businessLocations[0]?.id || "11111111-1111-1111-1111-111111111111";

    const dummyReview = await prisma.review.create({
      data: {
        userId: user.id,
        businessLocationId: locationId,
        googleReviewId: `test-${Date.now()}`,
        reviewerName: "Test User",
        rating: 2,
        comment: "This is a test low rating for automatic alert",
        reviewDate: new Date(),
        syncedAt: new Date(),
      },
    });

    if (!user.gmailConnected || dummyReview.rating > 2) {
      return NextResponse.json({ success: false, error: "Gmail not connected or rating not low enough." });
    }

    let alertCount = user.alertEmailsSent ?? 0;
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
        alertCount = 0;
      }
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { alertMonthlyReset: now },
      });
    }

    if (alertCount >= alertLimit) {
      return NextResponse.json({ success: false, error: "Monthly alert limit reached." });
    }

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
      subject: "🔔 New Low Rating Review Alert (Test)",
      html: buildAlertEmail("Low Rating Alert", {
        reviewerName: dummyReview.reviewerName,
        rating: dummyReview.rating,
        comment: dummyReview.comment,
        reviewDate: dummyReview.reviewDate.toISOString(),
      }),
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { alertEmailsSent: { increment: 1 } },
    });

    return NextResponse.json({ success: true, message: "Test alert email sent automatically." });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
