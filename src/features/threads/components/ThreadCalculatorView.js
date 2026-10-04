"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useThreadCalculator } from "@/features/threads/hooks/useThreadCalculator";
import ThreadCalculatorControls from "@/features/threads/components/ThreadCalculatorControls";
import ThreadSpecsTableGrid from "@/features/threads/components/ThreadSpecsTableGrid";
import ThreadQuickReferenceTable from "@/features/threads/components/ThreadQuickReferenceTable";

const ThreadCalculatorView = () => {
  const calc = useThreadCalculator();
  const [copied, setCopied] = useState(false);

  const handleCopySpecs = () => {
    if (!calc.selectedThread || !calc.limitData || !calc.computedSpecs) return;

    const text = `
Thread Specs: ${calc.selectedThread.size} (${calc.gender.toUpperCase()})
Class: ${calc.limitData.class || "Standard"}
Major Diameter (Min - Max): ${calc.limitData.major?.min} - ${calc.limitData.major?.max}
Pitch Diameter (Min - Max): ${calc.limitData.pitch?.min} - ${calc.limitData.pitch?.max}
Minor Diameter (Min - Max): ${calc.limitData.minor?.min} - ${calc.limitData.minor?.max}
Cut Tap Drill (${calc.engagementPct}% engagement): ${calc.computedSpecs.tapDrill.cutTapMm} mm
Form Tap Drill: ${calc.computedSpecs.tapDrill.formTapMm} mm
Helix Angle: ${calc.computedSpecs.helixAngle}°
3-Wire Best Wire dw: ${calc.computedSpecs.inspection3Wire.bestWireMm} mm
Over-Wire Measurement M: ${calc.computedSpecs.inspection3Wire.overWireMm} mm
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
              Comprehensive Thread Calculator
            </p>
            <h2 className="font-(family-name:--font-sora) text-2xl font-bold tracking-tight sm:text-3xl">
              Machining & Engineering Thread Calculator
            </h2>
            <p className="text-muted mt-2 max-w-3xl text-sm leading-relaxed sm:text-base">
              Calculate complete thread specifications, major/pitch/minor tolerances, tap drill sizes (cut vs form tap), 3-wire pitch diameter inspection, helix angle, and profile geometry for Metric, UN, Whitworth, BSP, NPT, ACME, and Custom threads.
            </p>
          </div>

          {/* Quick Copy Specs Button */}
          {calc.selectedThread && (
            <button
              type="button"
              onClick={handleCopySpecs}
              className="border-border bg-background text-foreground hover:bg-primary-soft hover:text-foreground flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="text-primary h-4 w-4" />
                  <span>Specs Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Thread Specs</span>
                </>
              )}
            </button>
          )}
        </div>
      </section>

      {/* Input Controls */}
      <ThreadCalculatorControls
        standardId={calc.standardId}
        setStandardId={calc.setStandardId}
        selectedSizeId={calc.selectedSizeId}
        setSelectedSizeId={calc.setSelectedSizeId}
        gender={calc.gender}
        setGender={calc.setGender}
        selectedClass={calc.selectedClass}
        setSelectedClass={calc.setSelectedClass}
        unit={calc.unit}
        setUnit={calc.setUnit}
        isCustomMode={calc.isCustomMode}
        setIsCustomMode={calc.setIsCustomMode}
        customNominalDia={calc.customNominalDia}
        setCustomNominalDia={calc.setCustomNominalDia}
        customPitch={calc.customPitch}
        setCustomPitch={calc.setCustomPitch}
        customTpi={calc.customTpi}
        setCustomTpi={calc.setCustomTpi}
        customAngle={calc.customAngle}
        setCustomAngle={calc.setCustomAngle}
        pitchInputMode={calc.pitchInputMode}
        setPitchInputMode={calc.setPitchInputMode}
        sizeOptions={calc.sizeOptions}
        currentStandard={calc.currentStandard}
      />

      {/* Two-Column Table Specifications Grid */}
      {calc.selectedThread && calc.limitData ? (
        <div className="flex flex-col gap-6">
          <ThreadSpecsTableGrid
            threadData={calc.selectedThread}
            gender={calc.gender}
            limitData={calc.limitData}
            computedSpecs={calc.computedSpecs}
            engagementPct={calc.engagementPct}
            setEngagementPct={calc.setEngagementPct}
            unit={calc.unit}
          />

          {/* Comparative Reference Table */}
          {!calc.isCustomMode && (
            <ThreadQuickReferenceTable
              availableSizes={calc.availableSizes}
              selectedSizeId={calc.selectedSizeId}
              onSelectSize={calc.setSelectedSizeId}
              gender={calc.gender}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ThreadCalculatorView;
