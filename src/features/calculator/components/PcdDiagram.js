const VIEW_W = 420;
const VIEW_H = 420;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const PITCH_RADIUS = 132;
const HOLE_RADIUS = 14;

const formatDim = (value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(3)).toString();
};

const buildHoles = (holeCount) => {
  const count = Number.isFinite(holeCount) && holeCount >= 3 ? holeCount : 3;

  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return {
      index: index + 1,
      angle,
      x: CX + PITCH_RADIUS * Math.cos(angle),
      y: CY + PITCH_RADIUS * Math.sin(angle),
    };
  });
};

const midpoint = (a, b) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const PcdDiagram = ({ result, holeCount }) => {
  const holes = Number(holeCount) || result?.holeCount || 3;
  const points = buildHoles(holes);
  const first = points[0];
  const second = points[1];
  const chordMid = midpoint(first, second);
  const hasResult = Boolean(result && !result.error);

  const labelOffset = {
    x: chordMid.x - CX,
    y: chordMid.y - CY,
  };
  const labelLength = Math.hypot(labelOffset.x, labelOffset.y) || 1;
  const chordLabel = {
    x: chordMid.x + (labelOffset.x / labelLength) * 22,
    y: chordMid.y + (labelOffset.y / labelLength) * 22,
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
            PCD diagram
          </h3>
          <p className="text-muted mt-1 text-sm">
            Holes update with count. Dimensions update from center distance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="text-primary inline-flex items-center gap-1.5">
            <span className="bg-primary h-2.5 w-2.5 rounded-full" />
            Pitch circle
          </span>
          <span className="text-foreground inline-flex items-center gap-1.5">
            <span className="border-foreground bg-surface h-2.5 w-2.5 rounded-full border-2" />
            Holes
          </span>
        </div>
      </div>

      <div className="border-border bg-background mt-4 flex flex-1 items-center justify-center rounded-xl border p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="text-foreground h-auto w-full max-w-md"
          role="img"
          aria-label={`Pitch circle with ${holes} equally spaced holes`}
        >
          {/* Outer plate hint */}
          <circle
            cx={CX}
            cy={CY}
            r={PITCH_RADIUS + 42}
            fill="var(--primary-soft)"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          />

          {/* Pitch circle */}
          <circle
            cx={CX}
            cy={CY}
            r={PITCH_RADIUS}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.25"
            strokeDasharray="8 4"
          />

          {/* Radial guides */}
          {points.map((point) => (
            <line
              key={`ray-${point.index}`}
              x1={CX}
              y1={CY}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity="0.25"
            />
          ))}

          {/* Chord between consecutive holes */}
          <line
            x1={first.x}
            y1={first.y}
            x2={second.x}
            y2={second.y}
            stroke="var(--primary)"
            strokeWidth="2"
          />

          {/* Center mark */}
          <circle cx={CX} cy={CY} r="3.5" fill="var(--primary)" />
          <line
            x1={CX - 10}
            y1={CY}
            x2={CX + 10}
            y2={CY}
            stroke="var(--primary)"
            strokeWidth="1.4"
          />
          <line
            x1={CX}
            y1={CY - 10}
            x2={CX}
            y2={CY + 10}
            stroke="var(--primary)"
            strokeWidth="1.4"
          />

          {/* PCD diameter dimension (horizontal through center) */}
          <line
            x1={CX - PITCH_RADIUS}
            y1={CY + PITCH_RADIUS + 28}
            x2={CX + PITCH_RADIUS}
            y2={CY + PITCH_RADIUS + 28}
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polyline
            points={`${CX - PITCH_RADIUS + 6},${CY + PITCH_RADIUS + 22} ${CX - PITCH_RADIUS},${CY + PITCH_RADIUS + 28} ${CX - PITCH_RADIUS + 6},${CY + PITCH_RADIUS + 34}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polyline
            points={`${CX + PITCH_RADIUS - 6},${CY + PITCH_RADIUS + 22} ${CX + PITCH_RADIUS},${CY + PITCH_RADIUS + 28} ${CX + PITCH_RADIUS - 6},${CY + PITCH_RADIUS + 34}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1={CX - PITCH_RADIUS}
            y1={CY}
            x2={CX - PITCH_RADIUS}
            y2={CY + PITCH_RADIUS + 28}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          <line
            x1={CX + PITCH_RADIUS}
            y1={CY}
            x2={CX + PITCH_RADIUS}
            y2={CY + PITCH_RADIUS + 28}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          <text
            x={CX}
            y={CY + PITCH_RADIUS + 48}
            textAnchor="middle"
            className="fill-foreground text-[13px] font-semibold"
          >
            PCD = {hasResult ? formatDim(result.pcd) : "—"}
          </text>

          {/* Center distance label on chord */}
          <text
            x={chordLabel.x}
            y={chordLabel.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary text-[12px] font-semibold"
          >
            C = {hasResult ? formatDim(result.centerDistance) : "—"}
          </text>

          {/* Holes */}
          {points.map((point) => (
            <g key={point.index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={HOLE_RADIUS}
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx={point.x} cy={point.y} r="2.5" fill="currentColor" />
              <text
                x={CX + (PITCH_RADIUS + 28) * Math.cos(point.angle)}
                y={CY + (PITCH_RADIUS + 28) * Math.sin(point.angle)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted text-[11px] font-semibold"
              >
                {point.index}
              </text>
            </g>
          ))}

          <text
            x={CX}
            y={CY - PITCH_RADIUS - 28}
            textAnchor="middle"
            className="fill-muted text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            {holes} holes
          </text>
        </svg>
      </div>

      {!hasResult ? (
        <p className="text-muted mt-3 text-sm">
          Enter center distance to show PCD and C values on the diagram.
        </p>
      ) : null}
    </div>
  );
};

export default PcdDiagram;
