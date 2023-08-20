import nj from "numjs";

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
    return new Wave(this.waveArray);
  }

  private propagate() {}
}
