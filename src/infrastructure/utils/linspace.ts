import nj from "numjs";

export const linspace = (
  start: number,
  stop: number,
  num: number
): nj.NdArray<number> => {
  const step = stop / num;
  const array = nj.arange(start, stop, step).slice([null, num]);
  return array;
};
