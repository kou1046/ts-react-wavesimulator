import nj from "numjs";

import { Point } from "../points/Point";
import { Grid } from "../grids/Grid";

export abstract class Wall {
  private readonly start: Point;
  private readonly end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  public xs(): [number, number] {
    return [this.start.x, this.end.x];
  }

  public ys(): [number, number] {
    return [this.start.y, this.end.y];
  }

  public abstract reflect(
    inplacedArray: nj.NdArray<number>,
    preArray: nj.NdArray<number>,
    grid: Grid,
    time: number
  ): void;
}
