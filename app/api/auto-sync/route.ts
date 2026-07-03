import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import nodemailer from "nodemailer";

// Simple email template helper
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

    if (!token?.accessToken) {
      return NextResponse.json({
        success: false,
        error: "No Google access token found",
      });
    }

    const users = await prisma.user.findMany({
      include: {
        businessLocations: true,
      },
    });

    for (const user of users) {
      // --- Monthly sync reset (reviewsUsed) ---
      if (user.monthlyResetDate) {
        const now = new Date();
        const daysSinceReset = Math.floor(
          (now.getTime() - new Date(user.monthlyResetDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceReset >= 30) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              reviewsUsed: 0,
              monthlyResetDate: now,
            },
          });
          user.reviewsUsed = 0;
          user.monthlyResetDate = now;
        }
      }

      if (user.reviewsUsed >= user.reviewsLimit) {
        continue;
      }

      for (const location of user.businessLocations) {
        const response = await fetch(
          `https://mybusiness.googleapis.com/v4/${location.googleLocationId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        );

        const data = await response.json();
        const reviews = data.reviews || [];

        for (const review of reviews) {
          if (user.reviewsUsed >= user.reviewsLimit) {
            break;
          }

          const existingReview = await prisma.review.findFirst({
            where: {
              googleReviewId: review.reviewId,
            },
          });

          if (existingReview) {
            continue;
          }

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
            data: {
              reviewsUsed: { increment: 1 },
            },
          });

          user.reviewsUsed++;

          // -------------------- LOW RATING ALERT --------------------
          if (newReview.rating <= 2 && user.gmailConnected) {
            // Monthly alert reset
            let alertCount = user.alertEmailsSent ?? 0;
            const alertLimit = user.alertEmailsLimit ?? 100;
            const now = new Date();

            if (user.alertMonthlyReset) {
              const daysSinceAlertReset = Math.floor(
                (now.getTime() - new Date(user.alertMonthlyReset).getTime()) / (1000 * 60 * 60 * 24)
              );
              if (daysSinceAlertReset >= 30) {
                await prisma.user.update({
                  where: { id: user.id },
                  data: {
                    alertEmailsSent: 0,
                    alertMonthlyReset: now,
                  },
                });
                alertCount = 0;
                user.alertEmailsSent = 0;
                user.alertMonthlyReset = now;
              }
            } else {
              // first time, set reset date
              await prisma.user.update({
                where: { id: user.id },
                data: { alertMonthlyReset: now },
              });
              user.alertMonthlyReset = now;
            }

            if (alertCount < alertLimit) {
              // Send email
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
                  data: {
                    alertEmailsSent: { increment: 1 },
                  },
                });
                user.alertEmailsSent = (user.alertEmailsSent ?? 0) + 1;
              } catch (emailError) {
                console.error("Failed to send alert email for user", user.email, emailError);
                // Continue syncing even if email fails
              }
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Auto sync completed",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
