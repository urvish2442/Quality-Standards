"use client";

import ThemedSelect from "@/components/ui/ThemedSelect";
import NumberInput from "@/components/ui/NumberInput";
import { CALCULATOR_STANDARDS } from "@/features/threads/constants/threadCalculatorData";

const ThreadCalculatorControls = ({
  standardId,
  setStandardId,
  selectedSizeId,
  setSelectedSizeId,
  gender,
  setGender,
  selectedClass,
  setSelectedClass,
  unit,
  setUnit,
  isCustomMode,
  setIsCustomMode,
  customNominalDia,
  setCustomNominalDia,
  customPitch,
  setCustomPitch,
  customTpi,
  setCustomTpi,
  customAngle,
  setCustomAngle,
  pitchInputMode,
  setPitchInputMode,
  sizeOptions,
  currentStandard,
}) => {
  const standardOptions = CALCULATOR_STANDARDS.map((s) => ({
    value: s.id,
    label: s.label,
  }));

  const availableClasses =
    gender === "external"
      ? currentStandard.classesExt
      : currentStandard.classesInt;

  const classOptions = availableClasses.map((c) => ({
    value: c.id,
    label: c.label,
  }));

  return (
    <section className="border-border bg-surface flex flex-col gap-6 rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      {/* Top row: Mode & Unit toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsCustomMode(false);
              if (standardId === "custom") setStandardId("metric");
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              !isCustomMode
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted hover:bg-primary-soft hover:text-foreground"
            }`}
          >
            Standard Preset Sizes
          </button>
          <button
            type="button"
            onClick={() => {
              setIsCustomMode(true);
              setStandardId("custom");
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              isCustomMode
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted hover:bg-primary-soft hover:text-foreground"
            }`}
          >
            Custom Thread Calculator
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="border-border bg-background inline-flex rounded-xl border p-1" role="group" aria-label="Units">
          <button
            type="button"
            onClick={() => setUnit("mm")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
              unit === "mm"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted hover:text-foreground"
            }`}
          >
            Metric (mm)
          </button>
          <button
            type="button"
            onClick={() => setUnit("inch")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
              unit === "inch"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted hover:text-foreground"
            }`}
          >
            Imperial (inch)
          </button>
        </div>
      </div>

      {/* Main Grid of Controls */}
      {!isCustomMode ? (
        <div className="grid gap-6 md:grid-cols-4">
          {/* 1. Standard Selector */}
          <div>
            <label htmlFor="thread-standard-select" className="mb-1.5 block text-sm font-semibold">
              1. Thread Standard
            </label>
            <ThemedSelect
              id="thread-standard-select"
              value={standardId}
              onChange={setStandardId}
              options={standardOptions}
              ariaLabel="Select thread standard"
            />
          </div>

          {/* 2. Size Designation Selector */}
          <div>
            <label htmlFor="thread-size-select" className="mb-1.5 block text-sm font-semibold">
              2. Thread Size / Designation
            </label>
            <ThemedSelect
              id="thread-size-select"
              value={selectedSizeId}
              onChange={setSelectedSizeId}
              options={sizeOptions}
              ariaLabel="Select thread size"
            />
          </div>

          {/* 3. Gender / Type Radios */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              3. Thread Gender / Type
            </label>
            <div className="grid grid-cols-2 gap-2" role="radiogroup">
              <button
                type="button"
                role="radio"
                aria-checked={gender === "external"}
                onClick={() => setGender("external")}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center text-xs font-semibold transition ${
                  gender === "external"
                    ? "border-primary bg-primary-soft text-foreground shadow-xs"
                    : "border-border bg-background text-muted hover:bg-primary-soft hover:text-foreground"
                }`}
              >
                <span>External</span>
                <span className="text-muted text-[10px] font-normal">(Bolt)</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={gender === "internal"}
                onClick={() => setGender("internal")}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center text-xs font-semibold transition ${
                  gender === "internal"
                    ? "border-primary bg-primary-soft text-foreground shadow-xs"
                    : "border-border bg-background text-muted hover:bg-primary-soft hover:text-foreground"
                }`}
              >
                <span>Internal</span>
                <span className="text-muted text-[10px] font-normal">(Nut)</span>
              </button>
            </div>
          </div>

          {/* 4. Class of Fit Selector */}
          <div>
            <label htmlFor="thread-class-select" className="mb-1.5 block text-sm font-semibold">
              4. Tolerance Class / Fit
            </label>
            <ThemedSelect
              id="thread-class-select"
              value={selectedClass}
              onChange={setSelectedClass}
              options={classOptions}
              ariaLabel="Select tolerance class fit"
            />
          </div>
        </div>
      ) : (
        /* Custom Thread Mode Form */
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label htmlFor="custom-nominal-dia" className="mb-1.5 block text-sm font-semibold">
              Nominal Major Dia (D / d)
            </label>
            <NumberInput
              id="custom-nominal-dia"
              value={customNominalDia}
              onChange={(e) => setCustomNominalDia(e.target.value)}
              placeholder="e.g. 10"
              className="border-border bg-background text-foreground h-11 w-full rounded-xl border px-3 text-sm font-mono outline-none"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="custom-pitch-input" className="text-sm font-semibold">
                {pitchInputMode === "pitch" ? "Pitch (P)" : "TPI"}
              </label>
              <button
                type="button"
                onClick={() =>
                  setPitchInputMode(pitchInputMode === "pitch" ? "tpi" : "pitch")
                }
                className="text-primary text-[11px] font-semibold underline"
              >
                Switch to {pitchInputMode === "pitch" ? "TPI" : "Pitch (mm)"}
              </button>
            </div>

            {pitchInputMode === "pitch" ? (
              <NumberInput
                id="custom-pitch-input"
                value={customPitch}
                onChange={(e) => setCustomPitch(e.target.value)}
                placeholder="e.g. 1.5"
                className="border-border bg-background text-foreground h-11 w-full rounded-xl border px-3 text-sm font-mono outline-none"
              />
            ) : (
              <NumberInput
                id="custom-tpi-input"
                value={customTpi}
                onChange={(e) => setCustomTpi(e.target.value)}
                placeholder="e.g. 16.93"
                className="border-border bg-background text-foreground h-11 w-full rounded-xl border px-3 text-sm font-mono outline-none"
              />
            )}
          </div>

          <div>
            <label htmlFor="custom-thread-angle" className="mb-1.5 block text-sm font-semibold">
              Thread Angle (α)
            </label>
            <NumberInput
              id="custom-thread-angle"
              value={customAngle}
              onChange={(e) => setCustomAngle(e.target.value)}
              placeholder="e.g. 60"
              className="border-border bg-background text-foreground h-11 w-full rounded-xl border px-3 text-sm font-mono outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              Gender / Fit
            </label>
            <div className="grid grid-cols-2 gap-2" role="radiogroup">
              <button
                type="button"
                role="radio"
                aria-checked={gender === "external"}
                onClick={() => setGender("external")}
                className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition ${
                  gender === "external"
                    ? "border-primary bg-primary-soft text-foreground"
                    : "border-border bg-background text-muted"
                }`}
              >
                External
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={gender === "internal"}
                onClick={() => setGender("internal")}
                className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition ${
                  gender === "internal"
                    ? "border-primary bg-primary-soft text-foreground"
                    : "border-border bg-background text-muted"
                }`}
              >
                Internal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ThreadCalculatorControls;
