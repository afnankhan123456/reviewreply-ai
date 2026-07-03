import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
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

export async function POST(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { email: token.email },
      include: { businessLocations: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    // 🔁 Monthly sync reset
    if (user.monthlyResetDate) {
      const now = new Date();
      const daysSinceReset = Math.floor((now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceReset >= 30) {
        await prisma.user.update({
          where: { id: user.id },
          data: { reviewsUsed: 0, monthlyResetDate: now },
        });
        user.reviewsUsed = 0;
        user.monthlyResetDate = now;
      }
    }

    if (user.reviewsUsed >= user.reviewsLimit) {
      return NextResponse.json({ success: false, error: "Monthly review sync limit reached" });
    }

    if (!user.businessLocations.length) {
      return NextResponse.json({ success: false, error: "No business location connected" });
    }

    // Fetch and sync reviews from Google (same as auto-sync, but only for this user)
    const accessToken = token.accessToken || (token as any).accessToken;
    if (!accessToken) {
      return NextResponse.json({ success: false, error: "No Google access token" });
    }

    for (const location of user.businessLocations) {
      const response = await fetch(
        `https://mybusiness.googleapis.com/v4/${location.googleLocationId}/reviews`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      const reviews = data.reviews || [];

      for (const review of reviews) {
        if (user.reviewsUsed >= user.reviewsLimit) break;

        const existingReview = await prisma.review.findFirst({
          where: { googleReviewId: review.reviewId },
        });
        if (existingReview) continue;

        const newReview = await prisma.review.create({
          data: {
            userId: user.id,
            businessLocationId: location.id,
            googleReviewId: review.reviewId,
            reviewerName: review.reviewer?.displayName || "Anonymous",
            rating: review.starRating || 0,
            comment: review.comment || "",
            reviewReply: review.reviewReply?.comment || "",
            replied: !!review.reviewReply,
            reviewDate: new Date(review.createTime),
            syncedAt: new Date(),
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { reviewsUsed: { increment: 1 } },
        });
        user.reviewsUsed++;

        // -------------------- LOW RATING ALERT --------------------
        if (newReview.rating <= 2 && user.gmailConnected) {
          let alertCount = user.alertEmailsSent ?? 0;
          const alertLimit = user.alertEmailsLimit ?? 100;
          const now = new Date();

          // Monthly alert reset
          if (user.alertMonthlyReset) {
            const daysSinceAlertReset = Math.floor(
              (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysSinceAlertReset >= 30) {
              await prisma.user.update({
                where: { id: user.id },
                data: { alertEmailsSent: 0, alertMonthlyReset: now },
              });
              alertCount = 0;
              user.alertEmailsSent = 0;
              user.alertMonthlyReset = now;
            }
          } else {
            await prisma.user.update({
              where: { id: user.id },
              data: { alertMonthlyReset: now },
            });
            user.alertMonthlyReset = now;
          }

          if (alertCount < alertLimit) {
            try {
              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.GMAIL_USER,
                  pass: process.env.GMAIL_APP_PASSWORD,
                },
              });

              const mailOptions = {
                from: `"ReviewReply Alerts" <${process.env.GMAIL_USER}>`,
                to: user.email,
                subject: "🔔 New Low Rating Review Alert",
                html: buildAlertEmail("Low Rating Alert", {
                  reviewerName: newReview.reviewerName,
                  rating: newReview.rating,
                  comment: newReview.comment,
                  reviewDate: newReview.reviewDate.toISOString(),
                }),
              };

              await transporter.sendMail(mailOptions);

              await prisma.user.update({
                where: { id: user.id },
                data: { alertEmailsSent: { increment: 1 } },
              });
              user.alertEmailsSent = (user.alertEmailsSent ?? 0) + 1;
            } catch (emailError) {
              console.error("Failed to send alert email for user", user.email, emailError);
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Manual sync completed",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
