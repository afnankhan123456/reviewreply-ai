import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  const isAdmin = token?.email === process.env.ADMIN_EMAIL;

  // Protect admin and plans routes
  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/plans"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Non-admin trying to access admin
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/plans", request.url));
  }

  // Admin trying to access user plans dashboard
  if (pathname.startsWith("/plans") && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/plans/:path*"],
};


