import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { postReplyToGoogle } from "../../../../../lib/googlePostReply";

export async function POST(req: any, context: any) {
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

    const { reply } = await req.json();
    if (!reply) {
      return NextResponse.json({ success: false, error: "Reply text is required" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({
      where: { id: context.params.id },
    });

    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // ✅ Standard plan ki tarah — ab yahan bhi real Google-post hoga,
    // aur fail hone par sach me fail bolega (pehle sirf DB update hota tha)
    const result = await postReplyToGoogle(context.params.id, reply);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to post reply to Google" },
        { status: 502 }
      );
    }

    const updatedReview = await prisma.review.findUnique({
      where: { id: context.params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Reply saved successfully",
      data: updatedReview,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
