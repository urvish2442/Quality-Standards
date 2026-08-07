const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 260;
const PADDING = 42;

const DEFAULT_GEOMETRY = {
  A: { x: 40, y: 210 },
  B: { x: 280, y: 210 },
  C: { x: 160, y: 40 },
};

const midpoint = (p1, p2) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

const normalize = (vector) => {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
};

const buildGeometry = (values) => {
  const sideA = values?.a;
  const sideB = values?.b;
  const sideC = values?.c;

  if (
    ![sideA, sideB, sideC].every((value) => Number.isFinite(value) && value > 0)
  ) {
    return DEFAULT_GEOMETRY;
  }

  const baseX = 0;
  const baseY = 0;
  const pointA = { x: baseX, y: baseY };
  const pointB = { x: sideC, y: baseY };
  const cosA = Math.min(
    1,
    Math.max(-1, (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)),
  );
  const sinA = Math.sqrt(Math.max(0, 1 - cosA ** 2));
  const pointC = { x: sideB * cosA, y: -sideB * sinA };

  const points = [pointA, pointB, pointC];
  const minX = Math.min(...points.map((point) => point.x));
  const maxX = Math.max(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxY = Math.max(...points.map((point) => point.y));

  const spanX = Math.max(maxX - minX, 1e-6);
  const spanY = Math.max(maxY - minY, 1e-6);
  const scale = Math.min(
    (VIEW_WIDTH - PADDING * 2) / spanX,
    (VIEW_HEIGHT - PADDING * 2) / spanY,
  );

  const offsetX =
    (VIEW_WIDTH - spanX * scale) / 2 - minX * scale;
  const offsetY =
    (VIEW_HEIGHT - spanY * scale) / 2 - minY * scale;

  const mapPoint = (point) => ({
    x: point.x * scale + offsetX,
    y: point.y * scale + offsetY,
  });

  return {
    A: mapPoint(pointA),
    B: mapPoint(pointB),
    C: mapPoint(pointC),
  };
};

const labelOffset = (point, centroid, distance = 18) => {
  const direction = normalize({
    x: point.x - centroid.x,
    y: point.y - centroid.y,
  });

  return {
    x: point.x + direction.x * distance,
    y: point.y + direction.y * distance,
  };
};

const TriangleDiagram = ({ values }) => {
  const geometry = buildGeometry(values);
  const centroid = {
    x: (geometry.A.x + geometry.B.x + geometry.C.x) / 3,
    y: (geometry.A.y + geometry.B.y + geometry.C.y) / 3,
  };

  const angleA = labelOffset(geometry.A, centroid, 22);
  const angleB = labelOffset(geometry.B, centroid, 22);
  const angleC = labelOffset(geometry.C, centroid, 22);

  const sideA = labelOffset(midpoint(geometry.B, geometry.C), centroid, 16);
  const sideB = labelOffset(midpoint(geometry.A, geometry.C), centroid, 16);
  const sideC = labelOffset(midpoint(geometry.A, geometry.B), centroid, 16);

  const a = values?.display?.a ?? "a";
  const b = values?.display?.b ?? "b";
  const c = values?.display?.c ?? "c";
  const A = values?.display?.A ? `${values.display.A}°` : "A";
  const B = values?.display?.B ? `${values.display.B}°` : "B";
  const C = values?.display?.C ? `${values.display.C}°` : "C";

  const polygonPoints = `${geometry.A.x},${geometry.A.y} ${geometry.B.x},${geometry.B.y} ${geometry.C.x},${geometry.C.y}`;

  return (
    <div className="flex h-full flex-col">
      <h3 className="font-(family-name:--font-sora) text-lg font-semibold">
        Triangle notation
      </h3>
      <p className="mt-1 text-sm text-muted">
        Sides <span className="font-mono text-foreground">a</span>,{" "}
        <span className="font-mono text-foreground">b</span>,{" "}
        <span className="font-mono text-foreground">c</span> are opposite angles{" "}
        <span className="font-mono text-foreground">A</span>,{" "}
        <span className="font-mono text-foreground">B</span>,{" "}
        <span className="font-mono text-foreground">C</span>. The shape updates
        from the solved sides.
      </p>

      <div className="mt-4 flex flex-1 items-center justify-center rounded-xl border border-border bg-background p-4">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-auto w-full max-w-sm text-foreground"
          role="img"
          aria-label="Triangle diagram scaled from solved side lengths"
        >
          <polygon
            points={polygonPoints}
            fill="var(--primary-soft)"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-all duration-300 ease-out"
          />

          <circle cx={geometry.A.x} cy={geometry.A.y} r="3.5" fill="var(--primary)" />
          <circle cx={geometry.B.x} cy={geometry.B.y} r="3.5" fill="var(--primary)" />
          <circle cx={geometry.C.x} cy={geometry.C.y} r="3.5" fill="var(--primary)" />

          <text
            x={angleA.x}
            y={angleA.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary text-[13px] font-semibold"
          >
            A · {A}
          </text>
          <text
            x={angleB.x}
            y={angleB.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary text-[13px] font-semibold"
          >
            B · {B}
          </text>
          <text
            x={angleC.x}
            y={angleC.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-primary text-[13px] font-semibold"
          >
            C · {C}
          </text>

          <text
            x={sideA.x}
            y={sideA.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[12px] font-medium"
          >
            a = {a}
          </text>
          <text
            x={sideB.x}
            y={sideB.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[12px] font-medium"
          >
            b = {b}
          </text>
          <text
            x={sideC.x}
            y={sideC.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[12px] font-medium"
          >
            c = {c}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default TriangleDiagram;
