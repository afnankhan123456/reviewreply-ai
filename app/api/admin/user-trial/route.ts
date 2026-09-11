// app/api/admin/user-trial/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

const TRIAL_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

// GET → sabhi currently-active trials ki list (admin panel ke liye)
export async function GET(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trials = await prisma.userTrial.findMany({
      where: { trialEndsAt: { gt: new Date() } },
      orderBy: { trialEndsAt: "desc" },
    });

    return NextResponse.json({ trials });
  } catch (error) {
    console.error("Error fetching trials:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST → ek email ke liye 5-din ka trial grant karo (already hai to overwrite/refresh)
export async function POST(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, plan } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!plan || typeof plan !== "string") {
      return NextResponse.json({ error: "Plan is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trialEndsAt = new Date(Date.now() + TRIAL_DURATION_MS);

    // Record ke liye (admin list dikhane ke liye)
    const trial = await prisma.userTrial.upsert({
      where: { email: normalizedEmail },
      update: { plan, trialEndsAt },
      create: { email: normalizedEmail, plan, trialEndsAt },
    });

    // Actual access dene ke liye — User table ka plan/subscription seedha update
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        plan,
        subscriptionStatus: "active",
        subscriptionEnd: trialEndsAt,
      },
    });

    return NextResponse.json({ success: true, trial });
  } catch (error) {
    console.error("Error granting trial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE → trial time se pehle hi revoke karna ho to (body: { email })
export async function DELETE(req: NextRequest) {
  const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email || !token.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    await prisma.userTrial.deleteMany({
      where: { email: normalizedEmail },
    });

    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        subscriptionStatus: "expired",
        subscriptionEnd: new Date(0),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking trial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
