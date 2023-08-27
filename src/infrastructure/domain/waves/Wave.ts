import nj from "numjs";
import { Grid } from "../grids/Grid";

export class Wave {
  private _value: nj.NdArray<number[]>;
  public readonly time: number;
  public readonly grid: Grid;

  constructor(value: nj.NdArray<number[]>, time: number, grid: Grid) {
    this._value = value;
    this.time = time;
    this.grid = grid;
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

  get value(): nj.NdArray<number[]> {
    return this._value;
  }

  public get(x: number, y: number): number {
    return this._value.get(x, y) as unknown as number;
  }

  public add(value: nj.NdArray<number[]>): void {
    this._value = this.value.add(value);
  }
}
