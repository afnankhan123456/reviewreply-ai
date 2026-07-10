import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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

    // TODO: Save to database (yahan aap database me save kar sakte ho)
    console.log("Withdrawal Request:", { upiId, name, phoneNumber });

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
