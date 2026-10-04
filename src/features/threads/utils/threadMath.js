/**
 * Thread Mathematical Calculations Utility
 * Pure functions for thread geometry, pitch diameter, tap drill sizes,
 * helix angle, and 3-wire inspection measurements.
 */

// Basic Unit Conversions
export const mmToInch = (mm) => (typeof mm === "number" ? mm / 25.4 : 0);
export const inchToMm = (inch) => (typeof inch === "number" ? inch * 25.4 : 0);

/**
 * Standard Drill Size Lookup Table (Metric & Imperial)
 */
export const STANDARD_DRILL_SIZES = [
  { name: "0.5 mm", mm: 0.5, inch: 0.0197 },
  { name: "0.75 mm", mm: 0.75, inch: 0.0295 },
  { name: "#53 (1.51 mm)", mm: 1.51, inch: 0.0595 },
  { name: "1.6 mm", mm: 1.6, inch: 0.063 },
  { name: "#43 (2.26 mm)", mm: 2.26, inch: 0.089 },
  { name: "2.5 mm", mm: 2.5, inch: 0.0984 },
  { name: "#36 (2.71 mm)", mm: 2.71, inch: 0.1065 },
  { name: "2.9 mm", mm: 2.9, inch: 0.1142 },
  { name: "3.3 mm", mm: 3.3, inch: 0.1299 },
  { name: "#29 (3.45 mm)", mm: 3.45, inch: 0.136 },
  { name: "#25 (3.80 mm)", mm: 3.8, inch: 0.1495 },
  { name: "#21 (4.04 mm)", mm: 4.04, inch: 0.159 },
  { name: "4.2 mm", mm: 4.2, inch: 0.1654 },
  { name: "#7 (5.10 mm)", mm: 5.1, inch: 0.201 },
  { name: "#3 (5.41 mm)", mm: 5.41, inch: 0.213 },
  { name: "5.5 mm", mm: 5.5, inch: 0.2165 },
  { name: "6.0 mm", mm: 6.0, inch: 0.2362 },
  { name: "6.8 mm", mm: 6.8, inch: 0.2677 },
  { name: "7.0 mm", mm: 7.0, inch: 0.2756 },
  { name: "8.5 mm", mm: 8.5, inch: 0.3346 },
  { name: "8.8 mm", mm: 8.8, inch: 0.3465 },
  { name: "10.2 mm", mm: 10.2, inch: 0.4016 },
  { name: "10.5 mm", mm: 10.5, inch: 0.4134 },
  { name: "7/16 in (11.1 mm)", mm: 11.11, inch: 0.4375 },
  { name: "12.0 mm", mm: 12.0, inch: 0.4724 },
  { name: "14.0 mm", mm: 14.0, inch: 0.5512 },
  { name: "37/64 in (14.68 mm)", mm: 14.68, inch: 0.5781 },
  { name: "17.5 mm", mm: 17.5, inch: 0.689 },
  { name: "23/32 in (18.26 mm)", mm: 18.26, inch: 0.7188 },
  { name: "21.0 mm", mm: 21.0, inch: 0.8268 },
  { name: "59/64 in (23.42 mm)", mm: 23.42, inch: 0.9219 },
  { name: "26.5 mm", mm: 26.5, inch: 1.0433 },
  { name: "1-5/32 in (29.37 mm)", mm: 29.37, inch: 1.1562 },
  { name: "32.0 mm", mm: 32.0, inch: 1.2598 },
  { name: "37.5 mm", mm: 37.5, inch: 1.4764 },
];

/**
 * Finds the nearest standard drill size for a calculated diameter in mm.
 */
export const findNearestStandardDrill = (targetMm) => {
  if (!targetMm || targetMm <= 0) return null;
  let closest = STANDARD_DRILL_SIZES[0];
  let minDiff = Math.abs(targetMm - closest.mm);

  for (let i = 1; i < STANDARD_DRILL_SIZES.length; i += 1) {
    const diff = Math.abs(targetMm - STANDARD_DRILL_SIZES[i].mm);
    if (diff < minDiff) {
      minDiff = diff;
      closest = STANDARD_DRILL_SIZES[i];
    }
  }

  return closest;
};

/**
 * Calculates Cut Tap and Form Tap drill sizes based on thread engagement percentage.
 */
