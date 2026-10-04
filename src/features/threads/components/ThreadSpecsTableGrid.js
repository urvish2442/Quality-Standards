"use client";

import { inchToMm, mmToInch } from "@/features/threads/utils/threadMath";
import ThreadProfileVisualizer from "@/features/threads/components/ThreadProfileVisualizer";

const ThreadSpecsTableGrid = ({
  threadData,
  gender,
  limitData,
  computedSpecs,
  engagementPct,
  setEngagementPct,
  unit = "mm",
}) => {
  if (!threadData || !limitData || !computedSpecs) return null;

  const isMetric = unit === "mm";
  const { profileGeo, helixAngle, tapDrill, clearanceDrills, inspection3Wire } =
    computedSpecs;

  const formatVal = (numStr, defaultStr) => {
    if (!numStr) return defaultStr || "—";
    const parsed = parseFloat(numStr);
    if (Number.isNaN(parsed)) return numStr;

    if (isMetric) {
      return numStr.includes("in")
        ? `${inchToMm(parsed).toFixed(3)} mm`
        : `${parsed.toFixed(3)} mm`;
    }
    return numStr.includes("in")
      ? `${parsed.toFixed(4)} in`
      : `${mmToInch(parsed).toFixed(4)} in`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* COLUMN 1: Diameter Limits & Theoretical Geometry Table */}
      <section className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
              Column 1 Specs
            </span>
            <h3 className="font-(family-name:--font-sora) text-lg font-bold text-primary">
              Limits & Theoretical Dimensions
            </h3>
          </div>
          <span className="border-primary/20 bg-primary-soft text-primary rounded-full px-3 py-0.5 text-xs font-bold">
            Class {limitData.class || "Standard"}
          </span>
        </div>

        {/* 2-Column Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-background/80 text-muted border-b border-border text-[11px] uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-3.5 py-2.5 font-bold">Parameter</th>
                <th scope="col" className="px-3.5 py-2.5 font-bold text-right">Calculated Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background/30">
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Thread Designation</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">{threadData.size}</td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Gender & Fit</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground capitalize">
                  {gender} ({gender === "external" ? "Bolt" : "Nut"})
                </td>
              </tr>

              {/* Major Diameter */}
              <tr className="bg-background/60 hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Major Diameter (Basic)</td>
                <td className="px-3.5 py-2 text-right font-mono font-medium">{formatVal(threadData.basicMajor)}</td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Major Diameter Limits (Min – Max)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-foreground">
                  {formatVal(limitData.major?.min)} – {formatVal(limitData.major?.max)}
                </td>
              </tr>

              {/* Pitch Diameter */}
              <tr className="bg-primary-soft/20 hover:bg-primary-soft/40 transition">
                <td className="px-3.5 py-2 font-semibold text-primary">Pitch Diameter (Basic d₂ / D₂)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">{formatVal(threadData.basicPitch)}</td>
              </tr>
              <tr className="bg-primary-soft/20 hover:bg-primary-soft/40 transition">
                <td className="px-3.5 py-2 font-semibold text-primary">Pitch Diameter Limits (Min – Max)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">
                  {formatVal(limitData.pitch?.min)} – {formatVal(limitData.pitch?.max)}
                </td>
              </tr>

              {/* Minor Diameter */}
              <tr className="bg-background/60 hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Minor Diameter (Basic d₁ / D₁)</td>
                <td className="px-3.5 py-2 text-right font-mono font-medium">{formatVal(threadData.basicMinor)}</td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Minor Diameter Limits (Min – Max)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-foreground">
                  {formatVal(limitData.minor?.min)} – {formatVal(limitData.minor?.max)}
                </td>
              </tr>

              {/* Theoretical Profile Parameters */}
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Pitch (P) & TPI</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">{threadData.pitch} ({threadData.tpi} TPI)</td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Flank Angle (α)</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {threadData.angle} (Half {(parseFloat(threadData.angle) / 2).toFixed(1)}°)
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Theoretical Height (H)</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {isMetric ? `${profileGeo.H} mm` : `${(profileGeo.H / 25.4).toFixed(4)} in`}
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Effective Thread Depth (h₃)</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {isMetric ? `${profileGeo.h3} mm` : `${(profileGeo.h3 / 25.4).toFixed(4)} in`}
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Crest Truncation / Flat</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {isMetric ? `${profileGeo.crestFlat} mm` : `${(profileGeo.crestFlat / 25.4).toFixed(4)} in`}
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Helix Angle (λ)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">{helixAngle}°</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* COLUMN 2: Shop Tooling, Machining & Inspection Table */}
      <section className="border-border bg-surface flex flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <span className="text-muted text-xs font-semibold tracking-[0.14em] uppercase">
              Column 2 Specs
            </span>
            <h3 className="font-(family-name:--font-sora) text-lg font-bold text-primary">
              Shop Tooling & Machining Specs
            </h3>
          </div>

          {/* Engagement Slider */}
          <div className="border-border bg-background flex items-center gap-2 rounded-xl border px-2.5 py-1">
            <label htmlFor="grid-engagement-pct" className="text-muted text-[11px] font-semibold whitespace-nowrap">
              Engage: <span className="text-primary font-mono">{engagementPct}%</span>
            </label>
            <input
              id="grid-engagement-pct"
              type="range"
              min="50"
              max="85"
              step="5"
              value={engagementPct}
              onChange={(e) => setEngagementPct(Number(e.target.value))}
              className="accent-primary h-1.5 w-20 cursor-pointer rounded-lg bg-border"
            />
          </div>
        </div>

        {/* 2-Column Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-background/80 text-muted border-b border-border text-[11px] uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-3.5 py-2.5 font-bold">Machining Parameter</th>
                <th scope="col" className="px-3.5 py-2.5 font-bold text-right">Value / Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background/30">
              {/* Tapping Drills */}
              <tr className="bg-primary-soft/20 hover:bg-primary-soft/40 transition">
                <td className="px-3.5 py-2 font-semibold text-primary">Cut Tap Drill ({engagementPct}% Thread)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">
                  {isMetric ? `${tapDrill.cutTapMm} mm` : `${tapDrill.cutTapInch} in`}
                </td>
              </tr>
              {tapDrill.nearestCutDrill && (
                <tr className="hover:bg-primary-soft/30 transition">
                  <td className="px-3.5 py-2 font-medium text-muted">Nearest Standard Cut Drill</td>
                  <td className="px-3.5 py-2 text-right font-mono font-medium text-foreground">
                    {tapDrill.nearestCutDrill.name}
                  </td>
                </tr>
              )}

              <tr className="bg-primary-soft/20 hover:bg-primary-soft/40 transition">
                <td className="px-3.5 py-2 font-semibold text-primary">Form (Roll) Tap Drill</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">
                  {isMetric ? `${tapDrill.formTapMm} mm` : `${tapDrill.formTapInch} in`}
                </td>
              </tr>
              {tapDrill.nearestFormDrill && (
                <tr className="hover:bg-primary-soft/30 transition">
                  <td className="px-3.5 py-2 font-medium text-muted">Nearest Standard Form Drill</td>
                  <td className="px-3.5 py-2 text-right font-mono font-medium text-foreground">
                    {tapDrill.nearestFormDrill.name}
                  </td>
                </tr>
              )}

              {/* Clearance Holes */}
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Clearance Hole (Close Fit)</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {isMetric ? `${clearanceDrills.close.mm} mm` : `${clearanceDrills.close.inch} in`}
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Clearance Hole (Normal Fit)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">
                  {isMetric ? `${clearanceDrills.normal.mm} mm` : `${clearanceDrills.normal.inch} in`}
                </td>
              </tr>
              <tr className="hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Clearance Hole (Loose Fit)</td>
                <td className="px-3.5 py-2 text-right font-mono text-foreground">
                  {isMetric ? `${clearanceDrills.loose.mm} mm` : `${clearanceDrills.loose.inch} in`}
                </td>
              </tr>

              {/* 3-Wire Inspection */}
              <tr className="bg-background/60 hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">3-Wire Best Wire Size (dw)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-primary">
                  {isMetric ? `${inspection3Wire.bestWireMm} mm` : `${inspection3Wire.bestWireInch} in`}
                </td>
              </tr>
              <tr className="bg-background/60 hover:bg-primary-soft/30 transition">
                <td className="px-3.5 py-2 font-medium text-foreground">Over-Wire Measurement (M)</td>
                <td className="px-3.5 py-2 text-right font-mono font-bold text-foreground">
                  {isMetric ? `${inspection3Wire.overWireMm} mm` : `${inspection3Wire.overWireInch} in`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Profile Visualizer nested below column 2 table */}
        <div className="mt-4">
          <ThreadProfileVisualizer
            threadData={threadData}
            gender={gender}
            limitData={limitData}
          />
        </div>
      </section>
    </div>
  );
};

export default ThreadSpecsTableGrid;
