import {
  FIT_TYPES,
  BASIS_SYSTEMS,
  COMMON_FITS,
  TOLERANCE_GRADES,
} from "@/features/limits-and-fits/constants/content";

const toneStyles = {
  info: "border-info/30 bg-info/10 text-info",
  warning: "border-warning/30 bg-warning/10 text-warning",
  error: "border-error/30 bg-error/10 text-error",
};

const LimitsAndFitsInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface relative overflow-hidden rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <div className="bg-primary/15 pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl" />
        <div className="bg-info/10 pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div>
            <p className="bg-primary-soft text-primary mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
              ISO 286 · Limits & Fits
            </p>
            <h2 className="font-(family-name:--font-sora) text-3xl font-semibold tracking-tight sm:text-4xl">
              Define how parts assemble — with controlled clearance or
              interference.
            </h2>
            <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
              Limits set the allowed size range for a feature. Fits describe the
              relationship between a hole and a shaft. Use this module to choose
              hole/shaft basis systems, IT grades, and common ISO fit pairs.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="border-border bg-background/80 rounded-2xl border p-4">
              <p className="text-muted text-xs tracking-[0.12em] uppercase">
                Fundamental
              </p>
              <p className="mt-1 font-(family-name:--font-sora) text-lg font-semibold">
                Hole H + Shaft letter
              </p>
              <p className="text-muted mt-1 text-sm">
                Most production drawings use the hole-basis system.
              </p>
            </div>
            <div className="border-border bg-background/80 rounded-2xl border p-4">
              <p className="text-muted text-xs tracking-[0.12em] uppercase">
                Example
              </p>
              <p className="mt-1 font-(family-name:--font-sora) text-lg font-semibold">
                Ø50 H7/g6
              </p>
              <p className="text-muted mt-1 text-sm">
                Precision sliding clearance fit for guided motion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {BASIS_SYSTEMS.map((system) => (
          <article
            key={system.id}
            className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-(family-name:--font-sora) text-xl font-semibold">
                {system.title}
              </h3>
              <span className="bg-primary-soft text-primary rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
                {system.badge}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              {system.description}
            </p>
            <p className="border-border bg-background text-foreground mt-4 rounded-xl border border-dashed px-3 py-2 font-mono text-sm">
              {system.formula}
            </p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4">
          <h3 className="font-(family-name:--font-sora) text-xl font-semibold">
            Fit classes
          </h3>
          <p className="text-muted text-sm">
            Clearance, transition, and interference relationships.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FIT_TYPES.map((fit) => (
            <article
              key={fit.id}
              className="border-border bg-surface flex h-full flex-col rounded-2xl border p-5 shadow-(--card-shadow)"
            >
              <span
                className={`mb-3 inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${toneStyles[fit.tone]}`}
              >
                {fit.title}
              </span>
              <p className="text-muted text-sm leading-relaxed">
                {fit.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {fit.examples.map((example) => (
                  <span
                    key={example}
                    className="bg-background rounded-lg px-2.5 py-1 font-mono text-xs font-medium"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="border-border bg-surface overflow-hidden rounded-2xl border shadow-(--card-shadow)">
          <div className="border-border border-b px-5 py-4 sm:px-6">
            <h3 className="font-(family-name:--font-sora) text-xl font-semibold">
              Common ISO fit pairs
            </h3>
            <p className="text-muted text-sm">
              Practical starting points for hole-basis designs.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-background/80 text-muted text-xs tracking-[0.08em] uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">Fit</th>
                  <th className="px-5 py-3 font-semibold sm:px-6">Type</th>
                  <th className="px-5 py-3 font-semibold sm:px-6">
                    Typical use
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMON_FITS.map((fit) => (
                  <tr key={fit.designation} className="border-border border-t">
                    <td className="text-primary px-5 py-3 font-mono font-semibold sm:px-6">
                      {fit.designation}
                    </td>
                    <td className="text-muted px-5 py-3 sm:px-6">{fit.type}</td>
                    <td className="px-5 py-3 sm:px-6">{fit.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
          <h3 className="font-(family-name:--font-sora) text-xl font-semibold">
            IT tolerance grades
          </h3>
          <p className="text-muted mt-1 text-sm">
            Smaller IT number = tighter tolerance band.
          </p>
          <ul className="mt-5 space-y-3">
            {TOLERANCE_GRADES.map((item) => (
              <li
                key={item.grade}
                className="border-border bg-background rounded-xl border px-3 py-3"
              >
                <p className="text-primary font-mono text-sm font-semibold">
                  {item.grade}
                </p>
                <p className="text-muted mt-1 text-sm">{item.use}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default LimitsAndFitsInfo;
