import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

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

    const body = await req.json();
    const { feature, issueType, description } = body;

    if (!feature || !issueType || !description) {
      return NextResponse.json(
        { success: false, error: "Feature, issue type, and description are required." },
        { status: 400 }
      );
    }

    // Duplicate check
    const existingOpen = await prisma.bugReport.findFirst({
      where: {
        userId: user.id,
        feature,
        issueType,
        status: "Open",
      },
    });

    if (existingOpen) {
      return NextResponse.json(
        {
          success: false,
          error: `You already have an open ticket for "${feature}" - "${issueType}". We are working on it.`,
        },
        { status: 409 }
      );
    }

    await prisma.bugReport.create({
      data: {
        userId: user.id,
        feature,
        issueType,
        description,
        status: "Open",
      },
    });

    return NextResponse.json({ success: true, message: "Bug report submitted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
