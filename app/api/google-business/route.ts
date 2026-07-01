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

    const accountsResponse = await fetch(
      "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    const accountsData = await accountsResponse.json();

    if (!accountsData.accounts?.length) {

      return NextResponse.json({
        success: false,
        error: "No Google Business Profile Found",
      });
    }

    const accountName = accountsData.accounts[0].name;

    const locationsResponse = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    const locationsData = await locationsResponse.json();

    return NextResponse.json({
      success: true,
      locations: locationsData.locations || [],
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: String(error),
    });

  }
}
