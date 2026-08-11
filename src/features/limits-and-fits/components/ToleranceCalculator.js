"use client";

import { useMemo, useState } from "react";
import {
  FEATURE_TYPES,
  calculateToleranceLimits,
  getToleranceGrades,
} from "@/features/limits-and-fits/utils/calculateTolerance";
import NavIcon from "@/components/icons/NavIcon";
import ThemedSelect from "@/components/ui/ThemedSelect";

const FEATURE_OPTIONS = [
  {
    id: FEATURE_TYPES.HOLE,
    label: "Hole",
    icon: "hole",
  },
  {
    id: FEATURE_TYPES.SHAFT,
    label: "Shaft",
    icon: "shaft",
  },
];

const ToleranceCalculator = () => {
  const [featureType, setFeatureType] = useState(FEATURE_TYPES.HOLE);
  const [nominal, setNominal] = useState("50");
  const [grade, setGrade] = useState("H7");

  const grades = useMemo(
    () => getToleranceGrades(featureType),
    [featureType],
  );

  const gradeOptions = useMemo(
    () => grades.map((item) => ({ value: item, label: item })),
    [grades],
  );

  const result = useMemo(() => {
    const nominalMm = Number(nominal);

    if (!grade) {
      return { error: "Select a tolerance grade." };
    }

    return calculateToleranceLimits({
      featureType,
      nominalMm,
      grade,
    });
  }, [featureType, grade, nominal]);

  const handleFeatureChange = (nextType) => {
    setFeatureType(nextType);
    const nextGrades = getToleranceGrades(nextType);
    const preferred =
      nextType === FEATURE_TYPES.HOLE
        ? nextGrades.includes("H7")
          ? "H7"
          : nextGrades[0]
        : nextGrades.includes("g6")
          ? "g6"
          : nextGrades[0];
    setGrade(preferred);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      <section className="rounded-2xl border border-border bg-surface p-3 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary sm:mb-3 sm:text-xs">
          Feature type
        </p>
        <div
          className="grid grid-cols-2 gap-2 sm:gap-3"
          role="radiogroup"
          aria-label="Hole or Shaft"
        >
          {FEATURE_OPTIONS.map((option) => {
            const checked = featureType === option.id;

            return (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 transition sm:gap-3 sm:rounded-2xl sm:p-4 ${checked
                    ? "border-primary bg-primary-soft shadow-sm"
                    : "border-border bg-background hover:border-primary/40"
                  }`}
              >
                <input
                  type="radio"
                  name="feature-type"
                  value={option.id}
                  checked={checked}
                  onChange={() => handleFeatureChange(option.id)}
                  className="sr-only"
                />
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-11 sm:w-11 sm:rounded-xl ${checked
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface text-primary"
                    }`}
                >
                  <NavIcon name={option.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="font-(family-name:--font-sora) text-sm font-semibold sm:text-base">
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border bg-surface p-3 shadow-(--card-shadow) sm:p-6">
          <h2 className="font-(family-name:--font-sora) text-base font-semibold sm:text-xl">
            Tolerance inputs
          </h2>
          <p className="mt-0.5 hidden text-sm text-muted sm:mt-1 sm:block">
            Enter nominal size and choose an ISO 286 grade to get higher and
            lower limits.
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-4">
            <label className="block min-w-0">
              <span className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                Dimension (mm)
              </span>
              <input
                type="number"
                min="3.001"
                max="400"
                step="any"
                value={nominal}
                onChange={(event) => setNominal(event.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-2.5 text-sm outline-none transition focus:border-primary sm:h-11 sm:px-3"
                placeholder="e.g. 50"
                aria-label="Nominal dimension in millimeters"
              />
            </label>

            <label className="block min-w-0">
              <span className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                Grade
              </span>
              <ThemedSelect
                value={grade}
                onChange={setGrade}
                options={gradeOptions}
                ariaLabel="Tolerance grade"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-3 shadow-(--card-shadow) sm:p-6">
          <h2 className="font-(family-name:--font-sora) text-base font-semibold sm:text-xl">
            Calculated limits
          </h2>

          {result.error ? (
            <p className="mt-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning sm:mt-4 sm:px-4 sm:py-3">
              {result.error}
            </p>
          ) : (
            <div className="mt-2 space-y-2 sm:mt-4 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="rounded-lg bg-background px-2.5 py-1.5 font-mono text-sm font-semibold text-primary sm:rounded-xl sm:px-3 sm:py-2">
                  {result.display.designation}
                </p>
                <p className="text-xs text-muted sm:text-sm">
                  {result.rangeLabel}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-xl border border-success/25 bg-success/10 p-2.5 sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-success sm:text-xs">
                    Higher size
                  </p>
                  <p className="mt-0.5 font-(family-name:--font-sora) text-lg font-semibold sm:mt-1 sm:text-2xl">
                    {result.display.upperLimit}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                    {result.display.upperDeviation}
                  </p>
                </div>
                <div className="rounded-xl border border-info/25 bg-info/10 p-2.5 sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-info sm:text-xs">
                    Lower size
                  </p>
                  <p className="mt-0.5 font-(family-name:--font-sora) text-lg font-semibold sm:mt-1 sm:text-2xl">
                    {result.display.lowerLimit}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                    {result.display.lowerDeviation}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm">
                Tolerance band:{" "}
                <span className="font-semibold text-foreground">
                  {result.display.tolerance}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToleranceCalculator;
