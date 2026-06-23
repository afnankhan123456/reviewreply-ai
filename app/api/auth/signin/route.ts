import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/api/auth/signin/google`
  );
}
