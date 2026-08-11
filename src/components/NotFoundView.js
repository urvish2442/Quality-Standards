import Link from "next/link";
import NavIcon from "@/components/icons/NavIcon";
import { STANDARD_CARDS } from "@/constants/navigation";

const QUICK_LINKS = STANDARD_CARDS.filter((item) => !item.disabled).slice(0, 4);

const NotFoundView = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-(--card-shadow) sm:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,var(--primary-soft),transparent_55%)]" />

        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Page not found
            </p>
            <p
              className="font-(family-name:--font-sora) text-6xl font-bold tracking-tight text-primary sm:text-7xl"
              aria-hidden="true"
            >
              404
            </p>
            <h1 className="mt-2 font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
              This reference page does not exist
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              The URL may be incorrect, outdated, or the module is not available
              yet. Return to the overview or open one of the ready engineering
              references below.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <NavIcon name="home" className="h-4 w-4" />
                Back to overview
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary-soft"
              >
                Open calculator
              </Link>
            </div>
          </div>

          <div
            className="hidden shrink-0 rounded-2xl border border-border bg-background p-5 text-center lg:block"
            aria-hidden="true"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <NavIcon name="fit" className="h-10 w-10" />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Out of tolerance
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-foreground">
              ±404.000
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-(family-name:--font-sora) text-lg font-semibold">
          Available modules
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-2xl border border-border bg-surface p-4 shadow-(--card-shadow) transition hover:border-primary/30 hover:bg-primary-soft/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <NavIcon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="mt-3 font-(family-name:--font-sora) text-base font-semibold">
                {item.label}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotFoundView;
