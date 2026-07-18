# Sahihly — صحيحلي

A bilingual (Arabic + English) **AI Detector & Humanizer** SaaS. One engine, two jobs, two
languages — with first-class Arabic support and native-quality English.

> Detect how AI-like a passage reads, then rewrite it into a natural human voice without
> changing the meaning. Positioned as a **writing-quality tool**, not a way to defeat
> academic-integrity systems.

## ✨ Features

- **Invisible bilingual routing (airanktools-style)** — one clean URL for everyone
  (`sahihly.com/pricing`, never `/en` or `/ar`). The language is negotiated **server-side**
  from the device's `Accept-Language` (no flash of wrong language), overridable with the
  AR/EN switcher (cookie, 1 year). Internally the middleware *rewrites* to prebuilt
  static pages per language, so it stays fast. Legacy `/en/*` and `/ar/*` links 308-redirect
  to the clean URL while adopting that language — which doubles as shareable language links.
- **AI Detector** — probability score + sentence-level highlights.
- **Humanizer** — meaning-safe rewrite with before/after, copy & download.
- **Dual engine** — uses the Anthropic API (Claude) when `ANTHROPIC_API_KEY` is set, and
  falls back to a built-in linguistic heuristic so the tools work out of the box.
- **Auth + Dashboard** — Supabase auth (email + Google), subscription status, usage history.
- **Payments** — provider-abstracted layer with **Binance Pay** (Create Order + verified
  webhook + manual-renewal model). Easy to add a second gateway later.
- **Content & SEO** — blog + reusable competitor comparison pages, JSON-LD, sitemap, robots,
  OpenGraph, and optional Google AdSense.
- **Design 2050** — deep-ocean/violet aurora backgrounds, glassmorphism, Framer Motion
  animations, fully responsive, reduced-motion aware.

## 🧱 Stack

| Layer      | Tech                                             |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 16 (App Router) · React 19 · TypeScript  |
| Styling    | Tailwind CSS v4 · Framer Motion · lucide-react   |
| Auth + DB  | Supabase (PostgreSQL, RLS)                        |
| AI         | OpenAI (ChatGPT) or Anthropic (Claude) + heuristic fallback |
| Payments   | Binance Pay (abstracted `PaymentProvider`)       |

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000  → redirects to /en or /ar
```

Build & run production:

```bash
npm run build && npm run start
```

## 🔑 Environment

See `.env.example`. Minimum to run: `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`. Everything else is optional and degrades gracefully:

- **AI engine** — auto-selected: `OPENAI_API_KEY` (ChatGPT) → `ANTHROPIC_API_KEY`
  (Claude) → built-in heuristic engine. Force one with `AI_PROVIDER=openai|anthropic`.
- **No Binance keys** → pricing shows a "gateway being set up" notice instead of checkout.
- **No `SUPABASE_SERVICE_ROLE_KEY`** → webhook/subscription writes are skipped.

## 🗂️ Project structure

```
src/
  app/
    [locale]/            # localized routes (home, pricing, blog, vs, about, auth, dashboard)
    api/                 # analyze, newsletter, payments (create + binance webhook)
    auth/callback/       # OAuth code exchange
    sitemap.ts robots.ts
  components/            # Header, Footer, ToolStudio, PricingCards, AuthForm, …
  content/               # blog + competitor data (bilingual)
  lib/
    i18n/                # config + en/ar dictionaries
    supabase/            # browser + server clients
    payments/            # provider abstraction + binance
    analysis.ts          # Claude + heuristic detector/humanizer
  middleware.ts          # locale detection & redirect
```

## 🗄️ Database

Schema is applied via Supabase migration `init_sahihly_schema`:
`profiles`, `subscriptions`, `payment_orders`, `analyses`, `usage_daily`, `subscribers` —
all with Row Level Security and an `on_auth_user_created` trigger that seeds a profile.

## 💳 Payment flow (Binance Pay)

1. User picks a plan → server calls **Create Order** → gets `checkoutUrl`.
2. User is redirected to Binance's hosted checkout to pay (USDT).
3. Binance calls our **webhook**; we verify the signature (HMAC-SHA512), enforce idempotency,
   then activate/extend the subscription. The webhook is the single source of truth — browser
   "success" is never trusted.

Binance Pay has no native recurring billing, so renewal is handled by creating a fresh order
before each period ends (manual-renewal model).

## 📈 SEO / AdSense

- Clean canonical per page (no locale in URLs); crawlers without an Arabic
  `Accept-Language` see the English version (the priority market), and
  `Content-Language` is set per response.
- `sitemap.xml`, `robots.txt`, dynamic **OpenGraph image** (`/opengraph-image`),
  PWA `manifest.webmanifest`, JSON-LD (`SoftwareApplication`, `BlogPosting`).
- AdSense: set `NEXT_PUBLIC_ADSENSE_CLIENT` — this loads the script **and**
  serves `/ads.txt` automatically.

> Trade-off (chosen deliberately): with one URL per page, Google indexes a single
> language per URL — the English experience. The Arabic experience is still fully
> served to Arabic devices, and `sahihly.com/ar` remains shareable (it sets the
> language, then redirects to the clean URL).

## ⚖️ Responsible use

Sahihly is a style/quality-review tool. It is **not** marketed or built to defeat
Turnitin or similar systems. See `/about#policy`.
