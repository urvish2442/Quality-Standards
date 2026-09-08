const VIEW_W = 480;
const VIEW_H = 340;

const PART = {
  x: 70,
  y: 48,
  width: 340,
  height: 210,
};

const HOLE_R = 28;
const HOLE_INSET = HOLE_R + 36;

const formatDim = (value) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(3)).toString();
};

const buildLayout = (result) => {
  const hasResult = Boolean(result && !result.error);

  const requiredX = hasResult ? result.requiredX : 2.5;
  const requiredY = hasResult ? result.requiredY : 1.25;
  const obtainedX = hasResult ? result.obtainedX : 2.753;
  const obtainedY = hasResult ? result.obtainedY : 1.252;

  const maxX = Math.max(Math.abs(requiredX), Math.abs(obtainedX), 0.001);
  const maxY = Math.max(Math.abs(requiredY), Math.abs(obtainedY), 0.001);

  const plotLeft = PART.x + HOLE_INSET;
  const plotRight = PART.x + PART.width - HOLE_INSET;
  const plotBottom = PART.y + PART.height - HOLE_INSET;
  const plotTop = PART.y + HOLE_INSET;

  const scaleX = (plotRight - plotLeft) / maxX;
  const scaleY = (plotBottom - plotTop) / maxY;

  const toSvgX = (value) => plotLeft + value * scaleX;
  const toSvgY = (value) => plotBottom - value * scaleY;

  const baseReqX = Math.min(
    Math.max(toSvgX(Math.abs(requiredX)), plotLeft),
    plotRight
  );
  const baseReqY = Math.min(
    Math.max(toSvgY(Math.abs(requiredY)), plotTop),
    plotBottom
  );

  const deltaX = obtainedX - requiredX;
  const deltaY = obtainedY - requiredY;
  const amplify =
    Math.hypot(deltaX, deltaY) < 1e-9
      ? 0
      : Math.min(
          48,
          Math.max(
            10,
            220 / (Math.hypot(deltaX * scaleX, deltaY * scaleY) || 1)
          )
        );

  const req = { x: baseReqX, y: baseReqY };
  const obt = {
    x: baseReqX + deltaX * scaleX * (amplify || 1),
    y: baseReqY - deltaY * scaleY * (amplify || 1),
  };

  // Clamp obtained marker inside/near the part for readability.
  obt.x = Math.min(Math.max(obt.x, PART.x + 20), PART.x + PART.width - 20);
  obt.y = Math.min(Math.max(obt.y, PART.y + 20), PART.y + PART.height - 20);

  const devDist = Math.hypot(obt.x - req.x, obt.y - req.y);

  return {
    hasResult,
    requiredX,
    requiredY,
    obtainedX,
    obtainedY,
    req,
    obt,
    devDist,
    leftEdge: PART.x,
    bottomEdge: PART.y + PART.height,
  };
};

const DimensionArrow = ({
  x1,
  y1,
  x2,
  y2,
  label,
  color,
  labelOffset = { x: 0, y: -10 },
  vertical = false,
}) => {
  const midX = (x1 + x2) / 2 + labelOffset.x;
  const midY = (y1 + y2) / 2 + labelOffset.y;

  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.6" />
      {vertical ? (
        <>
          <polyline
            points={`${x1 - 4},${y1 + 6} ${x1},${y1} ${x1 + 4},${y1 + 6}`}
            fill="none"
            strokeWidth="1.6"
          />
          <polyline
            points={`${x2 - 4},${y2 - 6} ${x2},${y2} ${x2 + 4},${y2 - 6}`}
            fill="none"
            strokeWidth="1.6"
          />
        </>
      ) : (
        <>
          <polyline
            points={`${x1 + 6},${y1 - 4} ${x1},${y1} ${x1 + 6},${y1 + 4}`}
            fill="none"
            strokeWidth="1.6"
          />
          <polyline
            points={`${x2 - 6},${y2 - 4} ${x2},${y2} ${x2 - 6},${y2 + 4}`}
            fill="none"
            strokeWidth="1.6"
          />
        </>
      )}
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[13px] font-bold"
        fill={color}
        stroke="none"
      >
        {label}
      </text>
    </g>
  );
};

