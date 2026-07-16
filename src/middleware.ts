import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;
const COOKIE = "sahihly_locale";

function detectLocale(req: NextRequest): string {
  // 1) explicit preference cookie
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2) Accept-Language header (server-side detection avoids FOUC)
  const header = req.headers.get("accept-language");
  if (header) {
    const langs = header.split(",").map((p) => p.split(";")[0].trim().toLowerCase());
    for (const lang of langs) {
      if (lang.startsWith("ar")) return "ar";
      if (lang.startsWith("en")) return "en";
    }
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip internals & files & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/ads.txt") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already localized?
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) {
    const current = pathname.split("/")[1];
    const res = NextResponse.next();
    // keep cookie in sync with what the user is actually browsing
    res.cookies.set(COOKIE, current, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Redirect bare path to detected locale
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
