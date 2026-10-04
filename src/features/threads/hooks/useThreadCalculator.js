"use client";

import { useMemo, useState } from "react";
import { THREAD_LIMITS } from "@/features/threads/constants/threadLimitsData";
import {
  ACME_TRAPEZOIDAL_PRESETS,
  CALCULATOR_STANDARDS,
} from "@/features/threads/constants/threadCalculatorData";
import {
  calculate3WireInspection,
  calculateHelixAngle,
  calculateTapDrillSizes,
  calculateThreadProfileGeometry,
  inchToMm,
  mmToInch,
} from "@/features/threads/utils/threadMath";

export const useThreadCalculator = () => {
  const [standardId, setStandardId] = useState("metric");
  const [selectedSizeId, setSelectedSizeId] = useState("m8");
  const [gender, setGender] = useState("external"); // "external" | "internal"
  const [selectedClass, setSelectedClass] = useState("6g");
  const [engagementPct, setEngagementPct] = useState(75);
  const [unit, setUnit] = useState("mm"); // "mm" | "inch"

  // Custom thread state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customNominalDia, setCustomNominalDia] = useState("10");
  const [customPitch, setCustomPitch] = useState("1.5");
  const [customTpi, setCustomTpi] = useState("16.93");
  const [customAngle, setCustomAngle] = useState("60");
  const [pitchInputMode, setPitchInputMode] = useState("pitch"); // "pitch" | "tpi"

  const currentStandard = useMemo(
    () => CALCULATOR_STANDARDS.find((s) => s.id === standardId) ?? CALCULATOR_STANDARDS[0],
    [standardId]
  );

  const availableSizes = useMemo(() => {
    if (standardId === "acme" || standardId === "trapezoidal") {
      return ACME_TRAPEZOIDAL_PRESETS.filter((item) =>
        standardId === "acme" ? item.angle === "29°" : item.angle === "30°"
      );
    }
    return THREAD_LIMITS[standardId] ?? [];
  }, [standardId]);

  const sizeOptions = useMemo(
    () =>
      availableSizes.map((item) => ({
        value: item.id,
        label: item.size,
      })),
    [availableSizes]
  );

  // Switch standard handler
  const handleStandardChange = (newStdId) => {
    setStandardId(newStdId);
    if (newStdId === "custom") {
      setIsCustomMode(true);
      return;
    }
    setIsCustomMode(false);
    const newStd = CALCULATOR_STANDARDS.find((s) => s.id === newStdId);
    const newSizes =
      newStdId === "acme" || newStdId === "trapezoidal"
        ? ACME_TRAPEZOIDAL_PRESETS.filter((i) =>
            newStdId === "acme" ? i.angle === "29°" : i.angle === "30°"
          )
        : THREAD_LIMITS[newStdId] ?? [];

    if (newSizes.length > 0) {
      setSelectedSizeId(newSizes[0].id);
    }
    if (newStd) {
      const defaultCls =
        gender === "external"
          ? newStd.classesExt[0]?.id
          : newStd.classesInt[0]?.id;
      if (defaultCls) setSelectedClass(defaultCls);
    }
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    const classesList =
      newGender === "external"
        ? currentStandard.classesExt
        : currentStandard.classesInt;
    if (classesList.length > 0) {
      setSelectedClass(classesList[0].id);
    }
  };

  // Selected preset or custom calculation
  const calculatedThreadData = useMemo(() => {
    if (isCustomMode) {
      const d = parseFloat(customNominalDia) || 10;
      let p = parseFloat(customPitch) || 1.5;
      if (pitchInputMode === "tpi") {
        const tpiVal = parseFloat(customTpi) || 16.93;
        p = 25.4 / tpiVal;
      }
      const angle = parseFloat(customAngle) || 60;
      const tpi = 25.4 / p;

      // 60° V-thread basic parameters
      const H = p / (2 * Math.tan((angle / 2) * (Math.PI / 180)));
      const basicPitch = d - 2 * (3 / 8) * H;
      const basicMinor = d - 2 * (5 / 8) * H;
      const h3 = 0.613437 * p;

      // Estimated standard limits (+- 5% tolerance approximation)
      const majorMin = (d * 0.975).toFixed(3);
      const majorMax = d.toFixed(3);
      const pitchMin = (basicPitch * 0.985).toFixed(3);
      const pitchMax = basicPitch.toFixed(3);
      const minorMin = (basicMinor * 0.97).toFixed(3);
      const minorMax = basicMinor.toFixed(3);

      return {
        id: "custom_thread",
        size: `Custom ${d} × ${p.toFixed(2)} mm`,
        basicMajor: `${d.toFixed(3)} mm`,
        basicPitch: `${basicPitch.toFixed(3)} mm`,
        basicMinor: `${basicMinor.toFixed(3)} mm`,
        pitch: `${p.toFixed(3)} mm`,
        tpi: tpi.toFixed(2),
        angle: `${angle}°`,
        height: `${h3.toFixed(3)} mm`,
        tapDrill: `${(d - p).toFixed(2)} mm`,
        clearanceDrill: `${(d * 1.1).toFixed(2)} mm`,
        external: {
          major: { min: majorMin, max: majorMax },
          pitch: { min: pitchMin, max: pitchMax },
          minor: { min: minorMin, max: minorMax },
          class: selectedClass || "Custom",
        },
        internal: {
          major: { min: d.toFixed(3), max: (d * 1.05).toFixed(3) },
          pitch: { min: basicPitch.toFixed(3), max: (basicPitch * 1.02).toFixed(3) },
          minor: { min: basicMinor.toFixed(3), max: (basicMinor * 1.04).toFixed(3) },
          class: selectedClass || "Custom",
        },
        nominalDiaMm: d,
        pitchMm: p,
        angleDeg: angle,
      };
    }

    const preset =
      availableSizes.find((item) => item.id === selectedSizeId) ??
      availableSizes[0];
    if (!preset) return null;

    // Parse numeric nominal diameter & pitch
    let nominalDiaMm = 10;
    let pitchMm = 1.5;

    const pitchVal = parseFloat(preset.pitch);
    if (!Number.isNaN(pitchVal)) {
      pitchMm = preset.pitch.includes("in") ? inchToMm(pitchVal) : pitchVal;
    }
    const majorVal = parseFloat(preset.basicMajor);
    if (!Number.isNaN(majorVal)) {
      nominalDiaMm = preset.basicMajor.includes("in") ? inchToMm(majorVal) : majorVal;
    }

    const angleDeg = parseFloat(preset.angle) || 60;

    return {
      ...preset,
      nominalDiaMm,
      pitchMm,
      angleDeg,
    };
  }, [
    isCustomMode,
    customNominalDia,
    customPitch,
    customTpi,
    customAngle,
    pitchInputMode,
    selectedClass,
    availableSizes,
    selectedSizeId,
  ]);

  // Active limit data based on gender
  const limitData =
    gender === "external"
      ? calculatedThreadData?.external
      : calculatedThreadData?.internal;

  // Compute shop machining specs (Tap Drill, Form Tap, Helix Angle, 3-Wire)
  const computedSpecs = useMemo(() => {
    if (!calculatedThreadData) return null;

    const { nominalDiaMm, pitchMm, angleDeg } = calculatedThreadData;
    const pitchDiaMm = parseFloat(calculatedThreadData.basicPitch) || nominalDiaMm - 0.6495 * pitchMm;

    const tapDrill = calculateTapDrillSizes(nominalDiaMm, pitchMm, engagementPct);
    const helixAngle = calculateHelixAngle(pitchMm, pitchDiaMm);
    const inspection3Wire = calculate3WireInspection(pitchMm, pitchDiaMm, angleDeg);
    const profileGeo = calculateThreadProfileGeometry(pitchMm, angleDeg);

    // Clearance Drill Holes (ISO 273)
    const clearanceCloseMm = Number((nominalDiaMm * 1.05).toFixed(2));
    const clearanceNormalMm = Number((nominalDiaMm * 1.1).toFixed(2));
    const clearanceLooseMm = Number((nominalDiaMm * 1.15).toFixed(2));

    return {
      tapDrill,
      helixAngle,
      inspection3Wire,
      profileGeo,
      clearanceDrills: {
        close: { mm: clearanceCloseMm, inch: mmToInch(clearanceCloseMm).toFixed(4) },
        normal: { mm: clearanceNormalMm, inch: mmToInch(clearanceNormalMm).toFixed(4) },
        loose: { mm: clearanceLooseMm, inch: mmToInch(clearanceLooseMm).toFixed(4) },
      },
    };
  }, [calculatedThreadData, engagementPct]);

  return {
    standardId,
    setStandardId: handleStandardChange,
    selectedSizeId,
    setSelectedSizeId,
    gender,
    setGender: handleGenderChange,
    selectedClass,
    setSelectedClass,
    engagementPct,
    setEngagementPct,
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
    currentStandard,
    availableSizes,
    sizeOptions,
    selectedThread: calculatedThreadData,
    limitData,
    computedSpecs,
  };
};
