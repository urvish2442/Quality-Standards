"use client";

const ThreadGeometryCard = ({ threadData, computedSpecs, unit = "mm" }) => {
  if (!threadData || !computedSpecs) return null;

  const { profileGeo, helixAngle } = computedSpecs;
  const isMetric = unit === "mm";

  return (
    <div className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      <div className="border-b border-border pb-3">
        <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
          Profile & Geometry Specifications
        </span>
        <h3 className="font-(family-name:--font-sora) text-lg font-bold">
          Theoretical Dimensions & Angles
        </h3>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Pitch / TPI
          </span>
          <span className="text-foreground mt-1 font-mono text-sm font-bold block">
            {threadData.pitch} | {threadData.tpi} TPI
          </span>
        </div>

        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Flank Angle
          </span>
          <span className="text-foreground mt-1 font-mono text-sm font-bold block">
            {threadData.angle} (Half Angle {(parseFloat(threadData.angle) / 2).toFixed(1)}°)
          </span>
        </div>

        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Theoretical Triangle Height (H)
          </span>
          <span className="text-foreground mt-1 font-mono text-sm font-bold block">
            {isMetric ? `${profileGeo.H} mm` : `${(profileGeo.H / 25.4).toFixed(4)} in`}
          </span>
        </div>

        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Effective Thread Depth (h₃)
          </span>
          <span className="text-foreground mt-1 font-mono text-sm font-bold block">
            {isMetric ? `${profileGeo.h3} mm` : `${(profileGeo.h3 / 25.4).toFixed(4)} in`}
          </span>
        </div>

        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Crest Truncation / Flat
          </span>
          <span className="text-foreground mt-1 font-mono text-sm font-bold block">
            {isMetric ? `${profileGeo.crestFlat} mm` : `${(profileGeo.crestFlat / 25.4).toFixed(4)} in`}
          </span>
        </div>

        <div className="border-border bg-background rounded-xl border p-3">
          <span className="text-muted text-[11px] font-semibold tracking-wider uppercase block">
            Helix Angle (λ)
          </span>
          <span className="text-primary mt-1 font-mono text-sm font-bold block">
            {helixAngle}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreadGeometryCard;
