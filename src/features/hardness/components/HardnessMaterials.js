import { HARDNESS_MATERIALS } from "@/features/hardness/constants/hardnessData";

const HardnessMaterials = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Material guide
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Typical hardness by material
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Approximate ranges seen in manufacturing and inspection. Actual values
          depend on chemistry, heat treatment, cold work, and section size.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {HARDNESS_MATERIALS.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-(--card-shadow) sm:p-5"
          >
            <h3 className="font-(family-name:--font-sora) text-base font-semibold sm:text-lg">
              {item.material}
            </h3>
            <div className="mt-3 rounded-xl border border-border bg-background px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                Typical
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-primary">
                {item.typical}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HardnessMaterials;
