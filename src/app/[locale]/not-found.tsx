import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="font-display text-8xl font-bold text-gradient">404</span>
      <h1 className="mt-4 text-2xl font-bold">Page not found · الصفحة غير موجودة</h1>
      <p className="mt-2 text-white/55">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary rounded-full px-6 py-2.5 text-sm">
          Home · الرئيسية
        </Link>
      </div>
    </div>
  );
}
