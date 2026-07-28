import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

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
const BYPASS_PREFIXES = ["/_next", "/api", "/auth", "/opengraph-image", "/og", "/embed"];
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

/**
 * Canonical host enforcement. Two hosts serving identical content (www vs
 * apex, or the *.vercel.app URL alongside the custom domain) splits ranking
 * signals and can get the wrong one indexed. Always fold www into the apex;
 * fold the deployment URL into the custom domain when ENFORCE_CANONICAL_HOST=1
 * (kept opt-in so preview deployments stay reachable).
 */
function canonicalHostRedirect(req: NextRequest): NextResponse | null {
  const host = req.headers.get("host");
  if (!host) return null;

  // CANONICAL_HOST is read at runtime; NEXT_PUBLIC_SITE_URL is inlined at
  // build time, so it's only the fallback.
  let canonicalHost: string | null = process.env.CANONICAL_HOST?.trim() || null;
  if (!canonicalHost) {
    try {
      canonicalHost = new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://sahihly.com"
      ).host;
    } catch {
      return null;
    }
  }
  if (host === canonicalHost) return null;

  const isWww = host === `www.${canonicalHost}`;
  const isDeploymentUrl =
    process.env.ENFORCE_CANONICAL_HOST === "1" && host.endsWith(".vercel.app");

  if (!isWww && !isDeploymentUrl) return null;

  const url = req.nextUrl.clone();
  url.host = canonicalHost;
  url.port = "";
  url.protocol = "https:";
  return NextResponse.redirect(url, 308);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hostRedirect = canonicalHostRedirect(req);
  if (hostRedirect) return hostRedirect;

  if (
    // Match on path segments, not raw string prefixes: a bare startsWith
    // means "/auth" also swallows "/author/...", which silently drops those
    // pages out of the locale tree and 404s them.
    BYPASS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    BYPASS_EXACT.includes(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // /ar/* is a real, indexable tree — served, not redirected.
  //
  // Googlebot crawls with Accept-Language: en-US, so the negotiating clean URL
  // only ever showed it English and the Arabic side of the site could not be
  // indexed at all. Arabic now has its own addressable documents; the clean URL
  // remains the English canonical and keeps negotiating for humans, and the two
  // are paired with hreflang (see lib/seo.ts).
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, "ar", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    res.headers.set("Content-Language", "ar");
    await refreshSupabaseSession(req, res);
    return res;
  }

  // /en/* stays a redirect: the clean URL is already the English canonical, and
  // two live URLs for the same English document would split its signals.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(COOKIE, "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
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
