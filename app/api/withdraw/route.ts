import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

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

    const withdrawalData = {
      email: session.user.email,
      upiId,
      name,
      phoneNumber,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to database
    console.log("Withdrawal Request:", withdrawalData);

    return NextResponse.json(
      { success: true, message: "Withdrawal request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
