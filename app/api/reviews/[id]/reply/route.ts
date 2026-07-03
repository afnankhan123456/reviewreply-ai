import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: any, { params }: { params: { id: string } }) {
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
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

    if (review.userId !== user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    await prisma.review.update({
      where: { id: params.id },
      data: {
        reviewReply: reply,
        replied: true,
      },
    });

    return NextResponse.json({ success: true, message: "Reply saved successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
