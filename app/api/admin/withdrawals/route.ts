import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Admin check (optional - add your admin email)
    // if (session.user.email !== "admin@example.com") {
    //   return NextResponse.json(
    //     { success: false, error: "Access denied" },
    //     { status: 403 }
    //   );
    // }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const month = searchParams.get("month");

    // TODO: Replace with actual database query
    // Example filter logic:
    let withdrawals = []; // Fetch from database
    
    // if (email) {
    //   withdrawals = withdrawals.filter(w => w.email.includes(email));
    // }
    // if (month !== null && month !== "") {
    //   withdrawals = withdrawals.filter(w => {
    //     const withdrawalMonth = new Date(w.createdAt).getMonth();
    //     return withdrawalMonth === parseInt(month);
    //   });
    // }

    // Dummy data for now (remove when database is connected)
    withdrawals = [
      {
        _id: "1",
        email: "user1@gmail.com",
        upiId: "user1@upi",
        name: "User One",
        phoneNumber: "9876543210",
        status: "Pending",
        createdAt: "2026-07-10T10:30:00Z",
      },
      {
        _id: "2",
        email: "user2@gmail.com",
        upiId: "user2@upi",
        name: "User Two",
        phoneNumber: "9876543211",
        status: "Paid",
        createdAt: "2026-06-15T14:20:00Z",
      },
    ];

    return NextResponse.json(
      { success: true, withdrawals },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
