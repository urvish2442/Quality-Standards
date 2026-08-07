const ThreadBasics = ({ badge, title, description, items }) => {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
      <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {badge}
      </p>
      <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
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
  );
};

export default ThreadBasics;
