import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { syncUserReviews } from "../../../lib/syncReviews";

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      where: { googleConnected: true },
      select: { id: true, email: true },
    });

    const results: any[] = [];

    for (const u of users) {
      try {
        const result = await syncUserReviews(u.id);
        results.push({ email: u.email, ...result });
      } catch (err) {
        results.push({ email: u.email, error: String(err) });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Auto sync completed",
      results,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    });
  }
}
