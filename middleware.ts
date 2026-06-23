import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminEmail = request.cookies.get("admin-email")?.value;

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    adminEmail !== process.env.ADMIN_EMAIL
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