const PositionDiagram = ({ result }) => {
  const layout = buildLayout(result);
  const { req, obt, leftEdge, bottomEdge, devDist } = layout;

  const requiredColor = "currentColor";
  const obtainedColor = "#dc2626";
  const zoneColor = "#16a34a";

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
            True position diagram
          </h3>
          <p className="text-muted mt-1 text-sm">
            Black = required. Red = obtained. Green = position tolerance zone (⌀).
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-foreground inline-flex items-center gap-1.5">
            <span className="bg-foreground h-2.5 w-2.5 rounded-full" />
            Required
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#dc2626]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" />
            Obtained
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#16a34a]">
            <span className="h-2.5 w-2.5 rounded-full border border-[#16a34a] bg-[#16a34a]/20" />
            Zone (⌀)
          </span>
        </div>
      </div>

      <div className="border-border bg-background mt-4 flex flex-1 items-center justify-center rounded-xl border p-3 sm:p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="text-foreground h-auto w-full max-w-xl"
          role="img"
          aria-label="True position diagram with required black, obtained red, and green tolerance zone dimensions"
        >
          {/* Part body */}
          <rect
            x={PART.x}
            y={PART.y}
            width={PART.width}
            height={PART.height}
            rx="2"
            fill="var(--primary-soft)"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Top / bottom edge guides */}
          <line
            x1={PART.x - 8}
            y1={PART.y}
            x2={PART.x + PART.width + 8}
            y2={PART.y}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.45"
          />
          <line
            x1={PART.x - 8}
            y1={PART.y + PART.height}
            x2={PART.x + PART.width + 8}
            y2={PART.y + PART.height}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity="0.45"
          />

          {/* Required horizontal centerline */}
          <line
            x1={PART.x + 12}
            y1={req.y}
            x2={PART.x + PART.width - 12}
            y2={req.y}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="8 3 2 3"
            opacity="0.75"
          />

          {/* Required vertical centerline */}
          <line
            x1={req.x}
            y1={PART.y + 12}
            x2={req.x}
            y2={PART.y + PART.height - 12}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="8 3 2 3"
            opacity="0.75"
          />

          {/* Main hole (drawn at required center) */}
          <circle
            cx={req.x}
            cy={req.y}
            r={HOLE_R}
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Required center mark */}
          <circle cx={req.x} cy={req.y} r="2.5" fill="currentColor" />

          {/* True Position Tolerance Zone Circle & Deviation Vector */}
          {layout.hasResult && devDist > 0 ? (
            <g>
              <circle
                cx={req.x}
                cy={req.y}
                r={devDist}
                fill={zoneColor}
                fillOpacity="0.08"
                stroke={zoneColor}
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <line
                x1={req.x}
                y1={req.y}
                x2={obt.x}
                y2={obt.y}
                stroke={zoneColor}
                strokeWidth="1.5"
              />
            </g>
          ) : null}

          {/* Obtained marker */}
          <circle
            cx={obt.x}
            cy={obt.y}
            r="9"
            fill="none"
            stroke={obtainedColor}
            strokeWidth="2"
          />
          <circle cx={obt.x} cy={obt.y} r="2.5" fill={obtainedColor} />

          {/* Required X dimension (black) */}
          <DimensionArrow
            x1={leftEdge}
            y1={req.y - 34}
            x2={req.x}
            y2={req.y - 34}
            label={formatDim(layout.requiredX)}
            color={requiredColor}
            labelOffset={{ x: 0, y: -12 }}
          />
          <line
            x1={req.x}
            y1={req.y - 40}
            x2={req.x}
            y2={req.y - 8}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />

          {/* Required Y dimension (black) */}
          <DimensionArrow
            x1={req.x + 34}
            y1={bottomEdge}
            x2={req.x + 34}
            y2={req.y}
            label={formatDim(layout.requiredY)}
            color={requiredColor}
            vertical
            labelOffset={{ x: 16, y: 0 }}
          />
          <line
            x1={req.x + 8}
            y1={req.y}
            x2={req.x + 40}
            y2={req.y}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />

          {/* Obtained X dimension (red) */}
          <DimensionArrow
            x1={leftEdge}
            y1={obt.y + 28}
            x2={obt.x}
            y2={obt.y + 28}
            label={formatDim(layout.obtainedX)}
            color={obtainedColor}
            labelOffset={{ x: 0, y: 14 }}
          />
          <line
            x1={obt.x}
            y1={obt.y + 8}
            x2={obt.x}
            y2={obt.y + 34}
            stroke={obtainedColor}
            strokeWidth="1.2"
          />

          {/* Obtained Y dimension (red) */}
          <DimensionArrow
            x1={obt.x - 30}
            y1={bottomEdge}
            x2={obt.x - 30}
            y2={obt.y}
            label={formatDim(layout.obtainedY)}
            color={obtainedColor}
            vertical
            labelOffset={{ x: -16, y: 0 }}
          />
          <line
            x1={obt.x - 36}
            y1={obt.y}
            x2={obt.x - 8}
            y2={obt.y}
            stroke={obtainedColor}
            strokeWidth="1.2"
          />

          {/* Datum labels */}
          <text
            x={PART.x - 18}
            y={(PART.y + PART.y + PART.height) / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90 ${PART.x - 18} ${(PART.y + PART.y + PART.height) / 2})`}
            className="fill-muted text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            Y
          </text>
          <text
            x={PART.x + PART.width / 2}
            y={PART.y + PART.height + 28}
            textAnchor="middle"
            className="fill-muted text-[11px] font-semibold tracking-[0.14em] uppercase"
          >
            X
          </text>
        </svg>
      </div>

      {!layout.hasResult ? (
        <p className="text-muted mt-3 text-sm">
          Enter all four values to update the diagram with your required and
          obtained coordinates.
        </p>
      ) : null}
    </div>
  );
};

export default PositionDiagram;
