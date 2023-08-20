import nj from "numjs";

export const rightShift = (
  array: nj.NdArray<number[]>
): nj.NdArray<number[]> => {
  const [w, h] = array.shape;
  const zeros = nj.zeros(w).reshape<number[]>(w, 1);
  const tmp = array.slice(null, [0, -1]).clone();
  const shifttedArray = nj.concatenate([zeros, tmp]).reshape<number[]>(w, h);
  return shifttedArray;
};

export const leftShift = (
  array: nj.NdArray<number[]>
): nj.NdArray<number[]> => {
  const [w, h] = array.shape;
  const zeros = nj.zeros(w).reshape(w, 1) as nj.NdArray<number[]>;
  const tmp = array.slice(null, 1).clone();
  const shifttedArray = nj.concatenate([tmp, zeros]).reshape<number[]>(w, h);
  return shifttedArray;
};

export const topShift = (array: nj.NdArray<number[]>): nj.NdArray<number[]> => {
  const [w, h] = array.shape;
  const zeros = nj.zeros<number[]>(h).reshape<number[]>(1, h);
  const tmp = array.slice(1).clone();
  const shifttedArray = nj
    .concatenate([tmp.T, zeros.T])
    .T.reshape<number[]>(w, h);
  return shifttedArray;
};

export const bottomShift = (
  array: nj.NdArray<number[]>
): nj.NdArray<number[]> => {
  const [w, h] = array.shape;
  const zeros = nj.zeros(h).reshape<number[]>(1, h);
  const tmp = array.slice([null, -1]).clone();
  const shifttedArray = nj
    .concatenate([zeros.T, tmp.T])
    .T.reshape<number[]>(w, h);
  return shifttedArray;
};
