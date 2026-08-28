export const FIT_TYPES = [
  {
    id: "clearance",
    title: "Clearance Fit",
    summary:
      "Always a gap between hole and shaft — free assembly and relative motion.",
    examples: ["H11/c11", "H9/d9", "H8/f7", "H7/g6", "H7/h6"],
    tone: "info",
  },
  {
    id: "transition",
    title: "Transition Fit",
    summary:
      "May produce a small clearance or light interference — locating fits.",
    examples: ["H7/k6", "H7/n6", "H7/j6"],
    tone: "warning",
  },
  {
    id: "interference",
    title: "Interference Fit",
    summary:
      "Shaft is always larger than hole — press/force fits for rigid joints.",
    examples: ["H7/p6", "H7/s6", "H7/u6"],
    tone: "error",
  },
];

export const COMMON_FITS = [
  {
    designation: "H7/g6",
    type: "Clearance",
    use: "Sliding fits, precision sliding spindles",
  },
  {
    designation: "H7/h6",
    type: "Clearance",
    use: "Locational clearance, push fits",
  },
  {
    designation: "H7/k6",
    type: "Transition",
    use: "True location with slight interference possible",
  },
  {
    designation: "H7/n6",
    type: "Transition",
    use: "Keyless fits, gears on shafts",
  },
  {
    designation: "H7/p6",
    type: "Interference",
    use: "Press fits, bushings, bearings",
  },
  {
    designation: "H7/s6",
    type: "Interference",
    use: "Heavy press fits, permanent assemblies",
  },
];

export const TOLERANCE_GRADES = [
  { grade: "IT01–IT5", use: "Gauges, measuring tools, ultra-precision" },
  { grade: "IT6–IT7", use: "Precision engineering, bearings, tooling" },
  { grade: "IT8–IT11", use: "General machining, fits for production" },
  { grade: "IT12–IT16", use: "Coarse work, stock materials, rough fits" },
];

export const BASIS_SYSTEMS = [
  {
    id: "hole",
    title: "Hole-basis system",
    badge: "Preferred",
    description:
      "Hole size is fixed (usually H). Shaft deviations create the desired fit. Preferred in most workshops because holes are harder to vary precisely.",
    formula: "Hole = H · Shaft = c…u",
  },
  {
    id: "shaft",
    title: "Shaft-basis system",
    badge: "Alternate",
    description:
      "Shaft size is fixed (usually h). Hole deviations create the fit. Useful when one shaft mates with several different holes.",
    formula: "Shaft = h · Hole = C…U",
  },
];
