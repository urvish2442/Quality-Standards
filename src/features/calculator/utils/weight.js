const UNIT_TO_MM = {
  mm: 1,
  cm: 10,
  m: 1000,
  inch: 25.4,
  ft: 304.8,
};

const DENSITY_TO_G_CM3 = {
  "g/cm3": 1,
  "kg/m3": 0.001,
  "lb/in3": 27.6799047,
};

export const MATERIAL_PRESETS = [
  { id: "steel", label: "Mild Steel / Carbon Steel", density: 7.85 },
  { id: "stainless_steel", label: "Stainless Steel (304 / 316)", density: 7.98 },
  { id: "aluminum", label: "Aluminum", density: 2.7 },
  { id: "brass", label: "Brass", density: 8.5 },
  { id: "copper", label: "Copper", density: 8.96 },
  { id: "titanium", label: "Titanium", density: 4.51 },
  { id: "cast_iron", label: "Cast Iron", density: 7.2 },
  { id: "bronze", label: "Bronze", density: 8.8 },
  { id: "nylon", label: "Nylon / Plastic", density: 1.15 },
  { id: "custom", label: "Custom Density", density: null },
];

export const SHAPES = [
  {
    id: "round_bar",
    label: "Round Bar",
    description: "Solid circular cylinder bar",
    inputs: [
      { id: "diameter", label: "Outer Diameter (D)", placeholder: "e.g. 25" },
    ],
  },
  {
    id: "pipe",
    label: "Pipe / Round Tube",
    description: "Hollow circular tube/pipe section",
    inputs: [
      { id: "outerDiameter", label: "Outer Diameter (OD)", placeholder: "e.g. 50" },
      { id: "wallThickness", label: "Wall Thickness (t)", placeholder: "e.g. 5" },
    ],
  },
  {
    id: "hex_bar",
    label: "Hex Bar",
    description: "Hexagonal section bar (across flats)",
    inputs: [
      { id: "acrossFlats", label: "Across Flats / Width (S)", placeholder: "e.g. 19" },
    ],
  },
  {
    id: "square_bar",
    label: "Square Bar",
    description: "Solid square section bar",
    inputs: [
      { id: "width", label: "Side Width (W)", placeholder: "e.g. 25" },
    ],
  },
  {
    id: "rectangle_bar",
    label: "Rectangle Bar",
    description: "Solid rectangular section / flat bar",
    inputs: [
      { id: "width", label: "Width (W)", placeholder: "e.g. 50" },
      { id: "thickness", label: "Thickness / Height (T)", placeholder: "e.g. 12" },
    ],
  },
  {
    id: "hollow_square",
    label: "Hollow Square",
    description: "Square hollow tube section",
    inputs: [
      { id: "outerWidth", label: "Outer Width (W)", placeholder: "e.g. 50" },
      { id: "wallThickness", label: "Wall Thickness (t)", placeholder: "e.g. 3" },
    ],
  },
  {
    id: "hollow_rectangle",
    label: "Hollow Rectangular",
    description: "Rectangular hollow tube section",
    inputs: [
      { id: "outerWidth", label: "Outer Width (W)", placeholder: "e.g. 80" },
      { id: "outerHeight", label: "Outer Height (H)", placeholder: "e.g. 40" },
      { id: "wallThickness", label: "Wall Thickness (t)", placeholder: "e.g. 4" },
    ],
  },
];

const parseNumber = (val) => {
  if (val === "" || val === null || val === undefined) {
    return null;
  }
  const num = Number(val);
  return Number.isFinite(num) ? num : null;
};

const formatNumber = (num, decimals = 3) => {
  if (!Number.isFinite(num)) {
    return "—";
  }
  if (Math.abs(num) < 0.0001 && num !== 0) {
    return num.toExponential(4);
  }
  return Number(num.toFixed(decimals)).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
};

