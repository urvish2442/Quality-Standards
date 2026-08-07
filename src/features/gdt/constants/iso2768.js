export const ISO_2768_1_CLASSES = [
  { id: "f", label: "f", description: "Fine" },
  { id: "m", label: "m", description: "Medium" },
  { id: "c", label: "c", description: "Coarse" },
  { id: "v", label: "v", description: "Very coarse" },
];

export const ISO_2768_2_CLASSES = [
  { id: "H", label: "H", description: "High" },
  { id: "K", label: "K", description: "Medium" },
  { id: "L", label: "L", description: "Low" },
];

export const LINEAR_DIMENSIONS = [
  {
    range: "0.5 up to 3",
    f: "±0.05",
    m: "±0.1",
    c: "±0.2",
    v: "—",
  },
  {
    range: "over 3 up to 6",
    f: "±0.05",
    m: "±0.1",
    c: "±0.3",
    v: "±0.5",
  },
  {
    range: "over 6 up to 30",
    f: "±0.1",
    m: "±0.2",
    c: "±0.5",
    v: "±1.0",
  },
  {
    range: "over 30 up to 120",
    f: "±0.15",
    m: "±0.3",
    c: "±0.8",
    v: "±1.5",
  },
  {
    range: "over 120 up to 400",
    f: "±0.2",
    m: "±0.5",
    c: "±1.2",
    v: "±2.5",
  },
  {
    range: "over 400 up to 1000",
    f: "±0.3",
    m: "±0.8",
    c: "±2.0",
    v: "±4.0",
  },
  {
    range: "over 1000 up to 2000",
    f: "±0.5",
    m: "±1.2",
    c: "±3.0",
    v: "±6.0",
  },
  {
    range: "over 2000 up to 4000",
    f: "—",
    m: "±2.0",
    c: "±4.0",
    v: "±8.0",
  },
];

export const RADIUS_CHAMFER_DIMENSIONS = [
  {
    range: "0.5 up to 3",
    f: "±0.2",
    m: "±0.2",
    c: "±0.4",
    v: "±0.4",
  },
  {
    range: "over 3 up to 6",
    f: "±0.5",
    m: "±0.5",
    c: "±1.0",
    v: "±1.0",
  },
  {
    range: "over 6",
    f: "±1.0",
    m: "±1.0",
    c: "±2.0",
    v: "±2.0",
  },
];

export const ANGULAR_DIMENSIONS = [
  {
    range: "up to 10",
    f: "±1°",
    m: "±1°",
    c: "±1°30′",
    v: "±3°",
  },
  {
    range: "over 10 up to 50",
    f: "±0°30′",
    m: "±0°30′",
    c: "±1°",
    v: "±2°",
  },
  {
    range: "over 50 up to 120",
    f: "±0°20′",
    m: "±0°20′",
    c: "±0°30′",
    v: "±1°",
  },
  {
    range: "over 120 up to 400",
    f: "±0°10′",
    m: "±0°10′",
    c: "±0°20′",
    v: "±0°30′",
  },
  {
    range: "over 400",
    f: "±0°5′",
    m: "±0°5′",
    c: "±0°10′",
    v: "±0°20′",
  },
];

export const STRAIGHTNESS_FLATNESS = [
  { range: "up to 10", H: "0.02", K: "0.05", L: "0.1" },
  { range: "above 10 to 30", H: "0.05", K: "0.1", L: "0.2" },
  { range: "above 30 to 100", H: "0.1", K: "0.2", L: "0.4" },
  { range: "above 100 to 300", H: "0.2", K: "0.4", L: "0.8" },
  { range: "above 300 to 1000", H: "0.3", K: "0.6", L: "1.2" },
  { range: "above 1000 to 3000", H: "0.4", K: "0.8", L: "1.6" },
];

export const PERPENDICULARITY = [
  { range: "up to 10", H: "0.2", K: "0.4", L: "0.6" },
  { range: "above 10 to 30", H: "0.3", K: "0.6", L: "1.0" },
  { range: "above 30 to 100", H: "0.4", K: "0.8", L: "1.5" },
  { range: "above 100 to 300", H: "0.5", K: "1.0", L: "2.0" },
];

export const SYMMETRY = [
  { range: "up to 10", H: "0.5", K: "0.6", L: "0.6" },
  { range: "above 10 to 30", H: "0.5", K: "0.6", L: "1.0" },
  { range: "above 30 to 100", H: "0.5", K: "0.8", L: "1.5" },
  { range: "above 100 to 300", H: "0.5", K: "1.0", L: "2.0" },
];

export const CIRCULAR_RUNOUT = [{ range: "All ranges", H: "0.1", K: "0.2", L: "0.5" }];
