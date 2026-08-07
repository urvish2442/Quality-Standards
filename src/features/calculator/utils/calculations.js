const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const calculatePositionDeviation = ({
  requiredX,
  requiredY,
  obtainedX,
  obtainedY,
}) => {
  const reqX = toNumber(requiredX);
  const reqY = toNumber(requiredY);
  const obtX = toNumber(obtainedX);
  const obtY = toNumber(obtainedY);

  if ([reqX, reqY, obtX, obtY].some((value) => value === null)) {
    return { error: "Enter all four values: Required X/Y and Obtained X/Y." };
  }

  const deltaX = obtX - reqX;
  const deltaY = obtY - reqY;
  const positionError = Math.hypot(deltaX, deltaY);

  return {
    requiredX: reqX,
    requiredY: reqY,
    obtainedX: obtX,
    obtainedY: obtY,
    deltaX,
    deltaY,
    positionError,
    display: {
      deltaX: deltaX.toFixed(4),
      deltaY: deltaY.toFixed(4),
      positionError: positionError.toFixed(4),
    },
  };
};

const degToRad = (degrees) => (degrees * Math.PI) / 180;
const radToDeg = (radians) => (radians * 180) / Math.PI;

const formatValue = (value, digits = 3) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return Number(value.toFixed(digits)).toString();
};

const isValidTriangleSides = (a, b, c) =>
  a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;

