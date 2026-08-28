const ThreadSizeTable = ({ title, description, columns, rows, unitNote }) => {
  return (
    <article className="border-border bg-surface overflow-hidden rounded-2xl border shadow-(--card-shadow)">
      <div className="border-border border-b px-5 py-4 sm:px-6">
        <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
          {title}
        </h3>
        {description ? (
          <p className="text-muted mt-1 text-sm">{description}</p>
        ) : null}
        {unitNote ? (
          <p className="text-muted mt-1 text-xs tracking-[0.12em] uppercase">
            {unitNote}
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-background/80 text-muted text-xs tracking-[0.08em] uppercase">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-3 font-semibold sm:px-6"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size} className="border-border border-t">
                {columns.map((column) => (
                  <td
                    key={`${row.size}-${column.key}`}
                    className={`px-5 py-3 sm:px-6 ${
                      column.key === "size"
                        ? "text-primary font-mono font-semibold"
                        : "text-foreground font-mono"
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
