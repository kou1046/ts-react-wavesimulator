import nj from "numjs";

export class Wave {
  public readonly value: nj.NdArray<number[]>;
  constructor(value: nj.NdArray<number[]>) {
    this.value = value;
  }
}
