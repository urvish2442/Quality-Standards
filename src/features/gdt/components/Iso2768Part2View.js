"use client";

import { useState } from "react";
import ToleranceTable from "@/features/gdt/components/ToleranceTable";
import {
  CIRCULAR_RUNOUT,
  ISO_2768_2_CLASSES,
  PERPENDICULARITY,
  STRAIGHTNESS_FLATNESS,
  SYMMETRY,
} from "@/features/gdt/constants/iso2768";

const ALLOWED_COLUMNS = new Set(ISO_2768_2_CLASSES.map((column) => column.id));

const Iso2768Part2View = () => {
  const [highlightedColumn, setHighlightedColumn] = useState(null);

  const handleColumnSelect = (columnId) => {
    if (columnId !== null && !ALLOWED_COLUMNS.has(columnId)) {
      return;
    }

    setHighlightedColumn(columnId);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          ISO 2768-2
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          General geometrical tolerances
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          ISO 2768-2 defines general geometrical tolerances in three classes: H,
          K, and L. It covers straightness, flatness, perpendicularity,
          symmetry, and circular run-out. Click a class header to highlight that
          column across all tables.
        </p>
      </section>

      <ToleranceTable
        title="Straightness and flatness"
        description="General tolerances on straightness and flatness."
        columns={ISO_2768_2_CLASSES}
        rows={STRAIGHTNESS_FLATNESS}
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <ToleranceTable
        title="Perpendicularity"
        description="General tolerances on perpendicularity."
        columns={ISO_2768_2_CLASSES}
        rows={PERPENDICULARITY}
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <ToleranceTable
        title="Symmetry"
        description="General tolerances on symmetry."
        columns={ISO_2768_2_CLASSES}
        rows={SYMMETRY}
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <ToleranceTable
        title="Circular run-out"
        description="General tolerances on circular run-out."
        columns={ISO_2768_2_CLASSES}
        rows={CIRCULAR_RUNOUT}
        rangeLabel="Range"
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />
    </div>
  );
};

export default Iso2768Part2View;
