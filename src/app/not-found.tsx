import Link from "next/link";
import "./globals.css";

// Root-level not-found: root layout is a pass-through, so we render html/body here.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050b16] text-white">
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <span className="text-7xl font-bold">404</span>
          <p className="mt-3 text-white/60">This page could not be found.</p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-violet-400 px-6 py-2.5 text-sm font-medium text-[#0b1f3a]"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
