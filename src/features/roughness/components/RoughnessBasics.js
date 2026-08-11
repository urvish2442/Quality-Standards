import {
  ROUGHNESS_BASICS,
  ROUGHNESS_SYMBOL_NOTES,
} from "@/features/roughness/constants/roughnessData";

const RoughnessBasics = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Surface roughness
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile parameters and drawing practice
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Surface roughness describes fine-scale irregularities left by
          manufacturing. Most drawings specify Ra; Rz is useful when peak height
          matters for sealing, fatigue, or coating.
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROUGHNESS_BASICS.map((item) => (
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
          Symbol notes
        </h3>
        <p className="mt-1 text-sm text-muted">
          Common ISO 1302 / drawing-symbol meanings used on manufacturing prints.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ROUGHNESS_SYMBOL_NOTES.map((item) => (
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

export default RoughnessBasics;
