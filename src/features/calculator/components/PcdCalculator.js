"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import ThemedSelect from "@/components/ui/ThemedSelect";
import PcdDiagram from "@/features/calculator/components/PcdDiagram";
import WarningMessage from "@/features/calculator/components/WarningMessage";
import {
  HOLE_COUNT_OPTIONS,
  calculatePcd,
} from "@/features/calculator/utils/pcd";

const HOLE_OPTIONS = HOLE_COUNT_OPTIONS.map((count) => ({
  value: count,
  label: `${count} holes`,
}));

const PcdCalculator = () => {
  const [holeCount, setHoleCount] = useState(String(HOLE_COUNT_OPTIONS[0]));
  const [centerDistance, setCenterDistance] = useState("");

  const result = useMemo(
    () => calculatePcd({ holeCount, centerDistance }),
    [holeCount, centerDistance],
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          PCD
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          Pitch circle diameter
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Enter the number of equally spaced holes and the center-to-center
          distance between two consecutive holes to calculate PCD. The diagram
          updates live with your inputs.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
            Inputs
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="block">
              <span className="mb-1 block text-sm font-medium">
                Number of holes
              </span>
              <ThemedSelect
                value={holeCount}
                onChange={setHoleCount}
                options={HOLE_OPTIONS}
                ariaLabel="Number of holes"
              />
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                Center distance
              </span>
              <NumberInput
                min="0"
                step="0.001"
                value={centerDistance}
                onChange={(event) => setCenterDistance(event.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                placeholder="e.g. 25.400"
                aria-label="Center distance between consecutive holes"
              />
              <span className="mt-1 block text-xs text-muted">
                Between two consecutive holes (up to 3 decimals)
              </span>
            </label>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <h4 className="font-(family-name:--font-sora) text-base font-semibold">
              Result
            </h4>

            {result.error ? (
              <WarningMessage className="mt-3">{result.error}</WarningMessage>
            ) : (
              <div className="mt-3 rounded-xl border border-success/25 bg-success/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-success">
                  Pitch circle diameter (PCD)
                </p>
                <p className="mt-1 font-(family-name:--font-sora) text-3xl font-semibold">
                  {result.display}
                </p>
                <p className="mt-2 text-xs text-muted">
                  PCD = C ÷ sin(180° ÷ N) · N = {result.holeCount} · C ={" "}
                  {Number(result.centerDistance).toFixed(3)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <PcdDiagram result={result} holeCount={holeCount} />
        </div>
      </section>
    </div>
  );
};

export default PcdCalculator;
