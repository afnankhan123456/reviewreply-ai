import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const referrerEmail = cookieStore.get("referrerEmail")?.value || "NOT_SET";
    const referralCode = cookieStore.get("referral_code")?.value || "NOT_SET";

    return NextResponse.json({
      success: true,
      cookies: {
        referrerEmail: referrerEmail,
        referral_code: referralCode,
        nextauth_session: cookieStore.get("__Secure-next-auth.session-token")?.value ? "EXISTS" : "MISSING",
      },
      message: "Cookie check completed. Check the 'cookies' field."
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
