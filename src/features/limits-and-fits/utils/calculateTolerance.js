import {
  ISO_SIZE_RANGES,
  SHAFT_TOLERANCES,
  HOLE_TOLERANCES,
} from "@/features/limits-and-fits/constants/isoTolerances";

export const FEATURE_TYPES = {
  HOLE: "hole",
  SHAFT: "shaft",
};

export const getToleranceTable = (featureType) => {
  return featureType === FEATURE_TYPES.HOLE
    ? HOLE_TOLERANCES
    : SHAFT_TOLERANCES;
};

export const getToleranceGrades = (featureType) => {
  return Object.keys(getToleranceTable(featureType)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
};

export const findSizeRangeIndex = (nominalMm) => {
  if (!Number.isFinite(nominalMm) || nominalMm <= 0) {
    return -1;
  }

  return ISO_SIZE_RANGES.findIndex(
    (range) => nominalMm > range.over && nominalMm <= range.to,
  );
};

export const getSizeRangeLabel = (index) => {
  const range = ISO_SIZE_RANGES[index];

  if (!range) {
    return null;
  }

  return `Over ${range.over} mm to ${range.to} mm`;
};

const micrometreToMm = (value) => value / 1000;

const formatMm = (value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(4)).toString();
};

const formatDeviation = (micrometres) => {
  if (!Number.isFinite(micrometres)) {
    return "—";
  }

  const sign = micrometres > 0 ? "+" : "";
  return `${sign}${micrometres} µm`;
};

export const calculateToleranceLimits = ({
  featureType,
  nominalMm,
  grade,
}) => {
  const table = getToleranceTable(featureType);
  const gradeData = table[grade];

  if (!gradeData) {
    return { error: "Select a valid tolerance grade." };
  }

  const rangeIndex = findSizeRangeIndex(nominalMm);

  if (rangeIndex < 0) {
    return {
      error:
        "Enter a nominal size greater than 3 mm and up to 400 mm (ISO table range).",
    };
  }

  const deviations = gradeData[rangeIndex];

  if (!deviations) {
    return {
      error: `Grade ${grade} is not defined for this size range.`,
    };
  }

  const upperLimit = nominalMm + micrometreToMm(deviations.upper);
  const lowerLimit = nominalMm + micrometreToMm(deviations.lower);
  const tolerance = Math.abs(deviations.upper - deviations.lower);

  return {
    featureType,
    grade,
    nominalMm,
    rangeIndex,
    rangeLabel: getSizeRangeLabel(rangeIndex),
    upperDeviationUm: deviations.upper,
    lowerDeviationUm: deviations.lower,
    upperLimitMm: upperLimit,
    lowerLimitMm: lowerLimit,
    toleranceUm: tolerance,
    display: {
      designation: `${featureType === FEATURE_TYPES.HOLE ? "Ø" : "Ø"}${formatMm(nominalMm)} ${grade}`,
      upperLimit: `${formatMm(upperLimit)} mm`,
      lowerLimit: `${formatMm(lowerLimit)} mm`,
      upperDeviation: formatDeviation(deviations.upper),
      lowerDeviation: formatDeviation(deviations.lower),
      tolerance: `${tolerance} µm`,
    },
  };
};
