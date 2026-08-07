const ThreadSizeTable = ({
  title,
  description,
  columns,
  rows,
  unitNote,
}) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
        {unitNote ? (
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
            {unitNote}
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-background/80 text-xs uppercase tracking-[0.08em] text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-3 font-semibold sm:px-6">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size} className="border-t border-border">
                {columns.map((column) => (
                  <td
                    key={`${row.size}-${column.key}`}
                    className={`px-5 py-3 sm:px-6 ${
                      column.key === "size"
                        ? "font-mono font-semibold text-primary"
                        : "font-mono text-foreground"
                    }`}
                  >
                    {row[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default ThreadSizeTable;
