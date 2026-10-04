"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const ThreadQuickReferenceTable = ({
  availableSizes,
  selectedSizeId,
  onSelectSize,
  gender,
}) => {
  const [search, setSearch] = useState("");

  const filteredSizes = useMemo(() => {
    if (!search.trim()) return availableSizes;
    const q = search.toLowerCase();
    return availableSizes.filter((item) =>
      item.size.toLowerCase().includes(q)
    );
  }, [availableSizes, search]);

  if (!availableSizes || availableSizes.length === 0) return null;

  return (
    <section className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Standard Reference Matrix
          </span>
          <h3 className="font-(family-name:--font-sora) text-lg font-bold">
            All Thread Sizes Comparison Table ({availableSizes.length} sizes)
          </h3>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="text-muted absolute top-3 left-3 h-4 w-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search thread size..."
            className="border-border bg-background text-foreground h-10 w-full rounded-xl border pl-9 pr-3 text-xs outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-background/80 text-muted border-b border-border text-[11px] uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-3 py-2.5 font-bold">Thread Size</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Basic Major</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Pitch (P)</th>
              <th scope="col" className="px-3 py-2.5 font-bold">TPI</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Pitch Dia (Min-Max)</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Tap Drill</th>
              <th scope="col" className="px-3 py-2.5 font-bold">Clearance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredSizes.map((row) => {
              const isSelected = row.id === selectedSizeId;
              const limit = gender === "external" ? row.external : row.internal;

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectSize(row.id)}
                  className={`cursor-pointer transition ${
                    isSelected
                      ? "bg-primary-soft/50 font-semibold text-primary"
                      : "hover:bg-background/60"
                  }`}
                >
                  <td className="px-3 py-2.5 font-bold text-foreground">
                    {row.size}
                  </td>
                  <td className="px-3 py-2.5 font-mono">{row.basicMajor}</td>
                  <td className="px-3 py-2.5 font-mono">{row.pitch}</td>
                  <td className="px-3 py-2.5 font-mono">{row.tpi}</td>
                  <td className="px-3 py-2.5 font-mono">
                    {limit?.pitch?.min} – {limit?.pitch?.max}
                  </td>
                  <td className="px-3 py-2.5 font-mono font-bold text-primary">
                    {row.tapDrill}
                  </td>
                  <td className="px-3 py-2.5 font-mono">
                    {row.clearanceDrill || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ThreadQuickReferenceTable;
