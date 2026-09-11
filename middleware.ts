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

// ✅ Cookie jo batayegi ki user pehle home page se hokar aaya hai.
const VISITED_COOKIE = "has_landed_home";

// ✅ Routes jo home-landing check se poori tarah EXEMPT hain —
// yeh direct link se, Google se, kahin se bhi khulne chahiye.
// Blog isliye exempt hai kyunki SEO/Google indexing ke liye zaroori hai
// ki search result se direct blog post par click karke user seedha
// waha pahunche — warna Google traffic hamesha home page pe hi girega
// aur blog kabhi kaam nahi karega.
function isExempt(pathname: string) {
  return pathname === "/login" || pathname.startsWith("/blog");
}

// ✅ Static files, images, videos, API routes — in par koi check nahi lagta,
// warna video/logo/CSS/JS load hi nahi honge.
function isStaticOrApi(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(png|jpg|jpeg|svg|webp|gif|mp4|ico|css|js|woff|woff2|txt|xml)$/i.test(
      pathname
    )
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ---------------------------------------------------------------------
  // STEP 0: Static/API files ko turant pass karo, koi bhi check mat lagao
  // ---------------------------------------------------------------------
  if (isStaticOrApi(pathname)) {
    return NextResponse.next();
  }

  // ---------------------------------------------------------------------
  // STEP 1: STRICT HOME LANDING CHECK
  // Chahe koi bhi link ho (direct paste, WhatsApp, Google, kahin se bhi),
  // agar user pehle home page se hokar nahi aaya, to seedha home pe bhejo.
  // Sirf /blog aur /login is check se exempt hain.
  // ---------------------------------------------------------------------
  const hasVisitedHome = request.cookies.get(VISITED_COOKIE);

  if (pathname === "/") {
    const response = NextResponse.next();
    response.cookies.set(VISITED_COOKIE, "true", {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  if (!hasVisitedHome && !isExempt(pathname)) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  // ---------------------------------------------------------------------
  // STEP 2: Existing auth / admin / plans logic — jaisa tha waisa hi hai
  // ---------------------------------------------------------------------
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
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

  // bina kabhi purchase kiye, ya plan expire hone ke baad,
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

// Home-landing check ke liye HAR route cover karna zaroori hai,
// static/_next/api ko andar hi skip karte hain (STEP 0 mein).
export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
