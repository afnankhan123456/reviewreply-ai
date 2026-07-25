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

  // Protect admin, plans, and reviews routes
  if (
    !token &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/plans") ||
      pathname.startsWith("/reviews"))
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

  // ✅ Agar user ke paas already koi active plan hai (kabhi purchase kiya hai
  // aur abhi expire nahi hua), to use plan-choose / pricing pages pe rukne
  // ki zarurat nahi — seedha uske dashboard pe bhej do.
  // Refer & Earn (`/plans/refer-earn`) is check se bilkul bahar hai — hamesha khula rahega.
  if (token && !isAdmin) {
    const plan = (token.plan as string) || "";
    const subscriptionEnd = token.subscriptionEnd as string | null;

    const hasPurchasedPlan = plan.startsWith("basic-") || plan.startsWith("standard-");
    const isStillActive = subscriptionEnd && new Date(subscriptionEnd) > new Date();

    const isPlanChoosePage =
      pathname === "/plans" ||
      pathname.startsWith("/plans/basic/pricing") ||
      pathname.startsWith("/plans/standard/pricing") ||
      pathname.startsWith("/plans/pro");

    if (hasPurchasedPlan && isStillActive && isPlanChoosePage) {
      const tier = plan.startsWith("standard-") ? "standard" : "basic";
      const dashboardPath =
        tier === "standard" ? "/plans/standard/dashboard" : "/plans/basic/dashbord";
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/plans/:path*", "/reviews/:path*"],
};
