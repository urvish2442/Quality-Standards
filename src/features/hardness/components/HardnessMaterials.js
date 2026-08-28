import { HARDNESS_MATERIALS } from "@/features/hardness/constants/hardnessData";

const HardnessMaterials = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Material guide
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Typical hardness by material
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Approximate ranges seen in manufacturing and inspection. Actual values
          depend on chemistry, heat treatment, cold work, and section size.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {HARDNESS_MATERIALS.map((item) => (
          <article
            key={item.id}
            className="border-border bg-surface rounded-2xl border p-4 shadow-(--card-shadow) sm:p-5"
          >
            <h3 className="font-(family-name:--font-sora) text-base font-semibold sm:text-lg">
              {item.material}
            </h3>
            <div className="border-border bg-background mt-3 rounded-xl border px-3 py-2">
              <p className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                Typical
              </p>
              <p className="text-primary mt-0.5 font-mono text-sm font-semibold">
                {item.typical}
              </p>
            </div>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              {item.note}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HardnessMaterials;
