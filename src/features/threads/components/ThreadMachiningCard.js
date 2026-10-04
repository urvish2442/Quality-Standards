"use client";

const ThreadMachiningCard = ({
  threadData,
  computedSpecs,
  engagementPct,
  setEngagementPct,
  unit = "mm",
}) => {
  if (!threadData || !computedSpecs) return null;

  const { tapDrill, clearanceDrills, inspection3Wire } = computedSpecs;
  const isMetric = unit === "mm";

  return (
    <div className="border-border bg-surface flex flex-col gap-6 rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Shop Tooling & Machining Specs
          </span>
          <h3 className="font-(family-name:--font-sora) text-xl font-bold text-primary">
            Tapping, Clearance & 3-Wire Inspection
          </h3>
        </div>

        {/* Engagement Percentage Slider */}
        <div className="border-border bg-background flex items-center gap-3 rounded-xl border px-3 py-1.5">
          <label htmlFor="thread-engagement-pct" className="text-muted text-xs font-semibold whitespace-nowrap">
            Thread Engagement: <span className="text-primary font-mono">{engagementPct}%</span>
          </label>
          <input
            id="thread-engagement-pct"
            type="range"
            min="50"
            max="85"
            step="5"
            value={engagementPct}
            onChange={(e) => setEngagementPct(Number(e.target.value))}
            className="accent-primary h-1.5 w-24 cursor-pointer rounded-lg bg-border"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Tapping Drill Sizes Card */}
        <div className="border-primary/30 bg-primary-soft/20 flex flex-col rounded-xl border p-4">
          <span className="text-primary text-xs font-bold tracking-[0.12em] uppercase">
            Tapping Drill Hole Calculator ({engagementPct}% Thread)
          </span>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {/* Cut Tap */}
            <div className="border-border bg-background rounded-lg border p-3">
              <span className="text-muted text-[11px] font-semibold uppercase block">
                Cut Tap Drill Size
              </span>
              <span className="text-primary font-mono text-base font-bold block mt-1">
                {isMetric ? `${tapDrill.cutTapMm} mm` : `${tapDrill.cutTapInch} in`}
              </span>
              {tapDrill.nearestCutDrill && (
                <span className="text-muted mt-1 block text-[11px]">
                  Nearest std drill: <strong className="text-foreground">{tapDrill.nearestCutDrill.name}</strong>
                </span>
              )}
            </div>

            {/* Form / Roll Tap */}
            <div className="border-border bg-background rounded-lg border p-3">
              <span className="text-muted text-[11px] font-semibold uppercase block">
                Form Tap (Roll Tap) Drill
              </span>
              <span className="text-primary font-mono text-base font-bold block mt-1">
                {isMetric ? `${tapDrill.formTapMm} mm` : `${tapDrill.formTapInch} in`}
              </span>
              {tapDrill.nearestFormDrill && (
                <span className="text-muted mt-1 block text-[11px]">
                  Nearest std drill: <strong className="text-foreground">{tapDrill.nearestFormDrill.name}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Clearance Holes Card */}
        <div className="border-border bg-background flex flex-col rounded-xl border p-4">
          <span className="text-muted text-xs font-bold tracking-[0.12em] uppercase">
            Bolt Clearance Hole Sizes (ISO 273)
          </span>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="border-border bg-surface rounded-lg border p-2.5 text-center">
              <span className="text-muted text-[10px] font-semibold uppercase block">
                Close Fit
              </span>
              <span className="text-foreground mt-0.5 font-mono text-xs font-bold block">
                {isMetric ? `${clearanceDrills.close.mm} mm` : `${clearanceDrills.close.inch} in`}
              </span>
            </div>

            <div className="border-primary/30 bg-primary-soft/30 rounded-lg border p-2.5 text-center">
              <span className="text-primary text-[10px] font-semibold uppercase block">
                Normal Fit
              </span>
              <span className="text-primary mt-0.5 font-mono text-xs font-bold block">
                {isMetric ? `${clearanceDrills.normal.mm} mm` : `${clearanceDrills.normal.inch} in`}
              </span>
            </div>

            <div className="border-border bg-surface rounded-lg border p-2.5 text-center">
              <span className="text-muted text-[10px] font-semibold uppercase block">
                Loose Fit
              </span>
              <span className="text-foreground mt-0.5 font-mono text-xs font-bold block">
                {isMetric ? `${clearanceDrills.loose.mm} mm` : `${clearanceDrills.loose.inch} in`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Wire Inspection Method Card */}
      <div className="border-border bg-background flex flex-col rounded-xl border p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
          <span className="text-muted text-xs font-bold tracking-[0.12em] uppercase">
            3-Wire Method Pitch Diameter Inspection
          </span>
          <span className="text-muted text-[11px]">
            Best Wire Size Formula: <code className="font-mono text-primary">dw = P / (2·cos(α/2))</code>
          </span>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border bg-surface rounded-lg border p-3">
            <span className="text-muted text-[11px] font-semibold uppercase block">
              Best Wire Diameter (dw)
            </span>
            <span className="text-primary font-mono text-sm font-bold block mt-0.5">
              {isMetric ? `${inspection3Wire.bestWireMm} mm` : `${inspection3Wire.bestWireInch} in`}
            </span>
          </div>

          <div className="border-border bg-surface rounded-lg border p-3">
            <span className="text-muted text-[11px] font-semibold uppercase block">
              Over-Wire Measurement (M)
            </span>
            <span className="text-foreground font-mono text-sm font-bold block mt-0.5">
              {isMetric ? `${inspection3Wire.overWireMm} mm` : `${inspection3Wire.overWireInch} in`}
            </span>
          </div>

          <div className="border-border bg-surface rounded-lg border p-3 sm:col-span-2 lg:col-span-1">
            <span className="text-muted text-[11px] font-semibold uppercase block">
              Inspection Status
            </span>
            <span className="text-foreground mt-0.5 text-xs font-medium block">
              Measure across wires with micrometer to verify pitch diameter tolerance.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadMachiningCard;
