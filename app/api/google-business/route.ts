import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {

    const cookie = req.headers.get("cookie");

    return NextResponse.json({
      success: true,
      message: "Google Business API connected",
      cookies: cookie || "No Cookies Found",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: String(error),
    });

  }
}
