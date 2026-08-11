const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const HOLE_COUNT_OPTIONS = [3, 5, 7, 9, 11, 13, 15];

export const calculatePcd = ({ holeCount, centerDistance }) => {
  const holes = toNumber(holeCount);
  const distance = toNumber(centerDistance);

  if (holes === null || !HOLE_COUNT_OPTIONS.includes(holes)) {
    return { error: "Select a valid hole count." };
  }

  if (distance === null) {
    return { error: "Enter the center distance between two consecutive holes." };
  }

  if (distance <= 0) {
    return { error: "Center distance must be greater than 0." };
  }

  const pcd = distance / Math.sin(Math.PI / holes);

  return {
    holeCount: holes,
    centerDistance: distance,
    pcd,
    display: pcd.toFixed(3),
  };
};
