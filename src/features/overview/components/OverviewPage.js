import Link from "next/link";
import { STANDARD_CARDS } from "@/constants/navigation";
import NavIcon from "@/components/icons/NavIcon";

const OverviewPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-(--card-shadow) sm:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,var(--primary-soft),transparent_55%)]" />
        <div className="relative max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Quality Standards Hub
          </p>
          <h2 className="font-(family-name:--font-sora) text-3xl font-semibold tracking-tight sm:text-4xl">
            Fast engineering references for dimensions, fits, GD&T, and finish.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Browse manufacturing quality standards in one place. Start with
            Limits and Fits, then expand into threads, geometric tolerances,
            roughness, and dimensional rules.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/limits-and-fits"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Open Limits and Fits
            </Link>
            <a
              href="#standards"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-primary-soft"
            >
              Browse modules
            </a>
          </div>
        </div>
      </section>

      <section id="standards" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {STANDARD_CARDS.map((card) => {
          const content = (
            <>
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <NavIcon name={card.icon} className="h-5 w-5" />
                </span>
                {card.disabled ? (
                  <span className="rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                    Soon
                  </span>
                ) : (
                  <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-success">
                    Ready
                  </span>
                )}
              </div>
              <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
                {card.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </>
          );

          if (card.disabled) {
            return (
              <div
                key={card.id}
                className="rounded-2xl border border-border bg-surface p-5 opacity-80 shadow-(--card-shadow)"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={card.id}
              href={card.href}
              className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              {content}
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default OverviewPage;