export const calculateTapDrillSizes = (nominalDiaMm, pitchMm, engagementPct = 75) => {
  if (!nominalDiaMm || !pitchMm) {
    return { cutTapMm: 0, cutTapInch: 0, formTapMm: 0, formTapInch: 0 };
  }

  // Formula: D_cut = NominalDia - (Engagement% * Pitch / 76.98)
  const cutTapMm = nominalDiaMm - (engagementPct * pitchMm) / 76.98;
  const cutTapInch = mmToInch(cutTapMm);

  // Formula: D_form = NominalDia - (Engagement% * Pitch / 147.06)
  const formTapMm = nominalDiaMm - (engagementPct * pitchMm) / 147.06;
  const formTapInch = mmToInch(formTapMm);

  return {
    cutTapMm: Number(cutTapMm.toFixed(3)),
    cutTapInch: Number(cutTapInch.toFixed(4)),
    formTapMm: Number(formTapMm.toFixed(3)),
    formTapInch: Number(formTapInch.toFixed(4)),
    nearestCutDrill: findNearestStandardDrill(cutTapMm),
    nearestFormDrill: findNearestStandardDrill(formTapMm),
  };
};

/**
 * Calculates Helix Angle in degrees: lambda = arctan(Pitch / (pi * PitchDia))
 */
export const calculateHelixAngle = (pitchMm, pitchDiaMm) => {
  if (!pitchMm || !pitchDiaMm || pitchDiaMm <= 0) return 0;
  const rad = Math.atan(pitchMm / (Math.PI * pitchDiaMm));
  const deg = (rad * 180) / Math.PI;
  return Number(deg.toFixed(2));
};

/**
 * Calculates 3-Wire Inspection parameters for pitch diameter checking.
 */
export const calculate3WireInspection = (pitchMm, pitchDiaMm, angleDeg = 60) => {
  if (!pitchMm || !pitchDiaMm) {
    return { bestWireMm: 0, overWireMm: 0, overWireInch: 0 };
  }

  const halfAngleRad = ((angleDeg / 2) * Math.PI) / 180;
  const sinHalfAngle = Math.sin(halfAngleRad);
  const cosHalfAngle = Math.cos(halfAngleRad);
  const tanHalfAngle = Math.tan(halfAngleRad);
  const cotHalfAngle = 1 / tanHalfAngle;

  // Best wire diameter: dw = P / (2 * cos(alpha/2))
  const bestWireMm = pitchMm / (2 * cosHalfAngle);
  const bestWireInch = mmToInch(bestWireMm);

  // Over-wire measurement M = d2 + dw * (1 + 1/sin(alpha/2)) - (P / 2) * cot(alpha/2)
  const overWireMm =
    pitchDiaMm +
    bestWireMm * (1 + 1 / sinHalfAngle) -
    (pitchMm / 2) * cotHalfAngle;
  const overWireInch = mmToInch(overWireMm);

  return {
    bestWireMm: Number(bestWireMm.toFixed(4)),
    bestWireInch: Number(bestWireInch.toFixed(4)),
    overWireMm: Number(overWireMm.toFixed(4)),
    overWireInch: Number(overWireInch.toFixed(4)),
  };
};

/**
 * Calculates Theoretical Thread Profile Geometry (H, h3, crest/root flats).
 */
export const calculateThreadProfileGeometry = (pitchMm, angleDeg = 60) => {
  if (!pitchMm) return { H: 0, h3: 0, crestFlat: 0, rootFlat: 0 };

  const halfAngleRad = ((angleDeg / 2) * Math.PI) / 180;
  const tanHalfAngle = Math.tan(halfAngleRad);

  // Fundamental Triangle Height H = P / (2 * tan(alpha/2))
  const H = pitchMm / (2 * tanHalfAngle);

  // Effective depth of thread h3 (for 60° V-threads, basic depth = 0.613437 * P)
  const h3 = angleDeg === 55 ? 0.640327 * pitchMm : 0.613437 * pitchMm;

  // Crest flat / truncation (H/8 for 60° profile)
  const crestFlat = pitchMm / 8;
  // Root flat / truncation (H/4 for 60° profile)
  const rootFlat = pitchMm / 4;

  return {
    H: Number(H.toFixed(4)),
    h3: Number(h3.toFixed(4)),
    crestFlat: Number(crestFlat.toFixed(4)),
    rootFlat: Number(rootFlat.toFixed(4)),
  };
};
