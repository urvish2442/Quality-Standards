import {
  HARDNESS_BASICS,
  HARDNESS_METHOD_NOTES,
} from "@/features/hardness/constants/hardnessData";

const HardnessBasics = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Material hardness
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Common scales and test practice
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Hardness measures resistance to permanent indentation. Shop drawings
          and specs usually call out Brinell (HB), Vickers (HV), or Rockwell
          (HRB / HRC) depending on material and thickness.
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HARDNESS_BASICS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-background px-3 py-3"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
          Method notes
        </h3>
        <p className="mt-1 text-sm text-muted">
          Practical points that keep hardness readings comparable and
          inspection-ready.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {HARDNESS_METHOD_NOTES.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-background p-4"
            >
              <h4 className="font-(family-name:--font-sora) text-base font-semibold">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HardnessBasics;
