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

export const convertInchesToMm = ({ input1, input2, toInch = false }) => {
  const value1 = toNumber(input1);
  const value2 = toNumber(input2);

  const inputUnit = toInch ? "mm" : "inch";

  if (value1 === null && value2 === null) {
    return { error: `Enter at least one ${inputUnit} value.` };
  }

  const factor = toInch ? 1 / INCH_TO_MM : INCH_TO_MM;
  const digits = toInch ? 4 : 3;

  if (value1 !== null && value2 === null) {
    const converted = value1 * factor;
    return {
      mode: "single",
      converted,
      display: formatFixed(converted, digits),
    };
  }

  if (value1 === null && value2 !== null) {
    const converted = value2 * factor;
    return {
      mode: "single",
      converted,
      display: formatFixed(converted, digits),
    };
  }

  const c1 = value1 * factor;
  const c2 = value2 * factor;
  const nominal = (c1 + c2) / 2;
  const tolerance = Math.abs(c2 - c1) / 2;

  return {
    mode: "range",
    c1,
    c2,
    nominal,
    tolerance,
    display: `${formatFixed(nominal, digits)} ± ${formatFixed(tolerance, digits)}`,
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
