import { PROCESS_ROUGHNESS } from "@/features/roughness/constants/roughnessData";

const RoughnessProcesses = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Process guide
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Typical Ra by manufacturing process
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Approximate achievable Ra ranges for common processes. Use as a
          planning guide — actual results depend on tooling, material, machine
          condition, and setup.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {PROCESS_ROUGHNESS.map((item) => (
          <article
            key={item.id}
            className="border-border bg-surface rounded-2xl border p-4 shadow-(--card-shadow) sm:p-5"
          >
            <h3 className="font-(family-name:--font-sora) text-base font-semibold sm:text-lg">
              {item.process}
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="border-border bg-background flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                <dt className="text-muted">Ra range</dt>
                <dd className="text-primary font-mono font-semibold">
                  {item.raMin}–{item.raMax} μm
                </dd>
              </div>
              <div className="border-border bg-background flex items-center justify-between gap-3 rounded-xl border px-3 py-2">
                <dt className="text-muted">Typical</dt>
                <dd className="font-mono font-medium">{item.typical} μm</dd>
              </div>
            </dl>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              {item.note}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RoughnessProcesses;
