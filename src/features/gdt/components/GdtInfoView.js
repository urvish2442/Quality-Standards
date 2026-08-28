"use client";

import { useMemo, useState } from "react";
import GdtSymbolIcon from "@/features/gdt/components/GdtSymbolIcon";
import {
  GDT_CHARACTERISTICS,
  GDT_SYMBOLS,
} from "@/features/gdt/constants/gdtSymbols";

const FILTERS = [
  { id: "all", label: "All" },
  ...GDT_CHARACTERISTICS.map((item) => ({
    id: item.id,
    label: item.label,
  })),
];

const GdtInfoView = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSymbols = useMemo(() => {
    if (activeFilter === "all") {
      return GDT_SYMBOLS;
    }

    return GDT_SYMBOLS.filter(
      (symbol) => symbol.characteristic === activeFilter
    );
  }, [activeFilter]);

  const activeCharacteristic =
    activeFilter === "all"
      ? null
      : GDT_CHARACTERISTICS.find((item) => item.id === activeFilter);

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          GD&T basics
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Geometric characteristic symbols
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          The ASME Y14.5 / ISO GPS geometric characteristic symbols used in
          feature control frames. Filter by form, orientation, location,
          profile, or runout.
        </p>
      </section>

      <section className="border-border bg-surface rounded-2xl border p-4 shadow-(--card-shadow) sm:p-5">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by characteristic"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted hover:bg-primary-soft hover:text-foreground border"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* {activeCharacteristic ? (
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-foreground">
              {activeCharacteristic.label}:
            </span>{" "}
            {activeCharacteristic.description}
          </p>
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {GDT_CHARACTERISTICS.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-background px-3 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )} */}
      </section>

      <section className="border-border bg-surface overflow-hidden rounded-2xl border shadow-(--card-shadow)">
        <div className="border-border border-b px-5 py-4 sm:px-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Symbol details
          </h3>
          <p className="text-muted mt-1 text-sm">
            {filteredSymbols.length} symbol
            {filteredSymbols.length === 1 ? "" : "s"}
            {activeFilter === "all"
              ? ""
              : ` in ${activeCharacteristic?.label ?? "selection"}`}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-muted text-xs tracking-[0.08em] uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold sm:px-6">Symbol</th>
                <th className="px-5 py-3 font-semibold sm:px-6">Name</th>
                <th className="px-5 py-3 font-semibold sm:px-6">
                  Characteristic
                </th>
                <th className="min-w-56 px-5 py-3 font-semibold sm:px-6">
                  Summary
                </th>
                <th className="min-w-44 px-5 py-3 font-semibold sm:px-6">
                  Applies to
                </th>
                <th className="px-5 py-3 font-semibold sm:px-6">Datum</th>
                <th className="min-w-48 px-5 py-3 font-semibold sm:px-6">
                  Tolerance zone
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSymbols.map((symbol) => (
                <tr
                  key={symbol.id}
                  className="border-border hover:bg-primary-soft/40 border-t align-top"
                >
                  <td className="px-5 py-3 sm:px-6">
                    <GdtSymbolIcon symbolKey={symbol.symbolKey} />
                    <span className="sr-only">{symbol.name} symbol</span>
                  </td>
                  <td className="text-foreground px-5 py-3 font-semibold sm:px-6">
                    {symbol.name}
                  </td>
                  <td className="px-5 py-3 sm:px-6">
                    <span className="bg-primary-soft text-primary inline-flex rounded-lg px-2 py-1 text-xs font-semibold">
                      {symbol.characteristicLabel}
                    </span>
                  </td>
                  <td className="text-muted px-5 py-3 sm:px-6">
                    {symbol.summary}
                  </td>
                  <td className="text-foreground px-5 py-3 sm:px-6">
                    {symbol.appliesTo}
                  </td>
                  <td className="text-foreground px-5 py-3 sm:px-6">
                    {symbol.datum}
                  </td>
                  <td className="text-foreground px-5 py-3 sm:px-6">
                    {symbol.toleranceZone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default GdtInfoView;
