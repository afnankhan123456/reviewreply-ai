import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const pathname = request.nextUrl.pathname;
  const isAdmin = token?.email === process.env.ADMIN_EMAIL;

  // Protect admin and plans routes
  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/plans"))
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // Non-admin trying to access admin
  if (pathname.startsWith("/admin") && !isAdmin) {
    const plansUrl = request.nextUrl.clone();
    plansUrl.pathname = "/plans";
    plansUrl.search = "";
    return NextResponse.redirect(plansUrl);
  }

  // Admin trying to access user plans dashboard
  if (pathname.startsWith("/plans") && isAdmin) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/plans/:path*"],
};
