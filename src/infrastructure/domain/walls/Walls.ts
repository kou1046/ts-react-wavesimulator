import nj from "numjs";

import { Wall } from "./Wall";
import { Grid } from "../grids/Grid";
import { ICornerFactory } from "../corners/ICornerFactory";

export class Walls {
  private readonly value;
  public readonly cornerFactory: ICornerFactory;
  constructor(wallCollection: Wall[], cornerFactory: ICornerFactory) {
    this.value = wallCollection;
    this.cornerFactory = cornerFactory;
  }

  public reflect(
    inplacedArray: nj.NdArray<number>,
    preArray: nj.NdArray<number>,
    grid: Grid,
    time: number
  ): void {}
}
