import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Ye paths /plans ke andar aise hain jo bina active paid subscription ke bhi
// pahunchne chahiye — warna user "renew karo" page tak hi nahi pahunch payega.
const ALLOWED_WITHOUT_ACTIVE_PLAN = [
  "/plans",
  "/plans/basic/pricing",
  "/plans/basic/checkout",
  "/plans/standard/pricing",
  "/plans/standard/checkout",
  "/plans/pro/pricing",
  "/plans/refer-earn",
];

function isAllowedWithoutActivePlan(pathname: string) {
  return ALLOWED_WITHOUT_ACTIVE_PLAN.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

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

  // ✅ NAYA CHECK: bina kabhi purchase kiye, ya plan expire hone ke baad,
  // dashboard/checkout-se-aage wale kisi bhi /plans route pe na jaane do —
  // seedha pricing page pe bhej do taaki wo renew/purchase kar sake.
  if (
    token &&
    !isAdmin &&
    pathname.startsWith("/plans") &&
    !isAllowedWithoutActivePlan(pathname)
  ) {
    const subscriptionEnd = token.subscriptionEnd
      ? new Date(token.subscriptionEnd as string)
      : null;
    const hasActivePlan =
      subscriptionEnd !== null && subscriptionEnd.getTime() > Date.now();

    if (!hasActivePlan) {
      const pricingUrl = request.nextUrl.clone();
      pricingUrl.pathname = "/plans/basic/pricing";
      pricingUrl.search = "";
      return NextResponse.redirect(pricingUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/plans/:path*"],
};
