import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";
import { resolveOwnerAndRole } from "@/lib/getEffectiveOwner";

export async function GET(req: any) {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const requestingUser = await prisma.user.findUnique({
      where: { email: token.email },
      select: { id: true },
    });

    if (!requestingUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const { ownerId } = await resolveOwnerAndRole(requestingUser.id);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [user, repliedToday] = await Promise.all([
      prisma.user.findUnique({
        where: { id: ownerId },
        include: {
          reviews: {
            where: { replied: false },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.review.count({
        where: { userId: ownerId, replied: true, repliedAt: { gte: startOfToday } },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      unanswered: user.reviews,
      repliedToday,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
