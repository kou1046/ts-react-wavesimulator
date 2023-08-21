import nj from "numjs";

import {
  topShift,
  leftShift,
  rightShift,
  bottomShift,
} from "../../utils/shift";
import { Grid } from "../grids/Grid";
import { Wave } from "./Wave";
import { Walls } from "../walls/Walls";

export class WaveFactory {
  private readonly grid: Grid;
  private readonly walls: Walls;
  private waveArray: nj.NdArray<number[]>;
  private preWaveArray: nj.NdArray<number[]>;

  constructor(grid: Grid, walls: Walls) {
    this.grid = grid;
    this.walls = walls;
    this.waveArray = nj
      .zeros<number[]>(grid.widthNum() * grid.heightNum())
      .reshape(grid.widthNum(), grid.heightNum());
    this.preWaveArray = nj
      .zeros<number[]>(grid.widthNum() * grid.heightNum())
      .reshape(grid.widthNum(), grid.heightNum());
  }

  public create() {
    const newWaveArray = this.propagate();
    return new Wave(newWaveArray);
  }

  private propagate(): nj.NdArray<number[]> {
    const vT = topShift(this.waveArray);
    const vB = bottomShift(this.waveArray);
    const vR = rightShift(this.waveArray);
    const vL = leftShift(this.waveArray);

    const v1 = this.waveArray.multiply(2).subtract(this.preWaveArray);

    const v2_1 = vL.add(vR).add(vB).add(vT);
    const v2_2 = this.waveArray.multiply(4);
    const v2_3 = v2_1.subtract(v2_2);

    const v2 = v2_3.multiply(this.grid.alpha());

    const newWaveArray = v1.add(v2);

    return newWaveArray;
  }
}
