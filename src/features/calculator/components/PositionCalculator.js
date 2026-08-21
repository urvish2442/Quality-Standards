"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import PositionDiagram from "@/features/calculator/components/PositionDiagram";
import WarningMessage from "@/features/calculator/components/WarningMessage";
import { calculatePositionDeviation } from "@/features/calculator/utils/calculations";

const emptyFields = {
  requiredX: "",
  requiredY: "",
  obtainedX: "",
  obtainedY: "",
};

const PositionCalculator = () => {
  const [fields, setFields] = useState(emptyFields);

  const result = useMemo(
    () => calculatePositionDeviation(fields),
    [fields],
  );

  const updateField = (key) => (event) => {
    setFields((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Position
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          Required vs obtained coordinates
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Enter the required and obtained X/Y values to calculate ΔX, ΔY, and
          the radial position error. The diagram shows required in black and
          obtained in red.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
            Coordinates
          </h3>

          <div className="mt-4 space-y-5">
            <div>
              <p className="mb-3 text-sm font-semibold">
                Required
                <span className="ml-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Black
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">
                    Required X
                  </span>
                  <NumberInput
                    step="any"
                    value={fields.requiredX}
                    onChange={updateField("requiredX")}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                    placeholder="e.g. 2.500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">
                    Required Y
                  </span>
                  <NumberInput
                    step="any"
                    value={fields.requiredY}
                    onChange={updateField("requiredY")}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                    placeholder="e.g. 1.250"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <p className="mb-3 text-sm font-semibold">
                Obtained
                <span className="ml-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#dc2626]">
                  Red
                </span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">
                    Obtained X
                  </span>
                  <NumberInput
                    step="any"
                    value={fields.obtainedX}
                    onChange={updateField("obtainedX")}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                    placeholder="e.g. 2.753"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">
                    Obtained Y
                  </span>
                  <NumberInput
                    step="any"
                    value={fields.obtainedY}
                    onChange={updateField("obtainedY")}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                    placeholder="e.g. 1.252"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="font-(family-name:--font-sora) text-base font-semibold">
                Results
              </h4>

              {result.error ? (
                <WarningMessage className="mt-3">{result.error}</WarningMessage>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      ΔX
                    </p>
                    <p className="mt-1 font-(family-name:--font-sora) text-2xl font-semibold text-primary">
                      {result.display.deltaX}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      ΔY
                    </p>
                    <p className="mt-1 font-(family-name:--font-sora) text-2xl font-semibold text-primary">
                      {result.display.deltaY}
                    </p>
                  </div>
                  <div className="rounded-xl border border-success/25 bg-success/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-success">
                      Position error
                    </p>
                    <p className="mt-1 font-(family-name:--font-sora) text-2xl font-semibold">
                      {result.display.positionError}
                    </p>
                    <p className="mt-1 text-xs text-muted">√(ΔX² + ΔY²)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
          <PositionDiagram result={result} />
        </div>
      </section>
    </div>
  );
};

export default PositionCalculator;
