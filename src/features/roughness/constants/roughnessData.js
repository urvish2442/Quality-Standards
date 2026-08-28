export const ROUGHNESS_BASICS = [
  {
    label: "Ra",
    value: "Arithmetic mean deviation of the assessed profile",
  },
  {
    label: "Rz",
    value: "Average maximum height of profile (peak-to-valley)",
  },
  {
    label: "Rq",
    value: "Root-mean-square deviation of the profile",
  },
  {
    label: "Rt",
    value: "Total height of the profile over the evaluation length",
  },
  {
    label: "Cutoff (λc)",
    value: "Sampling length filter used when measuring roughness",
  },
  {
    label: "Unit",
    value: "Micrometres (μm) — common drawing callout unit",
  },
];

export const ROUGHNESS_GRADES = [
  { grade: "N1", ra: "0.025", rz: "0.1", finish: "Super finish / lapping" },
  { grade: "N2", ra: "0.05", rz: "0.2", finish: "Mirror polish" },
  { grade: "N3", ra: "0.1", rz: "0.4", finish: "Fine polish / hone" },
  { grade: "N4", ra: "0.2", rz: "0.8", finish: "Polish / fine grind" },
  { grade: "N5", ra: "0.4", rz: "1.6", finish: "Fine grind" },
  { grade: "N6", ra: "0.8", rz: "3.2", finish: "Grind / fine turn" },
  { grade: "N7", ra: "1.6", rz: "6.3", finish: "Finish turn / mill" },
  { grade: "N8", ra: "3.2", rz: "12.5", finish: "Semi-finish machine" },
  { grade: "N9", ra: "6.3", rz: "25", finish: "Rough machine" },
  { grade: "N10", ra: "12.5", rz: "50", finish: "Coarse machine" },
  { grade: "N11", ra: "25", rz: "100", finish: "Very rough / flame cut" },
  { grade: "N12", ra: "50", rz: "200", finish: "As cast / forged" },
];

export const PROCESS_ROUGHNESS = [
  {
    id: "lapping",
    process: "Lapping / superfinishing",
    raMin: "0.012",
    raMax: "0.1",
    typical: "0.025–0.05",
    note: "Highest precision flat and cylindrical finishes",
  },
  {
    id: "honing",
    process: "Honing",
    raMin: "0.05",
    raMax: "0.4",
    typical: "0.1–0.2",
    note: "Bore finishing with cross-hatch texture",
  },
  {
    id: "grinding",
    process: "Grinding",
    raMin: "0.1",
    raMax: "1.6",
    typical: "0.2–0.8",
    note: "Depends on wheel grit, dressing, and coolant",
  },
  {
    id: "turning",
    process: "Turning",
    raMin: "0.4",
    raMax: "6.3",
    typical: "0.8–3.2",
    note: "Finish vs rough pass; insert nose radius matters",
  },
  {
    id: "milling",
    process: "Milling",
    raMin: "0.8",
    raMax: "6.3",
    typical: "1.6–3.2",
    note: "Climb vs conventional; tool runout affects peaks",
  },
  {
    id: "drilling",
    process: "Drilling",
    raMin: "1.6",
    raMax: "12.5",
    typical: "3.2–6.3",
    note: "Reaming or boring improves Ra significantly",
  },
  {
    id: "reaming",
    process: "Reaming",
    raMin: "0.4",
    raMax: "3.2",
    typical: "0.8–1.6",
    note: "Sized hole finish after drilling",
  },
  {
    id: "edm",
    process: "EDM",
    raMin: "0.8",
    raMax: "12.5",
    typical: "1.6–6.3",
    note: "Finish pass and electrode condition dominate",
  },
  {
    id: "casting",
    process: "Sand casting",
    raMin: "12.5",
    raMax: "50",
    typical: "12.5–25",
    note: "As-cast surface before machining",
  },
  {
    id: "forging",
    process: "Forging / flame cut",
    raMin: "12.5",
    raMax: "50",
    typical: "25–50",
    note: "Usually requires stock for finish machining",
  },
];

export const ROUGHNESS_SYMBOL_NOTES = [
  {
    title: "Basic symbol",
    detail:
      "Indicates a surface that may be produced by any method (machining allowed unless restricted).",
  },
  {
    title: "Machining required",
    detail:
      "Bar added to the basic symbol means material removal by machining is required.",
  },
  {
    title: "Machining prohibited",
    detail:
      "Circle in the vee means the surface must be left as manufactured without machining.",
  },
  {
    title: "Ra callout",
    detail:
      "Value placed above the horizontal extension line is usually the Ra limit in μm.",
  },
];

export const ROUGHNESS_CITATIONS = [
  {
    id: "iso-4287",
    standard: "ISO 4287",
    title:
      "Geometrical Product Specifications (GPS) — Surface texture: Profile method — Terms, definitions and surface texture parameters",
    usedFor: "Ra, Rz, Rq, Rt parameter definitions",
    url: "https://www.iso.org/standard/10132.html",
  },
  {
    id: "iso-1302",
    standard: "ISO 1302",
    title:
      "Geometrical Product Specifications (GPS) — Indication of surface texture in technical product documentation",
    usedFor: "Drawing symbols and roughness grade indication practice",
    url: "https://www.iso.org/standard/28089.html",
  },
  {
    id: "iso-4288",
    standard: "ISO 4288",
    title:
      "Geometrical Product Specifications (GPS) — Surface texture: Profile method — Rules and procedures for the assessment of surface texture",
    usedFor: "Cutoff selection and measurement rules",
    url: "https://www.iso.org/standard/10133.html",
  },
];
