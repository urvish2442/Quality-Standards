"use client";

const ThreadProfileVisualizer = ({ threadData, gender, limitData }) => {
  if (!threadData) return null;

  const angle = parseFloat(threadData.angle) || 60;
  const isExternal = gender === "external";

  return (
    <div className="border-border bg-background flex flex-col items-center justify-center rounded-xl border p-4 shadow-xs">
      <div className="flex w-full items-center justify-between border-b border-border pb-2.5">
        <span className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
          Thread Profile Schematic Diagram
        </span>
        <span className="border-primary/20 bg-primary-soft text-primary rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
          {angle}° Flank Angle | {isExternal ? "External Bolt Profile" : "Internal Nut Profile"}
        </span>
      </div>

      <div className="relative mt-3 flex h-52 w-full items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 400 180"
          className="h-full w-full max-w-md"
          aria-label="Thread geometry visual profile diagram"
        >
          <defs>
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.4" />
            </linearGradient>
            <pattern
              id="hatch"
              width="8"
              height="8"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>

          {/* Solid Body Hatching */}
          <rect
            x="30"
            y={isExternal ? "110" : "10"}
            width="340"
            height="60"
            fill="url(#hatch)"
          />

          {/* V-Thread Profiles (3 teeth) */}
          <path
            d="M 40,110 L 70,30 L 100,110 L 130,30 L 160,110 L 190,30 L 220,110 L 250,30 L 280,110 L 310,30 L 340,110"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Thread Tooth Fill */}
          <path
            d="M 40,110 L 70,30 L 100,110 L 130,30 L 160,110 L 190,30 L 220,110 L 250,30 L 280,110 L 310,30 L 340,110 Z"
            fill="url(#threadGradient)"
            opacity="0.3"
          />

          {/* Major Diameter Line (Crest) */}
          <line
            x1="20"
            y1="30"
            x2="380"
            y2="30"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="385"
            y="33"
            fill="var(--foreground)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Major (Ø)
          </text>

          {/* Pitch Diameter Line (Center) */}
          <line
            x1="20"
            y1="70"
            x2="380"
            y2="70"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <text
            x="385"
            y="73"
            fill="var(--primary)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Pitch (d₂)
          </text>

          {/* Minor Diameter Line (Root) */}
          <line
            x1="20"
            y1="110"
            x2="380"
            y2="110"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text
            x="385"
            y="113"
            fill="var(--muted)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Minor (d₁)
          </text>

          {/* Pitch Dimension Arrow (P) */}
          <line
            x1="70"
            y1="20"
            x2="130"
            y2="20"
            stroke="var(--foreground)"
            strokeWidth="1.5"
          />
          <polygon points="70,20 75,17 75,23" fill="var(--foreground)" />
          <polygon points="130,20 125,17 125,23" fill="var(--foreground)" />
          <text
            x="100"
            y="15"
            fill="var(--foreground)"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Pitch (P = {threadData.pitch})
          </text>

          {/* Angle Indicator Arc */}
          <path
            d="M 115,70 A 20 20 0 0 0 145,70"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <text
            x="130"
            y="62"
            fill="var(--primary)"
            fontSize="9"
            textAnchor="middle"
            fontWeight="bold"
          >
            {angle}°
          </text>
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-center text-xs">
        <div className="flex items-center gap-1.5">
          <span className="bg-foreground h-2.5 w-2.5 rounded-full" />
          <span className="text-muted">Major Dia (Crest)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-primary h-2.5 w-2.5 rounded-full" />
          <span className="text-muted">Pitch Dia (Line)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-muted h-2.5 w-2.5 rounded-full" />
          <span className="text-muted">Minor Dia (Root)</span>
        </div>
      </div>
    </div>
  );
};

export default ThreadProfileVisualizer;
