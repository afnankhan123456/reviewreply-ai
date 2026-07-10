import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Please login first" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { upiId, name, phoneNumber } = body;

    // Validation
    if (!upiId || !name || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // UPI ID validation
    if (!upiId.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid UPI ID" },
        { status: 400 }
      );
    }

    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Save to database
    const withdrawal = await prisma.withdrawal.create({
      data: {
        email: session.user.email,
        upiId,
        name,
        phoneNumber,
        status: "Pending",
      },
    });

    console.log("Withdrawal Request Saved:", withdrawal);

    return NextResponse.json(
      { success: true, message: "Withdrawal request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving withdrawal:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
