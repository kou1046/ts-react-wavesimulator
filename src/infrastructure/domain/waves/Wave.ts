import nj from "numjs";

export class Wave {
  public readonly value: nj.NdArray<number[]>;
  public readonly time: number;
  constructor(value: nj.NdArray<number[]>, time: number) {
    this.value = value;
    this.time = time;
  }

  public transformValue(): [number, number, number][] {
    const retArray: [number, number, number][] = [];

    this.value.T.tolist().forEach((row, i) => {
      row.forEach((cell, j) => {
        retArray.push([i, j, cell]);
      });
    });

    return retArray;
  }
}
