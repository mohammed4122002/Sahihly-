import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { locales, defaultLocale, isLocale } from "@/lib/i18n/config";

/**
 * Keep the Supabase session fresh on every request. Without this, access
 * tokens expire and server components silently see the user as logged out.
 */
async function refreshSupabaseSession(req: NextRequest, res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          ),
      },
    });
    await supabase.auth.getUser();
  } catch {
    /* never block the request on auth refresh */
  }
}

const PUBLIC_FILE = /\.(.*)$/;
const COOKIE = "sahihly_locale";

// Paths served outside the [locale] tree — never rewrite these.
const BYPASS_PREFIXES = ["/_next", "/api", "/auth", "/opengraph-image"];
const BYPASS_EXACT = ["/favicon.ico", "/robots.txt", "/sitemap.xml", "/ads.txt", "/manifest.webmanifest"];

function detectLocale(req: NextRequest): string {
  // 1) explicit preference cookie (set by the manual AR/EN switcher)
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2) device/browser language via Accept-Language (server-side => no FOUC)
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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    BYPASS_PREFIXES.some((p) => pathname.startsWith(p)) ||
    BYPASS_EXACT.includes(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Legacy /en/* and /ar/* URLs: adopt that language, then redirect to the
  // clean URL. This keeps old links working and gives shareable language
  // links (sahihly.com/ar → Arabic experience at sahihly.com).
  const prefixed = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (prefixed) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(prefixed.length + 1) || "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(COOKIE, prefixed, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Same URL for everyone: internally rewrite to the localized tree.
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.rewrite(url);
  res.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  // Cache/bot hygiene: the response depends on the negotiated language.
  res.headers.set("Vary", "Accept-Language, Cookie");
  res.headers.set("Content-Language", locale);
  await refreshSupabaseSession(req, res);
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
