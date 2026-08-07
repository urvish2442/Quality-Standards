"use client";

const ToleranceTable = ({
  title,
  description,
  columns,
  rows,
  rangeLabel = "Nominal length (mm)",
  unit = "mm",
  highlightedColumn = null,
  onColumnSelect,
}) => {
  const handleColumnClick = (columnId) => {
    if (!onColumnSelect) {
      return;
    }

    onColumnSelect(highlightedColumn === columnId ? null : columnId);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
        {unit ? (
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
            Values in {unit}
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-background/80 text-xs uppercase tracking-[0.08em] text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold sm:px-6">{rangeLabel}</th>
              {columns.map((column) => {
                const isHighlighted = highlightedColumn === column.id;

                return (
                  <th
                    key={column.id}
                    className={`px-5 py-3 font-semibold sm:px-6 ${
                      onColumnSelect
                        ? "cursor-pointer select-none transition-colors hover:bg-primary-soft hover:text-primary"
                        : ""
                    } ${
                      isHighlighted
                        ? "bg-primary-soft text-primary"
                        : ""
                    }`}
                    title={
                      column.description
                        ? `${column.description} — click to highlight`
                        : "Click to highlight"
                    }
                    aria-pressed={onColumnSelect ? isHighlighted : undefined}
                    onClick={() => handleColumnClick(column.id)}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.range} className="border-t border-border">
                <td className="px-5 py-3 font-medium sm:px-6">{row.range}</td>
                {columns.map((column) => {
                  const isHighlighted = highlightedColumn === column.id;

                  return (
                    <td
                      key={`${row.range}-${column.id}`}
                      className={`px-5 py-3 font-mono sm:px-6 ${
                        isHighlighted
                          ? "bg-primary-soft font-semibold text-primary"
                          : "text-primary"
                      }`}
                    >
                      {row[column.id] ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default ToleranceTable;
