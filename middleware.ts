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

  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};