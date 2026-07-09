import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - List all whitelisted partners
export async function GET() {
  try {
    // Partners ko ek alag table mein store karenge
    // Abhi ke liye referralStats mein ek flag use karte hain
    const partners = await prisma.partnerWhitelist.findMany({
      select: { email: true },
    });

    const emails = partners.map((p) => p.email);

    return NextResponse.json({
      success: true,
      emails: emails,
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - Add email to whitelist
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.partnerWhitelist.findUnique({
      where: { email: email },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Email already whitelisted",
      });
    }

    await prisma.partnerWhitelist.create({
      data: { email: email },
    });

    return NextResponse.json({
      success: true,
      message: `${email} added to whitelist`,
    });
  } catch (error) {
    console.error("Error adding partner:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE - Remove email from whitelist
export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await prisma.partnerWhitelist.delete({
      where: { email: email },
    });

    return NextResponse.json({
      success: true,
      message: `${email} removed from whitelist`,
    });
  } catch (error) {
    console.error("Error removing partner:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
