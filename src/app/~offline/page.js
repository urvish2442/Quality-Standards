import Link from "next/link";

export const metadata = {
  title: "Offline",
  description: "You are offline. Reconnect to continue using Quality Standards.",
  robots: {
    index: false,
    follow: false,
  },
};

const OfflinePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md rounded-2xl border border-border bg-surface p-6 text-center shadow-(--card-shadow)">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Offline
        </p>
        <h1 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          You are offline
        </h1>
        <p className="mt-2 text-sm text-muted">
          Check your connection and try again. Previously visited pages may still
          be available from cache.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Retry home
        </Link>
      </div>
    </main>
  );
};

export default OfflinePage;
