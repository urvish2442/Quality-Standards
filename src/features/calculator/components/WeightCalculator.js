"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import ThemedSelect from "@/components/ui/ThemedSelect";
import WarningMessage from "@/features/calculator/components/WarningMessage";
import WeightDiagram from "@/features/calculator/components/WeightDiagram";
import {
  calculateWeight,
  MATERIAL_PRESETS,
  SHAPES,
} from "@/features/calculator/utils/weight";

const UNIT_OPTIONS = [
  { value: "mm", label: "mm" },
  { value: "cm", label: "cm" },
  { value: "m", label: "m" },
  { value: "inch", label: "inch" },
  { value: "ft", label: "ft" },
];

const DENSITY_UNIT_OPTIONS = [
  { value: "g/cm3", label: "g/cm³" },
  { value: "kg/m3", label: "kg/m³" },
  { value: "lb/in3", label: "lb/in³" },
];

const MATERIAL_OPTIONS = MATERIAL_PRESETS.map((m) => ({
  value: m.id,
  label: m.label,
}));

const WeightCalculator = () => {
  const [shapeId, setShapeId] = useState("round_bar");
  const [inputs, setInputs] = useState({
    diameter: "25",
    outerDiameter: "50",
    wallThickness: "5",
    acrossFlats: "19",
    width: "25",
    height: "25",
    thickness: "12",
    outerWidth: "50",
    outerHeight: "40",
    length: "1000",
  });
  const [unit, setUnit] = useState("mm");
  const [materialId, setMaterialId] = useState("steel");
  const [customDensity, setCustomDensity] = useState("7.85");
  const [densityUnit, setDensityUnit] = useState("g/cm3");
  const [quantity, setQuantity] = useState("1");

  const currentShape = useMemo(
    () => SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0],
    [shapeId]
  );

  const selectedMaterial = useMemo(
    () => MATERIAL_PRESETS.find((m) => m.id === materialId),
    [materialId]
  );

  const effectiveDensityVal =
    materialId === "custom"
      ? customDensity
      : String(selectedMaterial?.density ?? "7.85");

  const effectiveDensityUnit = materialId === "custom" ? densityUnit : "g/cm3";

  const handleMaterialChange = (newMatId) => {
    setMaterialId(newMatId);
    const preset = MATERIAL_PRESETS.find((m) => m.id === newMatId);
    if (preset && preset.density !== null) {
      setCustomDensity(String(preset.density));
      setDensityUnit("g/cm3");
    }
  };

  const handleInputChange = (fieldId, value) => {
    setInputs((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const result = useMemo(
    () =>
      calculateWeight({
        shapeId,
        inputs,
        unit,
        densityVal: effectiveDensityVal,
        densityUnit: effectiveDensityUnit,
        quantityVal: quantity,
      }),
    [
      shapeId,
      inputs,
      unit,
      effectiveDensityVal,
      effectiveDensityUnit,
      quantity,
    ]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Weight Calculator
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          Raw material weight & section calculator
        </h2>
        <p className="text-muted mt-2 max-w-3xl text-sm">
          Calculate estimated weight, volume, and cross-sectional area for round
          bars, pipes, hex bars, square/rectangle bars, and hollow section tubes.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Controls & Inputs */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Shape Selection Card */}
          <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
            <h3 className="font-(family-name:--font-sora) text-base font-semibold">
              1. Select Shape Profile
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {SHAPES.map((shape) => {
                const isSelected = shape.id === shapeId;
                return (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => setShapeId(shape.id)}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center text-xs font-semibold transition ${
                      isSelected
                        ? "border-primary bg-primary-soft text-foreground shadow-xs"
                        : "border-border bg-background text-muted hover:bg-primary-soft hover:text-foreground"
                    }`}
                  >
                    <span>{shape.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Material & Density Card */}
          <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
            <h3 className="font-(family-name:--font-sora) text-base font-semibold">
              2. Material & Density
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Material Grade / Alloy
                </span>
                <ThemedSelect
                  value={materialId}
                  onChange={handleMaterialChange}
                  options={MATERIAL_OPTIONS}
                  ariaLabel="Select material grade"
                />
              </label>

              {materialId === "custom" ? (
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      Density Value
                    </span>
                    <NumberInput
                      step="any"
                      value={customDensity}
                      onChange={(e) => setCustomDensity(e.target.value)}
                      className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
                      placeholder="e.g. 7.85"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">Unit</span>
                    <ThemedSelect
                      value={densityUnit}
                      onChange={setDensityUnit}
                      options={DENSITY_UNIT_OPTIONS}
                      ariaLabel="Density unit"
                    />
                  </label>
                </div>
              ) : (
                <div className="block">
                  <span className="mb-1 block text-sm font-medium">
                    Density (Preset)
                  </span>
                  <div className="border-border bg-background/60 text-muted flex h-11 items-center rounded-xl border px-3 text-sm font-mono">
                    {selectedMaterial?.density} g/cm³
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section Dimensions Card */}
          <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-(family-name:--font-sora) text-base font-semibold">
                3. Dimensions & Quantity
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-muted text-xs font-medium">Unit:</span>
                <div className="w-24">
                  <ThemedSelect
                    value={unit}
                    onChange={setUnit}
                    options={UNIT_OPTIONS}
                    ariaLabel="Dimension and length unit"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {currentShape.inputs.map((inp) => (
                <label key={inp.id} className="block">
                  <span className="mb-1 block text-sm font-medium">
                    {inp.label} ({unit})
                  </span>
                  <NumberInput
                    step="any"
                    value={inputs[inp.id] ?? ""}
                    onChange={(e) => handleInputChange(inp.id, e.target.value)}
                    className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
                    placeholder={inp.placeholder}
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Length (L) ({unit})
                </span>
                <NumberInput
                  step="any"
                  value={inputs.length ?? ""}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
                  placeholder="e.g. 1000"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  Quantity (Pcs)
                </span>
                <NumberInput
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
                  placeholder="1"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Right Column - Results & Diagram */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Results Summary Card */}
          <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
            <h3 className="font-(family-name:--font-sora) text-base font-semibold">
              Weight Calculation Results
            </h3>

            {result.error ? (
              <WarningMessage className="mt-4">{result.error}</WarningMessage>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {/* Total Weight Highlight */}
                <div className="border-primary/20 bg-primary-soft/40 rounded-xl border p-4">
                  <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
                    Total Weight ({quantity} pcs)
                  </p>
                  <p className="text-primary mt-1 font-(family-name:--font-sora) text-3xl font-bold tracking-tight">
                    {result.display.totalKg}{" "}
                    <span className="text-lg font-semibold">kg</span>
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-primary/10 pt-3 text-xs">
                    <div>
                      <span className="text-muted block">Grams</span>
                      <span className="text-foreground font-mono font-semibold">
                        {result.display.totalG} g
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block">Pounds</span>
                      <span className="text-foreground font-mono font-semibold">
                        {result.display.totalLbs} lbs
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block">Tonnes</span>
                      <span className="text-foreground font-mono font-semibold">
                        {result.display.totalTonne} MT
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary Specs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-border bg-background rounded-xl border p-3">
                    <p className="text-muted text-xs font-medium">
                      Single Pc Weight
                    </p>
                    <p className="text-foreground mt-1 font-mono text-base font-semibold">
                      {result.display.singleKg} kg
                    </p>
                  </div>

                  <div className="border-border bg-background rounded-xl border p-3">
                    <p className="text-muted text-xs font-medium">
                      Cross-Section Area
                    </p>
                    <p className="text-foreground mt-1 font-mono text-base font-semibold">
                      {result.display.areaMm2} mm²
                    </p>
                    <span className="text-muted text-[11px]">
                      ({result.display.areaCm2} cm²)
                    </span>
                  </div>

                  <div className="border-border bg-background rounded-xl border p-3">
                    <p className="text-muted text-xs font-medium">
                      Volume (Single)
                    </p>
                    <p className="text-foreground mt-1 font-mono text-base font-semibold">
                      {result.display.volumeCm3} cm³
                    </p>
                  </div>

                  <div className="border-border bg-background rounded-xl border p-3">
                    <p className="text-muted text-xs font-medium">Density</p>
                    <p className="text-foreground mt-1 font-mono text-base font-semibold">
                      {effectiveDensityVal} {effectiveDensityUnit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* SVG Diagram Card */}
          <section className="border-border bg-surface flex flex-1 flex-col rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
            <h3 className="font-(family-name:--font-sora) text-base font-semibold">
              Cross-Section Diagram
            </h3>
            <p className="text-muted mt-1 text-xs">
              Profile geometry for {currentShape.label}
            </p>
            <div className="mt-4 flex flex-1 items-center justify-center">
              <WeightDiagram shapeId={shapeId} unit={unit} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WeightCalculator;
