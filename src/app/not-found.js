import Link from "next/link";
import NavIcon from "@/components/icons/NavIcon";
import NotFoundView from "@/components/NotFoundView";

const NotFoundShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition hover:opacity-90"
        >
          <span
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold tracking-wide text-white shadow-[0_8px_18px_-6px_rgba(15,118,110,0.7)] ring-1 ring-white/20"
            style={{
              backgroundImage:
                "linear-gradient(145deg, #2dd4bf 0%, #14b8a6 42%, #0f766e 100%)",
            }}
            aria-hidden="true"
          >
            <span
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 48%, rgba(0,0,0,0.18) 100%)",
              }}
            />
            <span className="relative font-(family-name:--font-sora)">QS</span>
          </span>
          <span className="font-(family-name:--font-sora) text-sm font-semibold tracking-tight">
            Quality Standards
          </span>
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
};

export const metadata = {
  title: "404 — Page not found",
  description:
    "The requested Quality Standards page could not be found. Return to the engineering reference overview.",
  robots: {
    index: false,
    follow: false,
  },
};

const NotFoundPage = () => {
  return (
    <NotFoundShell>
      <NotFoundView />
    </NotFoundShell>
  );
};

export default NotFoundPage;
