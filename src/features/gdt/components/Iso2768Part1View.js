"use client";

import { useState } from "react";
import ToleranceTable from "@/features/gdt/components/ToleranceTable";
import {
  ANGULAR_DIMENSIONS,
  ISO_2768_1_CLASSES,
  LINEAR_DIMENSIONS,
  RADIUS_CHAMFER_DIMENSIONS,
} from "@/features/gdt/constants/iso2768";

const ALLOWED_COLUMNS = new Set(ISO_2768_1_CLASSES.map((column) => column.id));

const Iso2768Part1View = () => {
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
          ISO 2768-1
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          General tolerances for linear and angular dimensions
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          ISO 2768-1 simplifies drawing indications with four tolerance classes:
          f (fine), m (medium), c (coarse), and v (very coarse). Indicate the
          class in or near the title block, for example{" "}
          <span className="text-foreground font-mono">ISO 2768-m</span>. Click a
          class header to highlight that column across all tables.
        </p>
      </section>

      <ToleranceTable
        title="Linear dimensions"
        description="Permissible deviations for external sizes, internal sizes, step sizes, diameters, radii, distances, and chamfer heights."
        columns={ISO_2768_1_CLASSES}
        rows={LINEAR_DIMENSIONS}
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <ToleranceTable
        title="External radii and chamfer heights"
        description="Permissible deviations for external radii and chamfer heights."
        columns={ISO_2768_1_CLASSES}
        rows={RADIUS_CHAMFER_DIMENSIONS}
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <ToleranceTable
        title="Angular dimensions"
        description="Permissible angular deviations based on the shorter nominal length of the angle sides."
        columns={ISO_2768_1_CLASSES}
        rows={ANGULAR_DIMENSIONS}
        unit="degrees"
        highlightedColumn={highlightedColumn}
        onColumnSelect={handleColumnSelect}
      />

      <p className="text-muted text-sm">
        For nominal sizes below 0.5 mm, deviations shall be indicated adjacent
        to the relevant nominal size(s).
      </p>
    </div>
  );
};

export default Iso2768Part1View;
