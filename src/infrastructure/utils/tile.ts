import nj from "numjs";

export class AxisError extends Error {}

export const tile = (
  array: nj.NdArray<number[]>,
  reps: [number, number]
): nj.NdArray<number[]> => {
  const [axis0, axis1] = reps;

  if (axis0 < 0 || axis1 < 0) {
    throw new AxisError("repsは正の数で指定する必要があります.");
  }

  if (!Number.isInteger(axis0) || !Number.isInteger(axis1)) {
    throw new AxisError("repsは整数で指定する必要があります.");
  }

  let retArray = array.clone();
  let retArray2 = array.clone();

  for (let i = 0; i < axis0; i++) {
    retArray = nj.concatenate<number[]>([
      retArray.T as any,
      array.clone().T as any,
    ]).T;

    retArray2 = nj.concatenate<number[]>([
      retArray2.T as any,
      array.clone().T as any,
    ]).T;
  }

  for (let j = 0; j < axis1; j++) {
    retArray = nj.concatenate<number[]>([retArray as any, retArray2 as any]);
  }

  return retArray;
};
