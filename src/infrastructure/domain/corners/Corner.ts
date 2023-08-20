import nj from "numjs";

import { Grid } from "../grids/Grid";

export abstract class Corner {
  private readonly x: number;
  private readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  abstract reflect(
    inplacedArray: nj.NdArray<number>,
    grid: Grid,
    time: number
  ): void;
}
