const INCH_TO_MM = 25.4;

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatFixed = (value, digits = 3) => {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toFixed(digits);
};

export const convertInchesToMm = ({ input1, input2 }) => {
  const value1 = toNumber(input1);
  const value2 = toNumber(input2);

  if (value1 === null && value2 === null) {
    return { error: "Enter at least one inch value." };
  }

  if (value1 !== null && value2 === null) {
    const mm = value1 * INCH_TO_MM;
    return {
      mode: "single",
      mm,
      display: formatFixed(mm, 3),
    };
  }

  if (value1 === null && value2 !== null) {
    const mm = value2 * INCH_TO_MM;
    return {
      mode: "single",
      mm,
      display: formatFixed(mm, 3),
    };
  }

  const mm1 = value1 * INCH_TO_MM;
  const mm2 = value2 * INCH_TO_MM;
  const nominal = (mm1 + mm2) / 2;
  const tolerance = Math.abs(mm2 - mm1) / 2;

  return {
    mode: "range",
    mm1,
    mm2,
    nominal,
    tolerance,
    display: `${formatFixed(nominal, 3)} ± ${formatFixed(tolerance, 3)}`,
  };
};

export const decimalDegreesToDms = (decimalDegrees) => {
  const value = toNumber(decimalDegrees);

  if (value === null) {
    return { error: "Enter a decimal degree value." };
  }

  const sign = value < 0 ? -1 : 1;
  const absolute = Math.abs(value);
  let degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  let minutes = Math.floor(minutesFloat);
  let seconds = Math.round((minutesFloat - minutes) * 60);

  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }

  if (minutes >= 60) {
    minutes = 0;
    degrees += 1;
  }

  const signedDegrees = sign * degrees;

  return {
    degrees: signedDegrees,
    minutes,
    seconds,
    display: `${signedDegrees}° ${minutes}' ${seconds}"`,
  };
};

export const dmsToDecimalDegrees = ({ degrees, minutes, seconds }) => {
  const deg = toNumber(degrees);
  const min = toNumber(minutes);
  const sec = toNumber(seconds);

  if (deg === null && min === null && sec === null) {
    return { error: "Enter degrees, minutes, and/or seconds." };
  }

  const safeDeg = deg ?? 0;
  const safeMin = min ?? 0;
  const safeSec = sec ?? 0;

  if (safeMin < 0 || safeMin >= 60) {
    return { error: "Minutes must be between 0 and 59.999." };
  }

  if (safeSec < 0 || safeSec >= 60 || !Number.isInteger(safeSec)) {
    return { error: "Seconds must be a whole number between 0 and 59." };
  }

  const sign = safeDeg < 0 ? -1 : 1;
  const decimal = sign * (Math.abs(safeDeg) + safeMin / 60 + safeSec / 3600);

  return {
    decimal,
    display: formatFixed(decimal, 6),
  };
};
