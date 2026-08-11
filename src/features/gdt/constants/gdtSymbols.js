export const GDT_CHARACTERISTICS = [
  {
    id: "form",
    label: "Form",
    description:
      "Controls the shape of a feature independent of other features. No datum reference is used.",
  },
  {
    id: "orientation",
    label: "Orientation",
    description:
      "Controls angular relationship of features relative to one or more datums.",
  },
  {
    id: "location",
    label: "Location",
    description:
      "Controls the location of features relative to datums or other features.",
  },
  {
    id: "runout",
    label: "Runout",
    description:
      "Controls surface variation relative to a datum axis during full rotation.",
  },
  {
    id: "profile",
    label: "Profile",
    description:
      "Controls the size and form of irregular curves and surfaces, with or without datums.",
  },
];

export const GDT_SYMBOLS = [
  {
    id: "straightness",
    name: "Straightness",
    symbolKey: "straightness",
    characteristic: "form",
    characteristicLabel: "Form",
    summary:
      "Controls how much a line element or axis may deviate from a perfect straight line.",
    appliesTo: "Surface line elements, centerlines, and axes",
    datum: "Not allowed",
    toleranceZone: "Two parallel lines / cylinder around a perfect line",
  },
  {
    id: "flatness",
    name: "Flatness",
    symbolKey: "flatness",
    characteristic: "form",
    characteristicLabel: "Form",
    summary:
      "Controls how much a surface may deviate from a perfect plane.",
    appliesTo: "Planar surfaces",
    datum: "Not allowed",
    toleranceZone: "Two parallel planes",
  },
  {
    id: "circularity",
    name: "Circularity",
    symbolKey: "circularity",
    characteristic: "form",
    characteristicLabel: "Form",
    summary:
      "Also called roundness. Controls circular cross-sections independent of the axis.",
    appliesTo: "Cylinders, cones, spheres (cross-sections)",
    datum: "Not allowed",
    toleranceZone: "Two concentric circles in each cross-section",
  },
  {
    id: "cylindricity",
    name: "Cylindricity",
    symbolKey: "cylindricity",
    characteristic: "form",
    characteristicLabel: "Form",
    summary:
      "Controls the entire cylindrical surface for roundness, straightness, and taper together.",
    appliesTo: "Cylindrical surfaces",
    datum: "Not allowed",
    toleranceZone: "Two coaxial cylinders",
  },
  {
    id: "angularity",
    name: "Angularity",
    symbolKey: "angularity",
    characteristic: "orientation",
    characteristicLabel: "Orientation",
    summary:
      "Controls a surface or axis at a specified angle other than 90° to a datum.",
    appliesTo: "Surfaces and axes at a basic angle to a datum",
    datum: "Required",
    toleranceZone: "Two parallel planes / cylinder at the basic angle",
  },
  {
    id: "perpendicularity",
    name: "Perpendicularity",
    symbolKey: "perpendicularity",
    characteristic: "orientation",
    characteristicLabel: "Orientation",
    summary:
      "Controls a surface or axis at 90° to a datum feature.",
    appliesTo: "Surfaces and axes square to a datum",
    datum: "Required",
    toleranceZone: "Two parallel planes / cylinder perpendicular to datum",
  },
  {
    id: "parallelism",
    name: "Parallelism",
    symbolKey: "parallelism",
    characteristic: "orientation",
    characteristicLabel: "Orientation",
    summary:
      "Controls a surface or axis so it remains equidistant from a datum.",
    appliesTo: "Surfaces and axes parallel to a datum",
    datum: "Required",
    toleranceZone: "Two parallel planes / cylinder parallel to datum",
  },
  {
    id: "position",
    name: "Position",
    symbolKey: "position",
    characteristic: "location",
    characteristicLabel: "Location",
    summary:
      "Controls the location of a feature relative to its true position from datums.",
    appliesTo: "Holes, pins, slots, tabs, and patterned features",
    datum: "Usually required",
    toleranceZone: "Cylinder, sphere, or width zone about true position",
  },
  {
    id: "concentricity",
    name: "Concentricity",
    symbolKey: "concentricity",
    characteristic: "location",
    characteristicLabel: "Location",
    summary:
      "Controls median points of a feature so they share a common axis with a datum.",
    appliesTo: "Axes of revolved features (use carefully; often replaced by position)",
    datum: "Required",
    toleranceZone: "Cylinder coaxial with the datum axis",
  },
  {
    id: "symmetry",
    name: "Symmetry",
    symbolKey: "symmetry",
    characteristic: "location",
    characteristicLabel: "Location",
    summary:
      "Controls median points so a feature is centered about a datum center plane or axis.",
    appliesTo: "Slots, tabs, and centered features",
    datum: "Required",
    toleranceZone: "Two parallel planes about the datum center plane",
  },
  {
    id: "circular-runout",
    name: "Circular Runout",
    symbolKey: "circularRunout",
    characteristic: "runout",
    characteristicLabel: "Runout",
    summary:
      "Controls circular variation of a surface as the part rotates 360° about a datum axis.",
    appliesTo: "Surfaces of revolution (checked in each circular element)",
    datum: "Required",
    toleranceZone: "Two concentric circles in each measurement plane",
  },
  {
    id: "total-runout",
    name: "Total Runout",
    symbolKey: "totalRunout",
    characteristic: "runout",
    characteristicLabel: "Runout",
    summary:
      "Controls all surface elements simultaneously during full rotation about a datum axis.",
    appliesTo: "Entire cylindrical or planar face of revolution",
    datum: "Required",
    toleranceZone: "Two coaxial cylinders or two parallel planes",
  },
  {
    id: "profile-line",
    name: "Profile of a Line",
    symbolKey: "profileLine",
    characteristic: "profile",
    characteristicLabel: "Profile",
    summary:
      "Controls a 2D cross-section curve relative to the true profile.",
    appliesTo: "Cross-sections of contoured surfaces",
    datum: "Optional",
    toleranceZone: "Uniform 2D bilateral (or unilateral) band around true profile",
  },
  {
    id: "profile-surface",
    name: "Profile of a Surface",
    symbolKey: "profileSurface",
    characteristic: "profile",
    characteristicLabel: "Profile",
    summary:
      "Controls a 3D surface relative to the true profile across the full feature.",
    appliesTo: "Contoured / freeform surfaces",
    datum: "Optional",
    toleranceZone: "Uniform 3D envelope around the true surface",
  },
];
