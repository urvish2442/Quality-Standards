"use client";

const VIEW_SIZE = 260;
const CENTER = VIEW_SIZE / 2;

const WeightDiagram = ({ shapeId, unit = "mm" }) => {
  const renderShapeSvg = () => {
    switch (shapeId) {
      case "round_bar":
        return (
          <g>
            <circle
              cx={CENTER}
              cy={CENTER}
              r="75"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            {/* Center mark */}
            <line
              x1={CENTER - 10}
              y1={CENTER}
              x2={CENTER + 10}
              y2={CENTER}
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER}
              y1={CENTER - 10}
              x2={CENTER}
              y2={CENTER + 10}
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
            {/* Diameter line */}
            <line
              x1={CENTER - 75}
              y1={CENTER + 95}
              x2={CENTER + 75}
              y2={CENTER + 95}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 75}
              y1={CENTER + 80}
              x2={CENTER - 75}
              y2={CENTER + 105}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 75}
              y1={CENTER + 80}
              x2={CENTER + 75}
              y2={CENTER + 105}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 115}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              D (Diameter, {unit})
            </text>
          </g>
        );

      case "pipe":
        return (
          <g>
            {/* Outer circle */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="80"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            {/* Inner circle (cutout) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="50"
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            {/* Wall thickness t line */}
            <line
              x1={CENTER + 50}
              y1={CENTER}
              x2={CENTER + 80}
              y2={CENTER}
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            <text
              x={CENTER + 65}
              y={CENTER - 10}
              textAnchor="middle"
              className="fill-primary text-[11px] font-bold"
            >
              t
            </text>
            {/* Outer diameter line */}
            <line
              x1={CENTER - 80}
              y1={CENTER + 100}
              x2={CENTER + 80}
              y2={CENTER + 100}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 80}
              y1={CENTER + 88}
              x2={CENTER - 80}
              y2={CENTER + 112}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 80}
              y1={CENTER + 88}
              x2={CENTER + 80}
              y2={CENTER + 112}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 120}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              OD (Outer Diameter, {unit})
            </text>
          </g>
        );

      case "hex_bar": {
        // Regular hexagon flat-to-flat = 2 * r_inc. R_ext = S / sqrt(3)
        const R = 75; // outer radius
        const S_radius = (R * Math.sqrt(3)) / 2; // radius across flats
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 180) * (60 * i - 30); // flat sides on left/right or top/bottom
          const x = CENTER + R * Math.cos(angle);
          const y = CENTER + R * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        return (
          <g>
            <polygon
              points={points.join(" ")}
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Flat to Flat line */}
            <line
              x1={CENTER - S_radius}
              y1={CENTER}
              x2={CENTER + S_radius}
              y2={CENTER}
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <circle cx={CENTER - S_radius} cy={CENTER} r="3" fill="var(--primary)" />
            <circle cx={CENTER + S_radius} cy={CENTER} r="3" fill="var(--primary)" />
            <text
              x={CENTER}
              y={CENTER - 10}
              textAnchor="middle"
              className="fill-primary text-[12px] font-bold"
            >
              S (Across Flats, {unit})
            </text>
          </g>
        );
      }

      case "square_bar":
        return (
          <g>
            <rect
              x={CENTER - 70}
              y={CENTER - 70}
              width="140"
              height="140"
              rx="4"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            {/* Dimension width */}
            <line
              x1={CENTER - 70}
              y1={CENTER + 95}
              x2={CENTER + 70}
              y2={CENTER + 95}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 70}
              y1={CENTER + 83}
              x2={CENTER - 70}
              y2={CENTER + 107}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 70}
              y1={CENTER + 83}
              x2={CENTER + 70}
              y2={CENTER + 107}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 115}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              W (Side Width, {unit})
            </text>
          </g>
        );

      case "rectangle_bar":
        return (
          <g>
            <rect
              x={CENTER - 85}
              y={CENTER - 45}
              width="170"
              height="90"
              rx="4"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            {/* Width W dimension below */}
            <line
              x1={CENTER - 85}
              y1={CENTER + 68}
              x2={CENTER + 85}
              y2={CENTER + 68}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 85}
              y1={CENTER + 58}
              x2={CENTER - 85}
              y2={CENTER + 78}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 85}
              y1={CENTER + 58}
              x2={CENTER + 85}
              y2={CENTER + 78}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 88}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              W (Width, {unit})
            </text>

            {/* Thickness T dimension right */}
            <line
              x1={CENTER + 105}
              y1={CENTER - 45}
              x2={CENTER + 105}
              y2={CENTER + 45}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER + 95}
              y1={CENTER - 45}
              x2={CENTER + 115}
              y2={CENTER - 45}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 95}
              y1={CENTER + 45}
              x2={CENTER + 115}
              y2={CENTER + 45}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER + 115}
              y={CENTER + 4}
              textAnchor="start"
              className="fill-foreground text-[12px] font-semibold"
            >
              T ({unit})
            </text>
          </g>
        );

      case "hollow_square":
        return (
          <g>
            <rect
              x={CENTER - 75}
              y={CENTER - 75}
              width="150"
              height="150"
              rx="6"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            <rect
              x={CENTER - 45}
              y={CENTER - 45}
              width="90"
              height="90"
              rx="4"
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            {/* Wall thickness t line */}
            <line
              x1={CENTER + 45}
              y1={CENTER}
              x2={CENTER + 75}
              y2={CENTER}
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            <text
              x={CENTER + 60}
              y={CENTER - 10}
              textAnchor="middle"
              className="fill-primary text-[11px] font-bold"
            >
              t
            </text>
            {/* Outer width W */}
            <line
              x1={CENTER - 75}
              y1={CENTER + 98}
              x2={CENTER + 75}
              y2={CENTER + 98}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 75}
              y1={CENTER + 86}
              x2={CENTER - 75}
              y2={CENTER + 110}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 75}
              y1={CENTER + 86}
              x2={CENTER + 75}
              y2={CENTER + 110}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 118}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              W (Outer Width, {unit})
            </text>
          </g>
        );

      case "hollow_rectangle":
        return (
          <g>
            <rect
              x={CENTER - 85}
              y={CENTER - 50}
              width="170"
              height="100"
              rx="6"
              fill="var(--primary-soft)"
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            <rect
              x={CENTER - 55}
              y={CENTER - 26}
              width="110"
              height="52"
              rx="4"
              fill="var(--surface)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            {/* Wall thickness t */}
            <line
              x1={CENTER + 55}
              y1={CENTER}
              x2={CENTER + 85}
              y2={CENTER}
              stroke="var(--primary)"
              strokeWidth="2.5"
            />
            <text
              x={CENTER + 70}
              y={CENTER - 8}
              textAnchor="middle"
              className="fill-primary text-[11px] font-bold"
            >
              t
            </text>

            {/* Width W */}
            <line
              x1={CENTER - 85}
              y1={CENTER + 72}
              x2={CENTER + 85}
              y2={CENTER + 72}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER - 85}
              y1={CENTER + 62}
              x2={CENTER - 85}
              y2={CENTER + 82}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 85}
              y1={CENTER + 62}
              x2={CENTER + 85}
              y2={CENTER + 82}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER}
              y={CENTER + 90}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-semibold"
            >
              W (Outer Width, {unit})
            </text>

            {/* Height H */}
            <line
              x1={CENTER + 105}
              y1={CENTER - 50}
              x2={CENTER + 105}
              y2={CENTER + 50}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <line
              x1={CENTER + 95}
              y1={CENTER - 50}
              x2={CENTER + 115}
              y2={CENTER - 50}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1={CENTER + 95}
              y1={CENTER + 50}
              x2={CENTER + 115}
              y2={CENTER + 50}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x={CENTER + 115}
              y={CENTER + 4}
              textAnchor="start"
              className="fill-foreground text-[12px] font-semibold"
            >
              H ({unit})
            </text>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="border-border bg-background flex w-full max-w-sm items-center justify-center rounded-xl border p-4 shadow-xs">
        <svg
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          className="text-foreground h-auto w-full max-w-[240px]"
          role="img"
          aria-label={`Cross-section diagram for ${shapeId}`}
        >
          {renderShapeSvg()}
        </svg>
      </div>
    </div>
  );
};

export default WeightDiagram;
