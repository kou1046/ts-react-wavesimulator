import nj from "numjs";

import { Wall } from "./Wall";
import { Grid } from "../grids/Grid";
import { ICornerFactory } from "../corners/ICornerFactory";
import { Wave } from "../waves/Wave";

export class Walls {
  private readonly value;
  public readonly cornerFactory: ICornerFactory;
  constructor(wallCollection: Wall[], cornerFactory: ICornerFactory) {
    this.value = wallCollection;
    this.cornerFactory = cornerFactory;
  }

  public reflect(
    inplacedArray: nj.NdArray<number[]>,
    wave: Wave,
    preWave: Wave
  ): void {}
}