export const solveTriangle = ({ a, b, c, A, B, C }) => {
  let sideA = toNumber(a);
  let sideB = toNumber(b);
  let sideC = toNumber(c);
  let angleA = toNumber(A);
  let angleB = toNumber(B);
  let angleC = toNumber(C);

  const knownSides = [sideA, sideB, sideC].filter((value) => value !== null).length;
  const knownAngles = [angleA, angleB, angleC].filter((value) => value !== null).length;

  if (knownSides + knownAngles < 3) {
    return {
      error: "Enter at least 3 values (sides and/or angles) to solve the triangle.",
    };
  }

  if (knownAngles === 3 && knownSides === 0) {
    return { error: "At least one side is required to determine size." };
  }

  if ([angleA, angleB, angleC].some((value) => value !== null && value <= 0)) {
    return { error: "Angles must be greater than 0°." };
  }

  if ([sideA, sideB, sideC].some((value) => value !== null && value <= 0)) {
    return { error: "Sides must be greater than 0." };
  }

  try {
    if (knownAngles === 2 && knownSides >= 1) {
      if (angleA === null) {
        angleA = 180 - angleB - angleC;
      } else if (angleB === null) {
        angleB = 180 - angleA - angleC;
      } else if (angleC === null) {
        angleC = 180 - angleA - angleB;
      }
    }

    if (angleA !== null && angleB !== null && angleC !== null) {
      const angleSum = angleA + angleB + angleC;
      if (Math.abs(angleSum - 180) > 0.05) {
        return { error: "Angles must add up to 180°." };
      }
    }

    // SSS
    if (sideA !== null && sideB !== null && sideC !== null) {
      if (!isValidTriangleSides(sideA, sideB, sideC)) {
        return { error: "Sides do not form a valid triangle." };
      }

      angleA = radToDeg(
        Math.acos(
          Math.min(
            1,
            Math.max(-1, (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)),
          ),
        ),
      );
      angleB = radToDeg(
        Math.acos(
          Math.min(
            1,
            Math.max(-1, (sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)),
          ),
        ),
      );
      angleC = 180 - angleA - angleB;
    }
    // SAS
    else if (sideA !== null && sideB !== null && angleC !== null) {
      sideC = Math.sqrt(
        sideA ** 2 + sideB ** 2 - 2 * sideA * sideB * Math.cos(degToRad(angleC)),
      );
      angleA = radToDeg(
        Math.acos(
          Math.min(
            1,
            Math.max(-1, (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)),
          ),
        ),
      );
      angleB = 180 - angleA - angleC;
    } else if (sideA !== null && sideC !== null && angleB !== null) {
      sideB = Math.sqrt(
        sideA ** 2 + sideC ** 2 - 2 * sideA * sideC * Math.cos(degToRad(angleB)),
      );
      angleA = radToDeg(
        Math.acos(
          Math.min(
            1,
            Math.max(-1, (sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)),
          ),
        ),
      );
      angleC = 180 - angleA - angleB;
    } else if (sideB !== null && sideC !== null && angleA !== null) {
      sideA = Math.sqrt(
        sideB ** 2 + sideC ** 2 - 2 * sideB * sideC * Math.cos(degToRad(angleA)),
      );
      angleB = radToDeg(
        Math.acos(
          Math.min(
            1,
            Math.max(-1, (sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)),
          ),
        ),
      );
      angleC = 180 - angleA - angleB;
    }
    // ASA / AAS via law of sines
    else if (knownAngles >= 2 && knownSides >= 1) {
      if (angleA === null) {
        angleA = 180 - angleB - angleC;
      } else if (angleB === null) {
        angleB = 180 - angleA - angleC;
      } else if (angleC === null) {
        angleC = 180 - angleA - angleB;
      }

      if ([angleA, angleB, angleC].some((value) => value <= 0)) {
        return { error: "Computed angles are invalid. Check your inputs." };
      }

      const sinA = Math.sin(degToRad(angleA));
      const sinB = Math.sin(degToRad(angleB));
      const sinC = Math.sin(degToRad(angleC));

      if (sideA !== null) {
        sideB = (sideA * sinB) / sinA;
        sideC = (sideA * sinC) / sinA;
      } else if (sideB !== null) {
        sideA = (sideB * sinA) / sinB;
        sideC = (sideB * sinC) / sinB;
      } else if (sideC !== null) {
        sideA = (sideC * sinA) / sinC;
        sideB = (sideC * sinB) / sinC;
      }
    }
    // SSA (ambiguous case - take acute solution when possible)
    else if (knownSides === 2 && knownAngles === 1) {
      if (sideA !== null && sideB !== null && angleA !== null) {
        const sinB = (sideB * Math.sin(degToRad(angleA))) / sideA;
        if (sinB > 1) {
          return { error: "No triangle exists for these SSA values." };
        }
        angleB = radToDeg(Math.asin(Math.min(1, sinB)));
        angleC = 180 - angleA - angleB;
        sideC = (sideA * Math.sin(degToRad(angleC))) / Math.sin(degToRad(angleA));
      } else if (sideA !== null && sideC !== null && angleA !== null) {
        const sinC = (sideC * Math.sin(degToRad(angleA))) / sideA;
        if (sinC > 1) {
          return { error: "No triangle exists for these SSA values." };
        }
        angleC = radToDeg(Math.asin(Math.min(1, sinC)));
        angleB = 180 - angleA - angleC;
        sideB = (sideA * Math.sin(degToRad(angleB))) / Math.sin(degToRad(angleA));
      } else if (sideB !== null && sideC !== null && angleB !== null) {
        const sinC = (sideC * Math.sin(degToRad(angleB))) / sideB;
        if (sinC > 1) {
          return { error: "No triangle exists for these SSA values." };
        }
        angleC = radToDeg(Math.asin(Math.min(1, sinC)));
        angleA = 180 - angleB - angleC;
        sideA = (sideB * Math.sin(degToRad(angleA))) / Math.sin(degToRad(angleB));
      } else {
        return {
          error:
            "Unsupported input set. Try SSS, SAS, ASA/AAS, or SSA with a known opposite angle.",
        };
      }
    } else {
      return {
        error:
          "Unsupported input set. Try SSS, SAS, ASA/AAS, or SSA with a known opposite angle.",
      };
    }

    if (
      [sideA, sideB, sideC, angleA, angleB, angleC].some(
        (value) => !Number.isFinite(value) || value <= 0,
      )
    ) {
      return { error: "Could not solve a valid triangle from these inputs." };
    }

    if (!isValidTriangleSides(sideA, sideB, sideC)) {
      return { error: "Computed sides do not form a valid triangle." };
    }

    return {
      a: sideA,
      b: sideB,
      c: sideC,
      A: angleA,
      B: angleB,
      C: angleC,
      display: {
        a: formatValue(sideA),
        b: formatValue(sideB),
        c: formatValue(sideC),
        A: formatValue(angleA, 2),
        B: formatValue(angleB, 2),
        C: formatValue(angleC, 2),
      },
    };
  } catch {
    return { error: "Could not solve the triangle with the given values." };
  }
};
