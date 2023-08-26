import nj from "numjs";

export class SizeError extends Error {}

export const getSubset = (
  array: nj.NdArray<number[]>,
  indices: [number[], number[]]
): nj.NdArray<number> => {
  const [xs, ys] = indices;

  const subset = xs.map((x, i) => {
    const y = ys[i];

    return array.get(x, y);
  });

  return nj.array(subset).reshape<number>(-1);
};

export const setSubset = (
  array: nj.NdArray<number[]>,
  indices: [number[], number[]],
  values: number[]
): void => {
  if (values.length !== indices[0].length) {
    throw new SizeError("");
  }

  const [xs, ys] = indices;
  xs.forEach((x, i) => {
    const y = ys[i];
    const value = values[i];

    array.set(x, y, value);
  });
};
