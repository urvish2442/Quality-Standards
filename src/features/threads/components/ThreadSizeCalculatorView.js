"use client";

import { useMemo, useState } from "react";
import ThemedSelect from "@/components/ui/ThemedSelect";
import {
  STANDARD_OPTIONS,
  THREAD_LIMITS,
  THREAD_STANDARDS,
} from "@/features/threads/constants/threadLimitsData";

const ThreadSizeCalculatorView = () => {
  const [standardId, setStandardId] = useState("metric");
  const [selectedSizeId, setSelectedSizeId] = useState("m8");
  const [gender, setGender] = useState("external"); // "external" | "internal"

  const currentStandard = useMemo(
    () => THREAD_STANDARDS.find((s) => s.id === standardId) ?? THREAD_STANDARDS[0],
    [standardId]
  );

  const availableSizes = useMemo(
    () => THREAD_LIMITS[standardId] ?? [],
    [standardId]
  );

  const sizeOptions = useMemo(
    () =>
      availableSizes.map((item) => ({
        value: item.id,
        label: item.size,
      })),
    [availableSizes]
  );

  const selectedThread = useMemo(() => {
    const found = availableSizes.find((item) => item.id === selectedSizeId);
    return found ?? availableSizes[0];
  }, [availableSizes, selectedSizeId]);

  const handleStandardChange = (newStdId) => {
    setStandardId(newStdId);
    const newSizes = THREAD_LIMITS[newStdId] ?? [];
    if (newSizes.length > 0) {
      setSelectedSizeId(newSizes[0].id);
    }
  };

  const limitData = gender === "external" ? selectedThread?.external : selectedThread?.internal;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Thread Size Limits
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          Thread tolerance & diameter limits calculator
        </h2>
        <p className="text-muted mt-2 max-w-3xl text-sm leading-relaxed sm:text-base">
          Select a thread standard, size, and gender (internal vs external thread) to view major diameter, pitch diameter, and minor diameter minimum and maximum limits.
        </p>
      </section>

      {/* Controls Card */}
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Standard Dropdown */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              1. Thread Standard
            </label>
            <ThemedSelect
              value={standardId}
              onChange={handleStandardChange}
              options={STANDARD_OPTIONS}
              ariaLabel="Select thread standard"
            />
          </div>

          {/* Thread Size Dropdown */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">
              2. Thread Size / Designation
            </label>
            <ThemedSelect
              value={selectedThread?.id ?? ""}
              onChange={(val) => setSelectedSizeId(val)}
              options={sizeOptions}
              ariaLabel="Select thread size"
            />
          </div>

          {/* Gender Selector */}
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
                <span>External Thread</span>
                <span className="text-muted text-[10px] font-normal">
                  (Bolt / Screw)
                </span>
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
                <span>Internal Thread</span>
                <span className="text-muted text-[10px] font-normal">
                  (Nut / Hole)
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Display */}
      {selectedThread && limitData ? (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Limits Specs Card */}
          <section className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <div>
                <span className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                  {currentStandard.label}
                </span>
                <h3 className="font-(family-name:--font-sora) text-2xl font-bold tracking-tight text-primary">
                  {selectedThread.size}{" "}
                  <span className="text-foreground text-sm font-medium">
                    ({gender === "external" ? "External Thread" : "Internal Thread"})
                  </span>
                </h3>
              </div>
              <span className="border-primary/20 bg-primary-soft text-primary inline-flex rounded-full px-3.5 py-1 text-xs font-semibold">
                Class {limitData.class}
              </span>
            </div>

            {/* Diameter Limits Cards Grid */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {/* Major Diameter */}
              <div className="border-border bg-background rounded-xl border p-4">
                <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                  Major Diameter (Ø)
                </p>
                {selectedThread.basicMajor && (
                  <p className="text-muted mt-1 text-xs">
                    Basic: <span className="font-mono font-medium">{selectedThread.basicMajor}</span>
                  </p>
                )}
                <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-2.5">
                  <div>
                    <span className="text-muted text-[11px] font-medium block">
                      Max Limit
                    </span>
                    <span className="text-foreground font-mono text-base font-bold">
                      {limitData.major.max}
                    </span>
                  </div>
                  <div className="border-t border-border pt-1.5">
                    <span className="text-muted text-[11px] font-medium block">
                      Min Limit
                    </span>
                    <span className="text-foreground font-mono text-base font-bold">
                      {limitData.major.min}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pitch Diameter */}
              <div className="border-primary/30 bg-primary-soft/30 rounded-xl border p-4">
                <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
                  Pitch Diameter (d₂ / D₂)
                </p>
                {selectedThread.basicPitch && (
                  <p className="text-muted mt-1 text-xs">
                    Basic: <span className="font-mono font-medium">{selectedThread.basicPitch}</span>
                  </p>
                )}
                <div className="mt-3 flex flex-col gap-1.5 border-t border-primary/20 pt-2.5">
                  <div>
                    <span className="text-muted text-[11px] font-medium block">
                      Max Limit
                    </span>
                    <span className="text-primary font-mono text-base font-bold">
                      {limitData.pitch.max}
                    </span>
                  </div>
                  <div className="border-t border-primary/20 pt-1.5">
                    <span className="text-muted text-[11px] font-medium block">
                      Min Limit
                    </span>
                    <span className="text-primary font-mono text-base font-bold">
                      {limitData.pitch.min}
                    </span>
                  </div>
                </div>
              </div>

              {/* Minor Diameter */}
              <div className="border-border bg-background rounded-xl border p-4">
                <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                  Minor Diameter (d₁ / D₁)
                </p>
                {selectedThread.basicMinor && (
                  <p className="text-muted mt-1 text-xs">
                    Basic: <span className="font-mono font-medium">{selectedThread.basicMinor}</span>
                  </p>
                )}
                <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-2.5">
                  <div>
                    <span className="text-muted text-[11px] font-medium block">
                      Max Limit
                    </span>
                    <span className="text-foreground font-mono text-base font-bold">
                      {limitData.minor.max}
                    </span>
                  </div>
                  <div className="border-t border-border pt-1.5">
                    <span className="text-muted text-[11px] font-medium block">
                      Min Limit
                    </span>
                    <span className="text-foreground font-mono text-base font-bold">
                      {limitData.minor.min}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference Summary Side Card */}
          <section className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6 lg:col-span-4">
            <h3 className="font-(family-name:--font-sora) text-base font-semibold">
              Detailed Specifications
            </h3>

            <dl className="mt-4 flex flex-col gap-2.5">
              <div className="border-border bg-background rounded-xl border p-2.5">
                <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                  Pitch / TPI
                </dt>
                <dd className="text-foreground mt-0.5 font-mono text-xs font-semibold">
                  {selectedThread.pitch} ({selectedThread.tpi} TPI)
                </dd>
              </div>

              <div className="border-border bg-background rounded-xl border p-2.5">
                <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                  Thread Angle & Height
                </dt>
                <dd className="text-foreground mt-0.5 font-mono text-xs font-semibold">
                  Angle: {selectedThread.angle} | h: {selectedThread.height ?? "—"}
                </dd>
              </div>

              <div className="border-border bg-background rounded-xl border p-2.5">
                <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                  Recommended Tap Drill
                </dt>
                <dd className="text-primary mt-0.5 font-mono text-xs font-bold">
                  {selectedThread.tapDrill}
                </dd>
              </div>

              {selectedThread.clearanceDrill && (
                <div className="border-border bg-background rounded-xl border p-2.5">
                  <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Clearance Drill Size
                  </dt>
                  <dd className="text-foreground mt-0.5 font-mono text-xs font-semibold">
                    {selectedThread.clearanceDrill}
                  </dd>
                </div>
              )}

              <div className="border-border bg-background rounded-xl border p-2.5">
                <dt className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                  Tolerance Class & Fit
                </dt>
                <dd className="text-foreground mt-0.5 font-mono text-xs font-semibold">
                  Class {limitData.class} ({gender === "external" ? "External bolt fit" : "Internal nut fit"})
                </dd>
              </div>
            </dl>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default ThreadSizeCalculatorView;
