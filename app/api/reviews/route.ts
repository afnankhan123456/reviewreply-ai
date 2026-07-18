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

    // Team member ho to Owner ka data dikhega, warna apna hi data
    const { ownerId } = await resolveOwnerAndRole(requestingUser.id);

    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      include: { reviews: { orderBy: { createdAt: "desc" } } },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      reviews: user.reviews,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
