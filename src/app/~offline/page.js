import Link from "next/link";

export const metadata = {
  title: "Offline",
  description:
    "You are offline. Reconnect to continue using Quality Standards.",
  robots: {
    index: false,
    follow: false,
  },
};

const OfflinePage = () => {
  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-6">
      <div className="border-border bg-surface max-w-md rounded-2xl border p-6 text-center shadow-(--card-shadow)">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Offline
        </p>
        <h1 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          You are offline
        </h1>
        <p className="text-muted mt-2 text-sm">
          Check your connection and try again. Previously visited pages may
          still be available from cache.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground mt-5 inline-flex rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          Retry home
        </Link>
      </div>
    </main>
  );
};

export default OfflinePage;
