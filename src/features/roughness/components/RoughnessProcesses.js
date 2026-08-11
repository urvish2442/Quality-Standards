import { PROCESS_ROUGHNESS } from "@/features/roughness/constants/roughnessData";

const RoughnessProcesses = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Process guide
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Typical Ra by manufacturing process
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Approximate achievable Ra ranges for common processes. Use as a
          planning guide — actual results depend on tooling, material, machine
          condition, and setup.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {PROCESS_ROUGHNESS.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-(--card-shadow) sm:p-5"
          >
            <h3 className="font-(family-name:--font-sora) text-base font-semibold sm:text-lg">
              {item.process}
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2">
                <dt className="text-muted">Ra range</dt>
                <dd className="font-mono font-semibold text-primary">
                  {item.raMin}–{item.raMax} μm
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2">
                <dt className="text-muted">Typical</dt>
                <dd className="font-mono font-medium">{item.typical} μm</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RoughnessProcesses;
