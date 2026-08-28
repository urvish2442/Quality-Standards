import {
  ROUGHNESS_BASICS,
  ROUGHNESS_SYMBOL_NOTES,
} from "@/features/roughness/constants/roughnessData";

const RoughnessBasics = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Surface roughness
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile parameters and drawing practice
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Surface roughness describes fine-scale irregularities left by
          manufacturing. Most drawings specify Ra; Rz is useful when peak height
          matters for sealing, fatigue, or coating.
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROUGHNESS_BASICS.map((item) => (
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
          Symbol notes
        </h3>
        <p className="text-muted mt-1 text-sm">
          Common ISO 1302 / drawing-symbol meanings used on manufacturing
          prints.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ROUGHNESS_SYMBOL_NOTES.map((item) => (
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

export default RoughnessBasics;