export const calculateWeight = ({
  shapeId,
  inputs = {},
  unit = "mm",
  dimensionUnit,
  lengthUnit,
  densityVal,
  densityUnit = "g/cm3",
  quantityVal = "1",
}) => {
  const selectedUnit = unit ?? dimensionUnit ?? lengthUnit ?? "mm";
  const dimScale = UNIT_TO_MM[selectedUnit] ?? 1;
  const lenScale = UNIT_TO_MM[selectedUnit] ?? 1;
  const denScale = DENSITY_TO_G_CM3[densityUnit] ?? 1;

  const rawDensity = parseNumber(densityVal);
  if (rawDensity === null || rawDensity <= 0) {
    return { error: "Please enter a valid positive material density." };
  }
  const densityGCm3 = rawDensity * denScale;

  const qty = parseNumber(quantityVal);
  if (qty === null || qty <= 0) {
    return { error: "Quantity must be a positive number." };
  }

  const lengthMm =
    parseNumber(inputs.length) !== null
      ? parseNumber(inputs.length) * lenScale
      : null;
  if (lengthMm === null || lengthMm <= 0) {
    return { error: "Please enter a valid length." };
  }

  let areaMm2 = 0;

  switch (shapeId) {
    case "round_bar": {
      const d = parseNumber(inputs.diameter);
      if (d === null || d <= 0) {
        return { error: "Please enter a valid outer diameter." };
      }
      const diameterMm = d * dimScale;
      areaMm2 = (Math.PI / 4) * diameterMm ** 2;
      break;
    }
    case "pipe": {
      const od = parseNumber(inputs.outerDiameter);
      const t = parseNumber(inputs.wallThickness);
      if (od === null || od <= 0) {
        return { error: "Please enter a valid outer diameter." };
      }
      if (t === null || t <= 0) {
        return { error: "Please enter a valid wall thickness." };
      }
      const odMm = od * dimScale;
      const tMm = t * dimScale;
      if (tMm * 2 >= odMm) {
        return {
          error: "Wall thickness (t) must be less than half of outer diameter (OD).",
        };
      }
      areaMm2 = Math.PI * tMm * (odMm - tMm);
      break;
    }
    case "hex_bar": {
      const s = parseNumber(inputs.acrossFlats);
      if (s === null || s <= 0) {
        return { error: "Please enter a valid flat-to-flat width (S)." };
      }
      const sMm = s * dimScale;
      areaMm2 = (Math.sqrt(3) / 2) * sMm ** 2;
      break;
    }
    case "square_bar": {
      const w = parseNumber(inputs.width);
      if (w === null || w <= 0) {
        return { error: "Please enter a valid side width." };
      }
      const wMm = w * dimScale;
      areaMm2 = wMm ** 2;
      break;
    }
    case "rectangle_bar": {
      const w = parseNumber(inputs.width);
      const t = parseNumber(inputs.thickness);
      if (w === null || w <= 0) {
        return { error: "Please enter a valid width." };
      }
      if (t === null || t <= 0) {
        return { error: "Please enter a valid thickness." };
      }
      const wMm = w * dimScale;
      const tMm = t * dimScale;
      areaMm2 = wMm * tMm;
      break;
    }
    case "hollow_square": {
      const w = parseNumber(inputs.outerWidth);
      const t = parseNumber(inputs.wallThickness);
      if (w === null || w <= 0) {
        return { error: "Please enter a valid outer width." };
      }
      if (t === null || t <= 0) {
        return { error: "Please enter a valid wall thickness." };
      }
      const wMm = w * dimScale;
      const tMm = t * dimScale;
      if (tMm * 2 >= wMm) {
        return {
          error: "Wall thickness (t) must be less than half of outer width (W).",
        };
      }
      areaMm2 = 4 * tMm * (wMm - tMm);
      break;
    }
    case "hollow_rectangle": {
      const w = parseNumber(inputs.outerWidth);
      const h = parseNumber(inputs.outerHeight);
      const t = parseNumber(inputs.wallThickness);
      if (w === null || w <= 0) {
        return { error: "Please enter a valid outer width." };
      }
      if (h === null || h <= 0) {
        return { error: "Please enter a valid outer height." };
      }
      if (t === null || t <= 0) {
        return { error: "Please enter a valid wall thickness." };
      }
      const wMm = w * dimScale;
      const hMm = h * dimScale;
      const tMm = t * dimScale;
      if (tMm * 2 >= wMm || tMm * 2 >= hMm) {
        return {
          error:
            "Wall thickness (t) must be less than half of outer width (W) and outer height (H).",
        };
      }
      areaMm2 = 2 * tMm * (wMm + hMm - 2 * tMm);
      break;
    }
    default:
      return { error: "Select a valid shape." };
  }

  // Volume in mm3
  const volumeMm3 = areaMm2 * lengthMm;

  // Single weight in kg
  const singleWeightKg = volumeMm3 * densityGCm3 * 1e-6;
  const totalWeightKg = singleWeightKg * qty;

  const areaCm2 = areaMm2 / 100;
  const areaIn2 = areaMm2 * 0.0015500031;

  const volumeCm3 = volumeMm3 / 1000;
  const volumeM3 = volumeMm3 * 1e-9;
  const volumeIn3 = volumeMm3 * 0.000061023744;

  return {
    singleWeightKg,
    totalWeightKg,
    quantity: qty,
    areaMm2,
    areaCm2,
    areaIn2,
    volumeMm3,
    volumeCm3,
    volumeM3,
    volumeIn3,
    display: {
      singleKg: formatNumber(singleWeightKg, 3),
      totalKg: formatNumber(totalWeightKg, 3),
      totalG: formatNumber(totalWeightKg * 1000, 1),
      totalLbs: formatNumber(totalWeightKg * 2.2046226218, 3),
      totalTonne: formatNumber(totalWeightKg / 1000, 4),
      areaMm2: formatNumber(areaMm2, 2),
      areaCm2: formatNumber(areaCm2, 2),
      volumeCm3: formatNumber(volumeCm3, 2),
    },
  };
};
