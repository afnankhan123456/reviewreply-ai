import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {

  try {

    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken) {

      return NextResponse.json({
        success: false,
        error: "No Google access token found",
      });
    }

    const url = req.nextUrl.searchParams.get("location");

    if (!url) {

      return NextResponse.json({
        success: false,
        error: "Location is required",
      });
    }

    const reviewsResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/${url}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    const reviewsData = await reviewsResponse.json();

    return NextResponse.json({
      success: true,
      reviews: reviewsData.reviews || [],
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: String(error),
    });

  }
}