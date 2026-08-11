export const HARDNESS_BASICS = [
  {
    label: "HB / HBW",
    value: "Brinell — ball indenter; common for softer metals and castings",
  },
  {
    label: "HV",
    value: "Vickers — diamond pyramid; wide range, micro and macro hardness",
  },
  {
    label: "HRC",
    value: "Rockwell C — diamond cone; hardened steels (~20–70 HRC)",
  },
  {
    label: "HRB",
    value: "Rockwell B — 1/16 in ball; softer steels, copper alloys, aluminum",
  },
  {
    label: "HR15N / HR30N",
    value: "Rockwell superficial — thin case / surface layers",
  },
  {
    label: "Unit note",
    value: "Hardness numbers are scale-specific; do not treat them as SI units",
  },
];

export const HARDNESS_METHOD_NOTES = [
  {
    title: "Indentation principle",
    detail:
      "A hard indenter is pressed into the surface under a defined load. Hardness is derived from indentation size (Brinell/Vickers) or depth (Rockwell).",
  },
  {
    title: "Surface preparation",
    detail:
      "Test areas should be flat, clean, and free of scale, decarburization, or heavy machining marks that skew readings.",
  },
  {
    title: "Scale selection",
    detail:
      "Choose a scale suited to the material hardness and section thickness. Wrong scale selection is a common shop error.",
  },
  {
    title: "Conversions",
    detail:
      "Published HB–HV–HRC conversions are approximate. Prefer measuring in the required scale when acceptance is critical.",
  },
];

/**
 * Approximate conversion rows for carbon & alloy steels (shop reference).
 * Values are rounded for quick lookup — not a substitute for ASTM E140 tables.
 */
export const HARDNESS_CONVERSIONS = [
  { hb: "111", hv: "115", hrb: "65", hrc: "—" },
  { hb: "121", hv: "125", hrb: "70", hrc: "—" },
  { hb: "131", hv: "135", hrb: "74", hrc: "—" },
  { hb: "143", hv: "148", hrb: "80", hrc: "—" },
  { hb: "156", hv: "162", hrb: "84", hrc: "—" },
  { hb: "170", hv: "176", hrb: "88", hrc: "—" },
  { hb: "187", hv: "192", hrb: "91", hrc: "—" },
  { hb: "207", hv: "214", hrb: "95", hrc: "—" },
  { hb: "217", hv: "223", hrb: "96", hrc: "17" },
  { hb: "229", hv: "236", hrb: "98", hrc: "20" },
  { hb: "241", hv: "248", hrb: "100", hrc: "22" },
  { hb: "255", hv: "263", hrb: "—", hrc: "25" },
  { hb: "269", hv: "278", hrb: "—", hrc: "27" },
  { hb: "286", hv: "296", hrb: "—", hrc: "30" },
  { hb: "302", hv: "313", hrb: "—", hrc: "32" },
  { hb: "321", hv: "332", hrb: "—", hrc: "35" },
  { hb: "341", hv: "353", hrb: "—", hrc: "37" },
  { hb: "363", hv: "375", hrb: "—", hrc: "39" },
  { hb: "375", hv: "390", hrb: "—", hrc: "40" },
  { hb: "388", hv: "403", hrb: "—", hrc: "41" },
  { hb: "401", hv: "417", hrb: "—", hrc: "43" },
  { hb: "415", hv: "431", hrb: "—", hrc: "44" },
  { hb: "429", hv: "446", hrb: "—", hrc: "45" },
  { hb: "444", hv: "461", hrb: "—", hrc: "47" },
  { hb: "461", hv: "479", hrb: "—", hrc: "48" },
  { hb: "477", hv: "497", hrb: "—", hrc: "50" },
  { hb: "495", hv: "515", hrb: "—", hrc: "51" },
  { hb: "514", hv: "535", hrb: "—", hrc: "53" },
  { hb: "534", hv: "556", hrb: "—", hrc: "54" },
  { hb: "555", hv: "578", hrb: "—", hrc: "56" },
  { hb: "578", hv: "601", hrb: "—", hrc: "57" },
  { hb: "601", hv: "626", hrb: "—", hrc: "59" },
  { hb: "627", hv: "653", hrb: "—", hrc: "60" },
  { hb: "653", hv: "682", hrb: "—", hrc: "62" },
  { hb: "682", hv: "710", hrb: "—", hrc: "63" },
];

export const HARDNESS_MATERIALS = [
  {
    id: "mild-steel",
    material: "Mild / low-carbon steel (annealed)",
    typical: "110–150 HB",
    note: "Soft, formable; often HRB mid–high 70s",
  },
  {
    id: "normalized-steel",
    material: "Normalized medium-carbon steel",
    typical: "170–230 HB",
    note: "Common as-received structural / shaft stock",
  },
  {
    id: "qt-steel",
    material: "Quench & temper alloy steel",
    typical: "28–40 HRC",
    note: "Depends on temper; used for shafts, gears, fasteners",
  },
  {
    id: "tool-steel",
    material: "Hardened tool steel",
    typical: "58–64 HRC",
    note: "Cutting tools, dies, punches after heat treatment",
  },
  {
    id: "case-hardened",
    material: "Case-hardened surface",
    typical: "58–62 HRC (case)",
    note: "Core remains tougher/softer; measure with superficial or microhardness",
  },
  {
    id: "stainless",
    material: "Austenitic stainless (annealed)",
    typical: "150–200 HB",
    note: "Work hardens readily; avoid converting blindly to HRC",
  },
  {
    id: "cast-iron",
    material: "Gray cast iron",
    typical: "150–250 HB",
    note: "Brinell preferred; graphite structure affects Rockwell scatter",
  },
  {
    id: "aluminum",
    material: "Aluminum alloys",
    typical: "40–120 HB / HRB",
    note: "Use Brinell or Rockwell B/F; HRC is not appropriate",
  },
  {
    id: "copper",
    material: "Copper / brass (annealed to hard)",
    typical: "40–120 HB",
    note: "HRB common for wrought copper alloys",
  },
];

export const HARDNESS_CITATIONS = [
  {
    id: "iso-6506",
    standard: "ISO 6506",
    title: "Metallic materials — Brinell hardness test",
    usedFor: "HB / HBW test method and reporting",
    url: "https://www.iso.org/standard/64065.html",
  },
  {
    id: "iso-6507",
    standard: "ISO 6507",
    title: "Metallic materials — Vickers hardness test",
    usedFor: "HV test method across load ranges",
    url: "https://www.iso.org/standard/64066.html",
  },
  {
    id: "iso-6508",
    standard: "ISO 6508",
    title: "Metallic materials — Rockwell hardness test",
    usedFor: "HRB, HRC, and superficial Rockwell scales",
    url: "https://www.iso.org/standard/64067.html",
  },
  {
    id: "astm-e140",
    standard: "ASTM E140",
    title: "Standard Hardness Conversion Tables for Metals",
    usedFor: "Approximate hardness scale conversions",
    url: "https://www.astm.org/e0140.html",
  },
];
