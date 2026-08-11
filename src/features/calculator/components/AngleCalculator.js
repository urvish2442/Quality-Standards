"use client";

import { useMemo, useState } from "react";
import TriangleDiagram from "@/features/calculator/components/TriangleDiagram";
import WarningMessage from "@/features/calculator/components/WarningMessage";
import { solveTriangle } from "@/features/calculator/utils/calculations";

const emptyFields = {
  a: "",
  b: "",
  c: "",
  A: "",
  B: "",
  C: "",
};

const AngleCalculator = () => {
  const [fields, setFields] = useState(emptyFields);

  const result = useMemo(() => solveTriangle(fields), [fields]);

  const updateField = (key) => (event) => {
    setFields((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const clearFields = () => {
    setFields(emptyFields);
  };

  const solved = !result.error;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Angle Calculator
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          Solve a triangle from known sides and angles
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Enter any valid combination (SSS, SAS, ASA/AAS, or SSA). Results update
          live on the triangle diagram.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <TriangleDiagram values={solved ? result : null} />
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
                Inputs
              </h3>
              <p className="mt-1 text-sm text-muted">
                Leave unknown fields empty.
              </p>
            </div>
            <button
              type="button"
              onClick={clearFields}
              className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-primary-soft hover:text-foreground"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { key: "a", label: "Side a" },
              { key: "b", label: "Side b" },
              { key: "c", label: "Side c" },
            ].map((field) => (
              <label key={field.key} className="block min-w-0">
                <span className="mb-1 block text-xs font-medium sm:text-sm">
                  {field.label}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={fields[field.key]}
                  onChange={updateField(field.key)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-2.5 text-sm outline-none transition focus:border-primary sm:h-11 sm:px-3"
                />
              </label>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { key: "A", label: "Angle A (°)" },
              { key: "B", label: "Angle B (°)" },
              { key: "C", label: "Angle C (°)" },
            ].map((field) => (
              <label key={field.key} className="block min-w-0">
                <span className="mb-1 block text-xs font-medium sm:text-sm">
                  {field.label}
                </span>
                <input
                  type="number"
                  min="0"
                  max="179.999"
                  step="any"
                  value={fields[field.key]}
                  onChange={updateField(field.key)}
                  className="h-10 w-full rounded-xl border border-border bg-background px-2.5 text-sm outline-none transition focus:border-primary sm:h-11 sm:px-3"
                />
              </label>
            ))}
          </div>

          {result.error ? (
            <WarningMessage className="mt-4">{result.error}</WarningMessage>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "a", value: result.display.a },
                { label: "b", value: result.display.b },
                { label: "c", value: result.display.c },
                { label: "A", value: `${result.display.A}°` },
                { label: "B", value: `${result.display.B}°` },
                { label: "C", value: `${result.display.C}°` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-background px-3 py-2"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-primary">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AngleCalculator;
