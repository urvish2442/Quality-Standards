"use client";

import { inchToMm, mmToInch } from "@/features/threads/utils/threadMath";

const ThreadDiameterLimitsCard = ({
  threadData,
  gender,
  limitData,
  unit = "mm",
}) => {
  if (!threadData || !limitData) return null;

  const isMetricUnit = unit === "mm";

  const formatVal = (numStr, defaultStr) => {
    if (!numStr) return defaultStr || "—";
    const parsed = parseFloat(numStr);
    if (Number.isNaN(parsed)) return numStr;

    if (isMetricUnit) {
      return numStr.includes("in") ? `${inchToMm(parsed).toFixed(3)} mm` : `${parsed.toFixed(3)} mm`;
    }
    return numStr.includes("in") ? `${parsed.toFixed(4)} in` : `${mmToInch(parsed).toFixed(4)} in`;
  };

  return (
    <div className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
            Diameter & Tolerance Limits
          </span>
          <h3 className="font-(family-name:--font-sora) text-xl font-bold tracking-tight text-primary sm:text-2xl">
            {threadData.size}{" "}
            <span className="text-foreground text-sm font-medium">
              ({gender === "external" ? "External Bolt/Screw" : "Internal Nut/Hole"})
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="border-primary/20 bg-primary-soft text-primary rounded-full px-3 py-1 text-xs font-bold">
            Class {limitData.class || "Standard"}
          </span>
        </div>
      </div>

      {/* Grid of 3 Diameter Specs */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {/* Major Diameter */}
        <div className="border-border bg-background rounded-xl border p-4 transition hover:border-primary/30">
          <div className="flex items-center justify-between">
            <span className="text-muted text-xs font-bold tracking-[0.12em] uppercase">
              Major Dia (Ø d / D)
            </span>
            <span className="text-muted text-[10px] font-mono">Crest</span>
          </div>

          <p className="text-muted mt-1 text-xs">
            Basic:{" "}
            <span className="font-mono font-medium text-foreground">
              {formatVal(threadData.basicMajor, "—")}
            </span>
          </p>

          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            <div>
              <span className="text-muted text-[11px] font-medium block">
                Max Limit (Upper)
              </span>
              <span className="text-foreground font-mono text-base font-bold">
                {formatVal(limitData.major?.max)}
              </span>
            </div>
            <div className="border-t border-border/60 pt-1.5">
              <span className="text-muted text-[11px] font-medium block">
                Min Limit (Lower)
              </span>
              <span className="text-foreground font-mono text-base font-bold">
                {formatVal(limitData.major?.min)}
              </span>
            </div>
          </div>
        </div>

        {/* Pitch Diameter */}
        <div className="border-primary/30 bg-primary-soft/20 rounded-xl border p-4 shadow-xs transition hover:border-primary/50">
          <div className="flex items-center justify-between">
            <span className="text-primary text-xs font-bold tracking-[0.12em] uppercase">
              Pitch Dia (d₂ / D₂)
            </span>
            <span className="text-primary text-[10px] font-mono">Effective</span>
          </div>

          <p className="text-muted mt-1 text-xs">
            Basic:{" "}
            <span className="font-mono font-medium text-foreground">
              {formatVal(threadData.basicPitch, "—")}
            </span>
          </p>

          <div className="mt-3 flex flex-col gap-2 border-t border-primary/20 pt-3">
            <div>
              <span className="text-muted text-[11px] font-medium block">
                Max Limit (Upper)
              </span>
              <span className="text-primary font-mono text-base font-bold">
                {formatVal(limitData.pitch?.max)}
              </span>
            </div>
            <div className="border-t border-primary/20 pt-1.5">
              <span className="text-muted text-[11px] font-medium block">
                Min Limit (Lower)
              </span>
              <span className="text-primary font-mono text-base font-bold">
                {formatVal(limitData.pitch?.min)}
              </span>
            </div>
          </div>
        </div>

        {/* Minor Diameter */}
        <div className="border-border bg-background rounded-xl border p-4 transition hover:border-primary/30">
          <div className="flex items-center justify-between">
            <span className="text-muted text-xs font-bold tracking-[0.12em] uppercase">
              Minor Dia (d₁ / D₁)
            </span>
            <span className="text-muted text-[10px] font-mono">Root</span>
          </div>

          <p className="text-muted mt-1 text-xs">
            Basic:{" "}
            <span className="font-mono font-medium text-foreground">
              {formatVal(threadData.basicMinor, "—")}
            </span>
          </p>

          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            <div>
              <span className="text-muted text-[11px] font-medium block">
                Max Limit (Upper)
              </span>
              <span className="text-foreground font-mono text-base font-bold">
                {formatVal(limitData.minor?.max)}
              </span>
            </div>
            <div className="border-t border-border/60 pt-1.5">
              <span className="text-muted text-[11px] font-medium block">
                Min Limit (Lower)
              </span>
              <span className="text-foreground font-mono text-base font-bold">
                {formatVal(limitData.minor?.min)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDiameterLimitsCard;
