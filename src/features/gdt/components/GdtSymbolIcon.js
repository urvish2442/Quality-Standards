const SvgFrame = ({ children }) => (
  <svg
    viewBox="0 0 48 48"
    className="text-foreground h-10 w-10"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/**
 * Geometric characteristic symbols drawn to match ASME Y14.5 / ISO chart form
 * (same family as https://www.gdandtbasics.com/gdt-symbols/).
 */
const SYMBOL_DRAWINGS = {
  // Horizontal line
  straightness: (
    <SvgFrame>
      <line x1="6" y1="24" x2="42" y2="24" />
    </SvgFrame>
  ),
  // Parallelogram
  flatness: (
    <SvgFrame>
      <path d="M10 34 L18 14 L42 14 L34 34 Z" />
    </SvgFrame>
  ),
  // Circle
  circularity: (
    <SvgFrame>
      <circle cx="24" cy="24" r="13" />
    </SvgFrame>
  ),
  // Circle flanked by two parallel tangent slashes (/ O /)
  cylindricity: (
    <SvgFrame>
      <line x1="5" y1="36" x2="20" y2="11" />
      <circle cx="24" cy="24" r="10" />
      <line x1="28" y1="38" x2="43" y2="12" />
    </SvgFrame>
  ),
  // Arc (profile of a line)
  profileLine: (
    <SvgFrame>
      <path d="M8 32 A16 16 0 0 1 40 32" />
    </SvgFrame>
  ),
  // Arc on a baseline (profile of a surface)
  profileSurface: (
    <SvgFrame>
      <path d="M8 30 A16 16 0 0 1 40 30" />
      <line x1="8" y1="30" x2="40" y2="30" />
    </SvgFrame>
  ),
  // Angle mark (∠)
  angularity: (
    <SvgFrame>
      <path d="M10 34 L38 34" />
      <path d="M10 34 L30 12" />
    </SvgFrame>
  ),
  // Perpendicular (⊥)
  perpendicularity: (
    <SvgFrame>
      <line x1="8" y1="36" x2="40" y2="36" />
      <line x1="24" y1="36" x2="24" y2="10" />
    </SvgFrame>
  ),
  // Two slanted parallel lines (∥)
  parallelism: (
    <SvgFrame>
      <line x1="16" y1="38" x2="26" y2="10" />
      <line x1="28" y1="38" x2="38" y2="10" />
    </SvgFrame>
  ),
  // Circle with crosshairs (true position)
  position: (
    <SvgFrame>
      <circle cx="24" cy="24" r="11" />
      <line x1="24" y1="6" x2="24" y2="42" />
      <line x1="6" y1="24" x2="42" y2="24" />
    </SvgFrame>
  ),
  // Two concentric circles
  concentricity: (
    <SvgFrame>
      <circle cx="24" cy="24" r="13" />
      <circle cx="24" cy="24" r="6" />
    </SvgFrame>
  ),
  // Three bars — middle longer (ASME symmetry)
  symmetry: (
    <SvgFrame>
      <line x1="16" y1="14" x2="32" y2="14" />
      <line x1="8" y1="24" x2="40" y2="24" />
      <line x1="16" y1="34" x2="32" y2="34" />
    </SvgFrame>
  ),
  // Single 45° arrow (circular runout)
  circularRunout: (
    <SvgFrame>
      <line x1="9" y1="37" x2="27" y2="19" />
      <polygon points="34,12 24,15 31,22" fill="currentColor" stroke="none" />
    </SvgFrame>
  ),
  // Two parallel 45° arrows joined at the base (total runout)
  totalRunout: (
    <SvgFrame>
      <line x1="7" y1="38" x2="19" y2="38" />
      <line x1="7" y1="38" x2="23" y2="22" />
      <polygon points="30,15 20,18 27,25" fill="currentColor" stroke="none" />
      <line x1="19" y1="38" x2="35" y2="22" />
      <polygon points="42,15 32,18 39,25" fill="currentColor" stroke="none" />
    </SvgFrame>
  ),
};

const GdtSymbolIcon = ({ symbolKey, className = "" }) => {
  return (
    <span
      className={`border-border bg-background inline-flex h-14 w-14 items-center justify-center rounded-xl border ${className}`}
    >
      {SYMBOL_DRAWINGS[symbolKey] ?? null}
    </span>
  );
};

export default GdtSymbolIcon;
