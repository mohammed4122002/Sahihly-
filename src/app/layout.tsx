import "./globals.css";

// Root layout is a pass-through; the localized <html>/<body> is rendered
// in app/[locale]/layout.tsx so we can set lang + dir per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
