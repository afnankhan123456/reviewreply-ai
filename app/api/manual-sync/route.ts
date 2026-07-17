import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { syncUserReviews } from "../../../lib/syncReviews";

export async function POST(req: any) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" });
    }

    const result = await syncUserReviews(session.user.id);

    if (result.error) {
      return NextResponse.json({ success: false, error: result.error });
    }

    return NextResponse.json({
      success: true,
      message: "Manual sync completed",
      synced: result.synced,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
