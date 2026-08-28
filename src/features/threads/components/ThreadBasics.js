const ThreadBasics = ({ badge, title, description, items }) => {
  return (
    <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
        {badge}
      </p>
      <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
        {description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
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
  );
};

export default ThreadBasics;
