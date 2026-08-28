import {
  HARDNESS_BASICS,
  HARDNESS_METHOD_NOTES,
} from "@/features/hardness/constants/hardnessData";

const HardnessBasics = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Material hardness
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Common scales and test practice
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Hardness measures resistance to permanent indentation. Shop drawings
          and specs usually call out Brinell (HB), Vickers (HV), or Rockwell
          (HRB / HRC) depending on material and thickness.
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HARDNESS_BASICS.map((item) => (
            <div
              key={item.label}
              className="border-border bg-background rounded-xl border px-3 py-3"
            >
              <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                {item.label}
              </dt>
              <dd className="text-foreground mt-1 text-sm font-medium">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
          Method notes
        </h3>
        <p className="text-muted mt-1 text-sm">
          Practical points that keep hardness readings comparable and
          inspection-ready.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {HARDNESS_METHOD_NOTES.map((item) => (
            <article
              key={item.title}
              className="border-border bg-background rounded-xl border p-4"
            >
              <h4 className="font-(family-name:--font-sora) text-base font-semibold">
                {item.title}
              </h4>
              <p className="text-muted mt-2 text-sm leading-relaxed">
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
